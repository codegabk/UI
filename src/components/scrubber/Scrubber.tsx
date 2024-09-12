import Animated, {
  cancelAnimation,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import React from 'react';
import { View } from 'react-native';
import { ReText, snapPoint } from 'react-native-redash';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

import makeStyles from './Scrubber.styles';

import { width } from '@/utils/sizing';

const PADDING = 20;
const INDICATOR_WIDTH = 2;

const Scrubber = () => {
  const styles = makeStyles(PADDING, INDICATOR_WIDTH);

  const array = Array.from({ length: 20 }, (_, index) => index);

  // 24 = PADDING (20) + size (2) + container border (2)
  const maxTranslateX = width * 0.8 - PADDING - 4;

  const totalViewWidth = (array.length + 1) * INDICATOR_WIDTH;
  const spacing = (width * 0.8 - 2 * PADDING - totalViewWidth) / (array.length - 1);
  const snapPoints = array.map((_, index) => PADDING + index * (INDICATOR_WIDTH + spacing));

  const translationX = useSharedValue(PADDING);
  const contextTranslationX = useSharedValue(PADDING);

  const reText = useDerivedValue(
    () =>
      `${interpolate(
        translationX.value,
        [PADDING, maxTranslateX],
        [20, 40],
        Extrapolation.CLAMP,
      ).toFixed(0)}°C`,
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translationX.value }],
  }));

  const pan = Gesture.Pan()
    .onStart(() => {
      cancelAnimation(translationX);

      contextTranslationX.value = translationX.value;
    })
    .onUpdate((event) => {
      translationX.value = contextTranslationX.value + event.translationX;
    })

    .onEnd((event) => {
      translationX.value = withSpring(snapPoint(translationX.value, event.velocityX, snapPoints));
    })
    .shouldCancelWhenOutside(false);

  return (
    <GestureDetector gesture={pan}>
      <View style={styles.container}>
        {array.map((_, index) => (
          <View key={index} style={styles.indicator} />
        ))}
        <Animated.View style={[styles.selector, animatedStyle]} />
        <Animated.View style={[styles.textContainer, animatedStyle]}>
          <ReText text={reText} style={{ color: 'white', fontWeight: 'bold' }} />
        </Animated.View>
      </View>
    </GestureDetector>
  );
};

export default Scrubber;
