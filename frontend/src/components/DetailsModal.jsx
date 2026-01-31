import React, { useState, useEffect } from "react";
import { clarifyQuestion } from "../api/flashNotesApi";

const DetailsModal = ({ card, isOpen, onClose }) => {
  //  HARD GUARD — prevents ALL crashes
  if (!isOpen || !card) return null;

  const [clarifyInput, setClarifyInput] = useState("");
  const [clarifyHistory, setClarifyHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  //  Load clarify history per-card
  useEffect(() => {
    const saved = localStorage.getItem(`clarify-${card.id}`);
    if (saved) {
      setClarifyHistory(JSON.parse(saved));
    } else {
      setClarifyHistory([]);
    }
  }, [card.id]);

  // Persist clarify history
  useEffect(() => {
    localStorage.setItem(
      `clarify-${card.id}`,
      JSON.stringify(clarifyHistory)
    );
  }, [clarifyHistory, card.id]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-gradient-to-br from-purple-900 to-purple-800 rounded-2xl shadow-2xl border border-purple-700/50 overflow-hidden">

        {/* Header */}
        <div className="p-6 border-b border-purple-700/50">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Card Details</h2>
            <button onClick={onClose} className="p-2 hover:bg-purple-700/50 rounded-full">
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">

          {/* Question */}
          <div className="bg-purple-800/40 p-4 rounded-xl">
            <h3 className="text-sm text-purple-300 mb-2">Question</h3>
            <p className="text-white text-lg">{card.question}</p>
          </div>

          {/* Answer */}
          <div className="bg-purple-800/40 p-4 rounded-xl">
            <h3 className="text-sm text-purple-300 mb-2">Answer</h3>
            <p className="text-white text-lg">{card.answer}</p>
          </div>

          {/* Examples */}
          {card.details?.examples?.length > 0 && (
            <div>
              <h3 className="text-white font-semibold mb-2">Examples</h3>
              {card.details.examples.map((ex, i) => (
                <div key={i} className="p-3 bg-purple-700/20 rounded-lg mb-2">
                  {ex}
                </div>
              ))}
            </div>
          )}

          {/* Clarification History */}
          {clarifyHistory.length > 0 && (
            <div>
              <h3 className="text-white font-semibold mb-2">Clarifications</h3>
              <div className="space-y-2">
                {clarifyHistory.map((item, i) => (
                  <div key={i} className="p-3 bg-purple-900/40 rounded-lg">
                    <p className="text-purple-300 text-sm">Q: {item.q}</p>
                    <p className="text-white mt-1">A: {item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-purple-700/50 flex gap-3">
          <input
            value={clarifyInput}
            onChange={(e) => setClarifyInput(e.target.value)}
            placeholder="Ask for clarification..."
            className="flex-1 p-3 rounded-xl bg-purple-900/50 text-white"
          />

          <button
            disabled={loading || !clarifyInput.trim()}
            onClick={async () => {
              setLoading(true);
              const res = await clarifyQuestion(card.topic, clarifyInput);
              setClarifyHistory(prev => [
                ...prev,
                { q: clarifyInput, a: res.clarification }
              ]);
              setClarifyInput("");
              setLoading(false);
            }}
            className="px-5 py-3 bg-purple-600 rounded-xl text-white disabled:opacity-50"
          >
            {loading ? "Thinking…" : "Clarify"}
          </button>

          <button
            onClick={onClose}
            className="px-5 py-3 bg-purple-700/40 rounded-xl text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;
