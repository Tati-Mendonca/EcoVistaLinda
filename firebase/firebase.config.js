import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAgacNg_40Fo4BtXRdTMHeDVrAB4-SUzjM",
    authDomain: "eco-vistalinda.firebaseapp.com",
    projectId: "eco-vistalinda",
    storageBucket: "eco-vistalinda.firebasestorage.app",
    messagingSenderId: "820590045458",
    appId: "1:820590045458:web:d73db446c24318528f2bcb"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);