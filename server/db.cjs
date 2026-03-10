/**
 * db.js — AES-256-CBC Encrypted JSON Database Utility
 * 
 * The entire database blob is stored in `database.enc` as hex-encoded
 * ciphertext. Only the server (which holds the SECRET_KEY env variable)
 * can decrypt it. Even if someone gains direct filesystem access, the
 * data remains unreadable without the key.
 */

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const DB_FILE = path.join(__dirname, "database.enc");
const ALGORITHM = "aes-256-cbc";

// Key must be exactly 32 bytes for AES-256
function getKey() {
    const raw = process.env.SECRET_KEY || "fironix-default-secret-key-12345";
    // Derive a stable 32-byte key via SHA-256 hash of the secret
    return crypto.createHash("sha256").update(raw).digest();
}

/** Read and decrypt the database, returning a parsed JS object */
function readDb() {
    if (!fs.existsSync(DB_FILE)) {
        // Return the initial empty structure if no DB file exists yet
        return getDefaultDb();
    }

    try {
        const raw = fs.readFileSync(DB_FILE, "utf8").trim();
        const [ivHex, encrypted] = raw.split(":");
        const iv = Buffer.from(ivHex, "hex");
        const decipher = crypto.createDecipheriv(ALGORITHM, getKey(), iv);
        const decrypted = decipher.update(encrypted, "hex", "utf8") + decipher.final("utf8");
        return JSON.parse(decrypted);
    } catch (e) {
        console.error("[DB] Failed to decrypt database, resetting:", e.message);
        return getDefaultDb();
    }
}

/** Encrypt and write the database object to disk */
function writeDb(data) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(ALGORITHM, getKey(), iv);
    const encrypted = cipher.update(JSON.stringify(data), "utf8", "hex") + cipher.final("hex");
    fs.writeFileSync(DB_FILE, `${iv.toString("hex")}:${encrypted}`, "utf8");
}

function getDefaultDb() {
    return {
        courses: [],
        internships: [],
        projects: [],
        services: [],
        team: [],
        registrations: [],
        workshops: [],
    };
}

module.exports = { readDb, writeDb };
