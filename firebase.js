import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyClpcg_TwIfswVSX3Ntmx3rBAErHabnnMw",
  authDomain: "exemplorn-1f9b8.firebaseapp.com",
  projectId: "exemplorn-1f9b8",
  storageBucket: "exemplorn-1f9b8.appspot.com",
  messagingSenderId: "778788617723",
  appId: "1:778788617723:web:5d5d391ed3892393959f5e"

};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore()

export { firestore }

