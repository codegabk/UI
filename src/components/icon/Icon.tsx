import React from 'react';

interface IconProps {
  Asset: React.ElementType;
  fill: string;
  width: number;
  height?: number | string;
  style?: { color: string };
}

const Icon = ({ Asset, width = 20, height = 'auto', ...rest }: IconProps) => {
  return <Asset width={width} height={height} {...rest} />;
};

export default Icon;
