import React, { useEffect } from 'react';
import Animated, {
  withDelay,
  withTiming,
  useSharedValue,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';

import styles from './ConnectivityBanner.styles';

interface ConnectivityBannerProps {
  isConnected: boolean;
}

const ConnectivityBanner = ({ isConnected }: ConnectivityBannerProps) => {
  const heightSv = useSharedValue(0);
  const colorSv = useSharedValue(0);

  const bannerAS = useAnimatedStyle(() => ({
    height: heightSv.value,
    backgroundColor: interpolateColor(colorSv.value, [0, 1], ['#30A46C', '#E5484D']),
  }));

  const textAS = useAnimatedStyle(() => ({
    color: interpolateColor(colorSv.value, [0, 1], ['#B1F1CB', '#FFD1D9']),
  }));

  useEffect(() => {
    if (isConnected) {
      colorSv.value = withTiming(0);
      heightSv.value = withDelay(2000, withTiming(0));
    } else {
      colorSv.value = withTiming(1);
      heightSv.value = withTiming(32);
    }
  }, [isConnected]);

  return (
    <Animated.View style={[styles.banner, bannerAS]}>
      <Animated.Text style={[styles.bannerText, textAS]}>
        You are {isConnected ? 'online' : 'offline'}
      </Animated.Text>
    </Animated.View>
  );
};

export default ConnectivityBanner;
