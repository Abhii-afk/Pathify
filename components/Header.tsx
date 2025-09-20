
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center py-4">
      <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-brand-primary to-brand-secondary text-transparent bg-clip-text">
        PATHIFY
      </h1>
      <div className="flex items-center space-x-2 bg-green-500/10 text-green-400 px-3 py-1.5 rounded-full text-sm font-medium">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
        <span>Tracking Active</span>
      </div>
    </header>
  );
};

export default Header;
