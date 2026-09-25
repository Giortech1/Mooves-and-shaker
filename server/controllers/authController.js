import { auth, db } from '../config/firebase.js';
import { generateToken } from '../middleware/auth.js';
import bcrypt from 'bcryptjs';

/**
 * Login avec Email et Mot de passe
 * POST /api/auth/login
 */
export const loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email et mot de passe requis.',
      });
    }

    // Vérifier si l'utilisateur existe dans Firestore
    const userRef = db.collection('users').where('email', '==', email);
    const userSnapshot = await userRef.get();

    if (userSnapshot.empty) {
      return res.status(401).json({
        success: false,
        message: 'Email ou mot de passe incorrect.',
      });
    }

    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();

    // Vérifier le mot de passe avec bcrypt
    const isPasswordValid = await bcrypt.compare(password, userData.passwordHash);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Email ou mot de passe incorrect.',
      });
    }

    // Générer un token JWT
    const token = generateToken(userDoc.id, email);

    // Mettre à jour la dernière connexion
    await db.collection('users').doc(userDoc.id).update({
      lastLogin: new Date(),
      lastLoginProvider: 'email',
    });

    // Retourner les données utilisateur et le token
    return res.status(200).json({
      success: true,
      message: 'Connexion réussie.',
      token: token,
      user: {
        uid: userDoc.id,
        email: userData.email,
        displayName: userData.displayName,
        photoURL: userData.photoURL,
      },
    });
  } catch (error) {
    console.error('Erreur lors du login email:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur serveur.',
      error: error.message,
    });
  }
};

/**
 * Inscription avec Email et Mot de passe
 * POST /api/auth/signup
 */
export const signupWithEmail = async (req, res) => {
  try {
    const { email, password, displayName } = req.body;

    // Validation
    if (!email || !password || !displayName) {
      return res.status(400).json({
        success: false,
        message: 'Email, mot de passe et nom requis.',
      });
    }

    // Password minimum length check (Firebase requires >= 6)
    if (typeof password === 'string' && password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Le mot de passe doit contenir au moins 6 caractères.',
      });
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Format d\'email invalide.',
      });
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await db
      .collection('users')
      .where('email', '==', email)
      .get();

    if (!existingUser.empty) {
      return res.status(400).json({
        success: false,
        message: 'Un utilisateur avec cet email existe déjà.',
      });
    }

    // Vérifier également dans Firebase Auth (si un user Auth existe mais pas en Firestore)
    try {
      const authUser = await auth.getUserByEmail(email);
      if (authUser) {
        console.warn('Tentative d\'inscription: utilisateur déjà présent dans Firebase Auth:', email);
        return res.status(400).json({
          success: false,
          message: 'Un utilisateur avec cet email existe déjà (Firebase Auth).',
        });
      }
    } catch (err) {
      // Si l'erreur indique que l'utilisateur n'existe pas, on continue.
      // Pour toute autre erreur, on loggue et renvoie une 500.
      if (err.code && err.code === 'auth/user-not-found') {
        // Pas trouvé — OK
      } else {
        console.error('Erreur lors de la vérification dans Firebase Auth:', err);
        return res.status(500).json({
          success: false,
          message: 'Erreur interne lors de la vérification de l\'utilisateur.',
          error: err.message,
        });
      }
    }

    // Créer l'utilisateur dans Firebase Auth (pour la gestion centralisée)
    let userRecord;
    try {
      userRecord = await auth.createUser({
        email: email,
        password: password,
        displayName: displayName,
      });
    } catch (firebaseError) {
      console.error('Firebase createUser error:', firebaseError);
      return res.status(400).json({
        success: false,
        message: 'Erreur lors de la création du compte Firebase.',
        error: firebaseError.message,
      });
    }

    // Hasher le mot de passe avec bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer le document utilisateur dans Firestore
    await db.collection('users').doc(userRecord.uid).set({
      email: email,
      displayName: displayName,
      passwordHash: hashedPassword,
      photoURL: '',
      authProviders: ['email'],
      createdAt: new Date(),
      lastLogin: new Date(),
      lastLoginProvider: 'email',
      verified: false,
    });

    // Générer un token JWT
    const token = generateToken(userRecord.uid, email);

    return res.status(201).json({
      success: true,
      message: 'Inscription réussie.',
      token: token,
      user: {
        uid: userRecord.uid,
        email: email,
        displayName: displayName,
      },
    });
  } catch (error) {
    console.error('Erreur lors du signup email:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur serveur.',
      error: error.message,
    });
  }
};

/**
 * Login avec Google (utilise l'ID Token du frontend)
 * POST /api/auth/google
 */
export const loginWithGoogle = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({
        success: false,
        message: 'ID Token Google requis.',
      });
    }

    // 1. Vérifier le token avec Firebase Admin
    let decodedToken;
    try {
      decodedToken = await auth.verifyIdToken(idToken);
    } catch (verifyError) {
      console.error('❌ Erreur de validation Firebase:', verifyError.code, verifyError.message);
      return res.status(401).json({
        success: false,
        message: 'Échec de la vérification : Assurez-vous d\'envoyer un Firebase ID Token et non un Google Access Token.',
        error: verifyError.message,
      });
    }

    const { uid, email, name, picture } = decodedToken;

    // Vérifier si l'utilisateur existe dans Firestore
    const userDoc = await db.collection('users').doc(uid).get();

    if (!userDoc.exists) {
      // Créer un nouvel utilisateur s'il n'existe pas
      await db.collection('users').doc(uid).set({
        email: email,
        displayName: name || 'Google User',
        photoURL: picture || '',
        authProviders: ['google'],
        createdAt: new Date(),
        lastLogin: new Date(),
        lastLoginProvider: 'google',
        verified: true,
      });
    } else {
      // Mettre à jour la dernière connexion
      const userData = userDoc.data();
      const providers = userData.authProviders || [];

      if (!providers.includes('google')) {
        providers.push('google');
      }

      await db.collection('users').doc(uid).update({
        authProviders: providers,
        lastLogin: new Date(),
        lastLoginProvider: 'google',
        photoURL: picture || userData.photoURL,
      });
    }

    // 2. Générer un token JWT (Vérifie si JWT_SECRET existe)
    let token;
    try {
      token = generateToken(uid, email);
    } catch (jwtError) {
      console.error('Erreur génération JWT:', jwtError.message);
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la création de la session (JWT_SECRET ?).',
        error: jwtError.message
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Connexion Google réussie.',
      token: token,
      user: {
        uid: uid,
        email: email,
        displayName: name || 'Google User',
        photoURL: picture || '',
      },
    });
  } catch (error) {
    console.error('Erreur lors du login Google:', error);
    return res.status(401).json({
      success: false,
      message: 'Erreur lors de la vérification du token Google.',
      error: error.message,
    });
  }
};

/**
 * Login avec Apple (utilise l'ID Token du frontend)
 * POST /api/auth/apple
 */
export const loginWithApple = async (req, res) => {
  try {
    const { idToken, email, fullName } = req.body;

    if (!idToken) {
      return res.status(400).json({
        success: false,
        message: 'ID Token Apple requis.',
      });
    }

    // Vérifier le token Apple avec Firebase
    const decodedToken = await auth.verifyIdToken(idToken);
    const { uid } = decodedToken;

    // Vérifier si l'utilisateur existe dans Firestore
    const userDoc = await db.collection('users').doc(uid).get();

    if (!userDoc.exists) {
      // Créer un nouvel utilisateur s'il n'existe pas
      await db.collection('users').doc(uid).set({
        email: email || decodedToken.email || 'apple-user@mooves.com',
        displayName: fullName || 'Apple User',
        photoURL: '',
        authProviders: ['apple'],
        createdAt: new Date(),
        lastLogin: new Date(),
        lastLoginProvider: 'apple',
        verified: true,
      });
    } else {
      // Mettre à jour la dernière connexion
      const userData = userDoc.data();
      const providers = userData.authProviders || [];

      if (!providers.includes('apple')) {
        providers.push('apple');
      }

      await db.collection('users').doc(uid).update({
        authProviders: providers,
        lastLogin: new Date(),
        lastLoginProvider: 'apple',
        email: email || userData.email,
      });
    }

    // Générer un token JWT
    const finalUserData = userDoc.exists ? userDoc.data() : { email: email || decodedToken.email, displayName: fullName || 'Apple User' };
    const userEmail = finalUserData.email;
    const token = generateToken(uid, userEmail);

    return res.status(200).json({
      success: true,
      message: 'Connexion Apple réussie.',
      token: token,
      user: {
        uid: uid,
        email: userEmail,
        displayName: finalUserData.displayName,
      },
    });
  } catch (error) {
    console.error('Erreur lors du login Apple:', error);
    return res.status(401).json({
      success: false,
      message: 'Erreur lors de la vérification du token Apple.',
      error: error.message,
    });
  }
};

/**
 * Récupérer les informations de l'utilisateur connecté
 * GET /api/auth/me
 */
export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.uid;

    const userDoc = await db.collection('users').doc(userId).get();

    if (!userDoc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé.',
      });
    }

    const userData = userDoc.data();

    return res.status(200).json({
      success: true,
      user: {
        uid: userDoc.id,
        email: userData.email,
        displayName: userData.displayName,
        photoURL: userData.photoURL,
        authProviders: userData.authProviders,
        verified: userData.verified,
      },
    });
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur serveur.',
      error: error.message,
    });
  }
};

/**
 * Logout (optionnel - peut être fait côté frontend)
 * POST /api/auth/logout
 */
export const logout = async (req, res) => {
  try {
    // Dans une vraie application, vous pourriez invalider le token ici
    // En utilisant une liste noire (blacklist) stockée en cache ou en base de données

    return res.status(200).json({
      success: true,
      message: 'Déconnexion réussie.',
    });
  } catch (error) {
    console.error('Erreur lors du logout:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur serveur.',
      error: error.message,
    });
  }
};
