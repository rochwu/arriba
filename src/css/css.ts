import {createCss} from './createCss';

// Example usage with TypeScript type inference
export const {vars, record} = createCss({
  app: {
    backgroundColor: '#deb887',
  },
  slot: {
    backgroundColor: '#fff8dc',
  },
  tooltip: {
    backgroundColor: '#cdaa7d',
  },
  die: {
    backgroundColor: 'white',
    color: 'black',
    size: '50px',
    roll: {
      size: '12px',
    },
  },
});
