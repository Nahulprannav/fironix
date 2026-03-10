/**
 * firestore.ts
 * All database operations for the Fironix CMS, powered by Firebase Firestore.
 * Replaces the previous server/db.cjs encrypted JSON database.
 */

import {
    collection,
    doc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    orderBy,
    serverTimestamp,
    limit,
    DocumentData,
} from "firebase/firestore";
import { db } from "./firebase";

export type Collection =
    | "courses"
    | "internships"
    | "projects"
    | "services"
    | "team"
    | "workshops"
    | "registrations";

// ─── Simple In-Memory Cache to Limit Firestore Reads ───────────────────────────
const cache: Record<string, { data: DocumentData[]; timestamp: number }> = {};
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const clearCacheForCollection = (col: Collection) => {
    Object.keys(cache).forEach((key) => {
        if (key.startsWith(`${col}_limit_`) || key === col) {
            delete cache[key];
        }
    });
};

// ─── Read all documents from a collection ────────────────────────────────────
export async function getCollection(
    col: Collection,
    forceRefresh = false,
    limitCount?: number
): Promise<DocumentData[]> {
    const finalLimit = limitCount ? Math.min(limitCount, 100) : 100; // Max 100 documents per query to protect free quota
    const cacheKey = `${col}_limit_${finalLimit}`;

    const now = Date.now();
    // Use cached data if available and not expired (unless forced to refresh)
    if (!forceRefresh && cache[cacheKey] && now - cache[cacheKey].timestamp < CACHE_TTL) {
        console.log(`[Firestore] Returning cached data for: ${col} (limit: ${finalLimit})`);
        return cache[cacheKey].data;
    }

    console.log(`[Firestore] Fetching fresh data from Firebase for: ${col} (limit: ${finalLimit})`);
    const snap = await getDocs(
        query(collection(db, col), orderBy("_createdAt", "asc"), limit(finalLimit))
    );
    
    const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    
    // Update the cache
    cache[cacheKey] = { data, timestamp: now };
    return data;
}

// ─── Add a new document ───────────────────────────────────────────────────────
export async function addItem(
    col: Collection,
    data: Record<string, unknown>
): Promise<string> {
    const docRef = await addDoc(collection(db, col), {
        ...data,
        _createdAt: serverTimestamp(),
    });
    clearCacheForCollection(col); // Invalidate cache
    return docRef.id;
}

// ─── Update a document ────────────────────────────────────────────────────────
export async function updateItem(
    col: Collection,
    id: string,
    data: Record<string, unknown>
): Promise<void> {
    await updateDoc(doc(db, col, id), { ...data, _updatedAt: serverTimestamp() });
    clearCacheForCollection(col); // Invalidate cache
}

// ─── Delete a document ────────────────────────────────────────────────────────
export async function deleteItem(col: Collection, id: string): Promise<void> {
    console.log(`[Firestore] Deleting doc: ${col}/${id}`);
    try {
        await deleteDoc(doc(db, col, id));
        console.log(`[Firestore] Successfully deleted ${col}/${id}`);
        clearCacheForCollection(col); // Invalidate cache
    } catch (error) {
        console.error(`[Firestore] Error deleting ${col}/${id}:`, error);
        throw error;
    }
}

// ─── Get all public content in one call (mirrors old /api/data) ───────────────
export async function getPublicData() {
    const [courses, services, internships, projects, team, workshops] =
        await Promise.all([
            getCollection("courses"),
            getCollection("services"),
            getCollection("internships"),
            getCollection("projects"),
            getCollection("team"),
            getCollection("workshops"),
        ]);
    return { courses, services, internships, projects, team, workshops };
}

// ─── Submit a registration ────────────────────────────────────────────────────
export async function submitRegistration(data: {
    name: string;
    email: string;
    phone?: string;
    type: string;
    selection: string;
}): Promise<void> {
    await addDoc(collection(db, "registrations"), {
        ...data,
        status: "pending",
        _createdAt: serverTimestamp(),
    });
}
