import React from 'react';
import { User, Friend } from '../types';
import { 
  PencilIcon, 
  LockClosedIcon, 
  BellIcon, 
  QuestionMarkCircleIcon, 
  EnvelopeIcon, 
  ChevronRightIcon, 
  LogoutIcon,
  UserPlusIcon,
  TrashIcon
} from '../components/icons';

interface ProfileScreenProps {
  user: User;
  friends: Friend[];
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, friends }) => {
  return (
    <div className="px-4 pb-8">
      <header className="py-4">
        <h1 className="text-3xl font-bold tracking-tight text-dark-text text-center">
          Profile
        </h1>
      </header>
      <main className="flex flex-col items-center mt-4">
        <img 
          src={user.avatarUrl} 
          alt={user.name}
          className="w-28 h-28 rounded-full ring-4 ring-brand-primary/50 object-cover"
        />
        <h2 className="mt-4 text-2xl font-bold text-dark-text">{user.name}</h2>
        <p className="text-lg text-brand-secondary font-semibold mt-1">
          {user.points.toLocaleString()} Points
        </p>

        <div className="mt-10 w-full space-y-6">

          {/* Family & Friends Section */}
          <div className="bg-dark-card p-5 rounded-xl shadow-lg w-full">
            <h3 className="font-semibold text-lg text-dark-text mb-4">Family & Friends</h3>
            <ul className="space-y-3 mb-4">
              {friends.map(friend => (
                <li key={friend.id} className="flex items-center space-x-3">
                  <img src={friend.avatarUrl} alt={friend.name} className="w-10 h-10 rounded-full object-cover"/>
                  <span className="flex-1 text-dark-text">{friend.name}</span>
                  <button className="text-dark-text-secondary hover:text-red-400 transition-colors" aria-label={`Remove ${friend.name}`}>
                    <TrashIcon className="w-5 h-5"/>
                  </button>
                </li>
              ))}
            </ul>
            <button className="w-full flex items-center justify-center space-x-2 bg-brand-primary/20 hover:bg-brand-primary/40 text-brand-primary font-semibold py-2.5 px-4 rounded-lg transition-colors">
              <UserPlusIcon className="w-5 h-5" />
              <span>Add New Friend</span>
            </button>
          </div>
          
          {/* Settings Section */}
          <div className="bg-dark-card rounded-xl shadow-lg w-full overflow-hidden">
            <h3 className="font-semibold text-dark-text-secondary px-5 pt-4">Account Settings</h3>
            <ul className="divide-y divide-gray-700/50 mt-2">
              <SettingsItem icon={<PencilIcon className="w-5 h-5 text-dark-text-secondary"/>} label="Edit Profile" />
              <SettingsItem icon={<LockClosedIcon className="w-5 h-5 text-dark-text-secondary"/>} label="Change Password" />
              <SettingsItem icon={<BellIcon className="w-5 h-5 text-dark-text-secondary"/>} label="Notifications" />
            </ul>
          </div>

          <div className="bg-dark-card rounded-xl shadow-lg w-full overflow-hidden">
            <h3 className="font-semibold text-dark-text-secondary px-5 pt-4">Support</h3>
            <ul className="divide-y divide-gray-700/50 mt-2">
              <SettingsItem icon={<QuestionMarkCircleIcon className="w-5 h-5 text-dark-text-secondary"/>} label="Help Center" />
              <SettingsItem icon={<EnvelopeIcon className="w-5 h-5 text-dark-text-secondary"/>} label="Contact Us" />
            </ul>
          </div>

          <div className="mt-6">
            <button className="w-full flex items-center justify-center space-x-2 bg-dark-card hover:bg-red-500/20 text-red-400 font-semibold py-3 px-4 rounded-lg transition-colors">
              <LogoutIcon className="w-5 h-5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

const SettingsItem: React.FC<{icon: React.ReactNode; label: string}> = ({ icon, label }) => (
    <button className="w-full flex items-center justify-between p-4 px-5 hover:bg-gray-700/30 cursor-pointer transition-colors text-left">
        <div className="flex items-center space-x-4">
            {icon}
            <span className="text-dark-text">{label}</span>
        </div>
        <ChevronRightIcon className="w-5 h-5 text-dark-text-secondary" />
    </button>
);

export default ProfileScreen;
