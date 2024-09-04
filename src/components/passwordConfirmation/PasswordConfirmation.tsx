import React, { useState } from 'react';
import { TextInput, View } from 'react-native';

import Indicator from '@/components/passwordConfirmation/indicator/Indicator';

import styles from './PasswordConfirmation.styles';

const PasswordConfirmation = () => {
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');

  return (
    <>
      <View style={styles.inputContainer}>
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={[styles.fullWidth, styles.input]}
          placeholder="Enter password"
          secureTextEntry={true}
        />
        <View style={styles.indicatorContainer}>
          {[...confirmedPassword].map((item, index) => (
            <Indicator
              key={`${item}-${index}`}
              password={password}
              confirmedPassword={confirmedPassword}
              index={index}
            />
          ))}
        </View>
      </View>

      <TextInput
        value={confirmedPassword}
        onChangeText={setConfirmedPassword}
        style={[styles.fullWidth, styles.input, styles.inputContainer]}
        placeholder="Confirm password"
        secureTextEntry={true}
      />
    </>
  );
};

export default PasswordConfirmation;
