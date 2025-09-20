import React from 'react';
import { Trip, TransportMode } from '../types';
import { RouteIcon } from './icons';

type TripData = Omit<Trip, 'id' | 'distance'>;

interface TripConfirmationCardProps {
  tripData: TripData;
  onConfirm: () => void;
  onEdit: () => void;
}

const TripConfirmationCard: React.FC<TripConfirmationCardProps> = ({ tripData, onConfirm, onEdit }) => {
  return (
    <div className="bg-dark-card p-5 rounded-xl shadow-lg mb-6">
      <div className="flex items-start space-x-4">
        <div className="bg-dark-bg p-3 rounded-full mt-1">
          <RouteIcon className="w-6 h-6 text-brand-primary" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-bold text-dark-text">Confirm Your Trip</h2>
          <p className="text-sm text-dark-text-secondary">We detected a new trip. Please confirm the details.</p>
          <div className="mt-4 bg-dark-bg p-3 rounded-lg">
            <p className="font-semibold text-dark-text">{tripData.origin} → {tripData.destination}</p>
            <p className="text-sm text-dark-text-secondary capitalize">{tripData.mode}</p>
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button 
          onClick={onEdit}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2.5 px-4 rounded-lg transition-colors"
        >
          Edit
        </button>
        <button 
          onClick={onConfirm}
          className="bg-brand-primary hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-lg transition-colors"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default TripConfirmationCard;
