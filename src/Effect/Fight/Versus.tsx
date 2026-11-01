import {vars} from '@arriba/css';
import {useTooltip} from '@arriba/tooltip';
import styled from '@emotion/styled';
import type {Icon} from '@phosphor-icons/react';
import {CheckCircleIcon, CircleIcon, XCircleIcon} from '@phosphor-icons/react';

import {Absolute} from '../../Absolute';
import {Iconed} from '../../Iconed';
import type {Score as ScoreResult} from '../../store';
import {useEffectContext} from '../Provider';

const Container = styled.div({
  display: 'flex',
  position: 'relative',
});

const icons: Record<ScoreResult, Icon> = {
  win: CheckCircleIcon,
  lose: XCircleIcon,
  none: CircleIcon,
};

const Vs = styled(Absolute)({
  width: '100%',
  bottom: '100%',
  fontSize: vars.text.small,
});

const describe = (scores: ScoreResult[]) => {
  const wins = scores.filter((score) => score === 'win').length;
  const loses = scores.filter((score) => score === 'lose').length;

  if (wins === 0 && loses === 0) {
    return "hasn't started yet";
  }

  return `score: ${wins}-${loses}`;
};

export const Versus = () => {
  const effect = useEffectContext();

  const scores = effect.special!.score!;

  const {handlers} = useTooltip({
    element: describe(scores),
  });

  return (
    <Container {...handlers}>
      <Vs>vs</Vs>
      {scores.map((score, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: scores are positional, one per turn
        <Iconed key={index} Icon={icons[score]} weight="regular" />
      ))}
    </Container>
  );
};
