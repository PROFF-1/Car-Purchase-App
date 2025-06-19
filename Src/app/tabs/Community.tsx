import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../styles/theme';
import { useResponsiveScreen } from '../../hooks/useResponsiveScreen';
import SearchBar from '../../components/SearchBar';
import UserStoryCard from '../../components/UserStoryCard';
import CommunityPostCard from '../../components/CommunityPostCard';
import { Feather } from '@expo/vector-icons';

// Sample Data (will be replaced by backend integration)
const USER_STORIES = [
  { id: '1', name: 'Abbey', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { id: '2', name: 'Aaron', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
  { id: '3', name: 'Mabel', avatar: 'https://randomuser.me/api/portraits/women/3.jpg' },
  { id: '4', name: 'Palmer', avatar: 'https://randomuser.me/api/portraits/men/4.jpg' },
  { id: '5', name: 'Talbot', avatar: 'https://randomuser.me/api/portraits/men/5.jpg' },
  { id: '6', name: 'Waldo', avatar: 'https://randomuser.me/api/portraits/men/6.jpg' },
  // Add more as needed
];

const COMMUNITY_POSTS = [
  {
    id: 'p1',
    user: { name: 'Prescott', ownerType: 'BMW 3 Series owner', avatar: 'https://randomuser.me/api/portraits/men/7.jpg' },
    title: 'Volkswagen T-Roc: Interior dimensions revealed',
    image: 'https://images.unsplash.com/photo-1628108428172-5a2d6c1b3f9c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    timeAgo: '5 days ago',
    views: 34,
    comments: 20,
    likes: 68,
  },
  {
    id: 'p2',
    user: { name: 'Jennifer', ownerType: 'Mercedes-AMG GT R owner', avatar: 'https://randomuser.me/api/portraits/women/8.jpg' },
    title: 'Dramatic, fast and useable, with Mercedes\' thoroughness and AMG\'s sporting genes.',
    image: 'https://images.unsplash.com/photo-1599434861621-c4d3b0e1b1d7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    timeAgo: '8 days ago',
    views: 18,
    comments: 83,
    likes: 99,
  },
  {
    id: 'p3',
    user: { name: 'Jennifer', ownerType: 'Mercedes-AMG GT R owner', avatar: 'https://randomuser.me/api/portraits/women/8.jpg' },
    title: 'Dramatic, fast and useable, with Mercedes\' thoroughness and AMG\'s sporting genes.',
    image: 'https://images.unsplash.com/photo-1599434861621-c4d3b0e1b1d7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    timeAgo: '8 days ago',
    views: 18,
    comments: 83,
    likes: 99,
  },
  // Add more as needed
];

export default function Community() {
  const { colors } = useTheme();
  const { wp, hp, scale, orientation, isTablet } = useResponsiveScreen();
  const [searchQuery, setSearchQuery] = useState('');

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
      paddingVertical: hp(2),
    },
    plusIcon: {
      padding: scale(8),
      borderRadius: scale(20),
      backgroundColor: colors.cardOnWhitePage,
      marginLeft: wp(2),
    },
    userStoriesList: {
      paddingHorizontal: wp(4),
      paddingVertical: hp(1),
      marginBottom: hp(2),
    },
    recommendSection: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: wp(4),
      marginBottom: hp(1),
    },
    recommendText: {
      fontSize: scale(16),
      color: colors.constant, // Assuming 'constant' is for accent colors
      fontWeight: 'bold',
    },
    postList: {
      paddingHorizontal: wp(4),
      paddingBottom: hp(10),
    }
  });

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search"
          style={{ flex: 1, marginRight: wp(2), 
            height: orientation === 'portrait' ? hp(5) : (isTablet ? hp(7) : hp(6)),
            borderRadius: scale(24),
            paddingVertical: hp(1),
          }}
        />
        <TouchableOpacity style={styles.plusIcon}>
          <Feather name="plus" size={scale(20)} color={colors.text} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={USER_STORIES}
        renderItem={({ item }) => (
          <UserStoryCard
            name={item.name}
            avatarUrl={item.avatar}
            onPress={() => { /* Handle story press */ }}
          />
        )}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.userStoriesList}
      />

      <View style={styles.recommendSection}>
        <Text style={styles.recommendText}>Recommend</Text>
        <Feather name="chevron-down" size={scale(16)} color={colors.constant} style={{ marginLeft: wp(1) }} />
      </View>

      <FlatList
        data={COMMUNITY_POSTS}
        renderItem={({ item }) => (
          <CommunityPostCard
            post={item}
            onPress={() => { /* Handle post press */ }}
          />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.postList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({})