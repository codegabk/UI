import React from 'react';
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import styles from './Dot.styles';

interface IDotProps {
  id: number;
  progress: SharedValue<number>;
}

const Dot = ({ id, progress }: IDotProps) => {
  const inputRange = [id - 1, id, id + 1];

  const animatedStyle = useAnimatedStyle(() => ({
    width: interpolate(progress.value, inputRange, [10, 30, 10], Extrapolation.CLAMP),
    backgroundColor: interpolateColor(progress.value, inputRange, [
      '#6b6660',
      '#25201f',
      '#6b6660',
    ]),
  }));

  return <Animated.View style={[styles.dot, animatedStyle]} />;
};

export default Dot;
