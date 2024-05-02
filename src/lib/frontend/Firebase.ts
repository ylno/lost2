// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCE0BD3-eWVbQDLfDzdGu022KfoeyQSMzA",
  authDomain: "tim2-gc.firebaseapp.com",
  projectId: "tim2-gc",
  storageBucket: "tim2-gc.appspot.com",
  messagingSenderId: "366876933222",
  appId: "1:366876933222:web:82104b729e1d287010c1a7",
  measurementId: "G-WMXMC0KFNJ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestoreDb = getFirestore(app);

if (process.env.NEXT_PUBLIC_EMULATOR) {
  connectFirestoreEmulator(
    firestoreDb,
    process.env.NEXT_PUBLIC_FIREBASE_EMULATOR_HOST || "localhost",
    Number(process.env.NEXT_PUBLIC_FIRESTORE_EMULATOR_PORT),
  );
}
