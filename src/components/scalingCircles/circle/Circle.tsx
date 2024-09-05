import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import React, { useEffect } from 'react';

interface CircleProps {
  index: number;
  color: string;
}

const duration = 1600;

const Circle = ({ index, color }: CircleProps) => {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withDelay(
      index * 100,
      withRepeat(withSequence(withTiming(1.5, { duration }), withTiming(1, { duration })), -1),
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      style={[
        {
          borderRadius: 80,
          position: 'absolute',
          backgroundColor: color,
          width: 160 - index * 24,
          height: 160 - index * 24,
        },
        animatedStyle,
      ]}
    />
  );
};

export default Circle;
