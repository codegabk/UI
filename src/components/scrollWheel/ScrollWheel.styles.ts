import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  cardInfoContainer: {
    flexDirection: 'row',
    marginTop: 80,
  },
  cardInfo: {
    width: '100%',
    alignItems: 'center',
  },
  cardInfoText: {
    fontSize: 24,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  cardInfoNumber: {
    fontSize: 20,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  cardContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'flex-end',
  },
  scrollView: {
    width: '100%',
    height: '100%',
  },
});
