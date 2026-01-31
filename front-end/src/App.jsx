import React, { useState,useEffect } from 'react';
import Flashcard from './components/Flashcard';
import Sidebar from './components/Sidebar';
import DetailsModal from './components/DetailsModal';
import Loader from './components/Loader';
import questionData from '../scripts/questions.json'
import {historyStack} from './utils/mockData'
import FlashcardsList from './components/FlashcardsList';


function App() {
  const [activeTopic, setActiveTopic] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [topics, setTopics] = useState(["AI Concepts", "Machine Learning", "Neural Networks", "Reinforcement Learning"]);
  const [newTopic, setNewTopic] = useState("");
  const [memoryTopics, setMemoryTopics] = useState([]);

 const [cards, setCards] = useState(questionData.questions);

const currentCard = cards[currentCardIndex];


  useEffect(() => {
    const storedMemory = JSON.parse(localStorage.getItem('flashcardMemory') || '{}');
    const savedTopics = Object.keys(storedMemory);
    if (savedTopics.length > 0) {
      setMemoryTopics(savedTopics);
      setTopics(savedTopics); // initialize topics from storage
    }
  }, []);

  const handleNextCard = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentCardIndex((prev) => (prev + 1) % cards.length);
      setIsLoading(false);
    }, 300);
  };

  const handlePrevCard = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentCardIndex((prev) => (prev - 1 + cards.length) % cards.length);
      setIsLoading(false);
    }, 300);
  };

  const handleShowDetails = (card) => {
    setSelectedCard(card);
    setShowDetailsModal(true);
  };

 const normalize = (str) =>
  str.toLowerCase().trim().replace(/\s+/g, ' ');
 
 const handleAnswerSubmit = (cardId, answer, correct) => {
  const newHistoryItem = {
    id: crypto.randomUUID(),
    action: 'Reviewed',
    cardId,
    topic: activeTopic,
    timestamp: new Date().toLocaleTimeString(),
    correct
  };
  console.log('Answer correctness:', correct);

  setHistory(prev => [newHistoryItem, ...prev]);
};


 const handleReviewClick = (review) => {
  const memory = JSON.parse(localStorage.getItem('flashcardMemory') || '{}');

  if (review.topic && memory[review.topic]) {
    setCards(memory[review.topic]);
    setActiveTopic(review.topic);
    setNewTopic(review.topic);

    const index = memory[review.topic].findIndex(
      card => card.id === review.cardId
    );

    if (index !== -1) {
      setCurrentCardIndex(index);
    }
  }

  setShowSidebar(false);
};



const handleAddTopic = async () => {
  if (!newTopic.trim()) return;

  setIsLoading(true);
  setActiveTopic(newTopic);

  try {
    const res = await fetch('https://flashnotes-0d1x.onrender.com/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: `Generate flashcard questions about ${newTopic}` })
    });

    const data = await res.json();
    const parsed = JSON.parse(data.output);

    const newCards = parsed.questions.map((q, idx) => ({
      id: cards.length + idx + 1,
      question: q.question,
      answer: q.answer || 'No answer provided',
      details: {
        examples: q.details?.examples || [],
        difficulty: q.details?.difficulty || 'Intermediate',
        categories: q.details?.categories || [],
        source: q.details?.source || 'Unknown',
        lastReviewed: q.details?.lastReviewed || new Date().toLocaleDateString(),
      }
    }));

    const storedMemory = JSON.parse(localStorage.getItem('flashcardMemory') || '{}');
    storedMemory[newTopic] = newCards;
    localStorage.setItem('flashcardMemory', JSON.stringify(storedMemory));

    setCards(newCards);
    setCurrentCardIndex(0);
    setActiveTopic(newTopic);
    setNewTopic('');
    
    setTopics(prev => [...new Set([...prev, newTopic])]);
    setMemoryTopics(prev => [...new Set([...prev, newTopic])]);

  } catch (err) {
    console.error('AI generation failed', err);
  } finally {
    setIsLoading(false);
  }
};


  const handleRemoveTopic = (topicToRemove) => {
  const memory = JSON.parse(localStorage.getItem('flashcardMemory') || '{}');
  delete memory[topicToRemove];
  localStorage.setItem('flashcardMemory', JSON.stringify(memory));

  setTopics(prev => prev.filter(t => t !== topicToRemove));
  setMemoryTopics(prev => prev.filter(t => t !== topicToRemove));

  if (activeTopic === topicToRemove) {
    setActiveTopic(null);
    setCards([]);
    setCurrentCardIndex(0);
    setNewTopic('');
  }
};


const handleTopicClick = (topic) => {
  const memory = JSON.parse(localStorage.getItem('flashcardMemory') || '{}');
  if (memory[topic]) {
    setCards(memory[topic]);
    setCurrentCardIndex(0);
    setActiveTopic(topic);
    setNewTopic(topic);
  } else {
    alert("No saved cards for this topic. Try generating first!");
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-purple-800 text-white">
      {/* Header with mobile menu button */}
      <header className="border-b border-purple-700/30 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="md:hidden p-2 hover:bg-purple-500/30 rounded-lg transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
                  <span className="text-2xl">🤖</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-200 to-purple-100 bg-clip-text text-transparent">
                    PurpleHeyz
                  </h1>
                  <p className="text-sm text-purple-300">Powered by openrouter • Interactive Learning Platform</p>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-purple-300">Currently studying</p>
                <p className="font-semibold">{topics[topics.length - 1]}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Hidden on mobile by default */}
        <div className={`
          ${showSidebar ? 'fixed inset-0 z-40 md:relative md:z-0' : 'hidden md:block'} 
          md:w-80
        `}>
          {showSidebar && (
            <div 
              className="fixed inset-0 bg-black/50 md:hidden"
              onClick={() => setShowSidebar(false)}
            />
          )}
          <div className={`
            fixed left-0 top-0 h-full w-80 transform transition-transform duration-300 ease-in-out
            md:relative md:translate-x-0 md:transition-none
            ${showSidebar ? 'translate-x-0' : '-translate-x-full'}
          `}>
            <Sidebar 
              history={history} 
              currentCard={currentCard}
              topics={topics}
              newTopic={newTopic}
              setNewTopic={setNewTopic}
              onReviewClick={handleReviewClick}
              onAddTopic={handleAddTopic}
              memoryTopics = {memoryTopics}
              onRemoveTopic={handleRemoveTopic}
                handleTopicClick={handleTopicClick}
  onClose={() => setShowSidebar(false)}
            />
          </div>
        </div>


        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {/* Mobile header info */}
              <div className="md:hidden mb-6 p-4 bg-gradient-to-r from-purple-800/30 to-purple-900/20 rounded-2xl border border-purple-700/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-300">Currently studying</p>
                    <p className="font-semibold">{topics[topics.length-1]}</p>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full"></div>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="max-w-2xl mx-auto mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-purple-300">Card {currentCardIndex + 1} of {cards.length}</span>
                  <span className="text-purple-300">{Math.round(((currentCardIndex + 1) / cards.length) * 100)}% Complete</span>
                </div>
                <div className="h-2 bg-purple-800/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-500"
                    style={{ width: `${((currentCardIndex + 1) / cards.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Flashcard */}
              <Flashcard 
                key={`${activeTopic}-${currentCard}`}
                card={currentCard}
                onShowDetails={handleShowDetails}
                onAnswerSubmit={handleAnswerSubmit}
              />

              {/* Navigation */}
              <div className="flex justify-center gap-4 md:gap-6 mt-8 md:mt-12">
                <button
                  onClick={handlePrevCard}
                  className="flex-1 md:flex-none px-6 py-3 md:px-8 md:py-3 bg-gradient-to-r from-purple-800/50 to-purple-900/30 hover:from-purple-700/50 hover:to-purple-800/30 text-purple-200 font-semibold rounded-xl transition-all border border-purple-700/30 hover:border-purple-600/50"
                >
                  ← Previous
                </button>
                <button
                  onClick={handleNextCard}
                  className="flex-1 md:flex-none px-6 py-3 md:px-8 md:py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl"
                >
                  Next →
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-2xl mx-auto mt-8 md:mt-12">
                <div className="text-center p-4 md:p-6 bg-gradient-to-br from-purple-800/30 to-purple-900/20 rounded-2xl border border-purple-700/30">
                  <div className="text-2xl md:text-3xl font-bold text-white">{cards.length}</div>
                  <div className="text-sm text-purple-300 mt-1 md:mt-2">Total Cards</div>
                </div>
                <div className="text-center p-4 md:p-6 bg-gradient-to-br from-purple-800/30 to-purple-900/20 rounded-2xl border border-purple-700/30">
                  <div className="text-2xl md:text-3xl font-bold text-white">
                    {history.filter(h => h.correct === true).length}
                  </div>
                  <div className="text-sm text-purple-300 mt-1 md:mt-2">Correct Answers</div>
                </div>
                <div className="text-center p-4 md:p-6 bg-gradient-to-br from-purple-800/30 to-purple-900/20 rounded-2xl border border-purple-700/30">
                  <div className="text-2xl md:text-3xl font-bold text-white">
                    {history.filter(h => h.action === 'Reviewed').length}
                  </div>
                  <div className="text-sm text-purple-300 mt-1 md:mt-2">Reviews Today</div>
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


      {/* Mobile floating button to open sidebar */}
      {!showSidebar && (    
        <button
          onClick={() => setShowSidebar(true)}
          className="fixed bottom-6 right-6 md:hidden z-30 p-4 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all hover:scale-110"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default App;
