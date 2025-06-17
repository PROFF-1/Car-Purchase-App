import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTheme } from '../styles/theme';
import { useResponsiveScreen } from '../hooks/useResponsiveScreen';
import CustomButton from '../components/CustomButton';
import { SafeAreaView as SafeAreaViewRN } from 'react-native-safe-area-context';

export default function Verification() {
  const { colors } = useTheme();
  const {
    scale,
    scaleFontSize,
    hp,
    wp,
    orientation,
    isTablet,
    isLargeDevice,
  } = useResponsiveScreen();
  const router = useRouter();
  const { phone } = useLocalSearchParams();

  const [code, setCode] = useState<string[]>(['', '', '', '']);
  const inputs: React.RefObject<TextInput | null>[] = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  useEffect(() => {
    if (phone) {
      console.log('Send code to', phone);
    }
  }, [phone]);

  const handleChange = (text: string, idx: number) => {
    if (/^\d?$/.test(text)) {
      const newCode = [...code];
      newCode[idx] = text;
      setCode(newCode);

      if (text && idx < 3) {
        inputs[idx + 1]?.current?.focus();
      }
      if (newCode.join('').length === 4) {
        Keyboard.dismiss();
      }
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    idx: number
  ) => {
    if (e.nativeEvent.key === 'Backspace' && code[idx] === '' && idx > 0) {
      inputs[idx - 1]?.current?.focus();
    }
  };

  const handleVerify = () => {
    router.push('/UserDetails');
  };

  const isLandscape = orientation === 'landscape';
  const isTabletOrLarge = isTablet || isLargeDevice;
  const landscapeMultiplier = isLandscape ? 0.7 : 1;
  const tabletFontMultiplier = isTabletOrLarge && !isLandscape ? 1.15 : 1;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingTop: hp(10),
      justifyContent: (isTabletOrLarge && !isLandscape) || isLandscape ? 'center' : undefined,
      alignItems: (isTabletOrLarge && !isLandscape) || isLandscape ? 'center' : undefined,
      paddingHorizontal: isTabletOrLarge ? wp(7) : 0,
    },
    scroll: {
      flexGrow: 1,
      justifyContent: (isTabletOrLarge && !isLandscape) || isLandscape ? 'center' : 'flex-start',
      alignItems: (isTabletOrLarge && !isLandscape) || isLandscape ? 'center' : undefined,
      paddingHorizontal: ((isLandscape ? wp(10) : wp(8)) * landscapeMultiplier),
      paddingVertical: ((isLandscape ? hp(2) : hp(0)) * landscapeMultiplier),
      width: isLandscape ? '80%' : isTabletOrLarge ? '80%' : '100%',
      alignSelf: 'center',
    },
    textAndCode: {
      width: '100%',
      alignItems: 'center',
      justifyContent:'center'
    },
    label: {
      fontSize: ((isLandscape ? scaleFontSize(20) : scaleFontSize(24)) * tabletFontMultiplier),
      color: colors.text,
      marginBottom: hp(2),
      textAlign: 'center',
      fontWeight: '700',
    },
    phoneText: {
      fontSize: ((isLandscape ? scaleFontSize(14) : scaleFontSize(16)) * tabletFontMultiplier),
      color: colors.textSecondary,
      marginBottom: hp(1),
      textAlign: 'center',
    },
    subText: {
      textAlign: 'center',
      color: colors.textSecondary,
      fontSize: ((isLandscape ? scaleFontSize(12) : scaleFontSize(14)) * tabletFontMultiplier),
      marginBottom: hp(0.5),
    },
    codeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: hp(3),
    },
    codeInput: {
      width: (isLandscape ? scale(45) : scale(60)) * landscapeMultiplier,
      height: (isLandscape ? scale(45) : scale(60)) * landscapeMultiplier,
      borderRadius: scale(10),
      backgroundColor: colors.cardOnWhitePage,
      textAlign: 'center',
      fontSize: ((isLandscape ? scaleFontSize(20) : scaleFontSize(26)) * tabletFontMultiplier),
      color: colors.text,
      fontWeight: '700',
      marginHorizontal: wp(2),
    },
    buttonWrapper: {
      marginVertical: ((isLandscape ? hp(4) : hp(10)) * landscapeMultiplier),
      alignItems: 'center',
      width: '100%',
    },
  });

  return (
    <SafeAreaViewRN style={styles.container} edges={['top','left','right']}>
      <StatusBar style={colors.background === '#1B1E22' ? 'light' : 'dark'} />
      <KeyboardAvoidingView
        style={{ flex: 1, width: '100%' }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.textAndCode}>
            <Text style={styles.label}>Verification</Text>
            <Text style={styles.subText}>We texted you a code to verify</Text>
            <Text style={styles.subText}>your phone number.</Text>
            {phone && <Text style={styles.phoneText}>Sent to {phone}</Text>}
            <View style={styles.codeContainer}>
              {code.map((digit, idx) => (
                <TextInput
                  key={idx}
                  ref={inputs[idx]}
                  style={styles.codeInput}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={digit}
                  onChangeText={(text: string) => handleChange(text, idx)}
                  onKeyPress={(e) => handleKeyPress(e, idx)}
                  autoFocus={idx === 0}
                  returnKeyType="done"
                />
              ))}
            </View>
            <View style={styles.buttonWrapper}>
              <CustomButton onPress={handleVerify} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaViewRN>
  );
}