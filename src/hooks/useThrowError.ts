import { useCallback } from 'react';

const useThrowError = () => {
  const throwInvalidArrayLength = useCallback((array: unknown[], maxLength: number) => {
    const arrayLength = array?.length;

    if (arrayLength > maxLength) {
      throw new Error('Exceeded allowed array length');
    }
  }, []);

  return {
    throwInvalidArrayLength,
  };
};

export default useThrowError;
