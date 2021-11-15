import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAdiHul3OuyN2v5xElbWw18LLSncIQssAE",
  authDomain: "erchat-app-8d529.firebaseapp.com",
  projectId: "erchat-app-8d529",
  storageBucket: "erchat-app-8d529.appspot.com",
  messagingSenderId: "353893110494",
  appId: "1:353893110494:web:60bd8c3803f77e0426e84f",
  measurementId: "G-1HRMHWZQ3M",
  databaseURL: "https://erchat-app-8d529-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

if (window.location.hostname === "localhost") {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 8080);
}

export { db, auth };
