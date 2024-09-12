import { StyleSheet } from 'react-native';

import { width } from '@/utils/sizing';

export default (padding: number, indicatorWidth: number) =>
  StyleSheet.create({
    container: {
      height: 60,
      borderWidth: 1,
      borderRadius: 20,
      width: width * 0.8,
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: '#B2B3BD',
      paddingHorizontal: padding,
      justifyContent: 'space-between',
    },
    indicator: {
      height: '50%',
      width: indicatorWidth,
      backgroundColor: '#B2B3BD',
    },
    selector: {
      height: '60%',
      position: 'absolute',
      width: indicatorWidth,
      backgroundColor: '#F76B15',
    },
    textContainer: {
      top: -20,
      left: -30,
      width: 60,
      height: 30,
      borderRadius: 20,
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F76B15',
    },
  });
