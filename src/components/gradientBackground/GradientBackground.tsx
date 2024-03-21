import React, { useEffect, useState } from 'react';
import { Canvas, LinearGradient, Rect, vec } from '@shopify/react-native-skia';
import { runOnJS, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';

import { height, width } from '@/utils/sizing';

import styles from './GradientBackground.styles';

const DURATION = 3000;

const colorsArr = [
  '#E5484D',
  '#E54666',
  '#E93D82',
  '#D6409F',
  '#AB4ABA',
  '#8E4EC6',
  '#6E56CF',
  '#5B5BD6',
];
const backgroundArr = [
  '#FFD1D9',
  '#FED2E1',
  '#FDD3E8',
  '#FDD1EA',
  '#F4D4F4',
  '#ECD9FA',
  '#E2DDFE',
  '#E0DFFE',
];

const GradientBackground = () => {
  const startColor = useSharedValue('#FFFFFF');
  const endColor = useSharedValue('#FFFFFF');
  const colors = useDerivedValue(() => [startColor.value, endColor.value]);

  const [index, setIndex] = useState(0);

  const getNextColor = (arr: string[]) => {
    return arr[index % arr.length];
  };

  useEffect(() => {
    startColor.value = withTiming(getNextColor(backgroundArr), { duration: DURATION });
    endColor.value = withTiming(getNextColor(colorsArr), { duration: DURATION }, () => {
      runOnJS(setIndex)(index + 1);
    });
  }, [index]);

  return (
    <Canvas style={styles.flex}>
      <Rect x={0} y={0} width={width} height={height}>
        <LinearGradient start={vec(0, 0)} end={vec(width, height)} colors={colors} />
      </Rect>
    </Canvas>
  );
};

export default GradientBackground;
