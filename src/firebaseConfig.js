// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for other Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const env = import.meta.env;
const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
  // measurementId: env.VITE_FIREBASE_MEASUREMENT_ID // Optionnel
};

// Validate required env vars before initializing
const required = ['VITE_FIREBASE_API_KEY', 'VITE_FIREBASE_AUTH_DOMAIN', 'VITE_FIREBASE_PROJECT_ID', 'VITE_FIREBASE_APP_ID'];
const missing = required.filter((k) => !env[k]);

let auth = null;
if (missing.length > 0) {
  console.warn('Firebase not initialized — missing env vars:', missing.join(', '));
} else {
  try {
    const app = initializeApp(firebaseConfig);
    try {
      auth = getAuth(app);
    } catch (err) {
      console.warn('Firebase auth initialization failed:', err);
      auth = null;
    }
  } catch (error) {
    console.warn('Firebase initialization failed:', error);
    auth = null;
  }
}

export { auth };