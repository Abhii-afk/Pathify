import React from 'react';
import { Badge } from '../types';

interface BadgesSectionProps {
  badges: Badge[];
}

const BadgesSection: React.FC<BadgesSectionProps> = ({ badges }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-dark-text mb-4">Your Badges</h2>
      <div className="bg-dark-card p-5 rounded-xl shadow-lg">
        <ul className="space-y-6">
          {badges.map((badge) => (
            <li key={badge.id} className={`flex items-start space-x-4 ${!badge.earned ? 'opacity-60' : ''}`}>
              <div className={`bg-dark-bg p-3 rounded-full ${!badge.earned ? 'grayscale' : ''}`}>
                {badge.icon}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-dark-text">{badge.name}</p>
                <p className="text-sm text-dark-text-secondary">{badge.description}</p>
                {!badge.earned && (
                  <div className="mt-2">
                    <div className="w-full bg-dark-bg rounded-full h-2">
                      <div 
                        className="bg-brand-secondary h-2 rounded-full" 
                        style={{ width: `${badge.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-dark-text-secondary text-right mt-1">{badge.progress}% complete</p>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BadgesSection;