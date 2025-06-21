import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useTheme } from '../styles/theme';
import { useResponsiveScreen } from '../hooks/useResponsiveScreen';
import { useRouter, useLocalSearchParams } from 'expo-router';
import CarCard from '../components/CarCard';
import { fetchCarsByBrand } from '../utils/api';
import { Car } from '../types/car';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TABS } from '../mockup';
import Header1 from '../components/Headers';




export default function BrandDetails() {
  const { colors } = useTheme();
  const responsive = useResponsiveScreen();
  const router = useRouter();
  const { brand } = useLocalSearchParams();

  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('all');

  useEffect(() => {
    setLoading(true);
    // Fetch cars for this brand (empty logic for now)
    fetchCarsByBrand(brand as string).then((data) => {
      setCars(data);
      setLoading(false);
    });
  }, [brand]);

  // Filter logic placeholder (to be implemented with backend)
  const filteredCars = cars; // TODO: filter by selectedTab

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.mainBackground,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: responsive.hp(2),
      paddingBottom: responsive.hp(1),
      paddingHorizontal: responsive.wp(4),
      backgroundColor: colors.background,
    },
    backButton: {
      marginRight: responsive.wp(3),
      padding: responsive.scale(6),
    },
    title: {
      fontSize: responsive.scaleFontSize(20),
      fontWeight: 'bold',
      color: colors.text,
      flex: 1,
      textAlign: 'center',
    },
    hotSection: {
      marginTop: responsive.hp(2),
      marginBottom: responsive.hp(1),
      paddingHorizontal: responsive.wp(4),
    },
    hotTitle: {
      fontSize: responsive.scaleFontSize(22),
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: responsive.hp(1),
    },
    hotList: {
      flexDirection: 'row',
      gap: responsive.wp(3),
    },
    tabBar: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: responsive.wp(4),
      marginTop: responsive.hp(2),
      marginBottom: responsive.hp(1),
    },
    tab: {
      marginRight: responsive.wp(4),
      paddingBottom: responsive.hp(0.5),
    },
    tabText: {
      fontSize: responsive.scaleFontSize(16),
      color: colors.textSecondary,
      fontWeight: '500',
    },
    tabActive: {
      color: colors.constant,
      borderBottomWidth: 2,
      borderBottomColor: colors.constant,
    },
    carList: {
      paddingHorizontal: responsive.wp(4),
      marginTop: responsive.hp(1),
    },
    emptyState: {
      alignItems: 'center',
      marginTop: responsive.hp(10),
    },
    emptyText: {
      color: colors.textSecondary,
      fontSize: responsive.scaleFontSize(16),
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={['top','left','right']}>
      {/* Header */}
      <Header1 title={brand} onPress={()=>router.replace('./Brands')}/>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hot Section */}
        <View style={styles.hotSection}>
          <Text style={styles.hotTitle}>Hot</Text>
          <View style={styles.hotList}>
            {/* Hot cars horizontal list (empty for now) */}
            {loading ? (
              <ActivityIndicator color={colors.constant} size="small" />
            ) : filteredCars.length === 0 ? (
              <Text style={styles.emptyText}>No hot cars available.</Text>
            ) : (
              <FlatList
                data={filteredCars.slice(0, 2)}
                horizontal
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                  <CarCard car={item} cardStyle={{ marginRight: responsive.wp(4), width: responsive.wp(40) }} />
                )}
                showsHorizontalScrollIndicator={false}
              />
            )}
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabBar}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={styles.tab}
              onPress={() => setSelectedTab(tab.key)}
            >
              <Text style={[styles.tabText, selectedTab === tab.key && styles.tabActive]}>{tab.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Car List */}
        <View style={styles.carList}>
          {loading ? (
            <ActivityIndicator color={colors.constant} size="large" />
          ) : filteredCars.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No cars found for this brand.</Text>
            </View>
          ) : (
            filteredCars.map((car) => (
              <CarCard key={car.name} car={car} cardStyle={{ marginBottom: responsive.hp(2) }} />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 