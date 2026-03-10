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

// ─── Read all documents from a collection ────────────────────────────────────
export async function getCollection(col: Collection): Promise<DocumentData[]> {
    const snap = await getDocs(
        query(collection(db, col), orderBy("_createdAt", "asc"))
    );
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
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
    return docRef.id;
}

// ─── Update a document ────────────────────────────────────────────────────────
export async function updateItem(
    col: Collection,
    id: string,
    data: Record<string, unknown>
): Promise<void> {
    await updateDoc(doc(db, col, id), { ...data, _updatedAt: serverTimestamp() });
}

// ─── Delete a document ────────────────────────────────────────────────────────
export async function deleteItem(col: Collection, id: string): Promise<void> {
    await deleteDoc(doc(db, col, id));
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
