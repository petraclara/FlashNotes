import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="relative">
        <div className="w-24 h-24 border-4 border-purple-500/30 rounded-full"></div>
        <div className="absolute top-0 left-0 w-24 h-24 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
      </div>
      <p className="mt-6 text-purple-300 text-lg font-medium">Loading next card from AI agent...</p>
      <p className="mt-2 text-sm text-purple-400">Analyzing your learning patterns</p>
    </div>
  );
};

export default Loader;
