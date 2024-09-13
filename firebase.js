// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "smart-work-schedule.firebaseapp.com",
    projectId: "smart-work-schedule",
    storageBucket: "smart-work-schedule.appspot.com",
    messagingSenderId: "299208578489",
    appId: "1:299208578489:web:aa8dc520b90f2b85c2d268",
    measurementId: "G-8GMJ5GH89X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);