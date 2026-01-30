import React, { useState } from 'react';

const Flashcard = ({ card, onShowDetails, onAnswerSubmit }) => {
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
        className={`relative w-full h-96 cursor-pointer transition-all duration-500 ${isFlipped ? 'bg-gradient-to-br from-purple-900 to-purple-700' : 'bg-gradient-to-br from-purple-800 to-purple-600'} rounded-2xl shadow-2xl p-8`}
        onClick={handleFlip}
      >
        {/* Front Side */}
        <div className={`h-full flex flex-col justify-between ${isFlipped ? 'hidden' : 'block'}`}>
          <div className="flex justify-between items-start">
            <span className="px-3 py-1 bg-purple-500/30 rounded-full text-sm text-purple-100">
              {card.details?.difficulty || 'Intermediate'}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onShowDetails(card);
              }}
              className="p-2 hover:bg-purple-500/30 rounded-full transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
                <circle cx="5" cy="12" r="1" />
              </svg>
            </button>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-6">Question</h2>
            <p className="text-3xl font-semibold text-white leading-relaxed">
              {card.question}
            </p>
          </div>
          
          <div className="mt-6">
            <div className="flex items-center gap-2 text-purple-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
              <span className="text-sm">Click to flip and see answer</span>
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div className={`h-full flex flex-col justify-between ${isFlipped ? 'block' : 'hidden'}`}>
          <div className="flex justify-between items-start">
            <span className="px-3 py-1 bg-purple-400/30 rounded-full text-sm text-purple-100">
              Answer
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onShowDetails(card);
              }}
              className="p-2 hover:bg-purple-500/30 rounded-full transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
                <circle cx="5" cy="12" r="1" />
              </svg>
            </button>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-6">Answer</h2>
            <p className="text-2xl font-medium text-white leading-relaxed">
              {card.answer}
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-purple-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <span className="text-sm">Click to return to question</span>
          </div>
        </div>
      </div>

      {/* Answer Input & Validation */}
      <div className="mt-8 space-y-4">
        <div className="flex gap-4">
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Type your answer here..."
            className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-sm border border-purple-300/20 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={handleSubmitAnswer}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg"
          >
            Submit
          </button>
        </div>

        {showValidation && (
          <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-500/20 to-purple-600/20 backdrop-blur-sm rounded-xl border border-purple-400/30">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span className="text-green-300 font-medium">Answer submitted! Compare with actual answer above.</span>
            </div>
            <button
              onClick={() => setShowValidation(false)}
              className="ml-auto p-1 hover:bg-white/10 rounded"
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
