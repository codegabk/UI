import { View } from 'react-native';
import React, { useState } from 'react';
import Animated from 'react-native-reanimated';

import CheckBox from '@/components/checkBoxGroup/checkBox/CheckBox';

import { cuisines } from '@/utils/constants';

import styles from './CheckBoxGroup.styles';

const CheckBoxGroup = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  return (
    <View style={styles.center}>
      <Animated.View style={styles.wrap}>
        {cuisines.map(({ id, label }) => (
          <CheckBox
            id={id}
            key={id}
            label={label}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          />
        ))}
      </Animated.View>
    </View>
  );
};

export default CheckBoxGroup;
