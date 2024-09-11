import { View } from 'react-native';
import React from 'react';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

import AnimatedText from '@/components/scrollSelector/animatedText/AnimatedText';

import { height } from '@/utils/sizing';
import { exercises } from '@/utils/constants';

const ScrollSelector = () => {
  const scrollOffset = useSharedValue(0);
  const maxScrollOffset = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(
    ({ contentSize, layoutMeasurement, contentOffset }) => {
      maxScrollOffset.value ||= contentSize.height - layoutMeasurement.height;

      scrollOffset.value = contentOffset.y;
    },
  );

  return (
    <Animated.ScrollView
      onScroll={scrollHandler}
      style={{
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#19191B',
      }}>
      <View style={{ height: height / 2 }} />
      {exercises.map(({ id, label }) => (
        <AnimatedText
          key={id}
          id={id}
          label={label}
          scrollOffset={scrollOffset}
          maxScrollOffset={maxScrollOffset}
        />
      ))}
      <View style={{ height: height / 2 }} />
    </Animated.ScrollView>
  );
};

export default ScrollSelector;
