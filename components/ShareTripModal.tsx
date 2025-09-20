import React from 'react';
import { Trip } from '../types';
import { ShareIcon } from './icons';

interface ShareTripModalProps {
  isOpen: boolean;
  onClose: () => void;
  trip: Trip | null;
}

const ShareTripModal: React.FC<ShareTripModalProps> = ({ isOpen, onClose, trip }) => {
  if (!isOpen || !trip) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" aria-modal="true" role="dialog">
      <div className="bg-dark-card rounded-2xl shadow-xl w-full max-w-sm">
        <div className="p-6">
            <div className="flex justify-center mb-4">
                <div className="bg-dark-bg p-3 rounded-full">
                    <ShareIcon className="w-8 h-8 text-brand-primary" />
                </div>
            </div>
            <h2 className="text-xl font-bold text-dark-text text-center">Share Your Trip</h2>
            <p className="text-sm text-dark-text-secondary text-center mt-1 mb-6">Share your recent accomplishment with friends!</p>

            <div className="bg-dark-bg p-4 rounded-lg mb-6 text-center">
                <p className="font-semibold text-dark-text">{trip.origin} → {trip.destination}</p>
                <p className="text-sm text-dark-text-secondary capitalize">{trip.distance} km via {trip.mode}</p>
            </div>
            
            <div className="space-y-3">
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2.5 px-4 rounded-lg">Share on Twitter</button>
                <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 px-4 rounded-lg">Share on WhatsApp</button>
                <button className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2.5 px-4 rounded-lg">Copy Link</button>
            </div>
            
            <div className="mt-6">
                <button type="button" onClick={onClose} className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2.5 px-4 rounded-lg transition-colors">
                    Close
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ShareTripModal;
