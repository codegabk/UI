import { StyleSheet } from 'react-native';

import { height, width } from '@/utils/sizing';

export default StyleSheet.create({
  cardContainer: {
    width: 120,
    left: width / 2 - 60,
    position: 'absolute',
    height: height * 0.7,
    transformOrigin: 'bottom',
  },
  card: {
    height: '40%',
    width: '100%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    color: 'white',
    fontSize: 38,
    fontWeight: 'bold',
  },
});
