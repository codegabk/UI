import React from 'react';
import {
  Gesture,
  GestureDetector,
  LongPressGesture,
  TapGesture,
} from 'react-native-gesture-handler';
import { impactAsync, ImpactFeedbackStyle } from 'expo-haptics';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export enum GestureEnum {
  Tap,
  LongPress,
}

enum LongPressGestureConfig {
  minDuration = 'minDuration',
  maxDistance = 'maxDistance',
}

interface PressableProps {
  children: React.ReactNode;
  onPressIn?: () => void;
  onPressOut?: () => void;
  isLongPress?: boolean;
  noAnimation?: boolean;
  gesture?: GestureEnum;
}

const Pressable = ({
  gesture,
  children,
  noAnimation,
  onPressIn: onPressInProp,
  onPressOut: onPressOutProp,
}: PressableProps) => {
  const animatedSV = useSharedValue(1);

  const handlePress = (): LongPressGesture | TapGesture => {
    let gestureFunction;

    switch (gesture) {
      case GestureEnum.LongPress:
        gestureFunction = Gesture.LongPress;
        break;

      case GestureEnum.Tap:
      default:
        gestureFunction = Gesture.Tap;
        break;
    }

    const commonGesture = gestureFunction()
      .onBegin(() => {
        animatedSV.value = 0.96;
      })
      .onStart(async () => {
        onPressInProp?.();
        await impactAsync(ImpactFeedbackStyle.Light);
      })
      .onEnd(() => {
        onPressOutProp?.();
      })
      .onFinalize(() => {
        animatedSV.value = 1;
      });

    const hasLongPressConfigs =
      LongPressGestureConfig.minDuration in commonGesture &&
      LongPressGestureConfig.maxDistance in commonGesture;

    if (hasLongPressConfigs) {
      return (commonGesture as LongPressGesture).minDuration(300).maxDistance(20);
    }

    return commonGesture;
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(animatedSV.value) }],
  }));

  return (
    <GestureDetector gesture={handlePress()}>
      <Animated.View style={[noAnimation ? null : animatedStyle]}>{children}</Animated.View>
    </GestureDetector>
  );
};

export default Pressable;
