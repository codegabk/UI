import React from 'react';
import Circle from './circle/Circle';

const blueShades = ['#87CEFA', '#00BFFF', '#1E90FF', '#4169E1', '#0000CD', '#000080'];

const ScalingCircles = () => {
  const array = Array.from({ length: 6 }, (_, index) => blueShades[index]);

  return array.map((color, index) => <Circle key={index} color={color} index={index} />);
};

export default ScalingCircles;
