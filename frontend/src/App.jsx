import React, { useState } from 'react';
import Flashcard from './components/Flashcard';
import Sidebar from './components/Sidebar';
import DetailsModal from './components/DetailsModal';
import Loader from './components/Loader';
import { mockFlashcards, historyStack } from './utils/mockData';

function App() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState(historyStack);

  const currentCard = mockFlashcards[currentCardIndex];

  const handleNextCard = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentCardIndex((prev) => (prev + 1) % mockFlashcards.length);
      setIsLoading(false);
    }, 300);
  };

  const handlePrevCard = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentCardIndex((prev) => (prev - 1 + mockFlashcards.length) % mockFlashcards.length);
      setIsLoading(false);
    }, 300);
  };

  const handleShowDetails = (card) => {
    setSelectedCard(card);
    setShowDetailsModal(true);
  };

  const handleAnswerSubmit = (cardId, answer) => {
    const newHistoryItem = {
      id: history.length + 1,
      action: 'Reviewed',
      cardId,
      timestamp: new Date().toLocaleString(),
      correct: Math.random() > 0.5 // Mock validation
    };
    setHistory([newHistoryItem, ...history]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-purple-800 text-white">
      {/* Header */}
      <header className="border-b border-purple-700/30 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
                <span className="text-2xl">🤖</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-200 to-purple-100 bg-clip-text text-transparent">
                  AI Learning Flashcards
                </h1>
                <p className="text-sm text-purple-300">Powered by AI Agent • Interactive Learning Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-purple-300">Currently studying</p>
                <p className="font-semibold">AI Concepts & Machine Learning</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          history={history} 
          currentCard={currentCard}
        />

        {/* Main Content */}
        <main className="flex-1 p-8">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {/* Progress Indicator */}
              <div className="max-w-2xl mx-auto mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-purple-300">Card {currentCardIndex + 1} of {mockFlashcards.length}</span>
                  <span className="text-purple-300">{Math.round(((currentCardIndex + 1) / mockFlashcards.length) * 100)}% Complete</span>
                </div>
                <div className="h-2 bg-purple-800/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-500"
                    style={{ width: `${((currentCardIndex + 1) / mockFlashcards.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Flashcard */}
              <Flashcard 
                card={currentCard}
                onShowDetails={handleShowDetails}
                onAnswerSubmit={handleAnswerSubmit}
              />

              {/* Navigation */}
              <div className="flex justify-center gap-6 mt-12">
                <button
                  onClick={handlePrevCard}
                  className="px-8 py-3 bg-gradient-to-r from-purple-800/50 to-purple-900/30 hover:from-purple-700/50 hover:to-purple-800/30 text-purple-200 font-semibold rounded-xl transition-all border border-purple-700/30 hover:border-purple-600/50"
                >
                  ← Previous Card
                </button>
                <button
                  onClick={handleNextCard}
                  className="px-8 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl"
                >
                  Next Card →
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mt-12">
                <div className="text-center p-6 bg-gradient-to-br from-purple-800/30 to-purple-900/20 rounded-2xl border border-purple-700/30">
                  <div className="text-3xl font-bold text-white">{mockFlashcards.length}</div>
                  <div className="text-sm text-purple-300 mt-2">Total Cards</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-800/30 to-purple-900/20 rounded-2xl border border-purple-700/30">
                  <div className="text-3xl font-bold text-white">
                    {history.filter(h => h.correct === true).length}
                  </div>
                  <div className="text-sm text-purple-300 mt-2">Correct Answers</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-800/30 to-purple-900/20 rounded-2xl border border-purple-700/30">
                  <div className="text-3xl font-bold text-white">
                    {history.filter(h => h.action === 'Reviewed').length}
                  </div>
                  <div className="text-sm text-purple-300 mt-2">Reviews Today</div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>

      {/* Details Modal */}
      <DetailsModal
        card={selectedCard}
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
      />
    </div>
  );
}

export default App;
