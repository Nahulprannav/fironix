/**
 * Shared API utility for fetching data from the backend.
 * Uses the /api prefix which is proxied via vite.config.ts in development.
 */

export const API_BASE = "/api";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    });

    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.error || "Request failed");
    }
    return data;
}

export const api = {
    get: <T>(path: string, token?: string) =>
        request<T>(path, {
            headers: token ? { Authorization: `Bearer ${token}` } : {}
        }),

    post: <T>(path: string, body: any, token?: string) =>
        request<T>(path, {
            method: "POST",
            body: JSON.stringify(body),
            headers: token ? { Authorization: `Bearer ${token}` } : {}
        }),

    put: <T>(path: string, body: any, token?: string) =>
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
