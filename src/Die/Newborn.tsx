import {Accessor, Component, Show, createMemo} from 'solid-js';
import {styled} from 'solid-styled-components';

import {Die} from '../store';

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

export const Newborn: Component<{die: Accessor<Die>}> = ({die}) => {
  const isNewborn = createMemo(() => die().age === 1);

  return (
    <Show when={isNewborn()}>
      <Dot aria-label="new die" />
    </Show>
  );
};
