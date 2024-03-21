import React, { useCallback, useImperativeHandle } from 'react';
import Animated, {
  withDelay,
  withSpring,
  withTiming,
  SharedValue,
  useSharedValue,
  useAnimatedStyle,
  FadeOut,
} from 'react-native-reanimated';

import Pressable from '@/components/pressable/Pressable';

import styles from './ActionOption.styles';

export enum ActionSide {
  top = 'top',
  bottom = 'bottom',
}

interface ActionOptionProps {
  index: number;
  onPress: () => void;
  arrayLength: number;
  Icon: React.ElementType;
  side: ActionSide.top | ActionSide.bottom;
  actionRef: React.Ref<{ trigger: () => void }>;
}

const DEFAULT_Y_TRANSLATION = -25;
const DEFAULT_X_TRANSLATION = 40;
const MAX_SCALE = 1;

const ActionOption = ({
  side,
  Icon,
  index,
  onPress,
  actionRef,
  arrayLength,
}: ActionOptionProps) => {
  const sSv = useSharedValue(0);
  const tySv = useSharedValue(0);
  const txSv = useSharedValue(0);

  const getTranslation = (): {
    x: number;
    y: number;
  } => {
    const actionSide = side === ActionSide.bottom ? 1 : -1;

    switch (arrayLength) {
      case 0:
      case 1:
        return { x: 0, y: DEFAULT_Y_TRANSLATION * 4 * actionSide };
      case 2:
        return {
          x: index === 0 ? -DEFAULT_X_TRANSLATION * 2 : DEFAULT_X_TRANSLATION * 2,
          y: DEFAULT_Y_TRANSLATION * actionSide,
        };
      case 3:
        if (index === 0) {
          return { x: -DEFAULT_X_TRANSLATION * 2, y: DEFAULT_Y_TRANSLATION * actionSide };
        } else if (index === 1) {
          return { x: 0, y: DEFAULT_Y_TRANSLATION * 4 * actionSide };
        } else {
          return { x: DEFAULT_X_TRANSLATION * 2, y: DEFAULT_Y_TRANSLATION * actionSide };
        }
      case 4:
        if (index === 0) {
          return { x: -DEFAULT_X_TRANSLATION * 2, y: DEFAULT_Y_TRANSLATION * actionSide };
        } else if (index === 1) {
          return { x: -DEFAULT_X_TRANSLATION * 3, y: DEFAULT_Y_TRANSLATION * 4 * actionSide };
        } else if (index === 2) {
          return { x: DEFAULT_X_TRANSLATION * 3, y: DEFAULT_Y_TRANSLATION * 4 * actionSide };
        } else {
          return { x: DEFAULT_X_TRANSLATION * 2, y: DEFAULT_Y_TRANSLATION * actionSide };
        }
      case 5:
        if (index === 0) {
          return { x: -DEFAULT_X_TRANSLATION * 2, y: DEFAULT_Y_TRANSLATION * actionSide };
        } else if (index === 1) {
          return { x: -DEFAULT_X_TRANSLATION * 3, y: DEFAULT_Y_TRANSLATION * 4 * actionSide };
        } else if (index === 2) {
          return { x: 0, y: DEFAULT_Y_TRANSLATION * 4 * actionSide };
        } else if (index === 3) {
          return { x: DEFAULT_X_TRANSLATION * 3, y: DEFAULT_Y_TRANSLATION * 4 * actionSide };
        } else {
          return { x: DEFAULT_X_TRANSLATION * 2, y: DEFAULT_Y_TRANSLATION * actionSide };
        }
      default:
        return { x: 0, y: 0 };
    }
  };

  const animate = (sv: SharedValue<number>, toValue: number) =>
    withDelay(50 * index, sv.value === 0 ? withSpring(toValue) : withTiming(0));

  const trigger = useCallback(() => {
    sSv.value = animate(sSv, MAX_SCALE);
    tySv.value = animate(tySv, getTranslation().y);
    txSv.value = animate(txSv, getTranslation().x);
  }, []);

  useImperativeHandle(actionRef, () => ({ trigger }), [trigger]);

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: txSv.value }, { translateY: tySv.value }, { scale: sSv.value }],
  }));

  return (
    <Pressable onPressOut={onPress}>
      <Animated.View style={[styles.option, rStyle]} exiting={FadeOut}>
        <Icon fill={'#fff'} width={40} height={40} />
      </Animated.View>
    </Pressable>
  );
};

export default ActionOption;
