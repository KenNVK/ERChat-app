import firebase from "firebase/compat/app";
import "firebase/compat/analytics";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAdiHul3OuyN2v5xElbWw18LLSncIQssAE",
  authDomain: "erchat-app-8d529.firebaseapp.com",
  projectId: "erchat-app-8d529",
  storageBucket: "erchat-app-8d529.appspot.com",
  messagingSenderId: "353893110494",
  appId: "1:353893110494:web:60bd8c3803f77e0426e84f",
  measurementId: "G-1HRMHWZQ3M",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

if (window.location.hostname === "localhost") {
  // auth.useEmulator('http://localhost:9099');
  // db.useEmulator('localhost', '8080');
}

export { db, auth };
export default firebase;
