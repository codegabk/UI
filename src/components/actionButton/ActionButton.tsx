import { View } from 'react-native';
import React, { useRef } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import Pressable, { GestureEnum } from '@/components/pressable/Pressable';
import ActionOption, { ActionSide } from '@/components/actionOption/ActionOption';

import useThrowError from '@/hooks/useThrowError';

import { PlusIcon } from '../../../assets/icons';
import styles from './ActionButton.styles';

interface ActionButtonProps {
  data: {
    id: number;
    onPress: () => void;
    Icon: React.ElementType;
  }[];
  side?: ActionSide.top | ActionSide.bottom;
}

const MAX_ARRAY_LENGTH = 5;

const ActionButton = ({ data, side = ActionSide.bottom }: ActionButtonProps) => {
  const refArray = useRef<
    {
      trigger: () => void;
    }[]
  >([]);

  const progress = useSharedValue(0);

  const { throwInvalidArrayLength } = useThrowError();

  throwInvalidArrayLength(data, MAX_ARRAY_LENGTH);

  const optionArrayLength = data?.length;
  const optionArray = optionArrayLength > 0 ? data : [];

  const triggerAction = () => {
    progress.value = withTiming(progress.value === 0 ? 1 : 0);
    refArray.current.map((el) => el?.trigger());
  };

  const animatedStyle = useAnimatedStyle(() => {
    const rotation = progress.value * 45;
    const scale = 1 - progress.value * 0.2;

    return {
      transform: [{ rotate: `${rotation}deg` }, { scale }],
    };
  });

  const setActionRefs = (ref: { trigger: () => void }) => {
    refArray.current.push(ref);
  };

  return (
    <View style={[styles.container, side === ActionSide.top ? { top: 0 } : { bottom: 0 }]}>
      {optionArray.map(({ id, onPress, Icon }, index) => {
        return (
          <ActionOption
            key={id}
            side={side}
            Icon={Icon}
            index={index}
            onPress={onPress}
            actionRef={setActionRefs}
            arrayLength={optionArrayLength}
          />
        );
      })}

      <Pressable gesture={GestureEnum.Tap} onPressOut={triggerAction}>
        <Animated.View style={[styles.icon, animatedStyle]}>
          <PlusIcon fill={'#fff'} width={40} height={40} />
        </Animated.View>
      </Pressable>
    </View>
  );
};

export default ActionButton;
