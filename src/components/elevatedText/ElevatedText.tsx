import { View, ViewStyle } from 'react-native';
import React, { useEffect } from 'react';

import Character from '@/components/elevatedText/character/Character';

interface IElevatedTextProps {
  text: string;
  style?: ViewStyle;
  delay?: number;
  onLetterAnimationComplete?: () => void | null;
}

const ElevatedText = ({
  text = '',
  style = {},
  delay = 100,
  onLetterAnimationComplete,
}: IElevatedTextProps) => {
  const words = text.split(' ').map((word) => word.split(''));

  useEffect(() => {
    const totalDuration = words.flat().length * delay + 500;
    const timeout = setTimeout(() => {
      onLetterAnimationComplete?.();
    }, totalDuration);

    return () => clearTimeout(timeout);
  }, [text, delay, onLetterAnimationComplete, words]);

  return (
    <View style={[{ flexDirection: 'row', flexWrap: 'wrap' }, style]}>
      {words.map((word, wordIndex) => (
        <View key={`${word.join('')}`} style={{ flexDirection: 'row', marginRight: 6 }}>
          {word.map((letter, letterIndex) => {
            const index =
              words.slice(0, wordIndex).reduce((acc, w) => acc + w.length, 0) + letterIndex;

            return (
              <View key={`${index}`}>
                <Character index={index} delay={delay} style={style} letter={letter} />
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
};

export default ElevatedText;
