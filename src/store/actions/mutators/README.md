# Mutators

Plain functions that change the game state. They get the immer draft from an action and edit it directly,
no `setState` and no React, actions in `../actions.ts` are what call them.
