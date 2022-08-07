// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOzLVDtbdW5oQQQgVdgpfpg_7RkNswXN8",
  authDomain: "clinic-cz.firebaseapp.com",
  databaseURL: "https://clinic-cz-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "clinic-cz",
  storageBucket: "clinic-cz.appspot.com",
  messagingSenderId: "571706675490",
  appId: "1:571706675490:web:8573022350cfa0229cd57b",
  measurementId: "G-EYWL7G94GV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);