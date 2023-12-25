// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB50dfA3EYphZtBFFVHTnZyzdIzoTPk6A8",
  authDomain: "deliveryapp-e9a4e.firebaseapp.com",
  projectId: "deliveryapp-e9a4e",
  storageBucket: "deliveryapp-e9a4e.appspot.com",
  messagingSenderId: "698431017838",
  appId: "1:698431017838:web:e8a62ef98008e04da0a77f",
  measurementId: "G-5G1T4DBYZG"
};

// Initialize Firebase
// // Initialize Firebase
// if (!firebase.apps.length) {
//   firebase.initializeApp(config);
// }

const app = initializeApp(firebaseConfig);
// const auth = initializeAuth();

const auth = getAuth(app);
const db = getFirestore(app);
// const analytics = getAnalytics(app);

export {app, auth, db};