import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Headers } from '../types/header'

interface Header1Props extends Headers {
  onPress?: () => void;
}

const Header1: React.FC<Header1Props> = ({ title, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.backButton}>
        <Image source={require('../assets/backtrack.png')} style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

export default Header1;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    width: '80%'
  },
});