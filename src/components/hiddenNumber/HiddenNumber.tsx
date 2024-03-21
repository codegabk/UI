import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Animated, { withDelay, withSpring, withTiming } from 'react-native-reanimated';

import Icon from '@/components/icon/Icon';
import Pressable from '@/components/pressable/Pressable';

import { CopyIcon, EyeIcon, EyeSlashIcon } from '../../../assets/icons';

import styles from './HiddenNumber.styles';

interface HiddenNumberProps {
  numbers: string;
}

const HiddenNumber = ({ numbers }: HiddenNumberProps) => {
  const [isHidden, setIsHidden] = useState(true);

  const showHideNumber = () => setIsHidden((prev) => !prev);

  const duration = 150;

  const entering = (index: number) => () => {
    'worklet';

    const initialValues = {
      originY: -8,
      transform: [{ scale: 0 }],
      opacity: 0,
    };

    const animations = {
      originY: withDelay(index * 20, withSpring(0)),
      opacity: withDelay(index * 20, withTiming(1, { duration })),
      transform: [{ scale: withDelay(index * 20, withTiming(1, { duration })) }],
    };

    return {
      initialValues,
      animations,
    };
  };

  const exiting = (index: number) => () => {
    'worklet';

    const initialValues = {
      originY: 0,
      opacity: 1,
      transform: [{ scale: 1 }],
    };

    const animations = {
      originY: withDelay(index * 20, withTiming(8, { duration })),
      opacity: withDelay(index * 20, withTiming(0, { duration })),
      transform: [{ scale: withDelay(index * 20, withTiming(0, { duration })) }],
    };

    return {
      initialValues,
      animations,
    };
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Number</Text>
        <View style={styles.row}>
          {[...numbers].map((item, index) => (
            <View key={Math.random()}>
              {isHidden && (
                <Animated.Text
                  entering={entering(index)}
                  exiting={exiting(index)}
                  style={[styles.label, { marginRight: index % 4 === 3 ? 20 : 4.15 }]}>
                  {'\u2022'}
                </Animated.Text>
              )}
              {!isHidden && (
                <Animated.Text
                  entering={entering(index)}
                  exiting={exiting(index)}
                  style={[styles.label, { marginRight: index % 4 === 3 ? 12 : 4 }]}>
                  {item}
                </Animated.Text>
              )}
            </View>
          ))}
        </View>
      </View>

      <View style={styles.trailing}>
        <Pressable onPressOut={showHideNumber}>
          <Icon Asset={isHidden ? EyeIcon : EyeSlashIcon} fill={'#007AFF'} />
        </Pressable>
        <Icon Asset={CopyIcon} fill={'#007AFF'} />
      </View>
    </View>
  );
};

export default HiddenNumber;
