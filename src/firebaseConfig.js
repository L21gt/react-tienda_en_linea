// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9rf4CWzFYQwyvWK5ggFMDiVzz5ujzkCM",
  authDomain: "minitiendareactgalileo.firebaseapp.com",
  projectId: "minitiendareactgalileo",
  storageBucket: "minitiendareactgalileo.firebasestorage.app",
  messagingSenderId: "80944345136",
  appId: "1:80944345136:web:78bb552613d7a2fd1d3df5",
  measurementId: "G-CW3VWKVLLT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Obtiene una instancia de Firestore
const db = getFirestore(app);

// Exporta la instancia de Firestore para usarla en otros archivos
export { db };