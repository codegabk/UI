import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated';

import Icon from '@/components/icon/Icon';
import Pressable from '@/components/pressable/Pressable';

import { DollarIcon } from '../../../../assets/icons';

type CardProps = {
  index: number;
  canRevealCard: boolean;
  onCardPress: () => void;
  opacity: SharedValue<number>;
  selectedOpacity: SharedValue<number>;
  selectedCard: SharedValue<number | null>;
};

const Card = ({
  index,
  opacity,
  onCardPress,
  selectedCard,
  canRevealCard,
  selectedOpacity,
}: CardProps) => {
  const cardStyle = useAnimatedStyle(() => ({
    opacity: selectedCard.value === index ? selectedOpacity.value : opacity.value,
  }));

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFill,
        {
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFC53D',
        },
        cardStyle,
      ]}>
      <Pressable onPressIn={onCardPress} disabled={!canRevealCard}>
        <Icon
          width={40}
          height={40}
          fill={'none'}
          Asset={DollarIcon}
          style={{ color: '#FFFFFF' }}
        />
      </Pressable>
    </Animated.View>
  );
};

export default Card;
