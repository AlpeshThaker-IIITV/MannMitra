import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "mannmitra.firebaseapp.com",
  projectId: "mannmitra",
  storageBucket: "mannmitra.appspot.com",
  messagingSenderId: "123456",
  appId: "1:123456:web:abcdef",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
