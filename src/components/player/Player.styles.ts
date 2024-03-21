import { StyleSheet } from 'react-native';
import { height, width } from '@/utils/sizing';

export default StyleSheet.create({
  container: {
    width: width,
    height: height,
    paddingHorizontal: 20,
    backgroundColor: '#1D2E62',
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trailingIcons: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'flex-end',
  },
  album: {
    aspectRatio: 1,
    borderRadius: 15,
    marginVertical: 40,
    backgroundColor: '#3E63DD',
  },
  title: {
    height: 16,
    width: 100,
    borderRadius: 15,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  subtitle: {
    height: 16,
    width: 160,
    borderRadius: 15,
    marginBottom: 30,
    backgroundColor: '#9EB1FF',
  },
  options: {
    gap: 6,
    flexDirection: 'row',
  },
  option: {
    height: 24,
    width: 80,
    borderRadius: 15,
    marginBottom: 30,
    backgroundColor: '#FFFFFF',
  },
  track: {
    width: '100%',
    height: 3,
    marginBottom: 12,
    backgroundColor: '#9EB1FF',
  },
  text: {
    color: '#FFFFFF',
    marginBottom: 40,
  },
  closedContainer: {
    width,
    height: 100,
    position: 'absolute',
  },
  closedContentContainer: {
    height: '100%',
    justifyContent: 'space-evenly',
  },
  closedTrack: {
    width: '100%',
    height: 2,
    backgroundColor: '#FFFFFF',
  },
  closedTrailingIcons: {
    gap: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginHorizontal: 20,
  },
  albumZIndex: {
    zIndex: 2,
  },
});
