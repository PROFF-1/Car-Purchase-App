import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from '../styles/theme';
import { useResponsiveScreen } from '../hooks/useResponsiveScreen';

interface CustomButtonProps {
  onPress: () => void;
  title?: string;
  style?: ViewStyle;
}

export default function CustomButton({
  onPress,
  title = 'Continue',
  style,
}: CustomButtonProps) {
  const { colors } = useTheme();
  const { scale, scaleFontSize } = useResponsiveScreen();

  const styles = StyleSheet.create({
    button: {
      paddingVertical: scale(14),
      paddingHorizontal: scale(120),
      borderRadius: scale(50),
      backgroundColor: colors.constant,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      fontSize: scaleFontSize(14),
      fontWeight: '600',
      color: colors.buttonText,
      width: scale(70),
      textAlign: 'center'
    },
  });

  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}
