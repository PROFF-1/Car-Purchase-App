import { useColorScheme } from 'react-native';
import { lightColors, darkColors } from './colors';

export const useTheme = () => {
  const scheme = useColorScheme();
  const colors = scheme === 'dark' ? darkColors : lightColors;
  return { colors, isDark: scheme === 'dark' };
};


export const useText= () => {
  
}