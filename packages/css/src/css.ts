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
    shadow: 'rgba(0, 0, 0, 0.2)',
    text: {
      small: '12px',
    },
  },
  (core) => ({
    backgroundColor: '#deb887',
    borderRadius: '8px',
    boxShadow: `2px 2px ${core.shadow}`,
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
      ghost: {
        opacity: 0.6,
      },
      picked: {
        lift: '2px',
        // OG 2D sprite-like shadow
        shadow: {
          width: '115%',
          height: '12px',
          color: core.shadow,
        },
      },
      roll: {
        size: core.text.small,
        color: core.white,
        backgroundColor: '#8b6914',
        fontWeight: 600,
      },
    },
    icon: {
      size: '18px',
      color: '#4a6c8c',
    },
    slot: {
      backgroundColor: '#fff8dc',
      special: {
        size: '18px',
        color: '#4a6c8c',
      },
      min: {
        // Most come from die.roll
        color: 'black',
      },
      allowed: '#b8e0d2',
      disallowed: '#e6a9a9',
    },
    opponent: {
      color: '#DC143C',
    },
    dot: {
      size: '8px',
    },
  }),
);
