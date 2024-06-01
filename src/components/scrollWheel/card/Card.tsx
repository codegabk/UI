import React, { useEffect } from 'react';
import { Image } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
  Extrapolation,
  SlideInDown,
  Easing,
  SharedValue,
} from 'react-native-reanimated';

import styles from './Card.styles';
import { ImageRequireSource } from 'react-native/Libraries/Image/ImageSource';

interface CardProps {
  id: number;
  cardsLength: number;
  Asset: ImageRequireSource;
  scrollX: SharedValue<number>;
}

const duration = 1000;
const delay = 100;

const Card = ({ id, Asset, scrollX, cardsLength }: CardProps) => {
  const cardId = useSharedValue(0);

  useEffect(() => {
    setTimeout(
      () => {
        cardId.value = withTiming(id);
      },
      duration + delay * cardsLength,
    );
  }, []);

  const inputRange = useDerivedValue(() => [cardId.value - 1, cardId.value, cardId.value + 1]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${interpolate(scrollX.value, inputRange.value, [12, 0, -12])}deg`,
      },
      {
        translateY: interpolate(scrollX.value, inputRange.value, [0, -80, 0], Extrapolation.CLAMP),
      },
    ],
  }));

  return (
    <Animated.View
      entering={SlideInDown.duration(duration)
        .delay(id * delay)
        .easing(Easing.inOut(Easing.quad))}
      key={id}
      style={[styles.card, animatedStyle]}>
      <Image source={Asset} style={styles.cardImage} />
    </Animated.View>
  );
};

export default Card;
