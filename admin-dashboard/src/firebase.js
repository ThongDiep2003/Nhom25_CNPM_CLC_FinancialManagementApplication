// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3jwuCchb8v8vCnYAV1H_MBpOSB9cv9jw",
  authDomain: "flowup-a1ead.firebaseapp.com",
  databaseURL: "https://flowup-a1ead-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "flowup-a1ead",
  storageBucket: "flowup-a1ead.appspot.com",
  messagingSenderId: "327504117742",
  appId: "1:327504117742:web:6f70646d66c1a2a71258ff",
  measurementId: "G-VPSWB71PMT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);