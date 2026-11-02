# Arriba

An unfinished game with no set goal yet, a bunch of ideas coming together. An incremental at heart (though nothing increments yet), worker placement where the workers are dice, and every die is its own little character so you get tiny stories about specific dice, which is why they all have names even if nothing uses them yet. The vibe is wacky corporate meets occult.

## Code

- Thematic or reused values come from the CSS vars in `@arriba/css`, if one's missing add it, one-off layout values can stay inline
- Dynamic styles go through data attributes matched by value, not styled args or `style`, that way the state shows up in the DOM
- Object args over positional params, calls read better when the args are named
- Comments are for the odd stuff, if the code already says it skip it
