import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp, getDocs } from "firebase/firestore";
import fs from "fs";

const firebaseConfig = {
    apiKey: "AIzaSyD0QLeTEIH9mLdfA_LqDIzc6f24yufHMKs",
    authDomain: "fironix-web.firebaseapp.com",
    projectId: "fironix-4663a", // Test other project
    storageBucket: "fironix-web.firebasestorage.app",
    messagingSenderId: "132345861564",
    appId: "1:132345861564:web:551f2951073dfac86fc7b9",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const DB_PATH = "c:\\Users\\nahul\\Desktop\\fironix website\\fironix\\legacy_db.json";

async function migrate() {
    console.log("Testing reachability to fironix-4663a (default)...");
    try {
        await getDocs(collection(db, "test"));
        console.log("SUCCESS: fironix-4663a is reachable!");
        
        const rawData = fs.readFileSync(DB_PATH, "utf8").trim();
        const jsonStr = rawData.substring(rawData.indexOf('{'));
        const data = JSON.parse(jsonStr);

        for (const [col, items] of Object.entries(data)) {
            console.log(`Migrating ${col}...`);
            if (!Array.isArray(items)) continue;
            for (const item of items) {
                const { id, ...rest } = item;
                await addDoc(collection(db, col), {
                    ...rest,
                    _createdAt: serverTimestamp(),
                });
            }
        }
        console.log("Migration complete!");
    } catch (e) {
        console.error(`FAILED: ${e.message}`);
    }
}

migrate().catch(console.error);
