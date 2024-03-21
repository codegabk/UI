import React from 'react';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';

import styles from './Currency.styles';

interface CurrencyProps {
  item: string;
  index: number;
  progress: SharedValue<number>;
}

const Currency = ({ progress, index, item }: CurrencyProps) => {
  const outputRange = useDerivedValue(() => (index === 0 ? [0, 40] : [-40, 0]));

  const currencyAS = useAnimatedStyle(() => ({
    transform: [{ translateY: interpolate(progress.value, [0, 1], outputRange.value) }],
  }));

  return <Animated.Text style={[styles.currency, currencyAS]}>{item}</Animated.Text>;
};

export default Currency;
