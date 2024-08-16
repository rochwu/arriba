import {Show, type Component} from 'solid-js';
import {Portal} from 'solid-js/web';
import {styled} from 'solid-styled-components';

import {vars} from '../css';

import {el, enter, leave, tooltipRef} from './useTooltip';

const Container = styled.div({
  display: 'grid',
  placeContent: 'center',
  position: 'fixed',
  padding: '0.5em',
  borderRadius: '0.5em',
  backgroundColor: vars.tooltip.backgroundColor,
  width: 'fit-content',
});

export const Tooltip: Component = () => {
  return (
    <Show when={el()} keyed>
      {(el) => (
        <Portal>
          <Container ref={tooltipRef} onMouseEnter={enter} onMouseLeave={leave}>
            {el}
          </Container>
        </Portal>
      )}
    </Show>
  );
};
