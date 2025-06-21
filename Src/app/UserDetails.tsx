import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import InputField from '../components/InputField';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../styles/theme';
import { useResponsiveScreen } from '../hooks/useResponsiveScreen';
import { fonts } from '../styles/colors';
import CustomButton from '../components/CustomButton';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView as SafeAreaViewRN } from 'react-native-safe-area-context';

export default function UserDetails() {
  const router = useRouter();
  const { colors } = useTheme();
  const { scale, scaleFontSize, hp, wp, orientation, isTablet, isLargeDevice } = useResponsiveScreen();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isLandscape = orientation === 'landscape';
  const isTabletOrLarge = isTablet || isLargeDevice;
  const landscapeMultiplier = isLandscape ? 0.7 : 1;
  const tabletFontMultiplier = isTabletOrLarge && !isLandscape ? 1.15 : 1;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: isTabletOrLarge && !isLandscape ? 'center' : undefined,
      alignItems: isTabletOrLarge && !isLandscape ? 'center' : undefined,
      paddingHorizontal: isTabletOrLarge ? wp(4) : 0,
      paddingTop: hp(10),
    },
    scroll: {
      flexGrow: 1,
      justifyContent: isTabletOrLarge && !isLandscape ? 'center' : isLandscape ? 'center' : 'flex-start',
      alignItems: isTabletOrLarge && !isLandscape ? 'center' : isLandscape ? 'center' : undefined,
      paddingHorizontal: ((isLandscape ? wp(10) : wp(8)) * landscapeMultiplier),
      paddingVertical: ((isLandscape ? hp(2) : hp(0)) * landscapeMultiplier),
      width: isLandscape ? '80%' : isTabletOrLarge ? '80%' : '100%',
      alignSelf: 'center',
    },
    form: {
      width: '100%',
      maxWidth: isTabletOrLarge ? 600 : 400,
      alignSelf: 'center',
    },
    label: {
      color: colors.textSecondary,
      marginBottom: scale(8) * landscapeMultiplier,
      fontSize: scaleFontSize(fonts.size.small) * tabletFontMultiplier,
      height: scale(20),
      textAlignVertical: 'center',
    },
    labelConfirm: {
      color: colors.textSecondary,
      marginBottom: scale(8) * landscapeMultiplier,
      fontSize: scaleFontSize(fonts.size.small) * tabletFontMultiplier,
      height: scale(20),
      textAlignVertical: 'center',
    },
    buttonWrapper: {
      marginVertical: ((isLandscape ? hp(4) : hp(10)) * landscapeMultiplier),
      alignItems: 'center',
      width: isTabletOrLarge ? '60%' : '90%',
      maxWidth: 400,
      alignSelf: 'center',
    },
  });

  return (
    <SafeAreaViewRN style={styles.container} edges={['top','left','right']}>
      <KeyboardAvoidingView
        style={{ flex: 1, width: '100%' }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.form}>
            <Text style={styles.label}>Full Name</Text>
            <InputField
              value={fullName}
              onChangeText={setFullName}
              placeholder="Enter full name"
              onClear={() => setFullName('')}
            />
            <Text style={styles.label}>Email</Text>
            <InputField
              value={email}
              onChangeText={setEmail}
              placeholder="Enter email"
              onClear={() => setEmail('')}
              keyboardType="email-address"
            />
            <Text style={styles.label}>Password</Text>
            <InputField
              value={password}
              onChangeText={setPassword}
              placeholder="Enter password"
              onClear={() => setPassword('')}
              secureTextEntry={!showPassword}
              rightIcon={
                <Feather
                  name={showPassword ? 'eye' : 'eye-off'}
                  size={15}
                  color={colors.placeholder}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
            />
            <Text style={styles.labelConfirm}>Confirm Password</Text>
            <InputField
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm password"
              onClear={() => setConfirmPassword('')}
              secureTextEntry={!showConfirmPassword}
              rightIcon={
                <Feather
                  name={showConfirmPassword ? 'eye' : 'eye-off'}
                  size={15}
                  color={colors.placeholder}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              }
            />
            <View style={styles.buttonWrapper}>
              <CustomButton onPress={() => router.push('./tabs')} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaViewRN>
  );
}