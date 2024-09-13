import Animated, {
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import React from 'react';

import styles from './Dot.styles';

interface DotProps {
  index: number;
  step: SharedValue<number>;
}

const Dot = ({ step, index }: DotProps) => {
  const progress = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    progress.value = withTiming(step.value >= index ? 1 : 0);

    return {
      backgroundColor: interpolateColor(progress.value, [0, 1], ['#D8D9E0', '#FFFFFF']),
    };
  });

  return <Animated.View style={[styles.dot, animatedStyles]} />;
};

export default Dot;
