import {vars} from '@arriba/css';
import styled from '@emotion/styled';
import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
} from '@floating-ui/dom';
import {useLayoutEffect, useRef} from 'react';
import {createPortal} from 'react-dom';

import {enter, leave, useTooltipStore} from './useTooltip';

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

export const Tooltip = () => {
  const anchor = useTooltipStore((state) => state.anchor);
  const placement = useTooltipStore((state) => state.placement);
  const content = useTooltipStore((state) => state.content);
  const ref = useRef<HTMLDivElement>(null);

  const open = Boolean(content);

  useLayoutEffect(() => {
    const tooltip = ref.current;

    if (!open || !anchor || !tooltip) {
      return;
    }

    const update = () => {
      computePosition(anchor, tooltip, {
        placement,
        middleware: [offset(4), flip(), shift({padding: 8})],
      }).then(({x, y}) => {
        tooltip.style.top = `${y}px`;
        tooltip.style.left = `${x}px`;
      });
    };

    return autoUpdate(anchor, tooltip, update);
  }, [open, anchor, placement]);

  if (!open) {
    return null;
  }

  return createPortal(
    <Container ref={ref} onMouseEnter={enter} onMouseLeave={leave}>
      {content}
    </Container>,
    document.body,
  );
};
