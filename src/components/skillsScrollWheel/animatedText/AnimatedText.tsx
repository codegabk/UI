import Animated, {
  FadeIn,
  interpolate,
  SequencedTransition,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { View } from 'react-native';
import React, { Dispatch, SetStateAction } from 'react';

import Icon from '@/components/icon/Icon';
import Pressable from '@/components/pressable/Pressable';

import { CheckmarkIcon } from './../../../../assets/icons';

import styles from './AnimatedText.styles';

interface IAnimatedTextProps {
  id: number;
  label: string;
  scrollX: SharedValue<number>;
  selectedList: number[];
  setSelectedList: Dispatch<SetStateAction<number[]>>;
}

const AnimatedText = ({
  id,
  label,
  scrollX,
  selectedList,
  setSelectedList,
}: IAnimatedTextProps) => {
  const inputRange = useSharedValue([id - 1, id, id + 1]);

  const viewStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${interpolate(scrollX.value, inputRange.value, [5, 0, -5])}deg`,
      },
    ],
  }));

  const isSelected = selectedList.includes(id);

  const onPress = () => {
    if (isSelected) {
      setSelectedList((prev) => prev.filter((item) => item !== id));
    } else {
      setSelectedList((prev) => [...prev, id]);
    }
  };

  return (
    <Animated.View key={id} style={[styles.animatedView, viewStyle]}>
      <Pressable onPressIn={onPress}>
        <View style={styles.labelContainer}>
          {isSelected && (
            <Animated.View entering={FadeIn} style={styles.selectedIconContainer}>
              <Icon
                width={12}
                height={12}
                Asset={CheckmarkIcon}
                fill={'none'}
                style={styles.icon}
              />
            </Animated.View>
          )}
          <Animated.Text layout={SequencedTransition} style={styles.label}>
            {label}
          </Animated.Text>
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default AnimatedText;
