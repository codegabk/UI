import React, { useState } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import Tab from '@/components/tab/Tab';

import styles from './TabGroup.styles';

type TabType = { id: number; label: string };

interface TabGroup {
  data: TabType[];
}

const TabGroup = ({ data }: TabGroup) => {
  const selectedIndex = useSharedValue(0);

  const [tabLayoutInfo, setTabLayoutInfo] = useState<{ x: number; width: number }[]>([]);

  const onLayout = (event: LayoutChangeEvent) => {
    const { x, width } = event.nativeEvent.layout;

    const tabExists = tabLayoutInfo.some((tab) => tab.x === x && tab.width === width);

    if (!tabExists) {
      setTabLayoutInfo((prev) => [...prev, { x, width }]);
    }
  };

  const inputRange = Array.from({ length: data?.length }, (_, index) => index);
  const outputRange = ['#E54D2E', '#E93D82', '#8E4EC6', '#0090FF'];

  const indicatorAS = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withTiming(tabLayoutInfo?.[selectedIndex.value]?.x ?? 4, {
          easing: Easing.out(Easing.exp),
        }),
      },
    ],
    width: withTiming(tabLayoutInfo?.[selectedIndex.value]?.width ?? 100),
    backgroundColor: interpolateColor(selectedIndex.value, inputRange, outputRange),
  }));

  const onPress = (index: number) => {
    withTiming((selectedIndex.value = index));
  };

  return (
    <View style={styles.container}>
      {data?.map(({ id, label }: TabType) => {
        return (
          <Tab
            id={id}
            key={id}
            label={label}
            onPress={onPress}
            onLayout={onLayout}
            selectedIndexSv={selectedIndex}
          />
        );
      })}
      <Animated.View style={[styles.indicator, indicatorAS]} />
    </View>
  );
};

export default TabGroup;
