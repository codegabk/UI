import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';

import Icon from '../icon/Icon';

import { width } from '@/utils/sizing';

import { AlbumCover } from '../../../assets';
import { PlayIcon, ScreenCastIcon } from '../../../assets/icons';

import styles from './SimplePlayer.styles';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const SimplePlayer = () => {
  const progress = useSharedValue(0);
  const [isOpening, setIsOpening] = useState(false);

  const rotateOutputRange = isOpening ? [0, 10, 0] : [0, -10, 0];

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: interpolate(progress.value, [0, 1], [60, width - 40 * 2], Extrapolation.CLAMP),
      height: interpolate(progress.value, [0, 1], [60, width - 40 * 2], Extrapolation.CLAMP),
      transform: [
        {
          translateY: interpolate(progress.value, [0, 1], [0, -240]),
        },
        {
          rotate: `${interpolate(progress.value, [0, 0.5, 1], rotateOutputRange)}deg`,
        },
      ],
    };
  });

  const textStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(progress.value, [0, 1], [80, 0]),
      },
    ],
  }));

  const blurProps = useAnimatedProps(() => ({
    intensity: interpolate(progress.value, [0, 0.5, 1], [0, 10, 0]),
  }));

  const onPressIn = () => {
    if (progress.value === 0 || progress.value === 1) {
      setIsOpening((prev) => !prev);
      progress.value = withTiming(progress.value === 0 ? 1 : 0, { duration: 400 });
    }
  };

  return (
    <Pressable onPressIn={onPressIn} style={styles.pressable}>
      <View style={styles.innerView}>
        <View style={styles.absoluteView}>
          <Animated.Image source={AlbumCover} style={[styles.image, imageStyle]} />
          <Animated.View style={[styles.blurContainer, imageStyle]}>
            <AnimatedBlurView intensity={10} style={styles.flex} animatedProps={blurProps} />
          </Animated.View>
        </View>
        <Animated.View style={textStyle}>
          <Text style={styles.title}>Saint (Shallou Remix)</Text>
          <View style={styles.spacing} />
          <Text>Forester • 2022</Text>
        </Animated.View>
      </View>
      {!isOpening && (
        <Animated.View entering={ZoomIn} exiting={ZoomOut}>
          <Icon Asset={PlayIcon} fill={'black'} width={20} height={20} />
        </Animated.View>
      )}
      {isOpening && (
        <Animated.View entering={ZoomIn} exiting={ZoomOut}>
          <Icon Asset={ScreenCastIcon} fill={'black'} width={20} height={20} />
        </Animated.View>
      )}
    </Pressable>
  );
};
export default SimplePlayer;
