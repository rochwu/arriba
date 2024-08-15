import type {Component} from 'solid-js';
import {Show} from 'solid-js';

// For aesthetics we don't show 0
export const Value: Component<{children: number}> = (props) => {
  return <Show when={props.children}>{props.children}</Show>;
};
