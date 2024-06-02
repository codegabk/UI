import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Canvas, LinearGradient, Rect, vec } from '@shopify/react-native-skia';
import Animated, { clamp, useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

import Icon from '@/components/icon/Icon';
import Pressable from '@/components/pressable/Pressable';
import AnimatedText from '@/components/skillsScrollWheel/animatedText/AnimatedText';

import { skills } from '@/utils/constants';
import { height, width } from '@/utils/sizing';

import { SearchIcon } from '../../../assets/icons';

import styles from './SkillsScrollWheel.styles';

const gradientHeight = height / 2;

const SkillsScrollWheel = () => {
  const scrollX = useSharedValue(0);
  const skillsLength = skills.length;

  const [selectedList, setSelectedList] = useState<number[]>([]);

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollX.value = clamp(event.contentOffset.y / gradientHeight, 0, skillsLength);
  });

  return (
    <>
      <View style={styles.skillsContainer}>
        {skills.map(({ id, label }) => (
          <AnimatedText
            id={id}
            key={id}
            scrollX={scrollX}
            label={label}
            selectedList={selectedList}
            setSelectedList={setSelectedList}
          />
        ))}
      </View>
      <Icon width={28} height={28} Asset={SearchIcon} fill={'none'} style={styles.searchIcon} />
      <View pointerEvents={'none'} style={styles.topGradientContainer}>
        <Canvas style={styles.flex}>
          <Rect x={0} y={0} width={width} height={gradientHeight}>
            <LinearGradient
              start={vec(0, 0)}
              end={vec(0, gradientHeight)}
              colors={['black', 'black', '#000000cc', 'transparent']}
            />
          </Rect>
        </Canvas>
      </View>
      <View pointerEvents={'none'} style={styles.bottomGradientContainer}>
        <Canvas style={styles.flex}>
          <Rect x={0} y={0} width={width} height={gradientHeight}>
            <LinearGradient
              start={vec(0, 0)}
              end={vec(0, gradientHeight)}
              colors={['transparent', '#000000cc', 'black', 'black']}
            />
          </Rect>
        </Canvas>
      </View>
      <Animated.ScrollView onScroll={onScroll} style={styles.scrollView} scrollEventThrottle={16}>
        <View style={{ height: skillsLength * gradientHeight }} />
      </Animated.ScrollView>
      <View style={styles.clearContainer}>
        <Pressable onPressIn={() => setSelectedList([])}>
          <Text style={styles.clearText}>Clear Saved ({selectedList.length})</Text>
        </Pressable>
      </View>
    </>
  );
};

export default SkillsScrollWheel;
