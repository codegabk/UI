import { StyleSheet } from 'react-native';
import { width } from '@/utils/sizing';

export default StyleSheet.create({
  label: {
    fontSize: 16,
  },
  title: {
    marginBottom: 8,
    fontSize: 12,
  },
  trailing: {
    flexDirection: 'row',
    gap: 16,
  },
  row: {
    flexDirection: 'row',
  },
  container: {
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    width: width - 50,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 100,
  },
});
