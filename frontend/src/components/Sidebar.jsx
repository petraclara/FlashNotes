import React, { useState, useEffect, useMemo } from "react";

const PAGE_SIZE = 5;

const Sidebar = ({
  history = [],
  currentCard,
  topics = [],
  newTopic,
  setNewTopic,
  onAddTopic,
  onRemoveTopic,
  onClose,
  cardCount,
  setCardCount,
  topicStats = {},
  onClearHistory // OPTIONAL
}) => {
  const [expandedId, setExpandedId] = useState(null);
  const [page, setPage] = useState(0);

  /* ---------------- HELPERS ---------------- */

  const getAccuracy = (topic) => {
    const stat = topicStats[topic];
    if (!stat || stat.attempts === 0) return "—";
    return Math.round((stat.correct / stat.attempts) * 100);
  };

  const getStatusColor = (correct) => {
    if (correct === true) return "text-green-400";
    if (correct === false) return "text-red-400";
    return "text-purple-300";
  };

  /* ---------------- SORT & PAGINATE ---------------- */

  const sortedHistory = useMemo(() => {
    return [...history].sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );
  }, [history]);

  const pagedHistory = useMemo(() => {
    return sortedHistory.slice(
      page * PAGE_SIZE,
      page * PAGE_SIZE + 3
    );
  }, [sortedHistory, page]);

  const totalPages = Math.max(
    1,
    Math.ceil(sortedHistory.length / PAGE_SIZE)
  );

  useEffect(() => {
    setPage(0);
  }, [history.length]);

  /* ---------------- UI ---------------- */

  return (
    <div className="w-full h-full bg-gradient-to-b from-purple-900/95 to-purple-800/95 border-r border-purple-700/30 overflow-y-auto">
      <div className="p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold text-white">Study Dashboard</h2>
          <button onClick={onClose} className="text-purple-300">✕</button>
        </div>

        {/* CARD COUNT */}
        <div className="mb-6">
          <label className="text-sm text-purple-300">Cards to generate</label>
          <select
            value={cardCount}
            onChange={(e) => setCardCount(Number(e.target.value))}
            className="w-full bg-purple-800/40 text-white rounded-lg p-2 mt-1"
          >
            {[1, 2, 3, 5, 8, 10].map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        {/* ADD TOPIC */}
        <div className="flex gap-2 mb-6">
          <input
            value={newTopic}
            onChange={(e) => setNewTopic(e.target.value)}
            placeholder="Add a topic..."
            className="flex-1 p-2 rounded bg-white/10 text-white"
            onKeyDown={(e) => e.key === "Enter" && onAddTopic()}
          />
          <button
            onClick={onAddTopic}
            className="px-4 bg-purple-600 rounded text-white"
          >
            +
          </button>
        </div>

        {/* TOPICS */}
        <div className="space-y-2 mb-8">
          {topics.map(topic => (
            <div
              key={topic}
              className="p-3 bg-purple-700/20 rounded flex justify-between"
            >
              <div>
                <div className="text-white">{topic}</div>
                <div className="text-xs text-purple-300">
                  Accuracy: {getAccuracy(topic)}%
                </div>
              </div>
              <button
                onClick={() => onRemoveTopic(topic)}
                className="text-purple-300"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* CURRENT CARD */}
        {currentCard && (
          <div className="mb-6 p-4 bg-purple-700/20 rounded">
            <div className="text-sm text-purple-300">Current Card</div>
            <div className="text-white">{currentCard.question}</div>
          </div>
        )}

        {/* HISTORY */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm text-purple-300">
            <span>Study History</span>
            <div className="flex gap-3">
              <span>{history.length}</span>
              {onClearHistory && (
                <button
                  onClick={onClearHistory}
                  className="text-red-400 hover:underline"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {pagedHistory.map(item => (
            <div key={item.id}>
              <div
                onClick={() =>
                  setExpandedId(expandedId === item.id ? null : item.id)
                }
                className="p-3 bg-purple-700/20 rounded cursor-pointer hover:bg-purple-700/30"
              >
                <div className="flex justify-between">
                  <span className="text-white">{item.action}</span>
                  <span className="text-purple-300 text-xs">View</span>
                </div>
                <div className="text-xs text-purple-300">
                  {item.timestamp}
                </div>
              </div>

              {expandedId === item.id && (
                <div className="mt-2 p-3 bg-purple-900/40 rounded text-sm">
                  <div className="text-white font-semibold mb-1">
                    {item.question || "—"}
                  </div>
                  <div className="text-purple-200 mb-2">
                    {item.answer || "—"}
                  </div>
                  <div className="text-xs text-purple-400">
                    Topic: {item.topic} • Result:{" "}
                    <span className={getStatusColor(item.correct)}>
                      {item.correct === true
                        ? "Correct"
                        : item.correct === false
                        ? "Incorrect"
                        : "Not answered"}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* PAGINATION */}
          <div className="flex justify-between items-center mt-4 text-sm">
            <button
              disabled={page === 0}
              onClick={() => setPage(p => p - 1)}
              className="text-purple-300 disabled:opacity-30"
            >
              ← Back
            </button>

            <span className="text-purple-400">
              Page {page + 1} / {totalPages}
            </span>

            <button
              disabled={page >= totalPages - 1}
              onClick={() => setPage(p => p + 1)}
              className="text-purple-300 disabled:opacity-30"
            >
              Next →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Sidebar;
