import {Show, type Component} from 'solid-js';
import {Portal} from 'solid-js/web';
import {styled} from 'solid-styled-components';

import {vars} from '@arriba/css';

import {content, enter, leave, tooltipRef} from './useTooltip';

const Container = styled.div({
  display: 'grid',
  placeContent: 'center',
  position: 'fixed',
  padding: vars.gap,
  borderRadius: vars.borderRadius,
  backgroundColor: vars.tooltip.backgroundColor,
  width: 'fit-content',
  boxShadow: vars.boxShadow,
});

export const Tooltip: Component = () => {
  // vite couldn't build without this. Complaining about ref={tooltipRef} trying to reassign tooltipRef even though it's a function
  const ref = tooltipRef;

  return (
    <Show when={content()} keyed>
      {(el) => (
        <Portal>
          <Container ref={ref} onMouseEnter={enter} onMouseLeave={leave}>
            {el}
          </Container>
        </Portal>
      )}
    </Show>
  );
};
