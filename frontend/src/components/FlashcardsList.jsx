import React, { useState } from 'react';
import Flashcard from './Flashcard';
// import questionsData from './questions.json';

const FlashcardsList = () => {
  const [answers, setAnswers] = useState({});

  const handleAnswerSubmit = (id, userAnswer) => {
    setAnswers(prev => ({ ...prev, [id]: userAnswer }));
  };

  const handleShowDetails = (card) => {
    // maybe open a modal with card.link or more info
    window.open(card.link, '_blank');
  };

  return (
    <div className="space-y-6">
      {questionsData.questions.map((q, idx) => (
        <Flashcard
          key={idx}
          card={{ ...q, id: idx }}
          onShowDetails={handleShowDetails}
          onAnswerSubmit={handleAnswerSubmit}
        />
      ))}
    </div>
  );
};

export default FlashcardsList;
