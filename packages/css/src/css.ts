import {createCss} from './createCss';

// Example usage with TypeScript type inference
export const {vars, record} = createCss({
  backgroundColor: '#deb887',
  borderRadius: '8px',
  color: 'black',
  fontFamily: 'Arial, Helvetica, sans-serif',
  gap: '8px',
  tooltip: {
    backgroundColor: '#cdaa7d',
  },
  die: {
    backgroundColor: 'white',
    color: 'black',
    size: '50px',
    roll: {
      size: '12px',
      color: 'white',
      backgroundColor: 'red',
      fontWeight: 600,
    },
  },
  slot: {
    backgroundColor: '#fff8dc',
    type: {
      size: '18px',
      color: 'blue',
    },
    min: {
      // Most come from die.roll
      color: 'black',
    },
  },
  dot: {
    size: '8px',
  },
});
