import React from 'react';

export type TransportMode = 'walk' | 'bike' | 'car' | 'bus' | 'train';

export interface Trip {
  id: number;
  origin: string;
  destination: string;
  mode: TransportMode;
  distance: number;
}

export interface Badge {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
  earned: boolean;
  progress?: number;
}

export interface User {
  id: number;
  name: string;
  avatarUrl: string;
  points: number;
}

export interface Friend {
  id: number;
  name: string;
  avatarUrl: string;
}
