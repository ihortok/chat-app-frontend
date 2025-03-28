const API_BASE = "http://localhost:4567";

export async function createUser(username, email) {
  const res = await fetch(`${API_BASE}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email }),
  });
  return await res.json();
}

export async function sendMessage(user_id, content) {
  const res = await fetch(`${API_BASE}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id, content }),
  });
  return await res.json();
}

export async function fetchMessages() {
  const res = await fetch(`${API_BASE}/messages`);
  return await res.json();
}
