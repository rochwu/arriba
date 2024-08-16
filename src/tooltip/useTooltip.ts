import type {Placement} from '@floating-ui/dom';
import {autoUpdate, computePosition, flip, shift} from '@floating-ui/dom';
import type {JSX} from 'solid-js';
import {createSignal} from 'solid-js';

let tooltipEl: HTMLElement = undefined as never;
let containerEl: HTMLElement = undefined as never;

let cleanup: () => void | undefined;
let enterTimeout: number;
let leaveTimeout: number;

const [el, setEl] = createSignal<JSX.Element>(null);

export {el};

const reset = () => {
  setEl();
  clearTimeout(enterTimeout);
  clearTimeout(leaveTimeout);
  cleanup?.();
};

export const tooltipRef = (el: HTMLDivElement) => {
  tooltipEl = el;
};

type Config = {
  placement?: Placement;
  element: JSX.Element;
};

// Cancel timeout on tooltip enter
export const enter = () => {
  clearTimeout(leaveTimeout);
};

export const leave = () => {
  leaveTimeout = setTimeout(() => {
    reset();
  }, 200);
};

export const useTooltip = (config: Config) => {
  const update = () => {
    computePosition(containerEl, tooltipEl, {
      placement: config?.placement ?? 'top',
      middleware: [flip(), shift({padding: 8})],
    }).then(({x, y}) => {
      tooltipEl.style.top = `${y}px`;
      tooltipEl.style.left = `${x}px`;
    });
  };

  return {
    enter: ({target}: MouseEvent) => {
      reset();

      containerEl = target as HTMLElement;

      enterTimeout = setTimeout(() => {
        setEl(config.element);
        cleanup = autoUpdate(containerEl, tooltipEl, update);
      }, 400); // default recommended
    },
    leave,
  };
};
