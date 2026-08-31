# Envy illenium-appearance

Drop-in **illenium-appearance v5.7.0** with a custom Envy UI that matches [djfivem-oxlib](https://github.com/DieselJones21/djfivem-oxlib): black glass panels, electric cyan neon, chrome edges, and Roboto.

Lua APIs, exports, events, and database tables stay the same as upstream. Any resource that already calls `illenium-appearance` keeps working.

## Install

1. Remove or stop any existing `illenium-appearance` resource.
2. Clone or copy this repo into `resources` as **`illenium-appearance`** (the folder name must stay `illenium-appearance`).
3. Run the SQL files in `sql/` if this is a fresh install.
4. Make sure `ox_lib` (Envy) and `oxmysql` start first.
5. `ensure illenium-appearance` in `server.cfg`.

```cfg
ensure ox_lib
ensure oxmysql
ensure illenium-appearance
```

The clothing editor now uses the Envy theme by default (`shared/theme.lua`). Context menus, input dialogs, notifications, and TextUI still come from ox_lib, so they already match.

## What changed in the UI

The appearance NUI is restyled to the Envy ox_lib language:

- Glass editor panel with chrome header and cyan kicker
- Accordion sections, inputs, sliders, and color swatches
- Camera / clothing / save / exit action rail
- Save and exit confirm dialogs

Stock themes (`default`, `qb-core`, `project-sloth`, `not-heavily-inspired`) are still in `shared/theme.lua` if you want to switch `currentTheme`.

## Rebuild the UI

Built files live in `web/dist` so the resource runs without extra tooling. To edit the look:

```bash
cd web
npm install
npm start          # browser preview at http://localhost:5173/?preview=1
npm run build      # writes web/dist for in-game use
```

## Upstream

Based on [iLLeniumStudios/illenium-appearance](https://github.com/iLLeniumStudios/illenium-appearance) **v5.7.0**. Do not use upstream `main`. Original UI source: [illenium-appearance-source](https://github.com/iLLeniumStudios/illenium-appearance-source).

## License

MIT, same as upstream illenium-appearance / fivem-appearance.
