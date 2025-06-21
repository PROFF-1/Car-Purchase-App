import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, KeyboardTypeOptions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../styles/theme';
import { useResponsiveScreen } from '../hooks/useResponsiveScreen';
import { InputFieldProps } from '../types/components';

export default function InputField({ value, onChangeText, placeholder, onClear, keyboardType, secureTextEntry, rightIcon, ...props }: InputFieldProps) {
  const { colors } = useTheme();
  const { scale, scaleFontSize } = useResponsiveScreen();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      borderRadius: scale(8),
      marginBottom: scale(28),
      paddingHorizontal: scale(12),
      width: '100%',
    },
    input: {
      flex: 1,
      fontSize: scaleFontSize(16),
      color: colors.text,
      paddingVertical: scale(12),
      height: scale(48),
      textAlignVertical: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        {...props}
      />
      {rightIcon ? rightIcon : (value.length > 0 && onClear && (
        <TouchableOpacity onPress={onClear}>
          <Feather name="x" size={15} color={colors.textSecondary} />
        </TouchableOpacity>
      ))}
    </View>
  );
}