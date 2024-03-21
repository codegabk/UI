import React, { useRef } from 'react';
import { Text, View } from 'react-native';

import Pressable from '@/components/pressable/Pressable';
import AnimatedCharacter from '@/components/animatedWord/animatedCharacter/AnimatedCharacter';

import styles from './AnimatedWord.styles';

interface AnimatedWordProps {
  leadingWord: string;
  word: string;
}

const AnimatedWord = ({ leadingWord, word }: AnimatedWordProps) => {
  const refArray = useRef<
    {
      triggerAnimation: () => void;
    }[]
  >([]);

  const setActionRefs = (ref: { triggerAnimation: () => void }) => {
    refArray.current.push(ref);
  };

  return (
    <>
      <View style={styles.row}>
        <Text style={styles.text}>{leadingWord} </Text>
        {[...word].map((item, index) => (
          <AnimatedCharacter item={item} index={index} key={index} animationRef={setActionRefs} />
        ))}
      </View>
      <Pressable
        onPressOut={() => {
          refArray.current.map((el) => el?.triggerAnimation());
        }}>
        <View style={styles.button}></View>
      </Pressable>
    </>
  );
};

export default AnimatedWord;
