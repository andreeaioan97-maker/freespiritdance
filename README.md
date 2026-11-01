# Free Spirit Dance

- `static website/`: the copy of freespiritdance.ro (`site/` untouched, `pages/` with the logo and form edits, `external-assets/` saved images and fonts).
- `react website/`: the same site in React and React Router. `npm run generate` makes the components from the static copy, `npm run build` builds it into `dist/site`, `npm run compare` checks it against the originals.

Each push to `main` makes GitHub Actions build `react website` and publish it to the `gh-pages` branch, which GitHub Pages serves.

## Redesign choice

`freespirit dance redesign choice` is the chosen redesign, published at the main address; the React site of the original is at `/original/`. A switcher at the bottom right of both opens the same page in the other version. `npm run dev` runs it at localhost:4418.
