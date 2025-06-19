import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useResponsiveScreen } from '../hooks/useResponsiveScreen';
import { useTheme } from '../styles/theme';
import { Feather } from '@expo/vector-icons';

interface CommunityPost {
  id: string;
  user: {
    name: string;
    ownerType: string;
    avatar: string;
  };
  title: string;
  image: string;
  timeAgo: string;
  views: number;
  comments: number;
  likes: number;
}

interface CommunityPostCardProps {
  post: CommunityPost;
  onPress: () => void;
}

const CommunityPostCard: React.FC<CommunityPostCardProps> = ({ post, onPress }) => {
  const { wp, hp, scale, orientation, isTablet } = useResponsiveScreen();
  const { colors } = useTheme();

  const isLandscape = orientation === 'landscape';

  const styles = StyleSheet.create({
    cardContainer: {
      backgroundColor: colors.cardOnWhitePage,
      borderRadius: scale(16),
      marginBottom: hp(2),
      padding: scale(isTablet ? 16 : 12),
    },
    userInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: hp(1.5),
    },
    avatar: {
      width: scale(isTablet ? 50 : 40),
      height: scale(isTablet ? 50 : 40),
      borderRadius: scale(isTablet ? 25 : 20),
      marginRight: wp(2),
    },
    textContainer: {
      flex: 1,
    },
    userName: {
      fontSize: scale(isTablet ? 16 : 14),
      fontWeight: 'bold',
      color: colors.text,
    },
    ownerType: {
      fontSize: scale(isTablet ? 12 : 10),
      color: colors.textSecondary,
    },
    followButton: {
      backgroundColor: colors.constant, // Use constant for the green background
      paddingVertical: hp(0.5),
      paddingHorizontal: wp(2.5), // Slightly more horizontal padding
      borderRadius: scale(15),
    },
    followButtonText: {
      color: colors.whiteText,
      fontSize: scale(isTablet ? 12 : 10),
      fontWeight: 'bold',
    },
    postTitle: {
      fontSize: scale(isTablet ? 18 : 15),
      fontWeight: '600',
      color: colors.text,
      marginBottom: hp(1.5),
    },
    postImage: {
      width: '100%',
      height: isLandscape ? (isTablet ? hp(35) : hp(30)) : hp(25),
      borderRadius: scale(12),
      marginBottom: hp(1.5),
      resizeMode: 'cover',
    },
    postFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    footerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    footerText: {
      fontSize: scale(isTablet ? 14 : 12),
      color: colors.textSecondary,
      marginLeft: wp(1),
    },
    iconButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: wp(isTablet ? 3 : 4),
    },
    timeAgo: {
      fontSize: scale(isTablet ? 14 : 12),
      color: colors.textSecondary,
    },
  });

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <View style={styles.userInfo}>
        <Image source={{ uri: post.user.avatar }} style={styles.avatar} />
        <View style={styles.textContainer}>
          <Text style={styles.userName}>{post.user.name}</Text>
          <Text style={styles.ownerType}>{post.user.ownerType}</Text>
        </View>
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followButtonText}>+ Follow</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.postTitle}>{post.title}</Text>
      <Image source={{ uri: post.image }} style={styles.postImage} />
      <View style={styles.postFooter}>
        <View style={styles.footerLeft}>
          <Text style={styles.timeAgo}>{post.timeAgo}</Text>
          <View style={styles.iconButton}>
            <Feather name="refresh-cw" size={scale(14)} color={colors.textSecondary} style={{ marginLeft: wp(4) }} />
            <Text style={styles.footerText}>{post.views}</Text>
          </View>
          <View style={styles.iconButton}>
            <Feather name="message-circle" size={scale(14)} color={colors.textSecondary} />
            <Text style={styles.footerText}>{post.comments}</Text>
          </View>
        </View>
        <View style={styles.iconButton}>
          <Feather name="thumbs-up" size={scale(14)} color={colors.constant} />
          <Text style={styles.footerText}>{post.likes}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CommunityPostCard; 