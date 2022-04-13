import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {DEFAULT_HEIGHT, DEFAULT_WIDTH} from '../data/MockData';

export default function Loading() {
  return (
    <View
      style={{
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT * 0.43,
        marginTop: 50,
        alignItems: 'center',
      }}>
      <Image source={require('../img/loading.gif')} style={styles.animation} />
    </View>
  );
}
const styles = StyleSheet.create({
  animation: {
    width: 120,
    height: 120,
  },
});
