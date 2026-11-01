import {vars} from '@arriba/css';
import styled from '@emotion/styled';
import type {ReactNode} from 'react';

const Darkest = styled.polygon({
  filter: 'brightness(0.8)',
});

const Darker = styled.polygon({
  filter: 'brightness(0.85)',
});

const Moderate = styled.polygon({
  filter: 'brightness(0.90)',
});

const Slight = styled.polygon({
  filter: 'brightness(0.95)',
});

const Bright = styled.polygon({}); // brightness 1

const left = 5;
const right = 100 - left;
const mid = 50;

const y = [0, 24, 74, 100];
const frontX = 20;
const frontY = [14, 68];

// Define the vertices array with string coordinates, now renamed to `v`
const v = [
  [`${mid},${y[0]}`],
  [`${left},${y[1]}`, `${mid},${frontY[0]}`, `${right},${y[1]}`],
  [
    `${left},${y[2]}`,
    `${frontX},${frontY[1]}`,
    `${100 - frontX},${frontY[1]}`,
    `${right},${y[2]}`,
  ],
  [`${mid},${y[3]}`],
];

const Svg = styled.svg({
  position: 'absolute',
});

export const View = ({backgroundColor}: {backgroundColor: string}) => {
  return (
    <Svg
      width="100%"
      height="100%"
      fill={backgroundColor}
      viewBox="0 0 100 100"
    >
      {/* Top left, right */}
      <Bright points={`${v[0][0]} ${v[1][0]} ${v[1][1]}`} />
      <Moderate points={`${v[0][0]} ${v[1][1]} ${v[1][2]}`} />

      {/* Middle five */}
      <Moderate points={`${v[1][0]} ${v[2][0]} ${v[2][1]}`} />
      <Slight points={`${v[1][0]} ${v[1][1]} ${v[2][1]}`} />
      {/* Rolled */}
      <Bright points={`${v[2][1]} ${v[1][1]} ${v[2][2]}`} />
      <Slight points={`${v[2][2]} ${v[1][1]} ${v[1][2]}`} />
      <Darker points={`${v[2][2]} ${v[2][3]} ${v[1][2]}`} />

      {/* Bottom left, mid, right */}
      <Moderate points={`${v[2][0]} ${v[2][1]} ${v[3][0]}`} />
      <Darkest points={`${v[2][1]} ${v[2][2]} ${v[3][0]}`} />
      <Darker points={`${v[2][3]} ${v[2][2]} ${v[3][0]}`} />
    </Svg>
  );
};

const Container = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  width: vars.die.size,
  height: vars.die.size,
});

export const D20 = ({
  backgroundColor,
  children,
}: {
  backgroundColor: string;
  children: ReactNode;
}) => {
  return (
    <Container>
      <View backgroundColor={backgroundColor} />
      {children}
    </Container>
  );
};
