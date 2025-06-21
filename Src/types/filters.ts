import { Feather } from '@expo/vector-icons';

export interface FilterOption {
  label: string;
  imageSource?: any;
  iconName?: keyof typeof Feather.glyphMap;
} 