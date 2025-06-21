import React from 'react';

export interface Brand {
  name: string;
  Svg?: React.ComponentType<any>;
  image?: any; // require() or uri
}

export interface BrandCardProps {
  brand: Brand;
  cardStyle?: any;
  svgSize?: { width: number; height: number };
  onPress?: ()=>void
} 