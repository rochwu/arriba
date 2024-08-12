import {getDice} from './getDice';
import {Die, DieId, State} from './types';

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

  const effect = from.effect;
  from.effect = to.effect;
  to.effect = effect;

  const swapEffect = (source: Die, target: Die) => {
    const dice = getDice(state, {effect: source.effect});
    dice[dice.indexOf(target.id)] = source.id;
  };

  swapEffect(from, to);
  swapEffect(to, from);
};
