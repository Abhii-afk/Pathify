import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import BottomNavBar, { Screen } from './components/BottomNavBar';
import HomeScreen from './screens/HomeScreen';
import HistoryScreen from './screens/HistoryScreen';
import RewardsScreen from './screens/RewardsScreen';
import ProfileScreen from './screens/ProfileScreen';
import { Trip, Badge, User, TransportMode, Friend } from './types';
import { WalkIcon, BikeIcon, BusIcon } from './components/icons';
import TripConfirmationModal from './components/TripConfirmationModal';
import Notification from './components/Notification';
import ShareTripModal from './components/ShareTripModal';

// Mock Data
const initialTrips: Trip[] = [
  { id: 1, origin: 'Home', destination: 'Work', mode: 'bike', distance: 8.5 },
  { id: 2, origin: 'Work', destination: 'Gym', mode: 'walk', distance: 1.2 },
  { id: 3, origin: 'Gym', destination: 'Home', mode: 'bus', distance: 7.8 },
];

const initialBadges: Badge[] = [
    { id: 1, name: 'First Steps', description: 'Complete your first trip.', icon: <WalkIcon className="w-8 h-8" />, earned: true },
    { id: 2, name: 'Eco-Warrior', description: 'Complete 10 eco-friendly trips (walk, bike).', icon: <BikeIcon className="w-8 h-8" />, earned: false, progress: 30 },
    { id: 3, name: 'Public Transporter', description: 'Use public transport 5 times.', icon: <BusIcon className="w-8 h-8" />, earned: false, progress: 20 },
];

const initialUsers: User[] = [
  { id: 1, name: 'You', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', points: 1250 },
  { id: 2, name: 'Alex Doe', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026705d', points: 1180 },
  { id: 3, name: 'Sam Smith', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026706d', points: 950 },
  { id: 4, name: 'Jane Roe', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026707d', points: 1500 },
];

const initialFriends: Friend[] = [
  { id: 101, name: 'Alex Doe', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026705d' },
  { id: 102, name: 'Sam Smith', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026706d' },
];

const CURRENT_USER_ID = 1;

type TripData = Omit<Trip, 'id' | 'distance'>;

const App: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<Screen>('home');
  const [trips, setTrips] = useState<Trip[]>(initialTrips);
  const [badges, setBadges] = useState<Badge[]>(initialBadges);
  const [leaderboardUsers, setLeaderboardUsers] = useState<User[]>(initialUsers);
  const [friends, setFriends] = useState<Friend[]>(initialFriends);
  const [isTripActive, setIsTripActive] = useState<boolean>(false);

  const [pendingTrip, setPendingTrip] = useState<TripData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tripToEdit, setTripToEdit] = useState<TripData | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [tripToShare, setTripToShare] = useState<Trip | null>(null);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
  };

  const handleStartTrip = useCallback(() => {
    setIsTripActive(true);
    showNotification('Trip started. We are tracking your movement.');
    // Simulate trip detection
    setTimeout(() => {
      setIsTripActive(false);
      const detectedTrip: TripData = { origin: 'Central Park', destination: 'Times Square', mode: 'walk' };
      setPendingTrip(detectedTrip);
    }, 10000); // 10-second trip simulation
  }, []);

  const handleStopTrip = useCallback(() => {
    setIsTripActive(false);
    showNotification('Trip stopped manually.', 'error');
    if (pendingTrip) {
      setPendingTrip(null);
    }
  }, [pendingTrip]);

  const handleConfirmTrip = useCallback(() => {
    if (pendingTrip) {
      const newTrip: Trip = {
        ...pendingTrip,
        id: Date.now(),
        distance: Math.round(Math.random() * 15 * 10) / 10, // random distance
      };
      setTrips(prev => [newTrip, ...prev]);
      setPendingTrip(null);
      showNotification('Trip confirmed and added to your history!');
    }
  }, [pendingTrip]);

  const handleEditTrip = useCallback(() => {
    setTripToEdit(pendingTrip);
    setIsModalOpen(true);
  }, [pendingTrip]);

  const handleSaveTrip = (details: { origin: string; destination: string; mode: TransportMode }) => {
    const newTrip: Trip = {
      ...details,
      id: Date.now(),
      distance: Math.round(Math.random() * 15 * 10) / 10,
    };
    setTrips(prev => [newTrip, ...prev]);
    setIsModalOpen(false);
    setPendingTrip(null);
    setTripToEdit(null);
    showNotification('Trip saved successfully!');
  };

  const handleAddTripManually = () => {
    setTripToEdit(null);
    setIsModalOpen(true);
  };

  const handleShare = () => {
    if (trips.length > 0) {
      setTripToShare(trips[0]);
      setIsShareModalOpen(true);
    } else {
      showNotification("No trips to share yet!", "error");
    }
  };


  const renderScreen = () => {
    switch (activeScreen) {
      case 'home':
        return <HomeScreen
          trips={trips}
          isTripActive={isTripActive}
          onStartTrip={handleStartTrip}
          onStopTrip={handleStopTrip}
          pendingTrip={pendingTrip}
          onConfirmTrip={handleConfirmTrip}
          onEditTrip={handleEditTrip}
          onAddTrip={handleAddTripManually}
          onShare={handleShare}
        />;
      case 'history':
        return <HistoryScreen trips={trips} />;
      case 'rewards':
        return <RewardsScreen badges={badges} leaderboardUsers={leaderboardUsers} currentUserId={CURRENT_USER_ID} />;
      case 'profile':
        return <ProfileScreen user={leaderboardUsers.find(u => u.id === CURRENT_USER_ID)!} friends={friends} />;
      default:
        return <HomeScreen
          trips={trips}
          isTripActive={isTripActive}
          onStartTrip={handleStartTrip}
          onStopTrip={handleStopTrip}
          pendingTrip={pendingTrip}
          onConfirmTrip={handleConfirmTrip}
          onEditTrip={handleEditTrip}
          onAddTrip={handleAddTripManually}
          onShare={handleShare}
        />;
    }
  };

  return (
    <div className="bg-dark-bg text-dark-text min-h-screen font-sans pb-24">
      <div className="container mx-auto max-w-lg">
        {activeScreen === 'home' && <Header />}
        <main>{renderScreen()}</main>
      </div>
      <BottomNavBar activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
      <TripConfirmationModal 
        isOpen={isModalOpen}
        onClose={() => {
            setIsModalOpen(false);
            setTripToEdit(null);
        }}
        onSave={handleSaveTrip}
        tripToEdit={tripToEdit}
      />
      <ShareTripModal 
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        trip={tripToShare}
      />
      {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
    </div>
  );
};

export default App;