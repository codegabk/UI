import Animated, { interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { View } from 'react-native';
import React from 'react';

import styles from './Slide.styles';

interface SlideProps {
  index: number;
  containerSize: number;
  backgroundColor: string;
  offset: SharedValue<number>;
}

const Slide = ({ offset, index, backgroundColor, containerSize }: SlideProps) => {
  const inputRange = [
    (index - 1) * containerSize,
    index * containerSize,
    (index + 1) * containerSize,
  ];

  const as = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(offset.value, inputRange, [0.8, 1, 0.8]) }],
  }));

  return (
    <Animated.View key={index} style={[styles.slideContainer, as]}>
      <View style={[styles.slide, { backgroundColor }]}>
        <View style={styles.contentContainer}>
          <View style={styles.avatar} />
          <View style={styles.title} />
          <View style={styles.subtitle} />
        </View>
      </View>
    </Animated.View>
  );
};

export default Slide;
