import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Check from '../assets/Svgs/Check';
import Facebook from '../assets/Svgs/Facebook';
import Google from '../assets/Svgs/Google';
import Twitter from '../assets/Svgs/Twitter';
import CountryCodePicker from '../components/CountryCodePicker';
import CustomButton from '../components/CustomButton';
import { useRouter } from 'expo-router';
import { useTheme } from '../styles/theme';
import { useResponsiveScreen } from '../hooks/useResponsiveScreen';

export default function HomeScreen() {
  const [phone, setPhone] = useState('');
  const router = useRouter();
  const { colors } = useTheme();
  const { scale, scaleFontSize, hp, wp, orientation, isTablet, isLargeDevice } = useResponsiveScreen();

  const isLandscape = orientation === 'landscape';

  // Tablet and large device multipliers for scaling down on tablets
  const tabletMultiplier = isTablet || isLargeDevice ? 0.7 : 1;
  const tabletFontMultiplier = isTablet || isLargeDevice ? 0.9 : 1;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: isTablet ? wp(6) : 0,
    },
    content: {
      flexGrow: 1,
      justifyContent: isTablet ? 'center' : 'center',
      paddingHorizontal: ((isLandscape ? wp(3) : wp(8)) * tabletMultiplier),
      paddingVertical: ((isLandscape ? hp(2) : hp(0)) * tabletMultiplier),
    },
    terms: {
      textAlign: 'left',
      fontSize: ((isLandscape ? scaleFontSize(10) : scaleFontSize(14)) * tabletFontMultiplier),
      color: colors.textSecondary,
    },
    linkText: {
      color: colors.constant,
    },
    buttonWrapper: {
      marginVertical: ((isLandscape ? hp(4) : hp(10)) * tabletMultiplier),
      alignItems: 'center',
      width: isTablet ? '60%' : '90%',
      maxWidth: 400,
      alignSelf: 'center',
    },
    loginLineWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: ((isLandscape ? hp(1) : hp(3)) * tabletMultiplier),
      justifyContent: 'center',
    },
    line: {
      height: scale(1) * tabletMultiplier,
      backgroundColor: colors.border,
      flex: 1,
    },
    loginText: {
      fontSize: ((isLandscape ? scaleFontSize(10) : scaleFontSize(12)) * tabletFontMultiplier),
      marginHorizontal: ((isLandscape ? wp(1) : wp(2)) * tabletMultiplier),
      color: colors.textSecondary,
    },
    socialContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginTop: ((isLandscape ? hp(0.5) : hp(1)) * tabletMultiplier),
      paddingHorizontal: ((isLandscape ? wp(10) : wp(20)) * (isTablet ? 0.9 : 1)),
    },
    socialIconWrapper: {
      height: ((isLandscape ? scale(40) : scale(50)) * tabletMultiplier),
      width: ((isLandscape ? scale(40) : scale(50)) * tabletMultiplier),
      borderRadius: ((isLandscape ? scale(20) : scale(25)) * tabletMultiplier),
      backgroundColor: '#F1F2F3',
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: ((isLandscape ? wp(0.5) : wp(1)) * tabletMultiplier),
    },
    facebookBackground: {
      height: ((isLandscape ? scale(20) : scale(30)) * tabletMultiplier),
      width: ((isLandscape ? scale(20) : scale(30)) * tabletMultiplier),
      borderRadius: ((isLandscape ? scale(10) : scale(15)) * tabletMultiplier),
      backgroundColor: 'blue',
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkAndTerms: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginTop: ((isLandscape ? scale(10) : scale(20)) * tabletMultiplier),
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={colors.background === '#1B1E22' ? 'light' : 'dark'} />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <CountryCodePicker onPhoneChange={setPhone} />
        <View style={styles.checkAndTerms}>
          <Check />
          <Text style={styles.terms}>
            Agree to our{' '}
            <Text style={styles.linkText}>Terms</Text> and{' '}
            <Text style={styles.linkText}>Data Policy</Text>.
          </Text>
        </View>
        <View style={styles.buttonWrapper}>
          <CustomButton
            onPress={() => router.push({ pathname: '/Verification', params: { phone } })}
          />
        </View>
        <View style={styles.loginLineWrapper}>
          <View style={styles.line} />
          <Text style={styles.loginText}>Login with</Text>
          <View style={styles.line} />
        </View>
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialIconWrapper}>
            <Pressable style={styles.facebookBackground}>
              <Facebook />
            </Pressable>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIconWrapper}>
            <Google />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIconWrapper}>
            <Twitter />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}