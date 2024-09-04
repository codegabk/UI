import React from 'react';
import Animated, { withTiming } from 'react-native-reanimated';

import styles from './indicator.styles';

interface IndicatorProps {
  index: number;
  password: string;
  confirmedPassword: string;
}

const Indicator = ({ index, password, confirmedPassword }: IndicatorProps) => {
  const isFirstItem = index === 0;
  const isLastItem = index === password.length - 1;

  if (index > password.length - 1) {
    return null;
  }

  const entering = () => {
    'worklet';

    const borderFirstTiming = withTiming(isFirstItem ? 6 : 0);
    const borderLastTiming = withTiming(isLastItem ? 6 : 0);

    return {
      initialValues: {
        width: 0,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      },
      animations: {
        width: withTiming(10),
        borderTopLeftRadius: borderFirstTiming,
        borderBottomLeftRadius: borderFirstTiming,
        borderTopRightRadius: borderLastTiming,
        borderBottomRightRadius: borderLastTiming,
      },
    };
  };

  const exiting = () => {
    'worklet';

    return {
      initialValues: {
        width: 10,
      },
      animations: {
        width: withTiming(0),
      },
    };
  };

  return (
    <Animated.View
      entering={entering}
      exiting={exiting}
      style={[
        styles.indicator,
        {
          backgroundColor: password[index] === confirmedPassword[index] ? 'green' : 'red',
        },
      ]}
    />
  );
};

export default Indicator;
