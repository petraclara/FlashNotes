import React from 'react';

const Sidebar = ({ history, currentCard }) => {
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
    <div className="w-80 h-screen bg-gradient-to-b from-purple-900/30 to-purple-800/20 backdrop-blur-lg border-r border-purple-700/30 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3v18h18" />
              <path d="m19 9-5 5-4-4-3 3" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white">Study History</h2>
          <span className="ml-auto px-3 py-1 bg-purple-500/30 rounded-full text-sm text-purple-200">
            {history.length} items
          </span>
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
          <h3 className="text-sm font-semibold text-purple-300 mb-3">Recent Activity</h3>
          {history.map((item) => (
            <div
              key={item.id}
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
                    Card #{item.cardId} • {item.action.toLowerCase()} 
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
      </div>
    </div>
  );
};

export default Sidebar;
