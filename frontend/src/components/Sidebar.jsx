import React from 'react';

const [expandedId, setExpandedId] = React.useState(null);

const Sidebar = ({ 
  history, 
  currentCard, 
  topics,
  newTopic,
  setNewTopic,
  onAddTopic,
  onRemoveTopic,
  onClose 
}) => {
  const getIcon = (action) => {
    switch (action) {
      case 'Reviewed': return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      );
      case 'Added': return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      );
      case 'Edited': return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      );
      default: return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3v18h18" />
          <path d="m19 9-5 5-4-4-3 3" />
        </svg>
      );
    }
  };

  const getAccuracy = (topic) => {
  const stat = topicStats?.[topic];
  if (!stat || stat.attempts === 0) return null;
  return Math.round((stat.correct / stat.attempts) * 100);
};


  const getStatusColor = (correct) => {
    if (correct === true) return 'text-green-400';
    if (correct === false) return 'text-red-400';
    return 'text-purple-300';
  };

  const getStatusIcon = (correct) => {
    if (correct === true) return (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    );
    if (correct === false) return (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    );
    return null;
  };

  return (
    <div className="w-full h-full bg-gradient-to-b from-purple-900/95 to-purple-800/95 backdrop-blur-xl border-r border-purple-700/30 overflow-y-auto">
      <div className="p-4 md:p-6">
        {/* Header with close button for mobile */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3v18h18" />
                <path d="m19 9-5 5-4-4-3 3" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white">Study Dashboard</h2>
          </div>
          <button
            onClick={onClose}
            className="md:hidden p-2 hover:bg-purple-500/30 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Topics Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
            </svg>
            Study Topics
          </h3>

          <div className="mb-4">
  <label className="text-sm text-purple-300 block mb-1">
    Number of cards
  </label>
  <select
    value={cardCount}
    onChange={(e) => setCardCount(Number(e.target.value))}
    className="w-full bg-purple-800/40 text-white rounded-lg p-2"
  >
    {[1,2,3,5,8,10].map(n => (
      <option key={n} value={n}>{n}</option>
    ))}
  </select>
</div>

          
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
            ><span className="text-white font-medium">{topic}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          </div>

          {/* Topics List */}
          <div className="space-y-2">
            {topics.map((topic, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-700/20 to-purple-800/10 rounded-lg border border-purple-600/30 hover:border-purple-500/50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-gradient-to-br from-purple-500/30 to-purple-600/30 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <div>
  <span className="text-white font-medium">{topic}</span>
  {getAccuracy(topic) !== null && (
    <div className="text-xs text-purple-300">
      Accuracy: {getAccuracy(topic)}%
    </div>
  )}
</div>

                </div>
                <button
                  onClick={() => onRemoveTopic(topic)}
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
  onClick={() =>
    setExpandedId(expandedId === item.id ? null : item.id)
  }
  className="p-4 hover:bg-purple-700/20 rounded-xl transition-colors cursor-pointer group"
>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-600/30 rounded-lg group-hover:bg-purple-500/40 transition-colors">
                  {getIcon(item.action)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">{item.action}</span>
                    <span className={`flex items-center gap-1 ${getStatusColor(item.correct)}`}>
                      {getStatusIcon(item.correct)}
                      <span className="text-xs">{item.timestamp}</span>
                    </span>
                  </div>
                  <p className="text-sm text-purple-200 truncate mt-1">
                    Card #{item.cardId} • {(item.action || "").toLowerCase()
} 
                    {item.correct !== null && (
                      <span className={`ml-2 ${item.correct ? 'text-green-400' : 'text-red-400'}`}>
                        {item.correct ? 'Correct' : 'Incorrect'}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Summary */}
        <div className="mt-8 pt-6 border-t border-purple-700/30">
          <h3 className="text-sm font-semibold text-purple-300 mb-3">Today's Summary</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-gradient-to-r from-purple-700/20 to-purple-800/10 rounded-lg">
              <div className="text-lg font-bold text-white">
                {history.filter(h => h.correct === true).length}
              </div>
              <div className="text-xs text-purple-300">Correct</div>
            </div>
            <div className="p-3 bg-gradient-to-r from-purple-700/20 to-purple-800/10 rounded-lg">
              <div className="text-lg font-bold text-white">
                {history.filter(h => h.correct === false).length}
              </div>
              <div className="text-xs text-purple-300">Incorrect</div>
            </div>
          </div>
        </div>
        {expandedId === item.id && (
  <div className="mt-3 text-sm text-purple-200 bg-purple-900/40 p-3 rounded-lg">
    <p className="font-semibold text-white mb-1">
      {item.question}
    </p>
    <p className="italic">{item.answer}</p>
    <p className="mt-2 text-xs text-purple-400">
      Topic: {item.topic} • Accuracy: {getAccuracy(item.topic) ?? "—"}%
    </p>
  </div>
)}


      </div>
    </div>
  );
};

export default Sidebar;
