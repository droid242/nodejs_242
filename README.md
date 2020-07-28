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

`npm i express-generator -g`

***

### A package.json fájl
Ha többen is dolgoztok egy projekten, akkor tegyük fel hogy az egyikőtök telepít egy csomagot. A verziókövető rendszerben nem szokták a csomagokat követni, ezért az egyik felhívja a másikat hogy telepítsd már ezt meg azt a csomagot. Ez oké amíg ketten vagytok, de három ember felett már kezelhetetlenné válik. Erre találták ki a `package.json` fájlt. A NodeJS alkalmazásod gyökerébe kell elhelyezned és szépen felsorolni benne hogy milyen csomagok kellenek az alkalmazáshoz. Amikor változik, csak mindenki nyom egy `npm install`-t és máris szinkronban vannak a csomagok. Lássuk hogy működik.

#### package.json
Az alkalmazásod gyökerében kell a fájlt létrehoznod kézzel, vagy ezzel a paranccsal:
```
npm init -y
```
Az `-y` kapcsoló azt jelenti, hogy minden kérdést elfogadsz, enélkül válaszolni kell néhányra.

Ahogy a neve is mutatja, az NPM csomagokat és a projected beállításait tartalmazza. Egy objektum van benne szöveges formában, a fontos részei ezek:

* A csomag (alkalmazás) neve: `"name": "yellowroad",`
* Verzió, három szám, [főverzió].[alverzió].[patch]: `"version": "0.0.1",`
* Az alkalmazás rövid leírása: `"description": "YellowRoad teaching platform.",`
* Ha fent van a GitHub-on a csomag, akkor annak a beállításai (típus, url):
```
"repository": {
  "type": "git",
  "url": "git+https://github.com/cherryApp/YellowRoad.git"
},
```
* Szerző: `"author": "author@author.hu",`
* Licensz. Ez különösen akkor fontos ha terjeszteni akarod majd az appod: `"license": "ISC",`
* Függőségek. Itt sorolod fel hogy milyen egyéb csomagokat használsz még: `"dependencies": {...},`
  * A függőségre egy példa, itt legalább 2.0.x verzió kell az async csomagból: `"async": "^2.0.1",`

#### Verziók
Azt, hogy egy csomagnak melyik verziójára van szükséged, egy számmal kell megadnod, ami három részből áll:

[major version].[minor version].[patch]

**major version:** a program főverziója, ez általában az előző verziókkal visszafelé nem kompatibilis és komoly fejlesztéseket tartalmaz. Például amikor kiadnak egy új szoftvert vagy csomagot, akkor azt az 1.0.0 verzióval szokták. Amikor pedig komony fejlesztések történnek, akkor léptetik a major, vagy főverziót, és lesz belőle 2.0.0, 3.0.0 és így tovább.

**minor version:** ez egy kisebb lépés, például kisebb fejlesztéseket tartalmaz. Fontos, hogy általában a kompatibilitást nem töri meg. Tehát ha te egy alkalmazást készítettél az 1.3.4 verzióhoz, az valószínűleg futni fog az 1.5.2 verzión is.

**patch:** hibajavítás, a program működését érdemben nem befolyásolja.

**NPM jelölések:** az NPM-nél lehet tenni egy jelet a verziszám elé, ami azt jelenti, hogy milyen frissítéseket engedsz meg a csomagoknál.

* ~ : ez a tilde (altGr + 1), azt jelenti, hogy csak a patch-et engeded meg. Ha így adod meg a csomagot: "lodash": "~2.4.1", akkor ha kijön egy 2.4.7 verió, akkor frissülni fog, de ha a csomag a 2.5.1 verzióra lép, akkor már nem. Magyarul, csak az utolsó szám változhat.
* ^ : ez a caret(altGr + 3 + space), azt jelenti, hogy a minor verziót lehet léptetni. Tehát a kisebb fejlesztések is jöhetnek. Ha így adod meg a csomagot: "lodash": "^2.4.1", akkor ha kijön egy 2.9.1 verió, akkor frissülni fog, de ha a csomag a 3.0.1 verzióra lép, akkor már nem. Magyarul, a második és a harmadik szám is változhat.

#### Remove
A remove utasítással lehet a csomagokat eltávolítani, és itt is megy a `--save` flag, azaz ha benne volt a csomag a package.json-ban, akkor onnan is eltávolítja:
```
npm remove lodash
```

***