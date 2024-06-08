import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  arrowButton: {
    padding: 8,
    backgroundColor: '#e6e1e0',
    borderRadius: 20,
  },
  dotsContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#e6e1e0',
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  icon: {
    color: '#726e6c',
  },
});

export default styles;
