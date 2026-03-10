import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD0QLeTEIH9mLdfA_LqDIzc6f24yufHMKs",
    authDomain: "fironix-web.firebaseapp.com",
    projectId: "fironix-web",
    storageBucket: "fironix-web.firebasestorage.app",
    messagingSenderId: "132345861564",
    appId: "1:132345861564:web:551f2951073dfac86fc7b9",
};

const app = initializeApp(firebaseConfig);

async function test(dbId) {
    console.log(`Testing database: ${dbId}`);
    try {
        const db = dbId ? getFirestore(app, dbId) : getFirestore(app);
        await getDocs(collection(db, "test"));
        console.log(`SUCCESS: Database ${dbId} is reachable.`);
    } catch (e) {
        console.error(`FAILED: Database ${dbId} - ${e.message}`);
    }
}

async function main() {
    await test(); // tests implicit (default)
    await test("(default)");
    await test("default");
    process.exit(0);
}

main().catch(console.error);
