import React from 'react';
import BadgesSection from '../components/BadgesSection';
import Leaderboard from '../components/Leaderboard';
import { Badge, User } from '../types';

interface RewardsScreenProps {
  badges: Badge[];
  leaderboardUsers: User[];
  currentUserId: number;
}

const RewardsScreen: React.FC<RewardsScreenProps> = ({ badges, leaderboardUsers, currentUserId }) => {
  const currentUser = leaderboardUsers.find(u => u.id === currentUserId);
  const totalPoints = currentUser ? currentUser.points : 0;

  return (
    <div className="px-6 pb-8">
      <header className="py-4">
        <h1 className="text-3xl font-bold tracking-tight text-dark-text">
          Your Rewards
        </h1>
        <p className="text-lg text-brand-secondary font-semibold mt-1">
          Total Points: {totalPoints.toLocaleString()}
        </p>
      </header>
      <main>
        <Leaderboard users={leaderboardUsers} currentUserId={currentUserId} />
        <BadgesSection badges={badges} />
      </main>
    </div>
  );
};

export default RewardsScreen;