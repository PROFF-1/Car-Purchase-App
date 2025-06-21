import { ScaledSize } from 'react-native';

export type Orientation = 'portrait' | 'landscape';

export interface ResponsiveContext {
  screenWidth: number;
  screenHeight: number;
  orientation: Orientation;
  isSmallDevice: boolean;
  isMediumDevice: boolean;
  isLargeDevice: boolean;
  isTablet: boolean;
  scale: (size: number) => number;
  scaleHeight: (size: number) => number;
  scaleFontSize: (size: number) => number;
  hp: (percentage: number) => number;
  wp: (percentage: number) => number;
} 