import { api, setToken, clearToken, getToken } from "./api";

export async function login({ email, password }) {
  const data = await api("/auth/login", {
    method: "POST",
    body: { email, password },
  });
  setToken(data.token);
  return data; // { token, user }
}

export async function signup({ email, password, user_name, user_avatar }) {
  const data = await api("/auth/signup", {
    method: "POST",
    body: { email, password, user_name, user_avatar },
  });
  setToken(data.token);
  return data; // { token, user }
}

export async function getCurrentUser() {
  if (!getToken()) return null;
  try {
    return await api("/auth/me"); // { ...user, role: "authenticated" }
  } catch {
    clearToken();
    return null;
  }
}

export async function logout() {
  try {
    await api("/auth/logout", { method: "POST" });
  } catch {
    /* ignore — token is cleared regardless */
  }
  clearToken();
}
