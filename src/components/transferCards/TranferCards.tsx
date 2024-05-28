import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import React from 'react';
import { Text, View } from 'react-native';

import Icon from '@/components/icon/Icon';
import Pressable from '@/components/pressable/Pressable';

import { width } from '@/utils/sizing';

import styles from './TransferCards.styles';

import { ChevronDownIcon, DollarIcon, EuroIcon } from '../../../assets/icons';

const TransferCards = () => {
  const progress = useSharedValue(0);

  const topAmount = ' $20';
  const bottomAmount = ' €22.61';

  const topCardAnimatedStyle = useAnimatedStyle(() => ({
    height: interpolate(progress.value, [0, 1], [180, 80]),
  }));

  const bottomCardAnimatedStyle = useAnimatedStyle(() => ({
    height: interpolate(progress.value, [0, 1], [80, 180]),
  }));

  const topAmountAnimatedStyle = useAnimatedStyle(() => ({
    top: interpolate(progress.value, [0, 1], [0, -75]),
    start: interpolate(progress.value, [0, 1], [0, width / 3 - topAmount.length * 3]),
    transform: [{ scale: interpolate(progress.value, [0, 1], [1, 0.7]) }],
  }));

  const bottomAmountAnimatedStyle = useAnimatedStyle(() => ({
    top: interpolate(progress.value, [0, 1], [-75, 0]),
    start: interpolate(progress.value, [0, 1], [width / 3 - bottomAmount.length * 3, 0]),
    transform: [{ scale: interpolate(progress.value, [0, 1], [0.7, 1]) }],
  }));

  const topOpacityAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 0.2], [1, 0]),
  }));

  const bottomOpacityAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0.8, 1], [0, 1]),
  }));

  const onTopCardPress = () => {
    progress.value = withTiming(0);
  };

  const onBottomCardPress = () => {
    progress.value = withTiming(1);
  };

  return (
    <View>
      <Pressable withScale={false} onPressIn={onTopCardPress}>
        <Animated.View style={[styles.cardContainer, topCardAnimatedStyle]}>
          <View style={styles.card}>
            <View style={styles.flexRow}>
              <View style={[styles.icon, styles.euroColor]}>
                <Icon width={32} height={32} fill={'none'} Asset={EuroIcon} style={styles.white} />
              </View>
              <View style={styles.body}>
                <Text style={styles.currency}>Euro</Text>
                <Text style={styles.amount}>19458.67 EUR</Text>
              </View>
            </View>
            <Animated.View style={[styles.trailing, topOpacityAnimatedStyle]}>
              <Text style={styles.use}>Use Max</Text>
            </Animated.View>
          </View>
          <View style={styles.lineSeparator} />
          <View style={styles.bottomContainer}>
            <Animated.Text style={[styles.euroAmount, topAmountAnimatedStyle]}>
              {topAmount}
            </Animated.Text>
            <Animated.Text style={[styles.conversion, topOpacityAnimatedStyle]}>
              €1 = $1.08
            </Animated.Text>
          </View>
        </Animated.View>
      </Pressable>

      <View style={styles.separator} />

      <Pressable withScale={false} onPressIn={onBottomCardPress}>
        <Animated.View style={[styles.cardContainer, bottomCardAnimatedStyle]}>
          <View style={styles.card}>
            <View style={styles.flexRow}>
              <View style={[styles.icon, styles.dollarColor]}>
                <Icon
                  width={32}
                  height={32}
                  fill={'none'}
                  Asset={DollarIcon}
                  style={styles.white}
                />
              </View>
              <View style={styles.body}>
                <Text style={styles.currency}>Dollar</Text>
                <Text style={styles.amount}>Receive Dollar</Text>
              </View>
            </View>
            <Animated.View style={[styles.trailing, bottomOpacityAnimatedStyle]}>
              <Text style={styles.use}>Get Max</Text>
            </Animated.View>
          </View>
          <View style={styles.lineSeparator} />
          <View style={styles.bottomContainer}>
            <Animated.Text style={[styles.euroAmount, bottomAmountAnimatedStyle]}>
              {bottomAmount}
            </Animated.Text>
            <Animated.Text style={[styles.conversion, bottomOpacityAnimatedStyle]}>
              $1 = €0.93
            </Animated.Text>
          </View>
          <View style={styles.indicator}>
            <Icon
              width={32}
              height={32}
              fill={'none'}
              Asset={ChevronDownIcon}
              style={styles.chevron}
            />
          </View>
        </Animated.View>
      </Pressable>
    </View>
  );
};

export default TransferCards;
