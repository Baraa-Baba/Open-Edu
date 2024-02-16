// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"; 
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getMessaging,getToken  } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhUHThL09PUTlFz_F_GOQ013r4LF1CEz8",
  authDomain: "fekrapdfs.firebaseapp.com",
  projectId: "fekrapdfs",
  storageBucket: "fekrapdfs.appspot.com",
  messagingSenderId: "1078900726430",
  appId: "1:1078900726430:web:1867ef7cdeb82dd8a2b98f"
};

 

// Initialize Firebase 
export  const app = initializeApp(firebaseConfig) 
export const auth =getAuth(app)
export const storage = getStorage(app);
export const db = getFirestore(app);
export const messaging = getMessaging(app);
