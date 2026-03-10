const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const DB_FILE = "server/database.enc";
const ALGORITHM = "aes-256-cbc";

function getKey() {
    const raw = "fironix-default-secret-key-12345";
    return crypto.createHash("sha256").update(raw).digest();
}

try {
    const raw = fs.readFileSync(DB_FILE, "utf8").trim();
    const [ivHex, encrypted] = raw.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const decipher = crypto.createDecipheriv(ALGORITHM, getKey(), iv);
    const decrypted = decipher.update(encrypted, "hex", "utf8") + decipher.final("utf8");
    fs.writeFileSync("c:\\Users\\nahul\\Desktop\\fironix website\\fironix\\legacy_db.json", decrypted, "utf8");
    console.log("Decrypted to legacy_db.json");
} catch (e) {
    console.error("Failed to decrypt:", e.message);
}
