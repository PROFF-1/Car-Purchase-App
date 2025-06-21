import React from 'react';
import { KeyboardTypeOptions, ViewStyle } from 'react-native';

export interface UserStoryCardProps {
  name: string;
  avatarUrl: string;
  onPress: () => void;
}

export interface SectionHeaderProps {
  title: string;
  onMore?: () => void;
  containerStyle?: any;
}

export interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: any;
}

export interface InputFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  rightIcon?: React.ReactNode;
}

export interface CustomButtonProps {
  onPress: () => void;
  title?: string;
  style?: ViewStyle;
}

export interface CountryCodePickerProps {
  onPhoneChange?: (value: string) => void;
  style?: ViewStyle;
}

export interface CitySelectorProps {
  city: string;
  onPress: () => void;
}

export interface BannerCarouselProps {
  style?: any;
} 