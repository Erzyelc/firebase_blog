// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

//import for firestore
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getAuth} from 'firebase/auth'

import {getStorage} from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAT13ckujXzdsg-mOUOW6i9yqnBLZrMsa0",
  authDomain: "blog-b27ea.firebaseapp.com",
  projectId: "blog-b27ea",
  storageBucket: "blog-b27ea.appspot.com",
  messagingSenderId: "982182011434",
  appId: "1:982182011434:web:458fab50de83c162fc5953"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//set up db "hook" and export it
export const db = getFirestore(app)

//setup auth and export it
export const auth = getAuth(app)

//setup storage and export it
export const storage = getStorage(app)