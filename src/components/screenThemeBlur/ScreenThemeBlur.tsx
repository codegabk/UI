import React, { useState } from 'react';
import { Image, View, Pressable } from 'react-native';
import { height, width } from '@/utils/sizing';
import { Canvas, interpolateColors, LinearGradient, Rect, vec } from '@shopify/react-native-skia';
import { MovieCover } from '../../../assets';
import Icon from '@/components/icon/Icon';
import Animated, {
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import styles from './ScreenThemeBlur.styles';
import { SunIcon } from '../../../assets/icons';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const ScreenThemeBlur = () => {
  const [isLight, setIsLight] = useState(true);

  const scale = useSharedValue(1);
  const progress = useSharedValue(0);

  const scalingStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const containerStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(progress.value, [0, 1], ['#fff', '#000']),
  }));

  const titleStyle = useAnimatedStyle(() => ({
    color: interpolateColor(progress.value, [0, 1], ['#000', '#fff']),
  }));

  const contentStyle = useAnimatedStyle(() => ({
    color: interpolateColor(progress.value, [0, 1], ['#9e9e9e', '#6c6c6c']),
  }));

  const gradientColors = useDerivedValue(() => {
    return [
      interpolateColors(progress.value, [0, 1], ['#fff', '#000']),
      interpolateColors(progress.value, [0, 1], ['#ffffff00', '#00000000']),
    ];
  });

  const blurProps = useAnimatedProps(() => ({
    intensity: interpolate(scale.value, [1, 0.94], [0, 12]),
  }));

  const onPress = () => {
    scale.value = withTiming(0.94, {}, (isFinished) => {
      if (isFinished) {
        runOnJS(setIsLight)(!isLight);
        progress.value = withTiming(progress.value === 0 ? 1 : 0, {}, (isFinished) => {
          if (isFinished) {
            scale.value = withTiming(1, {});
          }
        });
      }
    });
  };

  return (
    <Animated.View style={[styles.flex, styles.padding, containerStyle]}>
      <Animated.View style={scalingStyle}>
        <Image source={MovieCover} style={styles.image} />
        <View style={styles.spacing24} />
        <Animated.Text style={[styles.title, titleStyle]}>Vice</Animated.Text>
        <View style={styles.spacing8} />
        <Animated.Text style={[styles.subtitle, titleStyle]}>
          By Elizabeth Hart and Suzette Moyer
        </Animated.Text>
        <View style={styles.spacing4} />
        <Animated.Text style={titleStyle}>Feb. 20, 2019</Animated.Text>
        <View style={styles.spacing24} />
        <Animated.Text style={[styles.content, contentStyle]}>
          Buckham: Although I like the sort of boldness of the poster, I had no idea what the film
          was about. I actually thought it was VICE, the news magazine. I had no idea it was about
          Dick Cheney. {'\n\n'}Millman: This poster has a problem with branding. This should have
          been called “Dick,” and it would have been great for a lot of reasons. I don’t understand
          how their lawyers let them use the word “vice.” It’s just so confusing, and it’s beyond my
          comprehension that something like this got by the marketing department. The illustration,
          while okay, is not so clear that it’s Dick Cheney. The typography is also problematic —
          the “E” in “Vice” ends up looking like an “M.” The whole thing is difficult. {'\n\n'}
          Opara: I think the colors are not correct. You could have been a little bit more
          patriotic. It had so much potential to be a great poster. {'\n\n'}
          Stehrenberger: I feel like “less is more” is always going to feel good design-wise. The
          posters that kind of go crazy are definitely going to feel dated after a certain time. I
          think “Vice” is going to feel dated. For me, it already does.
        </Animated.Text>
      </Animated.View>

      <Canvas style={styles.canvas}>
        <Rect x={0} y={0} width={width} height={height / 4}>
          <LinearGradient start={vec(0, height / 4)} end={vec(0, 0)} colors={gradientColors} />
        </Rect>
      </Canvas>

      <AnimatedBlurView style={styles.blurView} animatedProps={blurProps} />

      <Pressable onPressIn={onPress} style={styles.pressable}>
        <Icon Asset={SunIcon} width={28} height={28} fill={'none'} style={styles.icon} />
      </Pressable>
    </Animated.View>
  );
};

export default ScreenThemeBlur;
