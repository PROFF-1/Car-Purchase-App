import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '../styles/theme';
import { useResponsiveScreen } from '../hooks/useResponsiveScreen';
import { Brand, BrandCardProps } from '../types/brand';

export default function BrandCard({ brand, cardStyle, svgSize, onPress }: BrandCardProps) {
  const { colors } = useTheme();
  const { scaleFontSize, orientation } = useResponsiveScreen();
  const SvgComponent = brand.Svg;

  return (
    <TouchableOpacity style={[
      styles.card, 
      cardStyle, 
      { 
        backgroundColor: colors.cardOnWhitePage,
        height: orientation === 'portrait' ? 150 : 200,
        paddingVertical: orientation === 'portrait' ? 8 : 10
      }
    ]} onPress={onPress}>
      <View style={[styles.logoContainer, { width: svgSize?.width || 36, height: svgSize?.height || 36 }]}> 
        {SvgComponent ? (
          <SvgComponent width={svgSize ? svgSize.width : 36} height={svgSize ? svgSize.height : 36} />
        ) : brand.image ? (
          <Image source={brand.image} style={{ width: svgSize ? svgSize.width : 36, height: svgSize ? svgSize.height : 36, resizeMode: 'contain' }} />
        ) : (
          <View style={{ width: svgSize ? svgSize.width : 36, height: svgSize ? svgSize.height : 36, borderRadius: 18, backgroundColor: '#eee' }} />
        )}
      </View>
      <Text style={[styles.name, { color: colors.text, fontSize: scaleFontSize(14) }]}>{brand.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingHorizontal: 8,
    marginRight: 12,
    width: 80,
  },
  logoContainer: {
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontWeight: '500',
    textAlign: 'center',
  },
});