export const transformInMin = (hours: number = 0, min: number = 0, sec: number = 0) => {
  return Number(hours) * 60 + Number(min) + Math.round(Number(sec) / 60);
};
