import Animated, {
  interpolateColor,
  LinearTransition,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated';
import { Pressable } from 'react-native';
import React, { Dispatch, SetStateAction } from 'react';

import Icon from '@/components/icon/Icon';

import styles from './CheckBox.styles';

import { CheckmarkIcon } from '../../../../assets/icons';

interface ICheckBox {
  id: number;
  label: string;
  selectedIds: number[];
  setSelectedIds: Dispatch<SetStateAction<number[]>>;
}

const CheckBox = ({ id, label, selectedIds, setSelectedIds }: ICheckBox) => {
  const isSelected = selectedIds.includes(id);

  const progress = useSharedValue(0);

  const onToggle = () => {
    if (isSelected) {
      progress.value = withTiming(0);
      setSelectedIds((prev) => prev.filter((item) => item !== id));
    } else {
      progress.value = withTiming(1);
      setSelectedIds((prev) => [...prev, id]);
    }
  };

  const interpolation = useDerivedValue(() =>
    interpolateColor(progress.value, [0, 1], ['#9e9c9e', '#ec874a']),
  );

  const containerStyle = useAnimatedStyle(() => ({
    borderColor: interpolation.value,
  }));

  const textStyle = useAnimatedStyle(() => ({
    color: interpolation.value,
  }));

  return (
    <Animated.View layout={LinearTransition}>
      <Pressable onPressIn={onToggle}>
        <Animated.View layout={LinearTransition} style={[styles.container, containerStyle]}>
          <Animated.Text style={textStyle}>{label}</Animated.Text>
          {isSelected && (
            <Animated.View entering={ZoomIn} exiting={ZoomOut.duration(100)} style={styles.icon}>
              <Icon
                width={10}
                height={10}
                fill={'none'}
                style={styles.text}
                Asset={CheckmarkIcon}
              />
            </Animated.View>
          )}
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
};

export default CheckBox;
