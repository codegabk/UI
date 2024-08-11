import React from 'react';
import { useMemo } from 'react';
import type { SharedValue } from 'react-native-reanimated';
import { Canvas, Group, Path, Skia } from '@shopify/react-native-skia';

type ProgressWheel = {
  size: number;
  strokeWidth?: number;
  backgroundColor?: string;
  color?: SharedValue<string>;
  progress: SharedValue<number>;
};

const ProgressWheel = ({
  size,
  color,
  progress,
  strokeWidth = 1,
  backgroundColor = '#E9F3FF',
}: ProgressWheel) => {
  const radius = size / 2 - strokeWidth / 2;

  const path = useMemo(() => {
    const skPath = Skia.Path.Make();

    skPath.addCircle(size / 2, size / 2, radius);

    return skPath;
  }, [radius, size]);

  const style = {
    width: size,
    height: size,
  };

  const origin = {
    x: size / 2,
    y: size / 2,
  };

  const transform = [
    {
      rotate: -Math.PI / 2,
    },
  ];

  return (
    <Canvas style={style}>
      <Group origin={origin} transform={transform}>
        <Path
          end={1}
          start={0}
          path={path}
          style={'stroke'}
          strokeCap={'round'}
          color={backgroundColor}
          strokeWidth={strokeWidth}
        />
        <Path
          start={0}
          path={path}
          end={progress}
          style={'stroke'}
          strokeCap={'round'}
          color={color ?? '#0090FF'}
          strokeWidth={strokeWidth}
        />
      </Group>
    </Canvas>
  );
};

export default ProgressWheel;
