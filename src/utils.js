export const getRandom = (value) => {
  const rand = Math.random() * value;
  return rand <= 1 ? 1 : Math.floor(rand);
};
