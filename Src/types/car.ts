import React from 'react';

export interface Car {
  name: string;
  price: string;
  image?: string;
  Svg?: React.ComponentType<any>;
  colors: string[];
  favorite: boolean;
  description: string;
}

export interface CarCardProps {
  car: Car;
  onPress?: () => void;
  onFavorite?: () => void;
  cardStyle?: any;
  svgSize?: { width: number; height: number };
} 