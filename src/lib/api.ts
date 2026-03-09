/**
 * Shared API utility for fetching data from the backend.
 * Uses /api by default and supports overriding via VITE_API_BASE_URL.
 */
const ENV_API_BASE = import.meta.env.VITE_API_BASE_URL?.trim();
export const API_BASE = ENV_API_BASE
    ? ENV_API_BASE.replace(/\/+$/, "")
    : "/api";

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
