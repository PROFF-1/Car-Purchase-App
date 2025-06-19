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
import AmgCoupe from '../../assets/Cars/CarsSvg/AmgCoupe';
import Ferrari from '../../assets/Cars/CarsSvg/Ferrari';
import MorrisGarages from '../../assets/Cars/CarsSvg/MorrisGarages';
import Hurracan from '../../assets/Cars/CarsSvg/Hurracan';
import Mustang from '../../assets/Cars/CarsSvg/Mustang';
import AudiTT from '../../assets/Cars/CarsSvg/AudiTT';
import RapidE from '../../assets/Cars/CarsSvg/RapidE';
import Lamboghini from '../../assets/Cars/CarsSvg/Lamborghini';
import Toyota from '../../assets/Cars/BrandsSvg/Toyota';
import Honda from '../../assets/Cars/BrandsSvg/Honda';
import Mercedes from '../../assets/Cars/BrandsSvg/Mercedes';
import Cadillac from '../../assets/Cars/CarsSvg/Cadillac';
import Mazda from '../../assets/Cars/CarsSvg/Mazda';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface Car {
  name: string;
  price: string;
  image?: string;
  Svg?: React.ComponentType<any>;
  colors: string[];
  favorite: boolean;
  description: string;
}

interface Brand {
  name: string;
  Svg: React.ComponentType<any>;
}

interface News {
  title: string;
  author: string;
  date: string;
  image: string;
  category: string;
}

// Define a base interface for section data to include the 'id' for keyExtractor
interface SectionDataItem {
  id: string;
}

interface HorizontalListItem extends SectionDataItem {
  items: Car[] | Brand[];
  cardType: 'car' | 'brand';
}

interface NewsItem extends News, SectionDataItem {}

interface Section {
  type: string;
  title?: string;
  data: SectionDataItem[] | HorizontalListItem[] | NewsItem[];
}

const topDeals: Car[] = [
  { name: 'Lamborghini', price: '$67,600', Svg: Lamboghini, colors: ['#FFD600', '#000', '#fff'], favorite: false, description: 'Lamborghini/5.2-liter V-10' },
  { name: 'Rapide E', price: '$330,000', Svg: RapidE, colors: ['#fff', '#000', '#f9c'], favorite: true, description: 'Aston Martin/Electric Car' },
  { name: 'Amg GT Coupe', price: '$120,000', Svg: AmgCoupe, colors: ['#FFD600', '#000', '#fff'], favorite: false, description: 'Mercedes-Benz/4.0L AMG V8 biturbo' },
  { name: 'Ferrari 812', price: '$340,000', Svg: Ferrari, colors: ['#fff', '#000', '#f9c'], favorite: false, description: 'Ferrari/F12berlinetta\'s V12' },
  { name: 'Morris Garages', price: '$45,000', Svg: MorrisGarages, colors: ['#FFD600', '#000', '#fff'], favorite: false, description: 'MG/1.5-liter four-cylinder' },
  { name: 'Hurracan', price: '$210,000', Svg: Hurracan, colors: ['#fff', '#000', '#f9c'], favorite: false, description: 'Lamborghini/5.2-liter V-10' },
  { name: 'Mustang', price: '$60,000', Svg: Mustang, colors: ['#FFD600', '#000', '#fff'], favorite: false, description: 'Ford/The 2.3L EcoBoost' },
  { name: 'Audi TT', price: '$50,000', Svg: AudiTT, colors: ['#fff', '#000', '#f9c'], favorite: false, description: 'Audi/2.0-liter four-cylinder' },
];
const brands: Brand[] = [
  { name: 'Toyota', Svg: Toyota },
  { name: 'Mercedes', Svg: Mercedes },
  { name: 'Honda', Svg: Honda },
];
const upcoming: Car[] = [
  { 
    name: 'Mazda Enclave', 
    price: '$42,700-$48,700', 
    Svg: Mazda, 
    colors: ['#d00', '#000'], 
    favorite: false, 
    description: 'Mazda/Mid-size SUV' 
  },
  { 
    name: 'Cadillac-CT5', 
    price: '$58,600-$58,900', 
    Svg: Cadillac, 
    colors: ['#00f', '#000'], 
    favorite: false, 
    description: 'Cadillac/Luxury Sedan' 
  },
];
const news: News[] = [
  { 
    title: 'Porsche Type 997 911 GT2 RSR Flat Out At Monza', 
    author: 'Akshit', 
    date: 'Sep 05, 2023', 
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=120&h=120&fit=crop',
    category: 'Racing'
  },
  { 
    title: 'Maserati MC20: The Future of Italian Supercars', 
    author: 'Laurent', 
    date: 'Sep 12, 2023', 
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=120&h=120&fit=crop',
    category: 'Supercars'
  },
  { 
    title: 'Electric Revolution: Tesla Model S Plaid Sets New Record', 
    author: 'Sarah', 
    date: 'Sep 15, 2023', 
    image: 'https://images.unsplash.com/photo-1617704548623-340376564e68?w=120&h=120&fit=crop',
    category: 'Electric'
  },
  { 
    title: 'Lamborghini Unveils New Hybrid Supercar Concept', 
    author: 'Marco', 
    date: 'Sep 18, 2023', 
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=120&h=120&fit=crop',
    category: 'Concept'
  }
];

const SECTIONS: Section[] = [
  {
    type: 'main_header',
    data: [{ id: 'main_header_content' }], // Single item for the header section content
  },
  {
    type: 'banner_carousel',
    data: [{ id: 'banner_carousel_content' }], // Single item for the banner carousel
  },
  {
    type: 'horizontal_list_section',
    title: 'Top deal',
    data: [{ id: 'top_deals_list', items: topDeals, cardType: 'car' }], // Single item representing the FlatList
  },
  {
    type: 'horizontal_list_section',
    title: 'Popular brands',
    data: [{ id: 'brands_list', items: brands, cardType: 'brand' }], // Single item representing the FlatList
  },
  {
    type: 'horizontal_list_section',
    title: 'Upcoming',
    data: [{ id: 'upcoming_list', items: upcoming, cardType: 'car' }], // Single item representing the FlatList
  },
  {
    type: 'news_section',
    title: 'News',
    data: news.map(n => ({ ...n, id: n.title })), // Map news items to include an 'id' for keyExtractor
  },
];

export default function Home() {
  const { colors } = useTheme();
  const { scale, scaleFontSize, wp, hp, orientation, isTablet} = useResponsiveScreen();
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('Bangkok');

  const router = useRouter();

 
  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.mainBackground },
    // scroll: { }, // No longer needed for ScrollView, keep commented for reference if needed.
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
        sections={SECTIONS}
        keyExtractor={(item, index) => {
          // Ensure a unique key based on the item's properties or a fallback
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
          // Render SectionHeader component only for relevant section types
          if (section.type === 'horizontal_list_section' || section.type === 'news_section') {
            return (
              <SectionHeader title={section.title!} onMore={() => {

                if (section.title === 'Top deal') {
                  router.push('/tabs/buy-car');
                }
              }} containerStyle={{ marginBottom: hp(1.5), paddingHorizontal: wp(4) }} />
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
                      : scale(24), // Consistent height for all devices in landscape
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
              // item here is the single object: { id: '...', items: dataArray, cardType: '...' }
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
                      />
                    )}
                    contentContainerStyle={{ paddingVertical: hp(1.5), paddingLeft: wp(4) }}
                  />
                );
              }
              return null;
            case 'news_section':
              // item here is a single news object because SectionList renders each item from section.data
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

