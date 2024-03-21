import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  valueContainer: {
    height: 34,
    overflow: 'hidden',
  },
  value: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  textInput: {
    width: 200,
    margin: 20,
    height: 28,
    fontSize: 16,
    backgroundColor: '#EEEEEE',
  },
});
