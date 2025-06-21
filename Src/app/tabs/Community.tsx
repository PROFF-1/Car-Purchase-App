import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../styles/theme';
import { useResponsiveScreen } from '../../hooks/useResponsiveScreen';
import SearchBar from '../../components/SearchBar';
import UserStoryCard from '../../components/UserStoryCard';
import CommunityPostCard from '../../components/CommunityPostCard';
import { Feather } from '@expo/vector-icons';
import { userStories, communityPosts } from '../../mockup';

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
        data={userStories}
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
        data={communityPosts}
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