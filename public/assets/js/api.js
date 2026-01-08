// public/assets/js/api.js
const API_BASE = "http://localhost:5050";

export const api = {
  get: async (url, token) => {
    const res = await fetch(`${API_BASE}${url}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
    const data = await res.json(); 
    return { ok: res.ok, data };
  },
  post: async (url, payload, token) => {
    const res = await fetch(`${API_BASE}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    return { ok: res.ok, data};
  }
};