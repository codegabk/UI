import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Animated, {
  LinearTransition,
  runOnJS,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import Pressable from '@/components/pressable/Pressable';

import { shuffleArray } from '@/utils/helpers';

import Card from '@/components/shuffler/card/Card';

const DURATION = 600;

const Shuffler = () => {
  const [data, setData] = useState(Array.from({ length: 9 }, (_, index) => index));

  const selectedCard = useSharedValue<number | null>(null);

  const opacity = useSharedValue(1);
  const selectedOpacity = useSharedValue(1);

  const [startedGame, setHasStartedGame] = useState(false);
  const [canRevealCard, setCanRevealCard] = useState(false);

  const multiShuffle = () => {
    let count = 0;
    const interval = setInterval(() => {
      setData((prevData) => shuffleArray(prevData));

      count += 1;
      if (count === 5) {
        setCanRevealCard(true);
        clearInterval(interval);
      }
    }, DURATION);
  };

  const onStart = () => {
    if (!startedGame) {
      setHasStartedGame(true);
      opacity.value = withSequence(
        withTiming(0, { duration: DURATION }),
        withDelay(
          DURATION * 2,
          withTiming(1, { duration: DURATION }, (isFinished) => {
            if (isFinished) {
              runOnJS(multiShuffle)();
            }
          }),
        ),
      );
    }
  };

  const onCardPress = (item: number) => () => {
    if (!selectedCard.value) {
      selectedCard.value = item;
      selectedOpacity.value = withTiming(0, { duration: DURATION });
      setCanRevealCard(false);
    }
  };

  return (
    <>
      <View style={{ justifyContent: 'center', flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        {data.map((item) => (
          <Animated.View
            key={item}
            layout={LinearTransition.duration(DURATION)}
            style={{
              borderRadius: 20,
              overflow: 'hidden',
              alignItems: 'center',
              borderCurve: 'continuous',
            }}>
            <View
              style={{
                width: 100,
                height: 100,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#405EB2',
              }}>
              <Text style={{ fontSize: 40, color: 'white' }}>{item}</Text>
            </View>

            <Card
              index={item}
              opacity={opacity}
              selectedCard={selectedCard}
              canRevealCard={canRevealCard}
              onCardPress={onCardPress(item)}
              selectedOpacity={selectedOpacity}
            />
          </Animated.View>
        ))}
      </View>
      <Pressable onPressIn={onStart} disabled={startedGame}>
        <Text style={{ marginTop: 40, fontSize: 32, color: '#405EB2' }}>Start</Text>
      </Pressable>
    </>
  );
};

export default Shuffler;
