
import React from 'react';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, description }) => {
  return (
    <div className="bg-dark-card p-5 rounded-xl shadow-lg hover:shadow-brand-primary/20 transition-shadow duration-300 flex items-start space-x-4">
      <div className="bg-dark-bg p-3 rounded-lg">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-dark-text-secondary">{title}</p>
        <p className="text-2xl font-bold text-dark-text mt-1">{value}</p>
        <p className="text-xs text-dark-text-secondary mt-1">{description}</p>
      </div>
    </div>
  );
};

export default StatCard;
