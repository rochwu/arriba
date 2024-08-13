import {DieId, State} from '../../types';
import {getDice} from '../getDice';

export const swap = (
  state: State,
  {
    ...args
  }: {
    from: DieId;
    to: DieId;
  },
) => {
  const to = state.dieById[args.to];
  const from = state.dieById[args.from];

  const fromDice = getDice(state, {effect: from.effect});
  const toDice =
    from.effect === to.effect ? fromDice : getDice(state, {effect: to.effect});

  const fromIndex = fromDice.indexOf(from.id);
  const toIndex = toDice.indexOf(to.id);

  fromDice[fromIndex] = to.id;
  toDice[toIndex] = from.id;

  const effect = from.effect;
  from.effect = to.effect;
  to.effect = effect;
};
