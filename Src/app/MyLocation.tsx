import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Platform,
  ScrollView
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../styles/theme';
import { useResponsiveScreen } from '../hooks/useResponsiveScreen';
import CustomButton from '../components/CustomButton';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const HOT_CITIES = ['New York', 'Bangkok', 'Rome'];

// GeoDB Cities API (get a free API key from https://rapidapi.com/wirefreethought/api/geodb-cities/)
const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities';
const GEO_API_KEY = '55cdab37e8msh5ec0cbf3a901877p13889djsn1a96586e38a7'; // <-- Replace with your RapidAPI key
const GEO_API_HOST = 'wft-geo-db.p.rapidapi.com';
const PAGE_LIMIT = 10;

export default function MyLocation() {
  const { colors } = useTheme();
  const { scale, scaleFontSize, hp } = useResponsiveScreen();
  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState('Bangkok');
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  // Fetch cities from GeoDB Cities API
  const fetchCities = async (query = '', pageNum = 1, refreshing = false) => {
    if (refreshing) setRefreshing(true);
    else setLoading(true);
    try {
      const url = `${GEO_API_URL}?namePrefix=${encodeURIComponent(query)}&limit=${PAGE_LIMIT}&offset=${(pageNum - 1) * PAGE_LIMIT}`;
      const response = await fetch(url, {
        headers: {
          'X-RapidAPI-Key': GEO_API_KEY,
          'X-RapidAPI-Host': GEO_API_HOST,
        },
      });
      const data = await response.json();
      const cityNames = data.data.map((item: any) => `${item.city}, ${item.country}`);
      if (pageNum === 1) {
        setCities(cityNames);
      } else {
        setCities(prev => [...prev, ...cityNames]);
      }
      setHasMore(cityNames.length === PAGE_LIMIT);
    } catch (e) {
      if (pageNum === 1) setCities([]);
      setHasMore(false);
    }
    setLoading(false);
    setRefreshing(false);
  };

  // Initial load and on search
  useEffect(() => {
    setPage(1);
    fetchCities(search, 1);
  }, [search]);

  // Load more on scroll
  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchCities(search, nextPage);
    }
  };

  // Pull to refresh
  const onRefresh = () => {
    setPage(1);
    fetchCities(search, 1, true);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.mainBackground,
      paddingTop: Platform.OS === 'android' ? hp(2) : 0,
    },
    searchBarWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.cardOnWhitePage,
      borderRadius: scale(24),
      margin: scale(16),
      paddingHorizontal: scale(12),
      height: scale(24),
    },
    searchIcon: {
      marginRight: scale(8),
    },
    searchInput: {
      flex: 1,
      fontSize: scaleFontSize(16),
      color: colors.text,
      backgroundColor: 'transparent',
    },
    selectedText: {
      marginLeft: scale(16),
      marginBottom: scale(8),
      fontSize: scaleFontSize(16),
      color: colors.text,
    },
    selectedCity: {
      fontWeight: 'bold',
      color: colors.text,
    },
    section: {
      backgroundColor: colors.cardOffWhitePage,
      borderTopLeftRadius: scale(24),
      borderTopRightRadius: scale(24),
      padding: scale(16),
      marginTop: scale(8),
      flex: 1,
    },
    label: {
      color: colors.textSecondary,
      fontSize: scaleFontSize(14),
      marginBottom: scale(8),
    },
    cityRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: scale(8),
    },
    cityIcon: {
      marginRight: scale(8),
    },
    cityName: {
      color: colors.text,
      fontSize: scaleFontSize(16),
    },
    detect: {
      color: '#1DB854',
      marginLeft: 'auto',
      fontSize: scaleFontSize(14),
      fontWeight: '500',
    },
    hotCityRow: {
      flexDirection: 'row',
      marginVertical: scale(8),
    },
    hotCityBtn: {
      backgroundColor: colors.cardOnWhitePage,
      borderRadius: scale(8),
      paddingHorizontal: scale(16),
      paddingVertical: scale(8),
      marginRight: scale(12),
    },
    hotCityText: {
      color: colors.text,
      fontSize: scaleFontSize(15),
      fontWeight: '500',
    },
    cityListItem: {
      color: colors.textSecondary,
      fontSize: scaleFontSize(16),
      marginLeft: scale(32),
      marginVertical: scale(4),
    },
    continueButtonWrapper: {
      padding: scale(16),
      backgroundColor: colors.mainBackground,
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={['top','left','right']}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" nestedScrollEnabled={false}>
        {/* Search Bar */}
        <View style={styles.searchBarWrapper}>
          <Feather name="search" size={20} color={colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor={colors.textSecondary}
            value={search}
            onChangeText={setSearch}
          />
        </View>
        {/* Selected City */}
        <Text style={styles.selectedText}>
          Selected: <Text style={styles.selectedCity}>{selectedCity}</Text>
        </Text>
        {/* Main Section */}
        <View style={styles.section}>
          {/* City Location */}
          <Text style={styles.label}>City location</Text>
          <View style={styles.cityRow}>
            <Feather name="map-pin" size={18} color={colors.textSecondary} style={styles.cityIcon} />
            <Text style={styles.cityName}>{selectedCity}</Text>
          </View>
          {/* Hot City */}
          <Text style={styles.label}>Hot City</Text>
          <View style={styles.hotCityRow}>
            {HOT_CITIES.map(city => (
              <TouchableOpacity
                key={city}
                style={styles.hotCityBtn}
                onPress={() => setSelectedCity(city)}
              >
                <Text style={styles.hotCityText}>{city}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {/* City List */}
          <FlatList
            data={cities}
            keyExtractor={item => item}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setSelectedCity(item)}>
                <Text style={styles.cityListItem}>{item}</Text>
              </TouchableOpacity>
            )}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={loading ? <ActivityIndicator size="small" color={colors.textSecondary} /> : null}
            refreshing={refreshing}
            onRefresh={onRefresh}
            keyboardShouldPersistTaps="handled"
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
      {/* Continue Button */}
      <View style={styles.continueButtonWrapper}>
        <CustomButton title="Continue" onPress={() => router.push('./tabs')} />
      </View>
    </SafeAreaView>
  );
} 