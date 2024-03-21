import React from 'react';

interface IconProps {
  Asset: React.ElementType;
  fill: string;
}

const Icon = ({ Asset, ...rest }: IconProps) => {
  return <Asset {...rest} width={20} />;
};

export default Icon;
