import Animated, {
  Easing,
  runOnJS,
  withSpring,
  withTiming,
  useSharedValue,
  cancelAnimation,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { Text, View } from 'react-native';
import React, { useCallback, useEffect, useRef } from 'react';

import styles from './Toast.styles';
import Pressable, { GestureEnum } from '@/components/pressable/Pressable';

interface ToastProps {
  index: number;
  onRemove: (index: number) => void;
}

const Toast = ({ index, onRemove }: ToastProps) => {
  const initialBottom = -100;

  const isActive = index === 0;

  const translateY = useCallback(
    (itemId: number) => 20 * (itemId * Math.exp(-itemId * 0.025) + 2),
    [],
  );

  const bottom = useSharedValue<number>(initialBottom);

  useEffect(() => {
    bottom.value = withSpring(translateY(index));
  }, [bottom, index, translateY]);

  const removeItem = useCallback(() => {
    'worklet';

    bottom.value = withTiming(initialBottom, {}, (isFinished) => {
      if (isFinished) {
        runOnJS(onRemove)(index);
      }
    });
  }, [bottom, initialBottom, onRemove, index]);

  const toastAS = useAnimatedStyle(() => {
    const scale = 1 - 0.05 * index;

    return {
      bottom: bottom.value,
      transform: [
        {
          scale: withTiming(scale),
        },
      ],
    };
  });

  const progressValue = useSharedValue(100);

  const timer = useRef<NodeJS.Timeout | undefined>();
  const startTime = useRef<null | Date>(null);
  const pauseTime = useRef<null | Date>(null);
  const remainingTime = useRef<number>(4000);

  const startAnimation = useCallback(() => {
    if (isActive) {
      progressValue.value = withTiming(0, {
        duration: remainingTime.current,
        easing: Easing.linear,
      });
    }
  }, [isActive, progressValue]);

  const startTimer = useCallback(() => {
    if (isActive) {
      if (!startTime.current) {
        startTime.current = new Date();
      }

      timer.current = setTimeout(() => {
        removeItem();
      }, remainingTime.current);

      return () => clearTimeout(timer.current);
    }
  }, [isActive, removeItem]);

  useEffect(() => {
    startAnimation();
  }, [startAnimation]);

  useEffect(() => {
    startTimer();
  }, [startTimer]);

  const onPressIn = useCallback(() => {
    cancelAnimation(progressValue);
    pauseTime.current = new Date();
    clearTimeout(timer.current);

    const startTimeValue = startTime.current?.getTime() ?? 0;
    const pauseTimeValue = pauseTime.current?.getTime() ?? 0;

    remainingTime.current -= pauseTimeValue - startTimeValue;
  }, [progressValue]);

  const onPressOut = useCallback(() => {
    startTime.current = new Date();
    startAnimation();
    timer.current = setTimeout(() => {
      removeItem();
    }, remainingTime.current);
  }, [removeItem, startAnimation]);

  const progressBarStyle = useAnimatedStyle(() => ({
    width: `${progressValue.value}%`,
  }));

  const Wrapper = isActive ? Pressable : View;

  return (
    <Wrapper
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={{ zIndex: -index }}
      gesture={GestureEnum.LongPress}>
      <Animated.View style={[styles.toast, toastAS]}>
        <Text style={styles.toastText}>Oh look, a toast!</Text>
        <Animated.View style={[styles.bottomBar, progressBarStyle]} />
      </Animated.View>
    </Wrapper>
  );
};

export default Toast;
