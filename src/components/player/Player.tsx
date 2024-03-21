import React from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  runOnJS,
  withTiming,
  interpolate,
  Extrapolation,
  useSharedValue,
  useDerivedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import Icon from '@/components/icon/Icon';
import Pressable from '@/components/pressable/Pressable';

import { height, width } from '@/utils/sizing';

import {
  PlayIcon,
  SwapIcon,
  ShuffleIcon,
  SkipBackIcon,
  ArrowDownIcon,
  ScreenCastIcon,
  SkipForwardIcon,
  DotsThreeVerticalIcon,
} from '../../../assets/icons';
import styles from './Player.styles';

const INITIAL_VALUE = 0;
const INITIAL_WIDTH = width - 20 * 2;
const BOTTOM_POSITION = height - 100;

const Player = () => {
  const { top, bottom } = useSafeAreaInsets();

  const start = useSharedValue(INITIAL_VALUE);
  const offset = useSharedValue(INITIAL_VALUE);
  const velocity = useSharedValue(INITIAL_VALUE);
  const isClosed = useSharedValue(false);

  const containerAs = useAnimatedStyle(() => ({
    transform: [{ translateY: interpolate(offset.value, [0, height], [0, height]) }],
  }));

  const opacityInputEnd = useDerivedValue(() => (isClosed.value ? BOTTOM_POSITION : height / 4));

  const opacityAs = useAnimatedStyle(() => ({
    opacity: interpolate(offset.value, [0, opacityInputEnd.value], [1, 0]),
  }));

  const albumAs = useAnimatedStyle(() => ({
    width: interpolate(offset.value, [0, height], [INITIAL_WIDTH, 10], Extrapolation.CLAMP),
    transform: [
      {
        translateY: interpolate(offset.value, [0, height], [0, -height * 0.14]),
      },
    ],
  }));

  const closedTrackAs = useAnimatedStyle(() => ({
    opacity: interpolate(offset.value, [height / 2, height], [0, 1]),
    transform: [
      {
        translateX: interpolate(offset.value, [0, height - 100], [width, 0]),
      },
    ],
  }));

  const expand = () => {
    start.value = INITIAL_VALUE;
    offset.value = withTiming(
      INITIAL_VALUE,
      {
        easing: Easing.out(Easing.circle),
      },
      (isFinished) => {
        if (isFinished) {
          isClosed.value = false;
        }
      },
    );
  };

  const close = () => {
    start.value = BOTTOM_POSITION;
    offset.value = withTiming(
      BOTTOM_POSITION,
      {
        easing: Easing.out(Easing.circle),
      },
      (isFinished) => {
        if (isFinished) {
          isClosed.value = true;
        }
      },
    );
  };

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      velocity.value = e.velocityY;
      offset.value = Math.min(Math.max(e.translationY + start.value, 0), BOTTOM_POSITION);
    })
    .onEnd(() => {
      if (offset.value + velocity.value < height / 2) {
        runOnJS(expand)();
      } else {
        runOnJS(close)();
      }
    });

  return (
    <GestureDetector gesture={pan}>
      <View>
        <Animated.View
          style={[
            styles.container,
            {
              paddingTop: top,
              paddingBottom: bottom,
            },
            containerAs,
          ]}>
          <Animated.View style={[styles.spaceBetween, opacityAs]}>
            <Pressable onPressOut={close}>
              <Icon Asset={ArrowDownIcon} fill={'#FFFFFF'} />
            </Pressable>
            <View style={styles.trailingIcons}>
              <Icon Asset={ScreenCastIcon} fill={'#FFFFFF'} />
              <Icon Asset={DotsThreeVerticalIcon} fill={'#FFFFFF'} />
            </View>
          </Animated.View>

          <View style={styles.albumZIndex}>
            <Pressable
              noAnimation
              onPressOut={() => {
                if (offset.value === BOTTOM_POSITION) {
                  expand();
                }
              }}>
              <Animated.View style={[styles.album, albumAs]} />
            </Pressable>
          </View>

          <Animated.View style={[styles.closedContainer, closedTrackAs, { zIndex: 0 }]}>
            <View style={styles.closedContentContainer}>
              <View style={styles.closedTrailingIcons}>
                <Icon Asset={ScreenCastIcon} fill={'#FFFFFF'} />
                <Icon Asset={PlayIcon} fill={'#FFFFFF'} />
              </View>
              <View style={styles.closedTrack} />
            </View>
          </Animated.View>

          <Animated.View style={opacityAs}>
            <View style={styles.title} />
            <View style={styles.subtitle} />
            <View style={styles.options}>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <View style={styles.option} key={index} />
                ))}
            </View>
            <View style={styles.track} />
            <View style={styles.spaceBetween}>
              <Text style={styles.text}>0:00</Text>
              <Text style={styles.text}>11:17</Text>
            </View>
            <View style={styles.spaceBetween}>
              <Icon Asset={ShuffleIcon} fill={'#FFFFFF'} />
              <Icon Asset={SkipBackIcon} fill={'#FFFFFF'} />
              <Icon Asset={PlayIcon} fill={'#FFFFFF'} />
              <Icon Asset={SkipForwardIcon} fill={'#FFFFFF'} />
              <Icon Asset={SwapIcon} fill={'#FFFFFF'} />
            </View>
          </Animated.View>
        </Animated.View>
      </View>
    </GestureDetector>
  );
};

export default Player;
