// Central client for the Node/MongoDB backend (replaces the Supabase client).
const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const TOKEN_KEY = "vibely_token";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}
export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}
export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export async function api(path, { method = "GET", body, isForm = false } = {}) {
  const headers = {};
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const options = { method, headers };
  if (body !== undefined) {
    if (isForm) {
      options.body = body; // FormData — browser sets the multipart boundary
    } else {
      headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(body);
    }
  }

  const res = await fetch(`${BASE_URL}${path}`, options);

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const data = await res.json();
      message = data.error || message;
    } catch {
      /* ignore */
    }
    throw new Error(message);
  }

  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

// Uploads an image file and returns its public URL.
export async function uploadImage(file) {
  const form = new FormData();
  form.append("file", file);
  const { url } = await api("/upload", { method: "POST", body: form, isForm: true });
  return url;
}

export { BASE_URL };
