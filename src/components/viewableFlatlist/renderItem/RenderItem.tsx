import React from 'react';
import { ViewToken } from 'react-native';
import Animated, { SharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import styles from './RenderItem.styles';

interface RenderItemProps {
  item: number;
  viewableItemsArray: SharedValue<ViewToken[]>;
}

const RenderItem: React.FC<RenderItemProps> = ({ item, viewableItemsArray }) => {
  const animatedStyle = useAnimatedStyle(() => {
    const isItemVisible = Boolean(
      viewableItemsArray.value.filter((el) => el.isViewable).find((e) => e.item === item),
    );

    return {
      backgroundColor: withTiming(isItemVisible ? '#AAE999' : '#459FFF'),
      transform: [
        {
          scale: withTiming(isItemVisible ? 1 : 0),
        },
      ],
    };
  });

  return <Animated.View style={[styles.item, animatedStyle]} />;
};

export default RenderItem;
