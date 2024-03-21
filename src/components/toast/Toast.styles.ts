import { StyleSheet } from 'react-native';
import { width } from '@/utils/sizing';

export default StyleSheet.create({
  toast: {
    position: 'absolute',
    height: 60,
    borderWidth: 1.5,
    borderRadius: 20,
    borderColor: '#001E5A',
    backgroundColor: 'white',
    justifyContent: 'center',
    width: width * 0.9,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  toastText: {
    padding: 20,
    fontSize: 15,
    fontWeight: '600',
    color: '#001E5A',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    height: 6,
    backgroundColor: '#EAC9FF',
    borderRadius: 20,
  },
});
