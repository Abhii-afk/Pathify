import React from 'react';
import StatCard from '../components/StatCard';
import TripControls from '../components/TripControls';
import TripLog from '../components/TripLog';
import QuickActions from '../components/QuickActions';
import TripConfirmationCard from '../components/TripConfirmationCard';
import { Trip } from '../types';
import { WalkIcon, BikeIcon, CarIcon, RouteIcon } from '../components/icons';

type TripData = Omit<Trip, 'id' | 'distance'>;

interface HomeScreenProps {
  trips: Trip[];
  isTripActive: boolean;
  onStartTrip: () => void;
  onStopTrip: () => void;
  pendingTrip: TripData | null;
  onConfirmTrip: () => void;
  onEditTrip: () => void;
  onAddTrip: () => void;
  onShare: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  trips,
  isTripActive,
  onStartTrip,
  onStopTrip,
  pendingTrip,
  onConfirmTrip,
  onEditTrip,
  onAddTrip,
  onShare,
}) => {
  const totalDistance = trips.reduce((acc, trip) => acc + trip.distance, 0).toFixed(1);
  const ecoFriendlyTrips = trips.filter(t => t.mode === 'walk' || t.mode === 'bike').length;
  const carTrips = trips.filter(t => t.mode === 'car').length;

  return (
    <div className="px-6 pb-8">
      <main>
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <StatCard
            icon={<RouteIcon className="w-6 h-6 text-brand-primary" />}
            title="Total Distance"
            value={`${totalDistance} km`}
            description="Across all trips"
          />
          <StatCard
            icon={<WalkIcon className="w-6 h-6 text-green-400" />}
            title="Eco Trips"
            value={ecoFriendlyTrips.toString()}
            description="Walk & Bike"
          />
           <StatCard
            icon={<BikeIcon className="w-6 h-6 text-sky-400" />}
            title="Total Trips"
            value={trips.length.toString()}
            description="Completed journeys"
          />
          <StatCard
            icon={<CarIcon className="w-6 h-6 text-red-400" />}
            title="Drives"
            value={carTrips.toString()}
            description="Trips by car"
          />
        </div>

        <div className="mt-8">
          {pendingTrip ? (
            <TripConfirmationCard 
              tripData={pendingTrip} 
              onConfirm={onConfirmTrip}
              onEdit={onEditTrip}
            />
          ) : (
            <TripControls 
              isTripActive={isTripActive} 
              onStart={onStartTrip} 
              onStop={onStopTrip} 
            />
          )}
        </div>
        
        <QuickActions onAddTrip={onAddTrip} onShare={onShare} />

        <TripLog trips={trips.slice(0, 3)} />

      </main>
    </div>
  );
};

export default HomeScreen;
