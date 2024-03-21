import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import React, { useCallback, useEffect, useImperativeHandle } from 'react';

import styles from './AnimatedCharacter.styles';

interface AnimatedCharacterProps {
  item: string;
  index: number;
  animationRef: React.Ref<{ triggerAnimation: () => void }>;
}

const AnimatedCharacter = ({ item, index, animationRef }: AnimatedCharacterProps) => {
  const sv = useSharedValue(1);

  const triggerAnimation = useCallback(() => {
    sv.value = withDelay(
      index * 50,
      withTiming(1.3, { duration: 100 }, (isFinished) => {
        if (isFinished) {
          sv.value = withTiming(1);
        }
      }),
    );
  }, []);

  useImperativeHandle(animationRef, () => ({ triggerAnimation }), [triggerAnimation]);

  useEffect(() => {
    triggerAnimation();
  }, []);

  const characterAS = useAnimatedStyle(() => ({
    transform: [{ scale: sv.value }],
    color: interpolateColor(sv.value, [1, 1.2], ['#000000', '#007AFF']),
  }));

  return <Animated.Text style={[styles.text, characterAS]}>{item}</Animated.Text>;
};

export default AnimatedCharacter;
