import {createCssVars} from './createCssVars';

/**
 * #deb887
 * #cdaa7d
 * #fff8dc
 * #8b6914
 * #fafafa
 */

export const {vars, root} = createCssVars(
  {
    white: '#fafafa',
    text: {
      small: '12px',
    },
  },
  (core) => ({
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
      backgroundColor: core.white,
      color: 'black',
      size: '50px',
      roll: {
        size: core.text.small,
        color: core.white,
        backgroundColor: '#8b6914',
        fontWeight: 600,
      },
    },
    icon: {
      size: '18px',
      color: 'blue',
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
    opponent: {
      color: '#DC143C',
    },
    dot: {
      size: '8px',
    },
  }),
);
