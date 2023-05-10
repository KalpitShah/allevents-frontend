// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhYmWnite39IGk-sQxa-k94sDM9tCBpvM",
  authDomain: "allevents-login.firebaseapp.com",
  projectId: "allevents-login",
  storageBucket: "allevents-login.appspot.com",
  messagingSenderId: "609157755778",
  appId: "1:609157755778:web:66f7cc6777331fa403159b",
  measurementId: "G-RTNNLNJZ7L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
