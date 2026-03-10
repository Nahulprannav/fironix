/**
 * Shared API utility for fetching data from the backend.
 * Uses /api by default and supports overriding via VITE_API_BASE_URL.
 */
const ENV_API_BASE = import.meta.env.VITE_API_BASE_URL?.trim();
const VITE_API_URL = import.meta.env.VITE_API_URL?.trim();

export const API_BASE = VITE_API_URL || ENV_API_BASE || "/api";

const IS_LOCAL_DEV_HOST = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");
const LOCAL_FALLBACK_ENABLED = !ENV_API_BASE && !IS_LOCAL_DEV_HOST;
const LOCAL_DB_KEY = "fironix_local_db_v1";
const LOCAL_TOKEN = "fironix-local-admin-token";
const LOCAL_ADMIN_USERNAME = "admin";
const LOCAL_ADMIN_PASSWORD = "fironix@admin2026";

type LocalCollection = "courses" | "internships" | "projects" | "services" | "team";
type LocalItem = Record<string, unknown>;
type LocalDb = {
    courses: LocalItem[];
    internships: LocalItem[];
    projects: LocalItem[];
    services: LocalItem[];
    team: LocalItem[];
    registrations: LocalItem[];
};

const LOCAL_COLLECTIONS: LocalCollection[] = ["courses", "internships", "projects", "services", "team"];

function getDefaultLocalDb(): LocalDb {
    return {
        courses: [],
        internships: [],
        projects: [],
        services: [],
        team: [],
        registrations: [],
    };
}

function isCollection(value: string): value is LocalCollection {
    return (LOCAL_COLLECTIONS as string[]).includes(value);
}

function readLocalDb(): LocalDb {
    if (typeof window === "undefined") return getDefaultLocalDb();

    try {
        const raw = window.localStorage.getItem(LOCAL_DB_KEY);
        if (!raw) return getDefaultLocalDb();

        const parsed = JSON.parse(raw) as Partial<LocalDb>;
        return {
            courses: Array.isArray(parsed.courses) ? parsed.courses : [],
            internships: Array.isArray(parsed.internships) ? parsed.internships : [],
            projects: Array.isArray(parsed.projects) ? parsed.projects : [],
            services: Array.isArray(parsed.services) ? parsed.services : [],
            team: Array.isArray(parsed.team) ? parsed.team : [],
            registrations: Array.isArray(parsed.registrations) ? parsed.registrations : [],
        };
    } catch {
        return getDefaultLocalDb();
    }
}

function writeLocalDb(db: LocalDb) {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(LOCAL_DB_KEY, JSON.stringify(db));
}

function parseBody(body: BodyInit | null | undefined): Record<string, unknown> {
    if (typeof body !== "string") return {};

    try {
        const parsed = JSON.parse(body);
        if (parsed && typeof parsed === "object") {
            return parsed as Record<string, unknown>;
        }
        return {};
    } catch {
        return {};
    }
}

function requireLocalAuth(options: RequestInit) {
    const auth = new Headers(options.headers).get("Authorization") || "";
    if (auth !== `Bearer ${LOCAL_TOKEN}`) {
        throw new Error("Access denied. Login required.");
    }
}

function localApiRequest<T>(path: string, options: RequestInit): T {
    const method = (options.method || "GET").toUpperCase();
    const db = readLocalDb();

    if (path === "/login" && method === "POST") {
        const body = parseBody(options.body);
        const username = String(body.username || "").trim();
        const password = String(body.password || "").trim();

        if (username !== LOCAL_ADMIN_USERNAME || password !== LOCAL_ADMIN_PASSWORD) {
            throw new Error("Invalid credentials.");
        }

        return {
            token: LOCAL_TOKEN,
            username: LOCAL_ADMIN_USERNAME,
            role: "admin",
        } as T;
    }

    if (path === "/data" && method === "GET") {
        return {
            courses: db.courses,
            services: db.services,
            internships: db.internships,
            projects: db.projects,
            team: db.team,
        } as T;
    }

    if (path === "/register" && method === "POST") {
        const body = parseBody(options.body);
        const name = String(body.name || "").trim();
        const email = String(body.email || "").trim();
        const type = String(body.type || "").trim();
        const selection = String(body.selection || "").trim();

        if (!name || !email || !type || !selection) {
            throw new Error("Missing required fields.");
        }

        db.registrations.push({
            id: Date.now().toString(),
            name,
            email,
            phone: String(body.phone || "").trim(),
            type,
            selection,
            timestamp: new Date().toISOString(),
            status: "pending",
        });
        writeLocalDb(db);
        return { message: "Registration submitted successfully!" } as T;
    }

    if (path === "/admin/db" && method === "GET") {
        requireLocalAuth(options);
        return db as T;
    }

    if (path === "/admin/registrations" && method === "GET") {
        requireLocalAuth(options);
        return db.registrations as T;
    }

    const contentRoute = path.match(/^\/admin\/content\/([^/]+)(?:\/([^/]+))?$/);
    if (contentRoute) {
        requireLocalAuth(options);

        const collectionName = contentRoute[1];
        const itemId = contentRoute[2];

        if (!isCollection(collectionName)) {
            throw new Error(`Collection '${collectionName}' does not exist.`);
        }

        if (method === "POST" && !itemId) {
            const body = parseBody(options.body);
            const newItem: LocalItem = { id: Date.now().toString(), ...body };
            db[collectionName].push(newItem);
            writeLocalDb(db);
            return newItem as T;
        }

        if (method === "PUT" && itemId) {
            const body = parseBody(options.body);
            const index = db[collectionName].findIndex(item => String(item.id) === String(itemId));
            if (index === -1) throw new Error("Item not found.");

            const updated = { ...db[collectionName][index], ...body };
            db[collectionName][index] = updated;
            writeLocalDb(db);
            return updated as T;
        }

        if (method === "DELETE" && itemId) {
            const before = db[collectionName].length;
            db[collectionName] = db[collectionName].filter(item => String(item.id) !== String(itemId));
            if (db[collectionName].length === before) throw new Error("Item not found.");

            writeLocalDb(db);
            return { message: "Deleted successfully." } as T;
        }
    }

    throw new Error("Request failed (404)");
}

function shouldUseLocalFallback(error: unknown): boolean {
    if (!LOCAL_FALLBACK_ENABLED || typeof window === "undefined") return false;
    if (!(error instanceof Error)) return false;

    const message = error.message.toLowerCase();
    return (
        message.includes("returned html") ||
        message.includes("failed to fetch") ||
        message.includes("networkerror") ||
        message.includes("failed to parse url")
    );
}

async function parseJsonBody(res: Response, path: string) {
    const raw = await res.text();
    if (!raw) return null;

    try {
        return JSON.parse(raw);
    } catch {
        const sample = raw.trim().slice(0, 120).toLowerCase();
        if (sample.startsWith("<!doctype html") || sample.startsWith("<html")) {
            throw new Error(
                `API returned HTML for ${path}. Check backend routing and ensure the API server is running.`
            );
        }

        throw new Error(`API returned invalid JSON for ${path}.`);
    }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
    try {
        const res = await fetch(`${API_BASE}${path}`, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
        });

        const data = await parseJsonBody(res, path);

        if (!res.ok) {
            throw new Error(data?.error || `Request failed (${res.status})`);
        }

        return data as T;
    } catch (error) {
        if (shouldUseLocalFallback(error)) {
            return localApiRequest<T>(path, options);
        }
        throw error;
    }
}

export const api = {
    get: <T>(path: string, token?: string) =>
        request<T>(path, {
            headers: token ? { Authorization: `Bearer ${token}` } : {}
        }),

    post: <T>(path: string, body: unknown, token?: string) =>
        request<T>(path, {
            method: "POST",
            body: JSON.stringify(body),
            headers: token ? { Authorization: `Bearer ${token}` } : {}
        }),

    put: <T>(path: string, body: unknown, token?: string) =>
        request<T>(path, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: token ? { Authorization: `Bearer ${token}` } : {}
        }),

    del: <T>(path: string, token?: string) =>
        request<T>(path, {
            method: "DELETE",
            headers: token ? { Authorization: `Bearer ${token}` } : {}
        }),
};
