
# ogame-api

[![Build status](https://github.com/ValentiMS/ogame-api/workflows/Node%20CI/badge.svg)]![Package size (minified+gzipped)](https://img.shields.io/bundlephobia/minzip/ogame-api)](https://bundlephobia.com/result?p=ogame-api)

ogame-api is a lightweight (~10kb gzipped) abstraction layer written in Typescript that allows you to easily use [OGame's XML API](https://board.origin.ogame.gameforge.com/index.php/Thread/3927-OGame-API/) by providing full coverage of it, including:

   - **Player API**
   - **Universe API**
   - **Positions (highscore) API**
   - **Alliance API**
   - **Server Data API**
   - **Player Data API**
   - **Localization API**
   - **Universes API**
   - **Planet Report API**

## Installation
Installing with npm:
```
npm install ogame-api
```
Installing with yarn:
```
yarn add ogame-api
```

## Features

   - Complete coverage of OGame's XML API
   - Planet report parsing
   - Advanced Typescript typings
   - const enum helpers
   - Works in both node and browser environments

## Getting started
To get started with ogame-api, check out our [auto-generated docs](https://valentims.github.io/ogame-api)!

## Examples
Getting a universe's top score:
```ts
import Universe from "ogame-api";
const universe = new Universe(800, "en");
universe.getServerData().then(playerData => {
    playerData.get("topScore");
});
```

Getting a player's homeplant name:
```ts
import Universe from "ogame-api";
const universe = new Universe("Dorado", "en");
universe.getPlayerData().then(async playerData => {
    const ref = playerData.filter(player => player.name === playerName)[0];
    const player = await ref.getPlayer();
    console.log(player.home.name);
})
```

Parsing a planet report:
```ts
import Universe, { Region } from "ogame-api";
const universe = new Universe(800, "en");
const report = universe.createPlanetReport(reportString);
report.mapLocalizations().then(report => {
    const launchers = report.defense.get("Rocket Launcher");
    //If has rocket launchers
    if(launchers) {
        console.log(`There are ${launchers} on ${report.coords}`);
    }
})
```

## License
This project is licensed under the MIT license
