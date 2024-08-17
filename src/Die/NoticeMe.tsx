import type {Accessor, Component} from 'solid-js';
import {Show} from 'solid-js';
import {styled} from 'solid-styled-components';

import {Dot} from '../Dot';
import type {Die} from '../store';

const View = styled(Dot)({
  position: 'absolute',
  top: '-2px',
  right: '-4px',
  opacity: '0.4',
  backgroundColor: '#3cb371',
});

export const NoticeMe: Component<{die: Accessor<Die>}> = (props) => {
  const notice = () => props.die().age === 1;

  return (
    <Show when={notice()}>
      <View aria-label="new die" />
    </Show>
  );
};
