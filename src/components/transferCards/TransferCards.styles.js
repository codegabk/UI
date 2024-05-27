import { StyleSheet } from 'react-native';
import { width } from '@/utils/sizing';

export default StyleSheet.create({
  white: {
    color: '#FFFFFF',
  },
  cardContainer: {
    borderRadius: 16,
    width: width * 0.8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E8EC',
    padding: 12,
  },
  card: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  euroColor: {
    backgroundColor: '#3D63DD',
  },
  dollarColor: {
    backgroundColor: '#5BB98B',
  },
  separator: {
    height: 16,
  },
  body: {
    marginStart: 12,
  },
  currency: {
    fontWeight: '600',
  },
  amount: {
    color: '#62636C',
  },
  trailing: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: '#EFF0F3',
    borderRadius: 12,
  },
  use: {
    fontWeight: '500',
    color: '#62636C',
  },
  receivedAmount: {
    fontWeight: '600',
    fontSize: 16,
  },
  lineSeparator: {
    height: 1,
    opacity: 0.5,
    backgroundColor: '#E7E8EC',
    marginVertical: 16,
  },
  bottomContainer: {
    alignSelf: 'center',
  },
  conversion: {
    textAlign: 'center',
    marginVertical: 8,
    color: '#62636C',
  },
  euroAmount: {
    fontSize: 28,
    textAlign: 'center',
    fontWeight: '600',
  },
  indicator: {
    top: -30,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E7E8EC',
    backgroundColor: '#FFFFFF',
    start: width * 0.4 - 20,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chevron: {
    color: '#62636C',
  },
});
