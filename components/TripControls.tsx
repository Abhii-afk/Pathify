import React from 'react';

interface TripControlsProps {
  isTripActive: boolean;
  onStart: () => void;
  onStop: () => void;
}

const TripControls: React.FC<TripControlsProps> = ({ isTripActive, onStart, onStop }) => {
  return (
    <div className="bg-dark-card p-5 rounded-xl shadow-lg">
      {isTripActive ? (
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-2 text-dark-text-secondary mb-4">
            <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-secondary"></span>
            </span>
            <span>Trip in progress...</span>
          </div>
          <button 
            onClick={onStop}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
            aria-label="Stop current trip"
          >
            Stop Trip
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
            <h2 className="text-lg font-semibold text-dark-text mb-1">Ready to Go?</h2>
            <p className="text-dark-text-secondary mb-4 text-center">Start a new trip to begin data collection.</p>
            <button 
                onClick={onStart}
                className="w-full bg-brand-primary hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                aria-label="Start a new trip"
            >
                Start New Trip
            </button>
        </div>
      )}
    </div>
  );
};

export default TripControls;
