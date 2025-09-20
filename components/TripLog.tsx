import React from 'react';
import { Trip, TransportMode } from '../types';
import { WalkIcon, BikeIcon, CarIcon, BusIcon, TrainIcon, RouteIcon } from './icons';

interface TripLogProps {
  trips: Trip[];
}

const iconMap: Record<TransportMode, React.ReactNode> = {
    walk: <WalkIcon className="w-6 h-6 text-green-400" />,
    bike: <BikeIcon className="w-6 h-6 text-sky-400" />,
    car: <CarIcon className="w-6 h-6 text-red-400" />,
    bus: <BusIcon className="w-6 h-6 text-yellow-400" />,
    train: <TrainIcon className="w-6 h-6 text-purple-400" />,
};

const TripLog: React.FC<TripLogProps> = ({ trips }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-dark-text mb-4">Your Trip History</h2>
      <div className="bg-dark-card p-5 rounded-xl shadow-lg">
        {trips.length > 0 ? (
          <ul className="space-y-4">
            {trips.map((trip) => (
              <li key={trip.id} className="flex items-center space-x-4">
                <div className="bg-dark-bg p-3 rounded-full">
                  {iconMap[trip.mode]}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-dark-text">{trip.origin} to {trip.destination}</p>
                  <p className="text-sm text-dark-text-secondary capitalize">{trip.mode} &#8226; {trip.distance} km</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
            <div className="text-center py-8">
                <RouteIcon className="w-12 h-12 mx-auto text-dark-text-secondary opacity-50" />
                <p className="mt-4 text-dark-text-secondary">Your completed trips will appear here.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default TripLog;
