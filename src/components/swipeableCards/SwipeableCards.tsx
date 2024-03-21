import React, { useCallback, useState } from 'react';

import Card from '@/components/swipeableCards/card/Card';

const SwipeableCards = () => {
  const list = [
    { id: 0, backgroundColor: '#E54D2E' },
    { id: 1, backgroundColor: '#AB4ABA' },
    { id: 2, backgroundColor: '#3E63DD' },
    { id: 3, backgroundColor: '#29A383' },
    { id: 4, backgroundColor: '#978365' },
    { id: 5, backgroundColor: '#FFE629' },
    { id: 6, backgroundColor: '#7CE2FE' },
  ];

  const [state, setState] = useState<{ id: number; backgroundColor: string }[]>(list);

  const onRemove = useCallback((cardIndex: number) => {
    setState((prev) => prev.filter((_, index) => index !== cardIndex));
  }, []);

  return state.map(({ id, backgroundColor }, index) => {
    return (
      <Card
        key={id}
        index={index}
        onRemove={onRemove}
        dataLength={state.length}
        backgroundColor={backgroundColor}
      />
    );
  });
};

export default SwipeableCards;
