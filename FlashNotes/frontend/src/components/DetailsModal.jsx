import React from 'react';

const DetailsModal = ({ card, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-gradient-to-br from-purple-900 to-purple-800 rounded-2xl shadow-2xl border border-purple-700/50 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-purple-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <ellipse cx="12" cy="5" rx="9" ry="3" />
                  <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Card Details</h2>
                <p className="text-sm text-purple-300">Detailed explanation and examples</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-purple-700/50 rounded-full transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Question & Answer */}
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-purple-800/50 to-purple-900/30 p-4 rounded-xl">
              <h3 className="text-sm font-semibold text-purple-300 mb-2">Question</h3>
              <p className="text-lg text-white">{card.question}</p>
            </div>
            <div className="bg-gradient-to-r from-purple-800/50 to-purple-900/30 p-4 rounded-xl">
              <h3 className="text-sm font-semibold text-purple-300 mb-2">Answer</h3>
              <p className="text-lg text-white">{card.answer}</p>
            </div>
          </div>

          {/* Examples */}
          {card.details?.examples && card.details.examples.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                Real-world Examples
              </h3>
              <div className="grid gap-3">
                {card.details.examples.map((example, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gradient-to-r from-purple-700/20 to-purple-800/10 rounded-lg border border-purple-600/30">
                    <span className="px-2 py-1 bg-gradient-to-br from-purple-500 to-purple-600 text-xs font-bold text-white rounded">
                      {index + 1}
                    </span>
                    <p className="text-purple-100 flex-1">{example}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Metadata */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-purple-800/30 to-purple-900/20 p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                  <line x1="7" y1="7" x2="7.01" y2="7" />
                </svg>
                <h4 className="text-sm font-semibold text-purple-300">Categories</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {card.details?.categories?.map((cat, idx) => (
                  <span key={idx} className="px-3 py-1 bg-purple-600/30 text-purple-200 text-sm rounded-full">
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-800/30 to-purple-900/20 p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                  <polyline points="17 6 23 6 23 12" />
                </svg>
                <h4 className="text-sm font-semibold text-purple-300">Difficulty</h4>
              </div>
              <span className={`px-4 py-2 rounded-lg text-white font-medium ${
                card.details?.difficulty === 'Beginner' ? 'bg-green-500/30' :
                card.details?.difficulty === 'Intermediate' ? 'bg-yellow-500/30' :
                'bg-red-500/30'
              }`}>
                {card.details?.difficulty}
              </span>
            </div>

            <div className="bg-gradient-to-r from-purple-800/30 to-purple-900/20 p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <h4 className="text-sm font-semibold text-purple-300">Last Reviewed</h4>
              </div>
              <p className="text-white">{card.details?.lastReviewed}</p>
            </div>

            <div className="bg-gradient-to-r from-purple-800/30 to-purple-900/20 p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <ellipse cx="12" cy="5" rx="9" ry="3" />
                  <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                </svg>
                <h4 className="text-sm font-semibold text-purple-300">Source</h4>
              </div>
              <p className="text-purple-200">{card.details?.source}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-purple-700/50">
          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-6 py-2 text-purple-300 hover:text-white hover:bg-purple-700/30 rounded-xl transition-colors"
            >
              Close
            </button>
            <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all">
              Mark as Mastered
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;
