import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  inputContainer: {
    width: '60%',
    marginBottom: 20,
  },
  fullWidth: {
    width: '100%',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  indicatorContainer: {
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
});
