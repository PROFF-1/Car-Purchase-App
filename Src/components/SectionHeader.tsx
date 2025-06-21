// Src/components/SectionHeader.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../styles/theme';
import { useResponsiveScreen } from '../hooks/useResponsiveScreen';
import { SectionHeaderProps } from '../types/components';

export default function SectionHeader({ title, onMore, containerStyle }: SectionHeaderProps) {
  const { colors } = useTheme();
  const { scaleFontSize } = useResponsiveScreen();

  return (
    <View style={[styles.row, containerStyle]}>
      <Text style={[styles.title, { color: colors.text, fontSize: scaleFontSize(18) }]}>{title}</Text>
      {onMore && (
        <TouchableOpacity onPress={onMore}>
          <Text style={[styles.more, { color: colors.constant }]}>More &gt;</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 8 },
  title: { fontWeight: 'bold' },
  more: { fontWeight: '500' },
});