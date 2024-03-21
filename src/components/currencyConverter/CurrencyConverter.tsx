import Animated, {
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import React, { useState } from 'react';
import { LayoutChangeEvent, Pressable, TextInput, View } from 'react-native';

import Currency from '@/components/currencyConverter/currency/Currency';

import styles from './CurrencyConverter.styles';

const margin = 4;

const CurrencyConverter = () => {
  const progress = useSharedValue(0);
  const iconLayout = useSharedValue(0);
  const valueLayout = useSharedValue(0);

  const currencies = ['SAR', 'USD'];

  const iconAS = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(progress.value, [0, 1], ['#30A46C', '#007AFF']),
    transform: [
      { translateX: interpolate(progress.value, [0, 1], [-margin, valueLayout.value + margin]) },
    ],
  }));

  const valueContainerAS = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 0.25, 0.75, 1], [1, 0, 0, 1]),
    transform: [
      { translateX: interpolate(progress.value, [0, 1], [margin, -iconLayout.value - margin]) },
    ],
  }));

  const valueAS = useAnimatedStyle(() => ({
    transform: [{ translateY: interpolate(progress.value, [0, 1], [0, -34]) }],
  }));

  const onPressOut = () => {
    progress.value = withSpring(progress.value === 0 ? 1 : 0, { mass: 0.7 });
  };

  const onLayout = (layout: SharedValue<number>) => (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    layout.value = width;
  };

  const [value, setValue] = useState(0);

  const handleValueChange = (text: string) => {
    setValue(+text);
  };

  return (
    <>
      <View style={styles.container}>
        <Pressable onPressOut={onPressOut}>
          <Animated.View style={[styles.icon, iconAS]} onLayout={onLayout(iconLayout)}>
            {currencies.map((item, index) => (
              <Currency index={index} progress={progress} key={index} item={item} />
            ))}
          </Animated.View>
        </Pressable>
        <Animated.View
          onLayout={onLayout(valueLayout)}
          style={[styles.valueContainer, valueContainerAS]}>
          <Animated.Text style={[styles.value, valueAS]}>
            {parseFloat(String(value))?.toFixed(2)}
          </Animated.Text>
          <Animated.Text style={[styles.value, { alignSelf: 'flex-end' }, valueAS]}>
            {(parseFloat(String(value)) / 3.75)?.toFixed(2)}
          </Animated.Text>
        </Animated.View>
      </View>
      <TextInput
        onChangeText={handleValueChange}
        keyboardType={'numeric'}
        style={styles.textInput}
      />
    </>
  );
};

export default CurrencyConverter;
