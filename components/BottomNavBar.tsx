import React from 'react';
import { HomeIcon, HistoryIcon, TrophyIcon, ProfileIcon } from './icons';

export type Screen = 'home' | 'history' | 'rewards' | 'profile';

interface BottomNavBarProps {
  activeScreen: Screen;
  setActiveScreen: (screen: Screen) => void;
}

const navItems: { screen: Screen; label: string; icon: React.ReactNode }[] = [
  { screen: 'home', label: 'Home', icon: <HomeIcon className="w-6 h-6" /> },
  { screen: 'history', label: 'History', icon: <HistoryIcon className="w-6 h-6" /> },
  { screen: 'rewards', label: 'Rewards', icon: <TrophyIcon className="w-6 h-6" /> },
  { screen: 'profile', label: 'Profile', icon: <ProfileIcon className="w-6 h-6" /> },
];

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeScreen, setActiveScreen }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-dark-card border-t border-gray-700 shadow-lg z-40">
      <div className="flex justify-around max-w-xl mx-auto">
        {navItems.map(({ screen, label, icon }) => (
          <button
            key={screen}
            onClick={() => setActiveScreen(screen)}
            className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 ${
              activeScreen === screen ? 'text-brand-primary' : 'text-dark-text-secondary hover:text-dark-text'
            }`}
            aria-current={activeScreen === screen ? 'page' : undefined}
          >
            {icon}
            <span className="text-xs mt-1">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavBar;