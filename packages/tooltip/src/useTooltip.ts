import type {Placement} from '@floating-ui/dom';
import type {MouseEvent, ReactNode} from 'react';
import {useEffect, useId, useRef} from 'react';
import {create} from 'zustand';

type TooltipState = {
  // useTooltip instance that owns the tooltip, set on hover before it shows
  owner?: string;
  anchor?: HTMLElement;
  placement: Placement;
  content: ReactNode;
};

export const useTooltipStore = create<TooltipState>()(() => ({
  placement: 'top',
  content: null,
}));

let enterTimeout: number | undefined;
let leaveTimeout: number | undefined;

export const reset = () => {
  clearTimeout(enterTimeout);
  clearTimeout(leaveTimeout);
  useTooltipStore.setState({
    owner: undefined,
    anchor: undefined,
    content: null,
  });
};

// Cancel timeout on tooltip enter
export const enter = () => {
  clearTimeout(leaveTimeout);
};

export const leave = () => {
  leaveTimeout = window.setTimeout(reset, 200);
};

type Config = {
  placement?: Placement;
  element: ReactNode;
};

export const useTooltip = ({placement = 'top', element}: Config) => {
  const owner = useId();
  const elementRef = useRef(element);

  // Keep an open tooltip in sync with the latest render of its owner
  useEffect(() => {
    elementRef.current = element;

    const state = useTooltipStore.getState();
    if (state.owner === owner && state.content) {
      useTooltipStore.setState({content: element});
    }
  });

  // Don't leave a tooltip pointing at an element that's gone
  useEffect(() => {
    return () => {
      if (useTooltipStore.getState().owner === owner) {
        reset();
      }
    };
  }, [owner]);

  const enter = (event: MouseEvent<Element>) => {
    reset();

    useTooltipStore.setState({
      owner,
      anchor: event.currentTarget as HTMLElement,
      placement,
    });

    enterTimeout = window.setTimeout(() => {
      useTooltipStore.setState({content: elementRef.current});
    }, 400); // default recommended
  };

  return {
    enter,
    leave,
    handlers: {
      onMouseEnter: enter,
      onMouseLeave: leave,
    },
  };
};
