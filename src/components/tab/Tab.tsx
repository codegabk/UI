import Animated, {
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import React from 'react';
import { LayoutChangeEvent, View } from 'react-native';

import Pressable from '@/components/pressable/Pressable';

import styles from './Tab.styles';

interface TabProps {
  id: number;
  label: string;
  onPress: (index: number) => void;
  selectedIndexSv: SharedValue<number>;
  onLayout: (event: LayoutChangeEvent) => void;
}

const Tab = ({ id, label, onPress, onLayout, selectedIndexSv }: TabProps) => {
  const isSelected = useDerivedValue(() => {
    return withTiming(selectedIndexSv.value === id ? 1 : 0, { duration: 200 });
  }, []);

  const onPressOut = () => {
    onPress(id);
  };

  const tabAS = useAnimatedStyle(() => ({
    color: interpolateColor(isSelected.value, [0, 1], ['#2A2A2A', '#FFFFFF']),
  }));

  return (
    <View style={[styles.tab]} onLayout={onLayout}>
      <Pressable onPressOut={onPressOut}>
        <Animated.Text style={tabAS}>{label}</Animated.Text>
      </Pressable>
    </View>
  );
};

export default Tab;
