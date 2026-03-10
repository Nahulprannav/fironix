import fs from "fs";

const PROJECT_ID = "fironix-web";
const DB_PATH = "c:\\Users\\nahul\\Desktop\\fironix website\\fironix\\legacy_db.json";

async function migrate() {
    const rawData = fs.readFileSync(DB_PATH, "utf8").trim();
    const jsonStr = rawData.substring(rawData.indexOf('{'));
    const data = JSON.parse(jsonStr);

    for (const [col, items] of Object.entries(data)) {
        console.log(`Migrating ${col}...`);
        if (!Array.isArray(items)) continue;
        for (const item of items) {
            const { id, ...rest } = item;
            const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${col}`;
            
            // Map JSON to Firestore REST format
            const fields = {};
            for (const [key, value] of Object.entries(rest)) {
                if (typeof value === "string") fields[key] = { stringValue: value };
                else if (typeof value === "number") fields[key] = { doubleValue: value };
                else if (typeof value === "boolean") fields[key] = { booleanValue: value };
            }

            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fields })
            });

            if (!response.ok) {
                const err = await response.text();
                console.error(`Failed to migrate item to ${col}: ${response.status} ${err}`);
                // If it's a 403, it's rules. If it's 404, it's the project ID.
            } else {
                console.log(`Successfully migrated item to ${col}`);
            }
        }
    }
}

migrate().catch(console.error);
