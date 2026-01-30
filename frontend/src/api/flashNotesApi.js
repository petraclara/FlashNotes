import { API_BASE_URL } from "../config/api";

export async function generateFlashcards(topic, level) {
  const res = await fetch(`${API_BASE_URL}/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic, level }),
  });

  if (!res.ok) throw new Error("Failed to generate cards");
  return res.json();
}

export async function clarifyQuestion(topic, question) {
  const res = await fetch(`${API_BASE_URL}/clarify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic, question }),
  });

  if (!res.ok) throw new Error("Failed to clarify");
  return res.json();
}

export async function fetchHistory() {
  const res = await fetch(`${API_BASE_URL}/history`);
  if (!res.ok) throw new Error("Failed to fetch history");
  return res.json();
}
