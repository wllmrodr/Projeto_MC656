// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALQcEmLMu8PeRvMfC2TwJpozv7wT0me6s",
  authDomain: "projetomc656.firebaseapp.com",
  projectId: "projetomc656",
  storageBucket: "projetomc656.firebasestorage.app",
  messagingSenderId: "365040862567",
  appId: "1:365040862567:web:b4cf271b579a1b90369bc2",
  measurementId: "G-RDRP2P086N"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

export default firebaseApp;