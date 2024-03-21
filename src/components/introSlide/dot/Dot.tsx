import React, { useEffect } from 'react';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';

import styles from './Dot.styles';

export interface DotProps {
  index: number;
  containerSize?: number;
  dataLength: number;
  backgroundColor: string;
  interpolateOnWidth?: boolean;
  offset: SharedValue<number>;
}

const Dot = ({ offset, backgroundColor, index, containerSize = 0, dataLength }: DotProps) => {
  const formattedInput = useDerivedValue(() => {
    return offset.value / containerSize;
  });

  const count = useSharedValue(index + 1);
  const inputRange = useSharedValue([index - 1, index, index + 1]);
  const outputRange = useSharedValue([10, 20, 10]);

  const inputRangeLength = inputRange.value.length;
  const inputRangeLastItem = inputRange.value[inputRangeLength - 1];

  useEffect(() => {
    count.value += 1;
    inputRange.value = [
      ...inputRange.value,
      inputRangeLastItem + 1,
      inputRangeLastItem + 2,
      inputRangeLastItem + 3,
    ];
    outputRange.value = [...outputRange.value, ...outputRange.value.splice(0, 3)];
  }, [dataLength]);

  const dotAS = useAnimatedStyle(() => {
    return {
      width: interpolate(
        formattedInput.value,
        inputRange.value,
        outputRange.value,
        Extrapolation.CLAMP,
      ),
    };
  });

  return <Animated.View style={[styles.dot, { backgroundColor }, dotAS]} />;
};

export default Dot;
