import { StyleSheet } from 'react-native';
import { height, width } from '@/utils/sizing';

const gradientHeight = height / 2;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  skillsContainer: {
    width,
    height,
    position: 'absolute',
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  searchIcon: {
    position: 'absolute',
    top: height / 2 - 28 / 2,
    left: 24,
    color: 'white',
  },
  topGradientContainer: {
    width,
    top: 0,
    position: 'absolute',
    height: gradientHeight,
  },
  bottomGradientContainer: {
    width,
    bottom: 0,
    position: 'absolute',
    height: gradientHeight,
  },
  scrollView: {
    marginTop: height / 1.5,
  },
  clearContainer: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 80,
  },
  clearText: {
    fontSize: 16,
    color: 'white',
  },
});

export default styles;
