import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import PropTypes from 'prop-types';
import React, { ReactNode, useCallback, useEffect, useRef } from 'react';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

import styles from './Sheet.styles';

interface SheetProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  snapPoints: string[];
  setIsVisible: (visible: boolean) => void;
}

const Sheet = ({
  visible,
  children,
  snapPoints,
  setIsVisible,
  onClose: onCloseCallback,
}: SheetProps) => {
  const sheetRef = useRef<BottomSheetMethods>(null);

  const index = visible ? 0 : -1;

  useEffect(() => {
    if (index === -1) {
      // Needed as index can only determine first position when closed
      sheetRef.current?.close();
    }
  }, [index]);

  const onClose = useCallback(() => {
    onCloseCallback?.();
    setIsVisible(false);
  }, [setIsVisible, onCloseCallback]);

  const renderBackdrop = (props: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop
      opacity={0.6}
      onPress={onClose}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      {...props}
    />
  );

  return (
    <BottomSheet
      index={index}
      ref={sheetRef}
      onClose={onClose}
      snapPoints={snapPoints ?? ['50%']}
      enablePanDownToClose
      handleComponent={null}
      style={{ overflow: 'hidden' }}
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.borderRadius}>
      {children}
    </BottomSheet>
  );
};

Sheet.propTypes = {
  onCloseCallback: PropTypes.func,
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool.isRequired,
  setIsVisible: PropTypes.func.isRequired,
  snapPoints: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Sheet;
