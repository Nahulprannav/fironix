import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDbATz-8Dg3fuPl8DBO87klwHYu4rMgj10",
    authDomain: "fironix-4663a.firebaseapp.com",
    projectId: "fironix-4663a",
    storageBucket: "fironix-4663a.firebasestorage.app",
    messagingSenderId: "566798674165",
    appId: "1:566798674165:web:21b9462708581488293dbc",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
