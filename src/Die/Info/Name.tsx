import {vars} from '@arriba/css';
import styled from '@emotion/styled';

import type {Die} from '@/store';

const View = styled.div({
  textTransform: 'lowercase',
  fontWeight: 'bold',
});

export const Name = ({die}: {die: Die}) => {
  return (
    <View style={{color: die.opponent ? vars.opponent.color : vars.color}}>
      {die.name}
    </View>
  );
};
