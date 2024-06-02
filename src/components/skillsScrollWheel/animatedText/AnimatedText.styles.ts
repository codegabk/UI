import { StyleSheet } from 'react-native';
import { width } from '@/utils/sizing';

const styles = StyleSheet.create({
  animatedView: {
    width: width * 1.8,
    alignItems: 'flex-end',
    transformOrigin: 'left center',
    position: 'absolute',
    left: -width * 0.75,
  },
  labelContainer: {
    width: width * 0.75,
    flexDirection: 'row',
  },
  selectedIconContainer: {
    padding: 8,
    backgroundColor: '#30A46C',
    borderRadius: 18,
    marginEnd: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: 'black',
  },
  label: {
    fontSize: 24,
    color: 'white',
  },
});

export default styles;
