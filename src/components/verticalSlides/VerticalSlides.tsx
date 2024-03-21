import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { ListRenderItem, View } from 'react-native';
import Dot from '@/components/introSlide/dot/Dot';
import React, { useState } from 'react';
import Slide from '@/components/verticalSlides/slide/Slide';
import styles from './VerticalSlides.styles';

interface ItemProps {
  backgroundColor: string;
}

const VerticalSlides = () => {
  const list = [
    { backgroundColor: '#E5484D' },
    { backgroundColor: '#0090FF' },
    { backgroundColor: '#29A383' },
  ];

  const [data, setData] = useState(list);

  const scrollSV = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollSV.value = event.contentOffset.y;
  });

  const renderItem: ListRenderItem<ItemProps> = ({ item: { backgroundColor }, index }) => (
    <Slide index={index} backgroundColor={backgroundColor} offset={scrollSV} containerSize={180} />
  );

  const onEndReached = () => setData((prev) => [...prev, ...list]);

  return (
    <>
      <Animated.View style={styles.container}>
        <Animated.FlatList
          data={data}
          pagingEnabled
          renderItem={renderItem}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          onEndReachedThreshold={0.5}
          onEndReached={onEndReached}
          showsVerticalScrollIndicator={false}
        />
      </Animated.View>
      <View style={styles.row}>
        {list.map((_, index) => {
          return (
            <Dot
              key={index}
              offset={scrollSV}
              containerSize={180}
              index={index}
              dataLength={data?.length}
              backgroundColor={'#3A3A3A'}
            />
          );
        })}
      </View>
    </>
  );
};

export default VerticalSlides;
