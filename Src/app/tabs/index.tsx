import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, FlatList, TouchableOpacity, SectionList } from 'react-native';
import SearchBar from '../../components/SearchBar';
import CitySelector from '../../components/CitySelector';
import BannerCarousel from '../../components/BannerCarousel';
import CarCard from '../../components/CarCard';
import BrandCard from '../../components/BrandCard';
import NewsCard from '../../components/NewsCard';
import SectionHeader from '../../components/SectionHeader';
import { useTheme } from '../../styles/theme';
import { useResponsiveScreen } from '../../hooks/useResponsiveScreen';
import { SafeAreaView as SafeAreaViewSafeAreaContext } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Car, Brand, News, Section, SectionDataItem, HorizontalListItem, NewsItem } from '../../types';
import { sections } from '../../mockup';

export default function Home() {
  const { colors } = useTheme();
  const { scale, scaleFontSize, wp, hp, orientation, isTablet} = useResponsiveScreen();
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('Bangkok');

  const router = useRouter();

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.mainBackground },
    row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    notificationIcon: {
      marginLeft: wp(3),
      position: 'relative',
      padding: wp(1),
    },
    notificationBadge: {
      position: 'absolute',
      top: 0,
      right: 0,
      width: scale(8),
      height: scale(8),
      borderRadius: scale(4),
      borderWidth: 1,
      borderColor: colors.mainBackground,
    },
  });
  
  return (
    <SafeAreaViewSafeAreaContext style={styles.container} edges={['top','left','right']}>
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => {
          if ('id' in item && item.id) {
            return String(item.id);
          } else if ('name' in item && item.name) {
            return String(item.name);
          } else if ('title' in item && item.title) {
            return String(item.title);
          }
          return `section-item-${index}`;
        }}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section }) => {
          if (section.type === 'horizontal_list_section' || section.type === 'news_section') {
            return (
              <SectionHeader 
                title={section.title!} 
                onMore={() => {
                  if (section.title === 'Top deal') {
                    router.push('/tabs/buy-car');
                  }
                  if (section.title === 'Popular brands') {
                    router.push('/Brands');
                  }
                }} 
                containerStyle={{ marginBottom: hp(1.5), paddingHorizontal: wp(4) }} 
              />
            );
          }
          return null;
        }}
        renderItem={({ item, section }) => {
          switch (section.type) {
            case 'main_header':
              return (
                <View style={[styles.row, { marginBottom: hp(2), paddingHorizontal: wp(4), paddingTop: hp(2) }]}>
                  <CitySelector city={city} onPress={() => { /* open city picker */ }} />
                  <SearchBar value={search} onChangeText={setSearch} style={{ 
                    flex: 1, 
                    marginHorizontal: wp(3),
                    height: orientation === 'portrait' 
                      ?hp(5)
                      : scale(24),
                    borderRadius: scale(orientation === 'portrait' ? 24 : 20),
                    paddingVertical: orientation === 'portrait' ? undefined : hp(1),
                  }} />
                  <TouchableOpacity style={styles.notificationIcon}>
                    <Ionicons name="notifications-outline" size={wp(6)} color={colors.textSecondary} />
                    <View style={[styles.notificationBadge, { backgroundColor: colors.constant }]} />
                  </TouchableOpacity>
                </View>
              );
            case 'banner_carousel':
              return (
                <BannerCarousel style={{ borderRadius: scale(16), height: orientation === 'portrait' ? hp(22) : wp(30), marginBottom: hp(2), marginHorizontal: wp(4) }} />
              );
            case 'horizontal_list_section':
              const horizontalListItem = item as HorizontalListItem;

              if (horizontalListItem.cardType === 'car') {
                return (
                  <FlatList
                    data={horizontalListItem.items as Car[]}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(carItem: Car) => carItem.name}
                    renderItem={({ item: carItem }) => (
                      <CarCard
                        car={carItem}
                        cardStyle={{
                          width: wp(48),
                          height: orientation === 'portrait' ? hp(25) : wp(35),
                          marginRight: wp(5),
                          borderRadius: scale(20),
                          padding: scale(16),
                        }}
                        svgSize={{
                          width: orientation === 'portrait' ? wp(40) : wp(30),
                          height: orientation === 'portrait' ? hp(12) : wp(20),
                        }}
                      />
                    )}
                    contentContainerStyle={{ paddingVertical: hp(1.5), paddingLeft: wp(4) }}
                  />
                );
              } else if (horizontalListItem.cardType === 'brand') {
                return (
                  <FlatList
                    data={horizontalListItem.items as Brand[]}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(brandItem: Brand) => brandItem.name}
                    renderItem={({ item: brandItem }) => (
                      <BrandCard
                        brand={brandItem}
                        cardStyle={{
                          width: orientation === 'portrait' ? wp(30) : wp(25),
                          height: orientation === 'portrait' ? hp(14) : wp(15),
                          marginRight: wp(5),
                          borderRadius: scale(20),
                          padding: scale(12),
                        }}
                        svgSize={{ width: wp(16), height: wp(10) }}
                        onPress={() => router.push({ pathname: '/BrandDetails', params: { brand: brandItem.name } })}
                      />
                    )}
                    contentContainerStyle={{ paddingVertical: hp(1.5), paddingLeft: wp(4) }}
                  />
                );
              }
              return null;
            case 'news_section':
              const newsItem = item as NewsItem;
              return <NewsCard key={newsItem.title} news={newsItem} cardStyle={{ borderRadius: scale(16), marginBottom: hp(1.5), padding: scale(12), marginHorizontal: wp(4) }} />;
            default:
              return null;
          }
        }}
        contentContainerStyle={{ paddingBottom: hp(10) }}
      />
    </SafeAreaViewSafeAreaContext>
  );
}

