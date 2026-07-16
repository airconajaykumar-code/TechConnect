import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAMJDFb5lESySmJr5e5MxuxpzGdTK2OL_0",
  authDomain: "tachconnect-2b719.firebaseapp.com",
  projectId: "tachconnect-2b719",
  storageBucket: "tachconnect-2b719.firebasestorage.app",
  messagingSenderId: "879515663630",
  appId: "1:879515663630:web:af7ea181bc3b2020a72b5f",
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const db = getFirestore(app);
