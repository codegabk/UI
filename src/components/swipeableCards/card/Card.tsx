import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import React, { useEffect } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

import { width } from '@/utils/sizing';

import styles from './Card.styles';

const ROTATION = 16;
const TRANSLATION = 50;

interface CardProps {
  backgroundColor: string;
  index: number;
  onRemove: (index: number) => void;
  dataLength: number;
}

const Card = ({ backgroundColor, index, dataLength, onRemove }: CardProps) => {
  const velocity = useSharedValue(0);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);

  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);

  useEffect(() => {
    switch (index) {
      case 0: {
        scale.value = 1;
        rotate.value = withTiming(0);
        offsetX.value = withTiming(0);
        break;
      }

      case 1: {
        scale.value = 0.9;
        rotate.value = withTiming(-ROTATION);
        offsetX.value = withTiming(-TRANSLATION);

        break;
      }

      case 2: {
        scale.value = 0.9;
        rotate.value = withTiming(ROTATION);
        offsetX.value = withTiming(TRANSLATION);
        break;
      }

      default: {
        scale.value = 0;
        rotate.value = withTiming(0);
        offsetX.value = withTiming(0);
      }
    }
  }, [dataLength]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withTiming(scale.value),
      },
      {
        rotate: `${rotate.value}deg`,
      },
      {
        translateX: interpolate(
          offsetX.value,
          [-width, 0, width],
          [-width, 0, width],
          Extrapolation.CLAMP,
        ),
      },
      {
        translateY: interpolate(
          offsetY.value,
          [-width, 0, width],
          [-width, 0, width],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      offsetX.value = e.translationX;
      offsetY.value = e.translationY;
      velocity.value = e.velocityX;
    })
    .onEnd(() => {
      if (offsetX.value + velocity.value > width / 4) {
        rotate.value = withTiming(ROTATION);
        offsetY.value = withTiming(0);
        offsetX.value = withTiming(width, {}, () => {
          runOnJS(onRemove)(index);
        });
      } else if (offsetX.value + velocity.value < -width / 4) {
        rotate.value = withTiming(-ROTATION);
        offsetY.value = withTiming(0);
        offsetX.value = withTiming(-width, {}, () => {
          runOnJS(onRemove)(index);
        });
      } else {
        offsetY.value = withTiming(0);
        offsetX.value = withTiming(0);
      }
    });

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[
          styles.card,
          {
            zIndex: -index,
            backgroundColor,
          },
          animatedStyle,
        ]}
      />
    </GestureDetector>
  );
};

export default Card;
