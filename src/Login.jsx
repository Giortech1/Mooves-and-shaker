import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth.jsx';
import './Login.css';
import logo from './assets/logo.png';
import appleIcon from './assets/apple.png';
import eyeOffIcon from './assets/eye-off.png';
import eyeIcon from './assets/eye.png';
import { GoogleLogin } from '@react-oauth/google';

import { auth } from './firebaseConfig'; // Importez votre instance Firebase client
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';





const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  // Handle email login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  
  // Handle Apple login
  const handleAppleLogin = async () => {
    setLoading(true);
    setError('');
    alert('Apple Sign-In nécessite une configuration supplémentaire.\nVoir la documentation pour plus de détails.');
    setLoading(false);
  };

    // Handle Google login success
//   const handleGoogleSuccess = async (credentialResponse) => {
//   setLoading(true);
//   try {
//     await loginWithGoogle(credentialResponse.credential);
//     navigate('/home');
//   } catch (err) {
//     setError(err.message);
//   } finally {
//     setLoading(false);
//   }
// };

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
        <h1 className="title">Login</h1>
        <p className="subtitle">Welcome back! Please enter your details.</p>

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

        <form className="login-form" onSubmit={handleEmailLogin}>
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
                placeholder="Enter your password"
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

          <div className="forgot-password">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Connexion en cours...' : 'Login'}
          </button>

        <div className="divider">
          <span>Ou continuer avec</span>
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
            onClick={handleAppleLogin}
            disabled={loading}
            type="button"
          >
            <img src={appleIcon} alt="Apple" />
            <span>Apple</span>
          </button>
        </div>
        </form>

        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
