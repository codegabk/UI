import { StyleSheet } from 'react-native';
import { width } from '../../utils/sizing';

export default StyleSheet.create({
  pressable: {
    paddingVertical: 28,
    paddingHorizontal: 20,
    borderRadius: 12,
    width: width * 0.9,
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  innerView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  blurContainer: {
    position: 'absolute',
    borderRadius: 8,
    overflow: 'hidden',
  },
  absoluteView: {
    position: 'absolute',
    zIndex: 1,
  },
  image: {
    borderRadius: 8,
  },
  flex: {
    flex: 1,
  },
  title: {
    fontWeight: '600',
  },
  spacing: {
    height: 4,
  },
});
