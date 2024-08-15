import type {Accessor, Component} from 'solid-js';
import {Show, createMemo} from 'solid-js';
import {styled} from 'solid-styled-components';

import type {Die} from '../store';

const Dot = styled.div({
  position: 'absolute',
  top: '-2px',
  right: '-4px',
  backgroundColor: '#3cb371',
  minWidth: '8px',
  aspectRatio: '1 / 1',
  borderRadius: '100%',
  opacity: '0.4',
});

export const New: Component<{die: Accessor<Die>}> = (props) => {
  const isNewborn = createMemo(() => props.die().age === 1);

  return (
    <Show when={isNewborn()}>
      <Dot aria-label="new die" />
    </Show>
  );
};
