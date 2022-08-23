// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDBLa9KsrDpg16hsxvxMAaMdcdQ6Skw2sQ",
    authDomain: "flportilla-server.firebaseapp.com",
    projectId: "flportilla-server",
    storageBucket: "flportilla-server.appspot.com",
    messagingSenderId: "460749619641",
    appId: "1:460749619641:web:dfe429485258427c90f668",
    measurementId: "G-JRVRFJC54M"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp)
export const FirebaseDB = getFirestore(FirebaseApp)

