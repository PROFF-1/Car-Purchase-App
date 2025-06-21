import React from 'react';
import { View, Image, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../styles/theme';
import { useResponsiveScreen } from '../hooks/useResponsiveScreen';
import { BannerCarouselProps } from '../types/components';
import { banners } from '../mockup';

export default function BannerCarousel({ style }: BannerCarouselProps) {
  const { colors } = useTheme();
  const { scale, scaleFontSize, wp } = useResponsiveScreen();

  return (
    <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={[styles.scroll, style]}>
      {banners.map((banner, idx) => (
        <View key={idx} style={[styles.banner, { width: wp(100) }]}>
          <Image source={{ uri: banner.image }} style={styles.image} resizeMode="cover" />
          <View style={styles.textContainer}>
            <Text style={[styles.title, { color: colors.textSecondary }]}>{banner.title}</Text>
            <Text style={[styles.subtitle, { color: colors.whiteText }]}>{banner.subtitle}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { marginVertical: 12 },
  banner: {
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 16,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    position: 'absolute',
    left: 16,
    bottom: 16,
  },
  title: {
    fontWeight: '500',
    fontSize: 14,
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 2,
  },
});