import React, { useRef, useState } from 'react';
import { View } from 'react-native';

import Icon from '@/components/icon/Icon';
import Pressable from '@/components/pressable/Pressable';
import EncryptedCharacter from './encryptedCharacter/EncryptedCharacter';

import styles from './EncryptedWord.styles';

import { LockIcon, LockOpenIcon } from '../../../assets/icons';

const EncryptedWord = () => {
  const word = 'ENCRYPTED WORD';

  const [show, setShow] = useState(true);

  const refArray = useRef<
    {
      animate: (show: boolean) => void;
    }[]
  >([]);

  const setActionRefs = (ref: { animate: (show: boolean) => void }) => {
    refArray.current.push(ref);
  };

  const onPress = () => {
    setShow((prev) => {
      refArray.current.map((el) => el?.animate(!prev));

      return !prev;
    });
  };

  const Asset = show ? LockIcon : LockOpenIcon;

  return (
    <>
      <View style={styles.flexRow}>
        {[...word].map((item, index) => (
          <EncryptedCharacter item={item} key={index} animationRef={setActionRefs} />
        ))}
        <Pressable onPressOut={onPress}>
          <View style={styles.icon}>
            <Icon Asset={Asset} fill={'#FFFFFF'} />
          </View>
        </Pressable>
      </View>
    </>
  );
};

export default EncryptedWord;
