import {createCssVars} from './createCssVars';

export const {vars, root} = createCssVars({
  backgroundColor: '#deb887',
  borderRadius: '8px',
  boxShadow: '2px 2px rgba(0, 0, 0, 0.10)',
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
    special: {
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
