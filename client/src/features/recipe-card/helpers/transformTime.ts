export const transformTime = (totalMins: number) => {
  const hours = Math.floor(totalMins / 60);
  const minutes = totalMins % 60;
  return { hours, minutes };
};
