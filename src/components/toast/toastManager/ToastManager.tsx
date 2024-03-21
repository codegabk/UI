import React, { useCallback, useImperativeHandle, useState } from 'react';
import Toast from '@/components/toast/Toast';

interface ToastManagerProps {
  toastManagerRef: React.Ref<{ addToast: () => void }>;
}

// USE const ref = useRef<ToastManagerRef>() as MutableRefObject<ToastManagerRef>;
export interface ToastManagerRef {
  addToast: () => void;
}

const ToastManager = ({ toastManagerRef }: ToastManagerProps) => {
  const [state, setState] = useState<{ id: number }[]>([]);

  const onPressIn = () => {
    setState((prev) => {
      if (prev.length > 4) {
        return prev;
      }

      const id = Math.random();

      return [...prev, { id }];
    });
  };

  useImperativeHandle(toastManagerRef, () => ({ addToast: onPressIn }), [onPressIn]);

  const onRemove = useCallback((toastId: number) => {
    setState((prev) => prev.filter((_, index) => index !== toastId));
  }, []);

  return state?.map(({ id }, index) => <Toast key={id} index={index} onRemove={onRemove} />);
};

export default ToastManager;
