import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../styles/theme';
import { useResponsiveScreen } from '../hooks/useResponsiveScreen';

interface CitySelectorProps {
  city: string;
  onPress: () => void;
}

export default function CitySelector({ city, onPress }: CitySelectorProps) {
  const { colors } = useTheme();
  const { scaleFontSize } = useResponsiveScreen();

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={[styles.city, { color: colors.text, fontSize: scaleFontSize(16) }]}>{city}</Text>
      <Feather name="chevron-down" size={18} color={colors.textSecondary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  city: {
    fontWeight: '500',
    marginRight: 4,
  },
});