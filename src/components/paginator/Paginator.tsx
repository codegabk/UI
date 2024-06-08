import React, { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  ZoomIn,
  ZoomOut,
  SequencedTransition,
} from 'react-native-reanimated';

import Icon from '../icon/Icon';
import Dot from './dot/Dot';

import styles from './Paginator.styles';

import { ArrowLeftLucide, ArrowRightLucide } from '../../../assets/icons';

const Paginator = () => {
  const totalDots = 5;
  const dotsArray = Array.from({ length: totalDots }, (_, index) => index);

  const progress = useSharedValue(0);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    progress.value = withTiming(selected, { duration: 200 });
  }, [selected]);

  const handleLeftPress = () => {
    if (selected > 0) {
      setSelected((prev) => prev - 1);
    }
  };

  const handleRightPress = () => {
    if (selected < dotsArray.length - 1) {
      setSelected((prev) => prev + 1);
    }
  };

  return (
    <View style={styles.center}>
      <Animated.View style={styles.row}>
        {selected > 0 && (
          <Animated.View entering={ZoomIn} exiting={ZoomOut} layout={SequencedTransition}>
            <Pressable onPressIn={handleLeftPress} style={styles.arrowButton}>
              <Icon
                Asset={ArrowLeftLucide}
                fill="none"
                width={24}
                height={24}
                style={styles.icon}
              />
            </Pressable>
          </Animated.View>
        )}
        <Animated.View layout={SequencedTransition} style={styles.dotsContainer}>
          {dotsArray.map((id) => (
            <Dot id={id} key={id} progress={progress} />
          ))}
        </Animated.View>
        {selected < dotsArray.length - 1 && (
          <Animated.View entering={ZoomIn} exiting={ZoomOut} layout={SequencedTransition}>
            <Pressable onPressIn={handleRightPress} style={styles.arrowButton}>
              <Icon
                Asset={ArrowRightLucide}
                fill="none"
                width={24}
                height={24}
                style={styles.icon}
              />
            </Pressable>
          </Animated.View>
        )}
      </Animated.View>
    </View>
  );
};

export default Paginator;
