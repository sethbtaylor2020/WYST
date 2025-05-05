// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWtMp3_vfkI99bNoIM2eAJTla-0ZB35NY",
  authDomain: "wyst-7fe74.firebaseapp.com",
  projectId: "wyst-7fe74",
  storageBucket: "wyst-7fe74.firebasestorage.app",
  messagingSenderId: "2082907574",
  appId: "1:2082907574:web:f7a7c32905e246e3388d17",
  measurementId: "G-YQ1CYW36WM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);