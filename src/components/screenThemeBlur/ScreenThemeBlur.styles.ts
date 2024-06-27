import { StyleSheet } from 'react-native';
import { height, width } from '@/utils/sizing';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  padding: {
    paddingVertical: 100,
    paddingHorizontal: 60,
  },
  image: {
    width: 150,
    height: 220,
    borderRadius: 20,
  },
  spacing24: {
    height: 24,
  },
  spacing8: {
    height: 8,
  },
  spacing4: {
    height: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: '500',
    fontFamily: 'Arial',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Arial',
  },
  content: {
    lineHeight: 20,
  },
  canvas: {
    width,
    height: height / 4,
    bottom: 0,
    position: 'absolute',
  },
  blurView: {
    width,
    height,
    position: 'absolute',
  },
  pressable: {
    position: 'absolute',
    bottom: 60,
    backgroundColor: '#e9e9e9',
    alignSelf: 'center',
    padding: 16,
    borderRadius: 32,
  },
  icon: {
    color: 'black',
  },
});

export default styles;
