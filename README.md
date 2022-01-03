# Supabase Dropdown Character Maker

## Learning Objectives

- In response to a user event, make a fetch call to mutate a single object in a state array and display the new state to the user (i.e., complete a todo).

[Buggy Supabase Character Designer](https://github.com/alchemycodelab/buggy-js-character-designer-supabase)

### Live Example:
https://alchemycodelab.github.io/web-01-character-designer-supabase/

| User should be able to . . .                                                         |             |
| :----------------------------------------------------------------------------------- | ----------: |
| Visit the deployed pages on GitHub pages, with link in the About section of the Github repo |    .5 |

| Events                                                                                |             |
| :----------------------------------------------------------------------------------- | ----------: |
| On the home page (`'/'`), Login and Signup using the login and signup form. On success, redirect to the `/character` page   |        .5 |
| Logout by clicking the logout button                                                       |        .5 |
| If a non-logged-in user tries to visit the character page, redirect them to the login page | .5 |
| On the character page load, fetch the character from supabase and render their details (including all catchphrases) to the page  |        1 |
| On the character page load, if a charaacter does not exist for this user, create one  |        1 |
| On change of the dropdown, update the character in supabase. Then fetch from supabase to update the UI to show the right image |     1 |
| On click of the catchphrase button, update the character's catchphrases in supabase. This means you will fetch the old character's catchephrases, push the new catchpnrases to these old catchphrases, and send the mutated array to your `updatCatchphrases` function |     1 |
| On any dropdown change, see displayed how many times each dropdown has been changed in the current session (NOT tracked in supabase -- just like the previous iteration of this project)   |           .5 |

| Functions                                                                                |             |
| :----------------------------------------------------------------------------------- | ----------: |
| ASYNC / IMPURE: `fetchAndDisplayCharacter()` : fetches character and sets the images and catchphrases in the DOM | 1 |
| ASYNC: `fetchCharacter()` : fetches character for currently logged in user from supabase | .5 |
| ASYNC: `updateHead(newHead)` : updates head of character for currently logged in user from supabase | .5
| ASYNC: `updateMiddle(newMiddle)` : updates middle of character for currently logged in user from supabase | .5 |
| ASYNC: `updateBottom(newBottom)` : updates bottom of character for currently logged in user from supabase | .5 |
| ASYNC: `updateCatchphrases(newCatchphrases)` : updates catchphrases of character for currently logged in user from supabase | .5 |
