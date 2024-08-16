export const opacity = (value: number, color: string) => {
  return `rgb(from ${color} r g b / ${value})`;
};
