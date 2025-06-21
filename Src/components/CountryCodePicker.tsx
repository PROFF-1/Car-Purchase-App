import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, ViewStyle } from 'react-native';
import CountryPicker, { Country, CountryCode } from 'react-native-country-picker-modal';
import { useTheme } from '../styles/theme';
import { useResponsiveScreen } from '../hooks/useResponsiveScreen';
import { CountryCodePickerProps } from '../types/components';

export default function CountryCodePicker({ onPhoneChange, style }: CountryCodePickerProps) {
  const { colors } = useTheme();
  const { scale, scaleFontSize, wp } = useResponsiveScreen();

  const [countryCode, setCountryCode] = useState<CountryCode>('US');
  const [callingCode, setCallingCode] = useState<string>('1');
  const [phone, setPhone] = useState('');
  const [visible, setVisible] = useState(false);

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    if (onPhoneChange) onPhoneChange(value);
  };

  const onSelect = (country: Country) => {
    setCountryCode(country.cca2 as CountryCode);
    setCallingCode(country.callingCode?.[0] || '1');
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: scale(12),
      borderBottomWidth: scale(1),
      borderBottomColor: colors.border,
      justifyContent:'flex-start',
    },
    phoneInput: {
      flex: 1,
      fontSize: scaleFontSize(16),
      color: colors.text,
      fontWeight: '700',
      paddingLeft: scale(8),
    },
    flagButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    callingCodeText: {
      fontSize: scaleFontSize(16),
      color: colors.text,
      fontWeight: '700',
      marginLeft: scale(6),
    },
  });

  return (
    <View style={[styles.container, style]}>
      <CountryPicker
        countryCode={countryCode}
        withFilter
        withFlag
        withCallingCode
        withEmoji
        onSelect={onSelect}
        theme={{
          onBackgroundTextColor: colors.text,
          filterPlaceholderTextColor: colors.placeholder,
        }}
        visible={visible}
        onClose={() => setVisible(false)}
        onOpen={() => setVisible(true)}
        renderFlagButton={() => (
          <TouchableOpacity style={styles.flagButton} onPress={() => setVisible(true)}>
            <Text style={styles.callingCodeText}>+{callingCode}</Text>
          </TouchableOpacity>
        )}
      />
      <TextInput
        style={styles.phoneInput}
        placeholder="Phone number"
        placeholderTextColor={colors.placeholder}
        keyboardType="phone-pad"
        value={phone}
        onChangeText={handlePhoneChange}
      />
    </View>
  );
}
