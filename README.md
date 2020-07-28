# NPM alapok

Az NPM betűszó a Node Pacakge Manager rövidítése. A fejlesztők készítenek egy modult, ami egy mini alkalmazás és bárki integrálhatja a saját munkájába. Ezek gyakorlatilag egyszerű folder moulok, azaz a modul egy mappában van megvalósítva. Egy parancssori alkalmazás segítségével tudjuk telepíteni, eltávolítani, keresni ezeket a csomagokat (modulokat). Az NPM-et nem kell külön telepíteni, a NodeJS-szel együtt települ.

### Telepítsünk csomagot!
Az új csomagok telepítése nagyon egyszerű.
1. Nyiss egy parancssort.
2. Navigálj abba a mappába ahol a csomagot használni akarod, jellemzően ahol mondjuk az app.js fájlod van ami indítja a NodeJS alkalmazásodat.
3. Telepítsd monduk a lodash csomagot, ezzel profi módon lehet például a tömböket kezelni. A parancs három részből áll. Először a program neve, majd a parancs - jelen esetben az install -, végül a csomag neve amit telepíteni szeretnél:
```
npm install lodash
```
4. Kis gondolkodás után letölti a csomagot majd kicsomagolja és létrehozza abban a mappában ahol kiadtad a parancsot a 'node_modules' almappát (ha még nem létezik). Ebben a mappában megtalálod a letöltött folder modult, lesz egy olyan mappa hogy 'lodash'.
5. Úgy tudod használatba venni a modult, ha egyszerűen a nevével hivatkozol rá az app.js fájlban:
```
const lodash = require('lodash');
```

### Local vs. Global
Az előző fejezetben a csomag lokálisan települt, azaz ha egy másik mappából szeretnéd használni a modult az nem fog menni, mert nem látja a másik mappában lévő NodeJS alkalmazás.

### Globális telepítés
A lépések hasonlóak mint a lokálisnál, azzal a különbséggel hogy a -g flaget kell használnod:
```
npm install express-generator -g
```
Ezzel az express-generator csomag windowson például a 'C:/Users/AppData/Roaming' mappán belül települ egy almappába verziótól függően. Így a gépen futó bármelyik NodeJS alkalmazásod el fogja érni. Bizonyos csomagoak csak így futnak helyesen, például ez az express-generator is ilyen, egy szerver keretrendszert telepít a megadott mappába azaz nem kapcsolódik szervesen egy bizonyos NodeJS alkalmazáshoz.

***