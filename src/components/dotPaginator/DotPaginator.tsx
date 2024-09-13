import { Pressable, Text, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import React from 'react';

import Dot from '@/components/dotPaginator/dot/Dot';

import styles from './DotPaginator.styles';

const DotPaginator = () => {
  const stepsArray = Array.from({ length: 3 }, (_, index) => index);

  const widthArray = stepsArray.map((index) => (index + 1) * 24 + 8 * index);

  const step = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    width: interpolate(step.value, stepsArray, widthArray),
  }));

  const onPressIn = () => {
    if (step.value < stepsArray.length - 1) {
      step.value = withSpring(step.value + 1);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Animated.View style={[styles.bar, animatedStyle]} />
        {stepsArray.map((_, index) => (
          <Dot key={index} index={index} step={step} />
        ))}
      </View>

      <Pressable onPressIn={onPressIn}>
        <Text style={styles.next}>Next</Text>
      </Pressable>
    </>
  );
};

export default DotPaginator;
