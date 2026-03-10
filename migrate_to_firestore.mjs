import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import fs from "fs";

const firebaseConfig = {
    apiKey: "AIzaSyD0QLeTEIH9mLdfA_LqDIzc6f24yufHMKs",
    authDomain: "fironix-web.firebaseapp.com",
    projectId: "fironix-web",
    storageBucket: "fironix-web.firebasestorage.app",
    messagingSenderId: "132345861564",
    appId: "1:132345861564:web:551f2951073dfac86fc7b9",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, "default");

const DB_PATH = "c:\\Users\\nahul\\Desktop\\fironix website\\fironix\\legacy_db.json";

async function migrate() {
    console.log("Reading data from:", DB_PATH);
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
            console.log(`Added to ${col}`);
        }
    }
    console.log("Migration complete!");
    process.exit(0);
}

migrate().catch(e => {
    console.error(e);
    process.exit(1);
});
