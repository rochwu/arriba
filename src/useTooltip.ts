import {autoUpdate, computePosition, flip, shift} from '@floating-ui/dom';
import {createSignal} from 'solid-js';

export const useTooltip = () => {
  let tooltip: HTMLElement = undefined as never;
  let container: HTMLElement = undefined as never;

  let cleanup: () => void | undefined;
  let timeout: number;

  const [hovered, setHover] = createSignal(false);

  const update = () => {
    computePosition(container, tooltip, {
      placement: 'top',
      middleware: [flip(), shift({padding: 8})],
    }).then(({x, y}) => {
      tooltip.style.position = 'fixed';
      tooltip.style.width ??= 'fit-content';
      tooltip.style.top = `${y}px`;
      tooltip.style.left = `${x}px`;
    });
  };

  const enter = () => {
    timeout = setTimeout(() => {
      setHover(true);
      cleanup = autoUpdate(container, tooltip, update);
    }, 400); // default recommended
  };

  const leave = () => {
    clearTimeout(timeout);
    setHover(false);
    cleanup?.();
  };

  return {
    hovered,
    enter,
    leave,
    tooltip: (el: HTMLElement) => {
      tooltip = el;
    },
    container: (el: HTMLElement) => {
      container = el;
    },
  };
};
