import type {Component} from 'solid-js';
import {styled} from 'solid-styled-components';

import {vars} from '@arriba/css';

import {actions} from './store';

const shadow = 2;

const Button = styled.div({
  display: 'grid',
  placeContent: 'center',
  height: vars.die.size,
  width: 'fit-content',
  cursor: 'pointer',
  backgroundColor: 'white',
  borderRadius: vars.borderRadius,
  padding: `0 ${vars.gap}`,
  '&:hover': {
    '&:not(:active)': {
      backgroundColor: vars.slot.backgroundColor,
    },
  },
  boxShadow: vars.boxShadow,
});

export const EndTurn: Component = () => {
  return (
    <Button role="button" onClick={actions.endTurn}>
      End Turn
    </Button>
  );
};
