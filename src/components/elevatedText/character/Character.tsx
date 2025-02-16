import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import React, { useEffect } from 'react';
import { ViewStyle } from 'react-native';

interface ICharacterProps {
  index: number;
  delay: number;
  letter: string;
  style?: ViewStyle;
}

const Character = ({ index, delay, letter, style }: ICharacterProps) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(40);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  useEffect(() => {
    opacity.value = withDelay(
      delay * index,
      withTiming(1, { duration: 500, easing: Easing.out(Easing.cubic) }),
    );

    translateY.value = withDelay(
      delay * index,
      withTiming(0, { duration: 500, easing: Easing.out(Easing.cubic) }),
    );
  }, [delay, index, opacity, translateY]);

  return (
    <Animated.Text
      style={[
        {
          fontSize: 40,
          color: 'black',
        },
        style,
        animatedStyle,
      ]}>
      {letter}
    </Animated.Text>
  );
};

export default Character;
