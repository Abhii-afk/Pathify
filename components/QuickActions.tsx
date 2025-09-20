import React from 'react';
import { PlusIcon, ShareIcon } from './icons';

interface QuickActionsProps {
    onAddTrip: () => void;
    onShare: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onAddTrip, onShare }) => {
  return (
    <div className="grid grid-cols-2 gap-4 my-8">
      <button 
        onClick={onAddTrip}
        className="flex items-center justify-center space-x-2 bg-dark-card hover:bg-gray-700/80 text-dark-text font-semibold py-3 px-4 rounded-lg transition-colors"
      >
        <PlusIcon className="w-5 h-5" />
        <span>Add Trip Manually</span>
      </button>
      <button 
        onClick={onShare}
        className="flex items-center justify-center space-x-2 bg-dark-card hover:bg-gray-700/80 text-dark-text font-semibold py-3 px-4 rounded-lg transition-colors"
      >
        <ShareIcon className="w-5 h-5" />
        <span>Share Progress</span>
      </button>
    </div>
  );
};

export default QuickActions;
