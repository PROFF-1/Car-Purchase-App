import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../styles/theme';
import { useResponsiveScreen } from '../hooks/useResponsiveScreen';
import { SearchBarProps } from '../types/components';

export default function SearchBar({ value, onChangeText, placeholder = "Search", style }: SearchBarProps) {
  const { colors } = useTheme();
  const { scale, scaleFontSize } = useResponsiveScreen();

  return (
    <View style={[styles.container, { backgroundColor: colors.cardOnWhitePage }, style]}>
      <Feather name="search" size={scale(18)} color={colors.textSecondary} style={styles.icon} />
      <TextInput
        style={[styles.input, { color: colors.text, fontSize: scaleFontSize(16) }]}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    paddingHorizontal: 12,
    height: 44,
    flex: 1,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});