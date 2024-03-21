import { StyleSheet } from 'react-native';
import { width } from '@/utils/sizing';

export default StyleSheet.create({
  continue: {
    fontSize: 20,
    fontWeight: '500',
  },
  dotContainer: {
    flexDirection: 'row',
  },
  next: {
    height: 60,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderCurve: 'continuous',
    backgroundColor: '#FFFFFF',
  },
  footer: {
    width,
    bottom: 40,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    paddingHorizontal: 40,
    justifyContent: 'space-between',
  },
});
