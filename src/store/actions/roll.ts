import {random} from 'lodash-es';

export const roll = (rolls: number[]) => {
  const rolled = random(0, rolls.length - 1);

  return rolls[rolled];
};
