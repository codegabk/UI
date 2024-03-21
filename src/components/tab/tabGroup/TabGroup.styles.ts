import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  indicator: {
    zIndex: -1,
    alignSelf: 'center',
    position: 'absolute',
    height: 40,
    borderRadius: 16,
    borderCurve: 'continuous',
  },
  container: {
    flexDirection: 'row',
    padding: 4,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#3A3A3A',
    borderCurve: 'continuous',
  },
});
