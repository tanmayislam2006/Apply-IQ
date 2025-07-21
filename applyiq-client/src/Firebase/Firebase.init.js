// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtZnWJrDS58dQXpJM3xIFh0IqbG19RjCA",
  authDomain: "applyiq-app11.firebaseapp.com",
  projectId: "applyiq-app11",
  storageBucket: "applyiq-app11.firebasestorage.app",
  messagingSenderId: "1036524286291",
  appId: "1:1036524286291:web:f2b951a784ac1448c371a6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth =getAuth(app)
export default auth