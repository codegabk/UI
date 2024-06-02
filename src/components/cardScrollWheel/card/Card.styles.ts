import { StyleSheet } from 'react-native';

import { height } from '@/utils/sizing';

export default StyleSheet.create({
  card: {
    position: 'absolute',
    height: height * 0.7,
    transformOrigin: 'bottom center',
  },
  cardImage: {
    width: 160,
    height: 250,
  },
});
