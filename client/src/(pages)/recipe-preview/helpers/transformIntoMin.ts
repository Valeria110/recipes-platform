export const transformInMin = (hours: number = 0, min: number = 0, sec: number = 0) => {
  return hours * 60 + min + Math.round(sec / 60);
};
