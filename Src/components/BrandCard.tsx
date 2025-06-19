import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../styles/theme';
import { useResponsiveScreen } from '../hooks/useResponsiveScreen';

interface Brand {
  name: string;
  Svg: React.ComponentType<any>;
}

interface BrandCardProps {
  brand: Brand;
  cardStyle?: any;
  svgSize?: { width: number; height: number };
}

export default function BrandCard({ brand, cardStyle, svgSize }: BrandCardProps) {
  const { colors } = useTheme();
  const { scaleFontSize, orientation } = useResponsiveScreen();
  const SvgComponent = brand.Svg;

  return (
    <View style={[
      styles.card, 
      cardStyle, 
      { 
        backgroundColor: colors.cardOnWhitePage,
        height: orientation === 'portrait' ? 150 : 200,
        paddingVertical: orientation === 'portrait' ? 8 : 10
      }
    ]}>
      <View style={[styles.logoContainer, { width: svgSize?.width || 36, height: svgSize?.height || 36 }]}>
        <SvgComponent width={svgSize ? svgSize.width : 36} height={svgSize ? svgSize.height : 36} />
      </View>
      <Text style={[styles.name, { color: colors.text, fontSize: scaleFontSize(14) }]}>{brand.name}</Text>
    </View>
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