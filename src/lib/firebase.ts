import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD0QLeTEIH9mLdfA_LqDIzc6f24yufHMKs",
    authDomain: "fironix-web.firebaseapp.com",
    projectId: "fironix-web",
    storageBucket: "fironix-web.firebasestorage.app",
    messagingSenderId: "132345861564",
    appId: "1:132345861564:web:551f2951073dfac86fc7b9",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
