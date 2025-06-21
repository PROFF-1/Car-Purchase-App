import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useResponsiveScreen } from '../hooks/useResponsiveScreen';
import { useTheme } from '../styles/theme';
import { UserStoryCardProps } from '../types/components';

const UserStoryCard: React.FC<UserStoryCardProps> = ({ name, avatarUrl, onPress }) => {
  const { wp, hp, scale, isTablet } = useResponsiveScreen();
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      marginHorizontal: wp(2),
    },
    avatar: {
      width: scale(isTablet ? 70 : 50),
      height: scale(isTablet ? 70 : 50),
      borderRadius: scale(isTablet ? 35 : 25),
      borderWidth: 2,
      borderColor: colors.constant, // Example border color
    },
    name: {
      fontSize: scale(isTablet ? 14 : 12),
      color: colors.text,
      marginTop: hp(0.5),
    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: avatarUrl }} style={styles.avatar} />
      <Text style={styles.name} numberOfLines={1}>{name}</Text>
    </TouchableOpacity>
  );
};

export default UserStoryCard; 