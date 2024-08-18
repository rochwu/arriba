import type {Lightning} from 'phosphor-solid-js';
import {CheckCircle, Circle, MinusCircle, XCircle} from 'phosphor-solid-js';
import {Index} from 'solid-js';
import type {Component} from 'solid-js';
import {Dynamic} from 'solid-js/web';
import {styled} from 'solid-styled-components';

import {vars} from '@arriba/css';
import {useTooltip} from '@arriba/tooltip';

import {Absolute} from '../../Absolute';
import {Iconed} from '../../Iconed';
import type {Effect, Score as ScoreResult} from '../../store';

const Container = styled.div({
  display: 'flex',
  position: 'relative',
});

const icons = {
  win: CheckCircle,
  lose: XCircle,
  tie: MinusCircle,
  none: Circle,
} as Record<ScoreResult, typeof Lightning>;

const Vs = styled(Absolute)({
  width: '100%',
  bottom: '100%',
  fontSize: vars.text.small,
});

export const Versus: Component<{effect: Effect}> = (props) => {
  const scores = () => props.effect.special!.score!;
  const wins = () => scores().filter((score) => score === 'win').length;
  const loses = () => scores().filter((score) => score === 'lose').length;

  const tooltip = () => {
    const w = wins();
    const l = loses();

    if (w === 0 && l === 0) {
      return "hasn't started yet";
    }

    return `score: ${w}-${l}`;
  };

  const {handlers} = useTooltip({
    element: tooltip(),
  });

  return (
    <Container {...handlers}>
      <Vs>vs</Vs>
      <Index each={scores()}>
        {(score) => (
          <Dynamic
            component={() => <Iconed Icon={icons[score()]} weight="regular" />}
          />
        )}
      </Index>
    </Container>
  );
};
