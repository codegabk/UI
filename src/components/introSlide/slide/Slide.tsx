import React from 'react';
import { Text, View } from 'react-native';
import LottieView, { AnimationObject } from 'lottie-react-native';
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated';

import { DotProps } from '@/components/introSlide/dot/Dot';

import { width } from '@/utils/sizing';

import styles from './Slide.styles';

export interface SlideProps extends DotProps {
  title: string;
  subtitle: string;
  asset: AnimationObject;
  backgroundColor: string;
}

const Slide = ({ title, subtitle, asset, index, offset, backgroundColor }: SlideProps) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const contentAS = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(offset.value, inputRange, [200, 0, -200], Extrapolation.CLAMP),
      },
    ],
  }));

  const circleAS = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(offset.value, inputRange, [1, 10, 10], Extrapolation.CLAMP),
      },
    ],
  }));

  return (
    <View style={[{ width }]}>
      <Animated.View style={[styles.header, contentAS]}>
        <LottieView autoPlay source={asset} style={styles.lottie} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </Animated.View>
      <Animated.View style={[styles.circle, circleAS, { backgroundColor }]} />
    </View>
  );
};

export default Slide;
