import { StyleSheet } from 'react-native';
import { width } from '@/utils/sizing';

export default StyleSheet.create({
  row: {
    flexDirection: 'row',
    margin: 8,
  },
  container: {
    width: width * 0.8,
    height: 180,
    backgroundColor: '#3A3A3A',
    borderRadius: 29,
    overflow: 'hidden',
  },
});
