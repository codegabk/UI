import { StyleSheet } from 'react-native';
import { width } from '@/utils/sizing';

const size = width;

export default StyleSheet.create({
  header: {
    marginVertical: 40,
  },
  circle: {
    zIndex: -1,
    width: size,
    height: size,
    borderRadius: size / 2,
  },
  subtitle: {
    fontSize: 28,
    fontWeight: '400',
    textAlign: 'center',
    marginHorizontal: 36,
    color: '#FFFFFF',
  },
  title: {
    fontSize: 36,
    fontWeight: '400',
    alignSelf: 'center',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  lottie: {
    height: size,
  },
});
