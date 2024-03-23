import { ReText } from 'react-native-redash';
import React, { useImperativeHandle } from 'react';
import { useSharedValue } from 'react-native-reanimated';

import styles from './EncryptedCharacter.styles';

interface IEncryptedCharacterProps {
  item: string;
  animationRef: React.Ref<{ animate: (show: boolean) => void }>;
}

const EncryptedCharacter = ({ item, animationRef }: IEncryptedCharacterProps) => {
  const generateCharacterArray = () => {
    const charArray = [];
    const startCharCode = '!'.charCodeAt(0);
    const endCharCode = '~'.charCodeAt(0);
    for (let charCode = startCharCode; charCode <= endCharCode; charCode++) {
      charArray.push(String.fromCharCode(charCode));
    }
    return charArray;
  };

  const generateRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getRandomCharacter = () => {
    const randomIndex = Math.floor(Math.random() * initialArrLength);
    // We don't want to have repeating characters e.g.:
    // index = 0 => 'A'
    // index = 1 => 'A' ❌ instead: index = 1 => 'G' ✅
    return charactersArr.splice(randomIndex, 1)[0];
  };

  const text = useSharedValue(item);

  const initialArray = generateCharacterArray();
  const initialArrLength = initialArray.length;

  const charactersArr = [...initialArray];

  const animate = (show: boolean) => {
    const randomDelay = generateRandomNumber(10, 18);

    const delayTillLoopFinishes = randomDelay * initialArrLength;

    for (let i = 0; i < initialArrLength; i++) {
      const delayPerIteration = randomDelay * (initialArrLength - i);

      setTimeout(() => {
        text.value = getRandomCharacter();
      }, delayPerIteration);
    }

    setTimeout(() => {
      if (show) {
        text.value = item;
      }
    }, delayTillLoopFinishes);

    charactersArr.push(...initialArray);
  };

  useImperativeHandle(animationRef, () => ({ animate }), [animate]);

  return <ReText text={text} style={styles.character} textAlign={'center'} />;
};

export default EncryptedCharacter;
