import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../styles/theme';
import { useResponsiveScreen } from '../hooks/useResponsiveScreen';

interface Car {
  name: string;
  price: string;
  image?: string;
  Svg?: React.ComponentType<any>;
  colors: string[];
  favorite: boolean;
  description: string;
}

interface CarCardProps {
  car: Car;
  onPress?: () => void;
  onFavorite?: () => void;
  cardStyle?: any;
  svgSize?: { width: number; height: number };
}

export default function CarCard({ car, onPress, onFavorite, cardStyle, svgSize }: CarCardProps) {
  const { colors } = useTheme();
  const { wp, hp, orientation, scale } = useResponsiveScreen();
  const SvgIcon = car.Svg;

  return (
    <TouchableOpacity style={[styles.card, cardStyle, { backgroundColor: colors.cardOnWhitePage }]} onPress={onPress}>
      <View style={[styles.offerTag, { backgroundColor: '#D4EDDA' }]}>
        <Text style={[styles.offerText, { color: '#155724' }]}>Offer</Text>
      </View>

      <TouchableOpacity style={[styles.heart, { top: scale(10), right: scale(10) }]} onPress={onFavorite}>
        <Feather name="heart" size={18} color={car.favorite ? 'red' : colors.textSecondary} />
      </TouchableOpacity>

      <View style={styles.imageSvgContainer}>
        {SvgIcon ? (
          <SvgIcon
            width={svgSize ? svgSize.width : wp(40)}
            height={svgSize ? svgSize.height : (orientation === 'portrait' ? hp(12) : wp(20))}
          />
        ) : car.image ? (
          <Image
            source={{ uri: car.image }}
            style={{
              width: svgSize ? svgSize.width : wp(40),
              height: svgSize ? svgSize.height : (orientation === 'portrait' ? hp(12) : wp(20)),
              borderRadius: 8,
            }}
            resizeMode="contain"
          />
        ) : null}
      </View>
      <Text style={[styles.name, { color: colors.text }]}>{car.name}</Text>
      <Text style={[styles.description, { color: colors.textSecondary, fontSize: scale(12) }]}>{car.description}</Text>
      <Text style={[styles.price, { color: colors.constant }]}>{car.price}</Text>
      <View style={styles.colors}>
        {car.colors.map((c: string, i: number) => (
          <View key={i} style={[styles.colorDot, { backgroundColor: c }]} />
        ))}
      </View>
      <Feather name="arrow-right" size={18} color={colors.textSecondary} style={styles.arrow} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
    marginBottom: 8,
    position: 'relative',
  },
  offerTag: {
    position: 'absolute',
    top: 0,
    left: 0,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderTopLeftRadius: 16,
    borderBottomRightRadius: 8,
  },
  offerText: {
    fontWeight: 'bold',
    fontSize: 10,
  },
  imageSvgContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 0,
  },
  image: {
    borderRadius: 8,
  },
  heart: {
    position: 'absolute',
    zIndex: 2,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 2,
    alignSelf: 'flex-start',
  },
  description: {
    fontSize: 12,
    marginBottom: 4,
    alignSelf: 'flex-start',
  },
  price: {
    fontWeight: '500',
    fontSize: 14,
    marginBottom: 4,
    alignSelf: 'flex-start',
  },
  colors: {
    flexDirection: 'row',
    marginBottom: 4,
    alignSelf: 'flex-start',
  },
  colorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 4,
  },
  arrow: {
    alignSelf: 'flex-end',
    marginTop: 'auto',
  },
});