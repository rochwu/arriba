import styled from '@emotion/styled';

import {Dot} from '../Dot';
import type {Die} from '../store';

const View = styled(Dot)({
  position: 'absolute',
  top: '-2px',
  right: '-4px',
  opacity: '0.4',
  backgroundColor: '#3cb371',
});

export const NoticeMe = ({die}: {die: Die}) => {
  if (die.age !== 1) {
    return null;
  }

  return <View aria-label="new die" />;
};
