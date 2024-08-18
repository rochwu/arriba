import type {Die} from '../types';

type Faces = Die['faces'];

// undefined skips a face
export const makeFaces = (values: (number | undefined)[]): Faces => {
  return values.reduce((faces, value, index) => {
    if (value !== undefined) {
      const i = index + 1; // 1 - 6

      faces[i] = {
        id: i,
        value,
      };
    }

    return faces;
  }, {} as Faces);
};
