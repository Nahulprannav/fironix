/**
 * index.cjs — Fironix Express API Server
 * 
 * Run with: node server/index.cjs
 * Or add to package.json: "server": "node server/index.cjs"
 * 
 * Endpoints:
 *   POST /api/login              — Admin login (returns JWT)
 *   GET  /api/data               — Public data (courses, services, etc.)
 *   POST /api/register           — Public registration submission
 *   GET  /api/admin/registrations — Admin-only: view all registrations
 *   PUT  /api/admin/content      — Admin-only: update any data collection
 *   POST /api/admin/content      — Admin-only: add an item to a collection
 *   DELETE /api/admin/content    — Admin-only: remove an item from collection
 */

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { readDb, writeDb } = require("./db.cjs");

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || "fironix-jwt-super-secret-2026";

// ------------------------------------
// Admin credentials (hashed password)
// Default: admin / fironix@admin2026
// To change, hash a new password with bcrypt and update below
// ------------------------------------
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
// bcrypt hash of "fironix@admin2026"
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH ||
    "$2a$12$F7CQvNzh9QKzFvl5.K4rquWJTIFNr14lqEPQxBsFqLb0BRl34L5c6";

// ------------------------------------
// Middleware
// ------------------------------------
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// ------------------------------------
// Auth Middleware
// ------------------------------------
function authenticate(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>
    if (!token) return res.status(401).json({ error: "Access denied. Login required." });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.admin = decoded;
        next();
    } catch {
        res.status(403).json({ error: "Invalid or expired token." });
    }
}

// ------------------------------------
// Public Routes
// ------------------------------------

/** Health check */
app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});

/** Admin Login */
app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password)
        return res.status(400).json({ error: "Username and password are required." });

    if (username !== ADMIN_USERNAME)
        return res.status(401).json({ error: "Invalid credentials." });

    const match = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    if (!match) return res.status(401).json({ error: "Invalid credentials." });

    const token = jwt.sign({ username, role: "admin" }, JWT_SECRET, { expiresIn: "8h" });
    res.json({ token, username, role: "admin" });
});

/** Public data — safe, non-sensitive collections */
app.get("/api/data", (req, res) => {
    const db = readDb();
    res.json({
        courses: db.courses,
        services: db.services,
        internships: db.internships,
        projects: db.projects,
        team: db.team,
    });
});

/** Public registration (course, workshop, internship) */
app.post("/api/register", (req, res) => {
    const { name, email, phone, type, selection } = req.body;
    if (!name || !email || !type || !selection)
        return res.status(400).json({ error: "Missing required fields." });

    const db = readDb();
    db.registrations = db.registrations || [];
    db.registrations.push({
        id: Date.now().toString(),
        name, email, phone,
        type, selection,
        timestamp: new Date().toISOString(),
        status: "pending",
    });
    writeDb(db);
    res.status(201).json({ message: "Registration submitted successfully!" });
});

// ------------------------------------
// Admin-only Routes (require JWT)
// ------------------------------------

/** View all registrations */
app.get("/api/admin/registrations", authenticate, (req, res) => {
    const db = readDb();
    res.json(db.registrations || []);
});

/** Get full database (admin only) */
app.get("/api/admin/db", authenticate, (req, res) => {
    res.json(readDb());
});

/** Add item to a collection */
app.post("/api/admin/content/:collection", authenticate, (req, res) => {
    const { collection } = req.params;
    const db = readDb();
    if (!Array.isArray(db[collection]))
        return res.status(400).json({ error: `Collection '${collection}' does not exist.` });

    const newItem = { id: Date.now().toString(), ...req.body };
    db[collection].push(newItem);
    writeDb(db);
    res.status(201).json(newItem);
});

/** Update item in a collection */
app.put("/api/admin/content/:collection/:id", authenticate, (req, res) => {
    const { collection, id } = req.params;
    const db = readDb();
    if (!Array.isArray(db[collection]))
        return res.status(400).json({ error: `Collection '${collection}' does not exist.` });

    const index = db[collection].findIndex((item) => item.id === id);
    if (index === -1)
        return res.status(404).json({ error: "Item not found." });

    db[collection][index] = { ...db[collection][index], ...req.body };
    writeDb(db);
    res.json(db[collection][index]);
});

/** Delete item from a collection */
app.delete("/api/admin/content/:collection/:id", authenticate, (req, res) => {
    const { collection, id } = req.params;
    const db = readDb();
    if (!Array.isArray(db[collection]))
        return res.status(400).json({ error: `Collection '${collection}' does not exist.` });

    const before = db[collection].length;
    db[collection] = db[collection].filter((item) => item.id !== id);
    if (db[collection].length === before)
        return res.status(404).json({ error: "Item not found." });

    writeDb(db);
    res.json({ message: "Deleted successfully." });
});

// ------------------------------------
// Start Server
// ------------------------------------
app.listen(PORT, () => {
    console.log(`\n🔥 Fironix API Server running at http://localhost:${PORT}`);
    console.log(`📦 Database: server/database.enc (AES-256-CBC encrypted)`);
    console.log(`🔐 Admin login: POST /api/login`);
    console.log(`   Default credentials: admin / fironix@admin2026\n`);
});
