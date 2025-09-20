import React, { useState, useEffect } from 'react';
import { Trip, TransportMode } from '../types';
import { WalkIcon, BikeIcon, CarIcon, BusIcon, TrainIcon } from './icons';

type TripData = Omit<Trip, 'id' | 'distance'>;

interface TripConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (details: { origin: string; destination:string; mode: TransportMode }) => void;
  tripToEdit?: TripData | null;
}

const transportOptions: { mode: TransportMode; label: string; icon: React.ReactNode }[] = [
    { mode: 'walk', label: 'Walk', icon: <WalkIcon className="w-6 h-6" /> },
    { mode: 'bike', label: 'Bike', icon: <BikeIcon className="w-6 h-6" /> },
    { mode: 'car', label: 'Car', icon: <CarIcon className="w-6 h-6" /> },
    { mode: 'bus', label: 'Bus', icon: <BusIcon className="w-6 h-6" /> },
    { mode: 'train', label: 'Train', icon: <TrainIcon className="w-6 h-6" /> },
];

const TripConfirmationModal: React.FC<TripConfirmationModalProps> = ({ isOpen, onClose, onSave, tripToEdit }) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedMode, setSelectedMode] = useState<TransportMode>('car');

  useEffect(() => {
    if (isOpen) {
        if (tripToEdit) {
            setOrigin(tripToEdit.origin);
            setDestination(tripToEdit.destination);
            setSelectedMode(tripToEdit.mode);
        } else {
            // Reset form on open for manual add
            setOrigin('');
            setDestination('');
            setSelectedMode('car');
        }
    }
  }, [isOpen, tripToEdit]);

  const handleSave = () => {
    if (origin.trim() && destination.trim()) {
      onSave({ origin, destination, mode: selectedMode });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" aria-modal="true" role="dialog">
      <div className="bg-dark-card rounded-2xl shadow-xl w-full max-w-sm">
        <div className="p-6">
            <h2 className="text-xl font-bold text-dark-text text-center">{tripToEdit ? 'Edit Trip' : 'Add New Trip'}</h2>
            <p className="text-sm text-dark-text-secondary text-center mt-1 mb-6">Help us by providing your trip details.</p>

            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="origin" className="block text-sm font-medium text-dark-text-secondary mb-1">Origin</label>
                        <input
                            type="text"
                            id="origin"
                            value={origin}
                            onChange={(e) => setOrigin(e.target.value)}
                            className="w-full bg-dark-bg border border-gray-600 text-dark-text rounded-lg p-2.5 focus:ring-brand-primary focus:border-brand-primary"
                            placeholder="e.g., Home"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="destination" className="block text-sm font-medium text-dark-text-secondary mb-1">Destination</label>
                        <input
                            type="text"
                            id="destination"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            className="w-full bg-dark-bg border border-gray-600 text-dark-text rounded-lg p-2.5 focus:ring-brand-primary focus:border-brand-primary"
                            placeholder="e.g., Office"
                            required
                        />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-dark-text-secondary mb-2">Mode of Transport</label>
                        <div className="grid grid-cols-3 gap-2">
                            {transportOptions.map(({ mode, label, icon }) => (
                                <button
                                    key={mode}
                                    type="button"
                                    onClick={() => setSelectedMode(mode)}
                                    className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-colors ${selectedMode === mode ? 'bg-brand-primary/20 border-brand-primary' : 'bg-dark-bg border-gray-600 hover:border-gray-500'}`}
                                    aria-pressed={selectedMode === mode}
                                >
                                    {icon}
                                    <span className="text-xs mt-1.5">{label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                    <button type="button" onClick={onClose} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2.5 px-4 rounded-lg transition-colors">
                        Cancel
                    </button>
                    <button type="submit" className="bg-brand-primary hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-lg transition-colors">
                        Save Trip
                    </button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default TripConfirmationModal;
