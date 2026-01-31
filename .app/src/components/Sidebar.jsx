import React, { useState, useEffect, useMemo } from "react";

<<<<<<< HEAD:frontend/src/components/Sidebar.jsx
const PAGE_SIZE = 5;

const Sidebar = ({
  history = [],
  currentCard,
  topics = [],
=======


const Sidebar = ({ 
  history, 
  currentCard, 
  topics,
>>>>>>> 7baf56c466c288b5945623e487fc9c97e85fe6dd:.app/src/components/Sidebar.jsx
  newTopic,
  setNewTopic,
  memoryTopics,
  onAddTopic,
  onRemoveTopic,
<<<<<<< HEAD:frontend/src/components/Sidebar.jsx
  onClose,
  cardCount,
  setCardCount,
  topicStats = {},
  onClearHistory // OPTIONAL
=======
  onReviewClick,
  onClose 
>>>>>>> 7baf56c466c288b5945623e487fc9c97e85fe6dd:.app/src/components/Sidebar.jsx
}) => {
  const [expandedId, setExpandedId] = useState(null);
  const [page, setPage] = useState(0);

  /* ---------------- HELPERS ---------------- */

  const getAccuracy = (topic) => {
    const stat = topicStats[topic];
    if (!stat || stat.attempts === 0) return "—";
    return Math.round((stat.correct / stat.attempts) * 100);
  };

const handleTopicClick = (topic) => {
  setNewTopic(topic); // populate the input field
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

<<<<<<< HEAD:frontend/src/components/Sidebar.jsx
        {/* TOPICS */}
        <div className="space-y-2 mb-8">
          {topics.map(topic => (
            <div
              key={topic}
              className="p-3 bg-purple-700/20 rounded flex justify-between"
=======
        {/* Topics Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
            </svg>
            Study Topics
          </h3>
          
          {/* Add Topic Input */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newTopic}
              onChange={(e) => setNewTopic(e.target.value)}
              placeholder="Add a topic..."
              className="flex-1 px-4 py-2 bg-white/10 backdrop-blur-sm border border-purple-300/20 rounded-lg text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && onAddTopic()}
            />
            <button
              onClick={onAddTopic}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          </div>

          {/* Topics List */}
        {memoryTopics.map((topic, index) => (
  <div
    key={index}
    className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-700/20 to-purple-800/10 rounded-lg border border-purple-600/30 hover:border-purple-500/50 transition-colors group"
  >
    <div 
      className="flex items-center gap-3 cursor-pointer"
      onClick={() => handleTopicClick(topic)}
    >
      <div className="p-1.5 bg-gradient-to-br from-purple-500/30 to-purple-600/30 rounded-md">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      </div>
      <span className="text-white font-medium">{topic}</span>
    </div>
    <button
      onClick={(e) => {e.stopPropagation(); onRemoveTopic(topic)}}
      className="p-1 opacity-0 group-hover:opacity-100 hover:bg-purple-600/30 rounded transition-all"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  </div>
))}

        </div>

        {/* Current Card */}
        {currentCard && (
          <div className="mb-8 p-4 bg-gradient-to-r from-purple-600/30 to-purple-700/20 rounded-xl border border-purple-500/30">
            <h3 className="text-sm font-semibold text-purple-300 mb-2">Current Card</h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg">
                <span className="text-white font-bold">{currentCard.id}</span>
              </div>
              <div className="flex-1">
                <p className="text-white font-medium truncate">{currentCard.question}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-0.5 text-xs rounded-full ${currentCard.details?.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' : currentCard.details?.difficulty === 'Advanced' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                    {currentCard.details?.difficulty}
                  </span>
                  <span className="text-xs text-purple-300">{currentCard.details?.categories?.[0]}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* History Stack */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-purple-300">Recent Activity</h3>
            <span className="px-3 py-1 bg-purple-500/30 rounded-full text-sm text-purple-200">
              {history.length}
            </span>
          </div>
          {history.map((item) => (
            <div
              key={item.id}
              className="p-4 hover:bg-purple-700/20 rounded-xl transition-colors cursor-pointer group"
               onClick={() => onReviewClick(item)}
>>>>>>> 7baf56c466c288b5945623e487fc9c97e85fe6dd:.app/src/components/Sidebar.jsx
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
