import Animated, {
  interpolateColor,
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import React from 'react';
import { LayoutChangeEvent } from 'react-native';
import { LayoutRectangle } from 'react-native/Libraries/Types/CoreEventTypes';

import { height } from '@/utils/sizing';

const VERTICAL_MARGIN = 12;

interface AnimatedTextProps {
  id: number;
  label: string;
  scrollOffset: SharedValue<number>;
  maxScrollOffset: SharedValue<number>;
}

const AnimatedText = ({ id, label, scrollOffset, maxScrollOffset }: AnimatedTextProps) => {
  const isSelected = useSharedValue(0);
  const textLayout = useSharedValue<LayoutRectangle | null>(null);

  const offsetStart = useDerivedValue(() => scrollOffset.value + height / 2);

  useAnimatedReaction(
    () => offsetStart.value,
    (data) => {
      const { y = 0, height = 0 } = textLayout.value ?? {};
      const inRange = data >= y - VERTICAL_MARGIN && data <= y + height + VERTICAL_MARGIN;

      if (scrollOffset.value > 0 && scrollOffset.value < maxScrollOffset.value) {
        isSelected.value = withTiming(inRange ? 1 : 0, { duration: 200 });
      }
    },
  );

  const animatedStyle = useAnimatedStyle(() => ({
    color: interpolateColor(isSelected.value, [0, 1], ['#393A40', '#EEEEF0']),
  }));

  const onLayout = (e: LayoutChangeEvent) => {
    if (id === 0) {
      isSelected.value = withTiming(1);
    }

    if (!textLayout.value) {
      textLayout.value = e.nativeEvent.layout;
    }
  };

  return (
    <Animated.Text
      onLayout={onLayout}
      style={[
        { fontSize: 28, fontWeight: 'bold', marginVertical: VERTICAL_MARGIN },
        animatedStyle,
      ]}>
      {label}
    </Animated.Text>
  );
};

export default AnimatedText;
