import React from 'react';
import TripLog from '../components/TripLog';
import { Trip } from '../types';

interface HistoryScreenProps {
  trips: Trip[];
}

const HistoryScreen: React.FC<HistoryScreenProps> = ({ trips }) => {
  return (
    <div className="px-6">
      <header className="py-4">
        <h1 className="text-3xl font-bold tracking-tight text-dark-text">
          Trip History
        </h1>
      </header>
      <main>
        <TripLog trips={trips} />
      </main>
    </div>
  );
};

export default HistoryScreen;
