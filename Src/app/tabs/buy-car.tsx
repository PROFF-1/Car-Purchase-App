import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../styles/theme';
import { useResponsiveScreen } from '../../hooks/useResponsiveScreen';
import SearchBar from '../../components/SearchBar';
import CitySelector from '../../components/CitySelector';
import CarCard from '../../components/CarCard';
import { Feather } from '@expo/vector-icons';
import type { Icon } from '@expo/vector-icons/build/createIconSet';

// Import specific filter icons from assets
import SalesImage from '../../assets/sales.png';
import HotImage from '../../assets/hot.png';
import FeaturedImage from '../../assets/featured.png';
import DiscountImage from '../../assets/discount.png';
import Lamborghini from '../../assets/Cars/CarsSvg/Lamborghini';
import Mustang from '../../assets/Cars/CarsSvg/Mustang';
import Hurracan from '../../assets/Cars/CarsSvg/Hurracan';
import MorrisGarages from '../../assets/Cars/CarsSvg/MorrisGarages';
import Ferrari from '../../assets/Cars/CarsSvg/Ferrari';
import AmgCoupe from '../../assets/Cars/CarsSvg/AmgCoupe';

// Define a Car interface for type safety (can be moved to a global types file later)
interface Car {
  name: string;
  price: string;
  image?: string;
  Svg?: React.ComponentType<any>;
  colors: string[];
  favorite: boolean;
  description: string;
}

// Sample data for car listings (will be replaced by backend integration)
const CAR_DATA: Car[] = [
  {
    name: 'Audi TT RS',
    price: '$67,600',
    image: 'https://images.unsplash.com/photo-1549399542-7ba77334759b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    Svg: Lamborghini,
    colors: ['#fff', '#000', '#FFD600'],
    favorite: false,
    description: 'Audi/2.0-liter four-cylinder',
  },
  {
    name: 'Mustang',
    price: '$26,670',
    image: 'https://images.unsplash.com/photo-1542362543-b26a6d6d4a5c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    Svg: Mustang,
    colors: ['#FFA500', '#808080', '#008000'],
    favorite: false,
    description: 'Ford/The 2.3L EcoBoost',
  },
  {
    name: 'Huracán',
    price: '$67,600',
    image: 'https://images.unsplash.com/photo-1583121274640-4200d7d2f9d5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    Svg: Hurracan,
    colors: ['#FFD600', '#000', '#fff'],
    favorite: false,
    description: 'Lamborghini/5.2-liter V-10',
  },
  {
    name: 'Morris Garages',
    price: '$14,900',
    image: 'https://images.unsplash.com/photo-1621430076-0f2c8d5b1b1f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    Svg: MorrisGarages,
    colors: ['#008000', '#fff', '#FF0000'],
    favorite: false,
    description: 'MG/1.5-liter four-cylinder',
  },
  {
    name: 'Ferrari 812',
    price: '$98,800',
    image: 'https://images.unsplash.com/photo-1594955745162-42173160a0a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    Svg: Ferrari,
    colors: ['#FF0000', '#000', '#FFD600'],
    favorite: false,
    description: 'Ferrari/F12berlinetta\'s V12',
  },
  {
    name: 'AMG GT Coupe',
    price: '$59,800',
    image: 'https://images.unsplash.com/photo-1599434861621-c4d3b0e1b1d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    Svg: AmgCoupe,
    colors: ['#0000FF', '#fff', '#808080'],
    favorite: false,
    description: 'Benz/4.0L AMG V8 biturbo',
  },
];

interface FilterOption {
  label: string;
  imageSource?: any;
  iconName?: keyof typeof Feather.glyphMap;
}

const FILTER_OPTIONS: FilterOption[] = [
  { label: 'Sales', imageSource: SalesImage },
  { label: 'Hot', imageSource: HotImage },
  { label: 'Featured', imageSource: FeaturedImage },
  { label: 'Discount', imageSource: DiscountImage },
];

export default function BuyCar() {
  const { colors } = useTheme();
  const { wp, hp, scale, orientation, isTablet } = useResponsiveScreen();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Sales');
  const [city, setCity] = useState('Bangkok');

  const numColumns = orientation === 'portrait' ? 2 : 3;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.mainBackground,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: wp(4),
      paddingTop: hp(2),
      paddingBottom: hp(1),
    },
    filterContainer: {
      paddingVertical: hp(1),
      paddingLeft: wp(4),
      marginBottom: hp(2),
      flexDirection: 'row',
      gap: wp(2),
    },
    filterButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.cardOnWhitePage,
      borderRadius: scale(20),
      paddingVertical: hp(orientation === 'portrait' ? 1 : 0.8),
      paddingHorizontal: wp(orientation === 'portrait' ? 3 : 2),
      marginRight: 0, // Remove margin as we're using gap
    },
    activeFilterButton: {
      backgroundColor: colors.constant,
    },
    filterButtonText: {
      fontSize: scale(orientation === 'portrait' ? 12 : 9),
      marginLeft: wp(1),
      flexShrink: 1, // Allow text to shrink if needed
    },
    activeFilterButtonText: {
      color: colors.whiteText,
    },
    filterIcon: {
      marginLeft: wp(2),
      padding: scale(8),
      borderRadius: scale(20),
      backgroundColor: colors.cardOnWhitePage,
    },
    filterIconImage: {
      width: scale(orientation === 'portrait' ? 16 : 14),
      height: scale(orientation === 'portrait' ? 16 : 14),
      resizeMode: 'contain',
    },
    carListContainer: {
      paddingHorizontal: wp(4),
      alignItems: 'center', // Centers content if total width is less than container
      flexGrow: 1, // Allows the container to grow and participate in centering
    },
    carCard: {
      width: orientation === 'portrait' ? wp(44) : wp(30),
      marginHorizontal: wp(2),
      marginBottom: hp(2),
      borderRadius: scale(16),
      padding: scale(12),
    },
    carCardSvgSize: {
      width: orientation === 'portrait' ? wp(40) : wp(25),
      height: orientation === 'portrait' ? hp(12) : wp(10),
    },
  });

  const renderFilterButton = ({ item }: { item: { label: string; iconName?: any; imageSource?: any } }) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        activeFilter === item.label && styles.activeFilterButton,
      ]}
      onPress={() => setActiveFilter(item.label)}
    >
      {item.imageSource ? (
        <Image source={item.imageSource} style={styles.filterIconImage} />
      ) : (
        <Feather
          name={item.iconName}
          size={scale(orientation === 'portrait' ? 16 : 14)}
          color={activeFilter === item.label ? colors.whiteText : colors.text}
        />
      )}
      <Text
        style={[
          styles.filterButtonText,
          { color: activeFilter === item.label ? colors.whiteText : colors.text },
        ]}
        numberOfLines={1}
      >
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  const renderCarCard = ({ item }: { item: Car }) => (
    <CarCard
      car={item}
      cardStyle={styles.carCard}
      svgSize={styles.carCardSvgSize}
      onPress={() => { /* Navigate to car details */ }}
    />
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <CitySelector 
          city={city} 
          onPress={() => { /* open city picker */ }} 
        />
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search for cars..."
          style={{ 
            flex: 1, 
            marginHorizontal: wp(3),
            height: orientation === 'portrait' 
              ?hp(5)
              : scale(24), // Consistent height for all devices in landscape
            borderRadius: scale(orientation === 'portrait' ? 24 : 20),
            paddingVertical: orientation === 'portrait' ? undefined : hp(1),
          }}
        />
        <TouchableOpacity style={styles.filterIcon}>
          <Feather 
            name="sliders" 
            size={scale(orientation === 'portrait' ? 20 : 18)} 
            color={colors.textSecondary} 
          />
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        {FILTER_OPTIONS.map((item) => (
          <TouchableOpacity
            key={item.label}
            style={[
              styles.filterButton,
              activeFilter === item.label && styles.activeFilterButton,
            ]}
            onPress={() => setActiveFilter(item.label)}
          >
            {item.imageSource ? (
              <Image source={item.imageSource} style={styles.filterIconImage} />
            ) : (
              <Feather
                name={item.iconName}
                size={scale(orientation === 'portrait' ? 16 : 14)}
                color={activeFilter === item.label ? colors.whiteText : colors.text}
              />
            )}
            <Text
              style={[
                styles.filterButtonText,
                { color: activeFilter === item.label ? colors.whiteText : colors.text },
              ]}
              numberOfLines={1}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        key={`car-list-${orientation}-${numColumns}`}
        data={CAR_DATA}
        numColumns={numColumns}
        renderItem={renderCarCard}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.carListContainer}
        columnWrapperStyle={{
          justifyContent: numColumns === 2 ? 'space-between' : 'center',
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({})
