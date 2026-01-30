export const mockFlashcards = [
  {
    id: 1,
    question: "What is machine learning?",
    answer: "Machine learning is a subset of AI that enables systems to learn and improve from experience without explicit programming.",
    details: {
      examples: [
        "Email spam filtering learns from user reports",
        "Netflix recommendations based on viewing history",
        "Voice recognition improving with use"
      ],
      categories: ["AI", "Data Science", "Algorithms"],
      difficulty: "Beginner",
      lastReviewed: "2024-01-15",
      source: "AI Agent v2.1"
    }
  },
  {
    id: 2,
    question: "Explain neural networks",
    answer: "Neural networks are computing systems inspired by biological neural networks, consisting of interconnected nodes that process information.",
    details: {
      examples: [
        "Image recognition in self-driving cars",
        "Natural language processing in chatbots",
        "Stock market prediction models"
      ],
      categories: ["Deep Learning", "AI", "Neuroscience"],
      difficulty: "Intermediate",
      lastReviewed: "2024-01-14",
      source: "AI Agent v2.1"
    }
  },
  {
    id: 3,
    question: "What is reinforcement learning?",
    answer: "Reinforcement learning is a type of machine learning where an agent learns to make decisions by taking actions and receiving rewards or penalties.",
    details: {
      examples: [
        "AlphaGo learning to play Go",
        "Robotic arm learning to grasp objects",
        "Autonomous trading systems"
      ],
      categories: ["Machine Learning", "Robotics", "Game AI"],
      difficulty: "Advanced",
      lastReviewed: "2024-01-13",
      source: "AI Agent v2.1"
    }
  }
];

export const historyStack = [
  { id: 1, action: "Reviewed", cardId: 1, timestamp: "2024-01-15 10:30", correct: true },
  { id: 2, action: "Added", cardId: 3, timestamp: "2024-01-15 09:45", correct: null },
  { id: 3, action: "Reviewed", cardId: 2, timestamp: "2024-01-14 16:20", correct: false },
  { id: 4, action: "Edited", cardId: 1, timestamp: "2024-01-14 14:15", correct: null },
];
