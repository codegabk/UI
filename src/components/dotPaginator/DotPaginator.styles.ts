import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    gap: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bar: {
    left: -8,
    height: 24,
    borderRadius: 12,
    position: 'absolute',
    backgroundColor: '#56BA9F',
  },
  next: {
    color: '#0090FF',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 20,
  },
});
