import React from 'react';
import { Canvas, Fill, interpolateColors, LinearGradient, vec } from '@shopify/react-native-skia';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatedScrollView } from 'react-native-reanimated/lib/typescript/reanimated2/component/ScrollView';

import Card from './card/Card';

import { height, width } from '@/utils/sizing';

import styles from './SkewedCardWheel.styles';

const colors = ['#E63946', '#F4A261', '#E9C46A', '#2A9D8F', '#457B9D', '#6A4C93', '#D62828'];

const SkewedCardWheel = () => {
  const ref = useRef<AnimatedScrollView>(null);
  const timeout = useRef<NodeJS.Timeout | undefined>();

  const offsetX = useSharedValue(0);
  const rotate = useSharedValue(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [absoluteX, setAbsoluteX] = useState<number | null>(null);

  const length = colors.length - 1;
  const inputRange = Array.from({ length }, (_, index) => index);

  const offsetPerWidth = useDerivedValue(() => offsetX.value / width);

  const gradientColors = useDerivedValue(() => [
    'white',
    interpolateColors(offsetPerWidth.value, inputRange, colors),
  ]);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    offsetX.value = event.contentOffset.x;
    runOnJS(setCurrentIndex)(Math.round(offsetPerWidth.value));
  });

  const array = Array.from({ length }, (_, index) => colors[index]);

  const scrollTo = useCallback(
    (next = true) => {
      const newIndex = next ? currentIndex + 1 : currentIndex - 1;

      if (newIndex >= 0 && newIndex < length) {
        rotate.value = withTiming(next ? -Math.PI / 2 : Math.PI / 2);

        ref.current?.scrollTo({ x: width * newIndex });
      }
    },
    [currentIndex],
  );

  useEffect(() => {
    if (absoluteX) {
      timeout.current = setTimeout(() => {
        if (absoluteX >= width / 2) {
          scrollTo();
        } else {
          scrollTo(false);
        }
      }, 400);

      return () => {
        clearTimeout(timeout.current);
      };
    } else {
      rotate.value = withTiming(0);
    }
  }, [absoluteX, scrollTo]);

  const longPress = Gesture.LongPress()
    .onStart((e) => {
      const { absoluteX } = e;
      runOnJS(setAbsoluteX)(absoluteX);
    })
    .onFinalize(() => {
      runOnJS(setAbsoluteX)(null);
    })
    .minDuration(100);

  const transform = useDerivedValue(() => {
    return [{ rotate: rotate.value }];
  });

  return (
    <>
      <Canvas style={styles.canvas}>
        <Fill transform={transform} origin={vec(width / 2, height / 2)}>
          <LinearGradient start={vec(0, height / 2)} end={vec(0, height)} colors={gradientColors} />
        </Fill>
      </Canvas>
      <GestureDetector gesture={longPress}>
        <Animated.ScrollView
          ref={ref}
          horizontal
          pagingEnabled
          onScroll={scrollHandler}
          contentContainerStyle={styles.scrollContainer}>
          {array.map((item, index) => (
            <Card item={item} index={index} key={index} offsetX={offsetX} />
          ))}
        </Animated.ScrollView>
      </GestureDetector>
    </>
  );
};

export default SkewedCardWheel;
