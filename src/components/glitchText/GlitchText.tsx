import React from 'react';
import { Pressable } from 'react-native';
import { Canvas, FontStyle, Group, Mask, Rect, Skia, Text } from '@shopify/react-native-skia';
import { SharedValue, useSharedValue, withSequence, withTiming } from 'react-native-reanimated';

import { height, width } from '@/utils/sizing';

const DURATION = 100;

const GlitchText = () => {
  const fontMgr = Skia.FontMgr.System();
  const typeface = fontMgr.matchFamilyStyle('serif', FontStyle.Bold);

  const text = 'Hello World';
  const font = Skia.Font(typeface, 32);
  const lineHeightDifference = 2;

  const textHeight = font.measureText(text).height;
  const textWidth = font.measureText(text).width;

  const textX = width / 2 - textWidth / 2;
  const textY = height / 2 + textHeight - lineHeightDifference;

  const rectX = textX;
  const rectWidth = textWidth;
  const fullRectHeight = textHeight;

  const proportion = 1 / 3;
  const rectHeight = fullRectHeight * proportion;

  const topRectY = height / 2;
  const middleRectY = height / 2 + rectHeight;
  const bottomRectY = height / 2 + rectHeight * 2;

  const renderMask = (rectXSv: SharedValue<number>, rectY: number, maskHeight: number) => (
    <Group>
      <Rect color="white" height={maskHeight} width={rectWidth} x={rectXSv} y={rectY} />
    </Group>
  );

  const renderText = (
    rectXSv: SharedValue<number>,
    rectY: number,
    maskHeight: number = rectHeight,
  ) => (
    <Mask mode="luminance" mask={renderMask(rectXSv, rectY, maskHeight)}>
      <Text color={'black'} font={font} text={text} x={rectXSv} y={textY} opacity={0.9} />
    </Mask>
  );

  const topHalfX = useSharedValue(rectX);
  const middleHalfX = useSharedValue(rectX);
  const bottomHalfX = useSharedValue(rectX);
  const redTextX = useSharedValue(rectX);
  const greenTextX = useSharedValue(rectX);

  const withAnimation = (offsets: number[]) => {
    const animations = offsets.map((offset) => withTiming(rectX + offset, { duration: DURATION }));
    animations.push(withTiming(rectX, { duration: DURATION }));
    return withSequence(...animations);
  };

  const triggerAnimation = () => {
    topHalfX.value = withAnimation([-8, -6, -4, 5]);
    middleHalfX.value = withAnimation([-6, -4, 5, -2]);
    bottomHalfX.value = withAnimation([-4, 5, -2, 2]);

    redTextX.value = withAnimation([-2, 5, -4, -6]);
    greenTextX.value = withAnimation([2, -2, 5, -4]);
  };

  return (
    <Pressable onPressIn={triggerAnimation}>
      <Canvas style={{ width: width, height: height }}>
        <Text color="#E5484D" font={font} text={text} x={redTextX} y={textY} opacity={0.6} />
        <Text color="#12A594" font={font} text={text} x={greenTextX} y={textY} opacity={0.6} />

        {/*Top half*/}
        {renderText(topHalfX, topRectY)}

        {/*Middle half*/}
        {renderText(middleHalfX, middleRectY)}

        {/*Bottom half with fullRectHeight to cater for letters extending below the baseline*/}
        {renderText(bottomHalfX, bottomRectY, fullRectHeight)}
      </Canvas>
    </Pressable>
  );
};

export default GlitchText;
