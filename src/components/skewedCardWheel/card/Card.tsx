import React from 'react';
import { View, Text } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { width } from '@/utils/sizing';

import styles from './Card.styles';

interface CardProps {
  offsetX: SharedValue<number>;
  item: string;
  index: number;
}

const Card = ({ offsetX, item, index }: CardProps) => {
  const transformInputRange = [index - 2, index - 1, index, index + 1, index + 2];

  const animatedStyle = useAnimatedStyle(() => {
    const transformValue = offsetX.value / width;

    return {
      transform: [
        { translateX: offsetX.value },
        {
          rotate: `${interpolate(
            transformValue,
            transformInputRange,
            [0, 14, 0, -14, 0],
            Extrapolation.CLAMP,
          )}deg`,
        },
        {
          rotateY: `${interpolate(
            transformValue,
            transformInputRange,
            [0, -14, 0, 14, 0],
            Extrapolation.CLAMP,
          )}deg`,
        },
        {
          scale: interpolate(
            transformValue,
            transformInputRange,
            [0.3, 0.9, 1, 0.9, 0.3],
            Extrapolation.CLAMP,
          ),
        },
        {
          translateY: interpolate(
            transformValue,
            transformInputRange,
            [0, -26, 0, -26, 0],
            Extrapolation.CLAMP,
          ),
        },
        {
          skewY: `${interpolate(
            transformValue,
            transformInputRange,
            [0, -14, 0, 14, 0],
            Extrapolation.CLAMP,
          )}deg`,
        },
      ],
      zIndex: interpolate(transformValue, [index - 1, index, index + 1], [-4, 0, -6]),
    };
  });

  return (
    <>
      <Animated.View style={[styles.cardContainer, animatedStyle]}>
        <View
          style={[
            styles.card,
            {
              backgroundColor: item,
            },
          ]}>
          <Text style={styles.cardText}>{index}</Text>
        </View>
      </Animated.View>
      <View style={{ width }} />
    </>
  );
};

export default Card;
