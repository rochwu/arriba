import {createCss} from './createCss';

// Example usage with TypeScript type inference
export const {vars, record} = createCss({
  backgroundColor: '#deb887',
  borderRadius: '8px',
  fontFamily: 'Arial, Helvetica, sans-serif',
  gap: '8px',
  slot: {
    backgroundColor: '#fff8dc',
    type: {
      size: '18px',
    },
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
  dot: {
    // NoticeMe
    size: '8px',
  },
});
