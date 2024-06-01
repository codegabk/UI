import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import Animated, {
  clamp,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import { Canvas, interpolateColors, LinearGradient, Rect, vec } from '@shopify/react-native-skia';

import Card from '@/components/scrollWheel/card/Card';

import { height, width } from '@/utils/sizing';

import styles from './ScrollWheel.styles';

import { GoldExpressCard, GrayExpressCard, GreenExpressCard } from '../../../assets';

const cards = [
  {
    id: 0,
    Asset: GreenExpressCard,
    startColor: '#99cbba',
    endColor: '#1d2723',
    label: 'AE® Green Card',
    number: '**** 1117',
  },
  {
    id: 1,
    Asset: GrayExpressCard,
    startColor: '#ccced0',
    endColor: '#2c2c2d',
    label: 'AE® Gray Card',
    number: '**** 0302',
  },
  {
    id: 2,
    Asset: GoldExpressCard,
    startColor: '#ede2a0',
    endColor: '#231c0c',
    label: 'AE® Gold Card',
    number: '**** 1122',
  },
];

const ScrollWheel = () => {
  const scrollX = useSharedValue(0);

  const cardLength = cards.length;

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollX.value = clamp(event.contentOffset.x / width, 0, cardLength - 1);
  });

  const startColors = cards.map(({ startColor }) => startColor);
  const endColors = cards.map(({ endColor }) => endColor);

  const inputRange = Array.from({ length: cardLength }, (_, index) => index);

  const gradientColors = useDerivedValue(() => {
    return [
      interpolateColors(scrollX.value, inputRange, startColors),
      interpolateColors(scrollX.value, inputRange, endColors),
    ];
  });

  const outputRange = Array.from({ length: cardLength }, (_, index) => -index * width);

  const cardInfoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: interpolate(scrollX.value, inputRange, outputRange) }],
  }));

  return (
    <>
      <Canvas style={{ width, height, position: 'absolute' }}>
        <Rect x={0} y={0} width={width} height={height}>
          <LinearGradient start={vec(0, 0)} end={vec(width, height)} colors={gradientColors} />
        </Rect>
      </Canvas>
      <Animated.View style={[styles.cardInfoContainer, cardInfoAnimatedStyle]}>
        {cards.map(({ id, label, number }) => (
          <View style={styles.cardInfo} key={id}>
            <Text style={styles.cardInfoText}>{label}</Text>
            <Text style={styles.cardInfoNumber}>{number}</Text>
          </View>
        ))}
      </Animated.View>
      <View style={styles.cardContainer}>
        {cards.map(({ id, Asset }) => (
          <Card id={id} Asset={Asset} key={id} scrollX={scrollX} cardsLength={cardLength} />
        ))}
      </View>
      <Animated.ScrollView
        horizontal
        snapToInterval={width}
        onScroll={onScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}>
        <View style={{ width: cardLength * width }} />
      </Animated.ScrollView>
      <StatusBar style="auto" />
    </>
  );
};

export default ScrollWheel;
