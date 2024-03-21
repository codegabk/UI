const getRandomColor = () => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  return '#' + red.toString(16) + green.toString(16) + blue.toString(16);
};

export { getRandomColor };
