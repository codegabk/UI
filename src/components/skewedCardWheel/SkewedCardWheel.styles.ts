import { StyleSheet } from 'react-native';

import { height, width } from '@/utils/sizing';

export default StyleSheet.create({
  canvas: {
    position: 'absolute',
    width,
    height,
  },
  scrollContainer: {
    alignItems: 'flex-end',
  },
});
