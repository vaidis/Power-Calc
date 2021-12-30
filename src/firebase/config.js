import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "powerc-1e251.firebaseapp.com",
  databaseURL: "https://powerc-1e251.firebaseio.com",
  projectId: "powerc-1e251",
  storageBucket: "powerc-1e251.appspot.com",
  messagingSenderId: "116603789645",
  appId: "1:116603789645:web:b97d5e3422e24070f99704"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);    // Database
const auth = getAuth()           // Authentication
const storage = getStorage(app); // Storage

export { db, storage , auth };
