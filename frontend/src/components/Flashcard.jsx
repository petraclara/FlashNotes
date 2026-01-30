import React, { useState } from 'react';

const Flashcard = ({ card, onShowDetails, onAnswerSubmit }) => {
  if (!card) return null;
  const [isFlipped, setIsFlipped] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [showValidation, setShowValidation] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setShowValidation(false);
  };

  const handleSubmitAnswer = () => {
    if (userAnswer.trim()) {
      onAnswerSubmit(card.id, userAnswer);
      setUserAnswer('');
      setShowValidation(true);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Card Container */}
      <div 
        className={`relative w-full h-64 md:h-96 cursor-pointer transition-all duration-500 ${isFlipped ? 'bg-gradient-to-br from-purple-900 to-purple-700' : 'bg-gradient-to-br from-purple-800 to-purple-600'} rounded-2xl shadow-2xl p-4 md:p-8`}
        onClick={handleFlip}
      >
        {/* Front Side */}
        <div className={`h-full flex flex-col justify-between ${isFlipped ? 'hidden' : 'block'}`}>
          <div className="flex justify-between items-start">
            <span className="px-2 py-1 md:px-3 md:py-1 bg-purple-500/30 rounded-full text-xs md:text-sm text-purple-100">
              {card.details?.difficulty || "Standard"}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onShowDetails(card);
              }}
              className="p-1 md:p-2 hover:bg-purple-500/30 rounded-full transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-purple-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
                <circle cx="5" cy="12" r="1" />
              </svg>
            </button>
          </div>
          
          <div className="text-center py-4 md:py-0">
            <h2 className="text-lg md:text-2xl font-bold text-white mb-3 md:mb-6">Question</h2>
            <p className="text-xl md:text-3xl font-semibold text-white leading-relaxed line-clamp-3 md:line-clamp-none">
              {card.question}
            </p>
          </div>
          
          <div className="mt-4 md:mt-6">
            <div className="flex items-center justify-center gap-2 text-purple-200 text-xs md:text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
              <span>Tap to flip and see answer</span>
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div className={`h-full flex flex-col justify-between ${isFlipped ? 'block' : 'hidden'}`}>
          <div className="flex justify-between items-start">
            <span className="px-2 py-1 md:px-3 md:py-1 bg-purple-400/30 rounded-full text-xs md:text-sm text-purple-100">
              Answer
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onShowDetails(card);
              }}
              className="p-1 md:p-2 hover:bg-purple-500/30 rounded-full transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-purple-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
                <circle cx="5" cy="12" r="1" />
              </svg>
            </button>
          </div>
          
          <div className="text-center py-4 md:py-0">
            <h2 className="text-lg md:text-2xl font-bold text-white mb-3 md:mb-6">Answer</h2>
            <p className="text-lg md:text-2xl font-medium text-white leading-relaxed line-clamp-3 md:line-clamp-none">
              {card.answer}
            </p>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-purple-200 text-xs md:text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <span>Tap to return to question</span>
          </div>
        </div>
      </div>

      {/* Answer Input & Validation */}
      <div className="mt-6 md:mt-8 space-y-3 md:space-y-4">
        <div className="flex flex-col md:flex-row gap-3 md:gap-4">
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Type your answer here..."
            className="flex-1 px-4 md:px-6 py-3 md:py-4 bg-white/10 backdrop-blur-sm border border-purple-300/20 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-sm md:text-base"
            onClick={(e) => e.stopPropagation()}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmitAnswer()}
          />
          <button
            onClick={handleSubmitAnswer}
            className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg text-sm md:text-base"
          >
            Submit Answer
          </button>
        </div>

        {showValidation && (
          <div className="flex items-center gap-3 p-3 md:p-4 bg-gradient-to-r from-purple-500/20 to-purple-600/20 backdrop-blur-sm rounded-xl border border-purple-400/30 animate-pulse">
            <div className="flex items-center gap-2 flex-1">
              <div className="p-1.5 md:p-2 bg-green-500/20 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span className="text-green-300 font-medium text-sm md:text-base">Answer submitted! Compare with actual answer above.</span>
            </div>
            <button
              onClick={() => setShowValidation(false)}
              className="p-1 hover:bg-white/10 rounded"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Flashcard;
