import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../styles/theme';
import { useResponsiveScreen } from '../hooks/useResponsiveScreen';
import { News, NewsCardProps } from '../types/news';
import { useRouter } from 'expo-router';

export default function NewsCard({ news, onPress, cardStyle }: NewsCardProps) {
  const { colors } = useTheme();
  const { scaleFontSize } = useResponsiveScreen();
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push({ pathname: '/NewsDetails', params: { newsId: news.title } });
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.card, cardStyle, { backgroundColor: colors.cardOnWhitePage }]} 
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Image 
        source={{ uri: news.image }} 
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.textContainer}>
        <View style={styles.categoryContainer}>
          <Text style={[styles.category, { color: colors.constant }]}>
            {news.category}
          </Text>
        </View>
        <Text 
          style={[styles.title, { color: colors.text, fontSize: scaleFontSize(15) }]}
          numberOfLines={2}
        >
          {news.title}
        </Text>
        <Text style={[styles.meta, { color: colors.textSecondary, fontSize: scaleFontSize(12) }]}>
          By {news.author} • {news.date}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    padding: 12,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  categoryContainer: {
    marginBottom: 4,
  },
  category: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  title: {
    fontWeight: '600',
    marginBottom: 4,
    lineHeight: 20,
  },
  meta: {
    opacity: 0.8,
  },
});