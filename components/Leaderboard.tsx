import React from 'react';
import { User } from '../types';

interface LeaderboardProps {
  users: User[];
  currentUserId: number;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ users, currentUserId }) => {
  const sortedUsers = [...users].sort((a, b) => b.points - a.points);

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-dark-text mb-4">Leaderboard</h2>
      <div className="bg-dark-card p-5 rounded-xl shadow-lg">
        <ul className="space-y-3">
          {sortedUsers.map((user, index) => {
            const isCurrentUser = user.id === currentUserId;
            const rank = index + 1;

            return (
              <li 
                key={user.id} 
                className={`flex items-center space-x-4 p-3 rounded-lg ${isCurrentUser ? 'bg-brand-primary/20' : ''}`}
              >
                <span className="text-lg font-bold w-6 text-center text-dark-text-secondary">{rank}</span>
                <img 
                  src={user.avatarUrl} 
                  alt={user.name}
                  className="w-10 h-10 rounded-full"
                />
                <p className="flex-1 font-semibold text-dark-text">{user.name}{isCurrentUser && ' (You)'}</p>
                <p className="font-bold text-brand-secondary">{user.points.toLocaleString()} pts</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Leaderboard;
