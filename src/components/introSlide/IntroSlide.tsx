import React, { useRef, useState } from 'react';
import { FlatList, ListRenderItem, View, Text } from 'react-native';
import { AnimationObject } from 'lottie-react-native';
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import Dot from '@/components/introSlide/dot/Dot';
import Slide, { SlideProps } from '@/components/introSlide/slide/Slide';

import styles from './IntroSlide.styles';
import { ArrowRightIcon } from '../../../assets/icons';
import Pressable from '@/components/pressable/Pressable';
import { width } from '@/utils/sizing';

interface IntroSlideProps {
  data: {
    id: number;
    title: string;
    subtitle: string;
    asset: AnimationObject;
    backgroundColor: string;
  }[];
}

//  const data = [
//     {
//       id: 0,
//       title: 'Lorem',
//       subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
//       asset: Bike,
//       backgroundColor: '#5B5BD6',
//     },
//     {
//       id: 1,
//       title: 'Ipsum',
//       subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
//       asset: Timer,
//       backgroundColor: '#EC6142',
//     },
//     {
//       id: 2,
//       title: 'Dolor',
//       subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
//       asset: Medal,
//       backgroundColor: '#29A383',
//     },
//   ];

const IntroSlide = ({ data }: IntroSlideProps) => {
  const scrollSV = useSharedValue(0);
  const flatlistRef = useRef<FlatList | null>(null);
  const [isOnLastSlide, setIsOnLastSlide] = useState(false);

  const widthArr = Array.from({ length: data?.length }, (_, index) => width * index);
  const lastSlideOffset = widthArr[widthArr.length - 1] - width / 2;

  const scrollHandler = useAnimatedScrollHandler((event) => {
    const offset = event.contentOffset.x;

    runOnJS(setIsOnLastSlide)(offset >= lastSlideOffset);

    scrollSV.value = offset;
  });

  const nextAS = useAnimatedStyle(() => ({
    width: withSpring(scrollSV.value >= lastSlideOffset ? 140 : 60),
  }));

  const renderItem: ListRenderItem<SlideProps> = ({
    index,
    item: { title, subtitle, asset, backgroundColor },
  }) => (
    <Slide
      title={title}
      asset={asset}
      index={index}
      offset={scrollSV}
      subtitle={subtitle}
      backgroundColor={backgroundColor}
    />
  );

  const keyExtractor = ({ id }: { id: number }) => id.toString();

  const getToScrollOffset = () => {
    return widthArr.find((offset) => scrollSV.value < offset) || lastSlideOffset;
  };

  const onNextPress = () => {
    flatlistRef.current?.scrollToOffset({
      offset: getToScrollOffset(),
    });
  };

  return (
    <>
      <Animated.FlatList
        horizontal
        data={data}
        pagingEnabled
        ref={flatlistRef}
        renderItem={renderItem}
        onScroll={scrollHandler}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
      />

      <View style={styles.footer}>
        <View style={styles.dotContainer}>
          {data.map(({ id }, index) => {
            return (
              <Dot
                key={id}
                index={index}
                offset={scrollSV}
                backgroundColor={'#FFFFFF'}
                containerSize={width}
              />
            );
          })}
        </View>
        <Pressable onPressOut={onNextPress}>
          <Animated.View style={[styles.next, nextAS]}>
            {isOnLastSlide ? (
              <Text style={styles.continue} numberOfLines={1} ellipsizeMode={'clip'}>
                Continue
              </Text>
            ) : (
              <ArrowRightIcon />
            )}
          </Animated.View>
        </Pressable>
      </View>
    </>
  );
};

export default IntroSlide;
