import { useState } from 'react';
import './Login.css'; // Reusing styles where possible
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth.jsx';
import './Login.css';
import logo from './assets/logo.png';
// import googleIcon from './assets/google.png';
import appleIcon from './assets/apple.png';
import eyeOffIcon from './assets/eye-off.png';
import eyeIcon from './assets/eye.png';
import { GoogleLogin } from '@react-oauth/google';
import { auth } from './firebaseConfig'; // Importez votre instance Firebase client
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';



const SignUp = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(false);
  const {loginWithGoogle } = useAuth();

  const { signup } = useAuth();
  const navigate = useNavigate();

  // Handle signup
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!displayName || !email || !password || !confirmPassword) {
      setError('Tous les champs sont requis');
      return;
    }

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    if (!agreedTerms) {
      setError('Vous devez accepter les conditions d\'utilisation');
      return;
    }

    setLoading(true);

    try {
      await signup(email, password, displayName);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Erreur lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  // Handle Google signup
  // const handleGoogleSignUp = async () => {
  //   setLoading(true);
  //   setError('');
  //   alert('Google Sign-In nécessite une configuration supplémentaire.\nVoir la documentation pour les détails.');
  //   setLoading(false);
  // };

  // Handle Apple signup
  const handleAppleSignUp = async () => {
    setLoading(true);
    setError('');
    alert('Apple Sign-In nécessite une configuration supplémentaire.\nVoir la documentation pour les détails.');
    setLoading(false);
  };


const handleGoogleError = () => {
  setError('Erreur lors de la connexion Google');
};
  
  
  // Handle email login
const handleGoogleSuccess = async (credentialResponse) => {
  try {
    setLoading(true);
    
    // 1. Créer un credential Firebase à partir du token Google reçu
    const credential = GoogleAuthProvider.credential(credentialResponse.credential);
    
    // 2. Se connecter à Firebase avec ce credential (côté client)
    const userCredential = await signInWithCredential(auth, credential);
    
    // 3. Récupérer le VRAI ID Token de Firebase
    const firebaseIdToken = await userCredential.user.getIdToken();
    
    // 4. Envoyer ce token Firebase à votre backend
    await loginWithGoogle(firebaseIdToken);
    
    navigate('/');
  } catch (err) {
    setError("Erreur d'échange de token : " + err.message);
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="login-container">
      <div className="logo-container">
        <img src={logo} alt="Mooves Logo" className="logo" />
      </div>
      <div className="login-card">
        <h1 className="title">Create Account</h1>
        <p className="subtitle">Join us today! Please enter your details.</p>

        {error && (
          <div style={{
            backgroundColor: '#fee',
            color: '#c00',
            padding: '10px',
            borderRadius: '5px',
            marginBottom: '15px',
            fontSize: '14px'
          }}>
            ⚠️ {error}
          </div>
        )}

        <form className="login-form" onSubmit={handleSignUp}>
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input 
              type="text" 
              id="name" 
              placeholder="Enter your full name" 
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required 
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              <img
                src={showPassword ? eyeIcon : eyeOffIcon}
                alt="Toggle Password"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="input-group checkbox-group">
            <input 
              type="checkbox" 
              id="terms" 
              checked={agreedTerms}
              onChange={(e) => setAgreedTerms(e.target.checked)}
              disabled={loading}
            />
            <label htmlFor="terms">I agree to the <Link to="/terms">Terms & Conditions</Link></label>
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Création en cours...' : 'Create Account'}
          </button>

        <div className="divider">
          <span>Or sign up with</span>
        </div>

        <div className="social-login">
          {import.meta.env.VITE_GOOGLE_CLIENT_ID ? (
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              theme="outline"
              size="large"
              width="30%"
            />
          ) : (
            <div style={{ color: '#666', fontSize: '14px' }}>Google OAuth non configuré.</div>
          )}
          <button 
            className="social-button" 
            onClick={handleAppleSignUp}
            disabled={loading}
            type="button"
          >
            <img src={appleIcon} alt="Apple" />
            <span>Apple</span>
          </button>
        </div>
        </form>

        <p className="signup-link">
          Already have an account? <Link to="/login">Login Now</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
