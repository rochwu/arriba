import {vars} from '@arriba/css';
import styled from '@emotion/styled';

import {actions} from './store';

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

export const EndTurn = () => {
  return (
    <Button role="button" onClick={() => actions.endTurn()}>
      End Turn
    </Button>
  );
};
