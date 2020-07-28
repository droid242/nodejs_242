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

* `~` : ez a tilde (altGr + 1), azt jelenti, hogy csak a patch-et engeded meg. Ha így adod meg a csomagot: "lodash": "~2.4.1", akkor ha kijön egy 2.4.7 verió, akkor frissülni fog, de ha a csomag a 2.5.1 verzióra lép, akkor már nem. Magyarul, csak az utolsó szám változhat.
* `^` : ez a caret(altGr + 3 + space), azt jelenti, hogy a minor verziót lehet léptetni. Tehát a kisebb fejlesztések is jöhetnek. Ha így adod meg a csomagot: "lodash": "^2.4.1", akkor ha kijön egy 2.9.1 verió, akkor frissülni fog, de ha a csomag a 3.0.1 verzióra lép, akkor már nem. Magyarul, a második és a harmadik szám is változhat.

#### Remove
A remove utasítással lehet a csomagokat eltávolítani, és itt is megy a `--save` flag, azaz ha benne volt a csomag a package.json-ban, akkor onnan is eltávolítja:
```
npm remove lodash
```

***

### Szerver
Eddig kizárólag frontend oldalon dolgoztunk, ami azt jelenti, hogy azokat a kódokat írtuk meg, amelyek a böngészőben futnak le. Most full-stack fejlesztő válik belőled, azaz képessé teszünk arra, hogy ne csak a frontend, hanem a szerver oldali kódokat is elkészítsd.

A szerver a szolga szóból jön, az a dolga, hogy a frontend felől jövő kéréseket kiszolgálja, azokra választ adjon. Ezek a válaszok lehetnek fájlok, adatok, JSON string-ek, bármi.

#### json-server
A json-server egy olyan NodeJS csomag, amivel egy perc alatt tudsz készíteni egy szervert, ami JSON válaszokat küld neked a kérésekre. Tökéletes választás, ha szeretnéd tesztelni az alkalmazásodban a klient-server kommunikációt.

#### Telepítés
1. Hozz létre egy mappát a projektednek.
2. `npm init -y`: generáltasd le a package.json fájlt.
3. `npm install -g json-server`: a json-server telepítése globálisan javasolt, mivel így tudod indítani a parancssorból is és elérhető lesz az összes projektedben.
4. Hozz létre egy JSON fájlt mondjuk db.json néven a kívánt tartalommal. Egy objektum legyen a gyökere, és ebben az egyes tulajdonságok tömbök. Ezek lesznek az adattáblák:
```
{
  "users": [
    { "id": 1, "name": "Big Tom", "email": "bigtom@gmail.com" },
    { "id": 2, "name": "Little Jimmy", "email": "littlejimmy@gmail.com" }
  ],
  "comments": [
    { "id": 1, "body": "some comment", "userId": 1 }
  ]
}
```
> **Fontos: legyen mindegyik objektumban egy** `id` **tulajdonság és lehetőleg 1-gyel kezdődjön.**
6. `json-server --watch db.json`: figyeli a JSON fájlt a szerver, ha módosul. Ezenkívül elindul és lehet neki kéréseket küldeni. Ki fogja írni, hogy melyik proton fut, alapból a 3000 lesz, de ezt meg is változtathatod.
6. Nyisd meg a böngészőben: `http://localhost:3000/users`. Meg fogod kapni JSON formátumban ausers tömböt, és már kezdheted is tesztelni az alkalmazásodat, hogyan tud együtt működni egy szerverrel.

#### README.md
Ha rákeresel a json-server csomagra a GitHub-on, akkor találni fogsz részletes dokumentációt is. Érdemes ezt áttanulmányozni, mielőtt elakadnál. A github úgy működik, hogyha van a repóban egy README.md fájl a gyökérben, akkor alapból a fájlok alatt megjeleníti szépen formázva a tartalmát.

**Légy önálló!** Ha valami nem működik először nézd meg a dokumentációt. Ha így sem megy, nézz utána a neten (Google a barátod). Ha még mindig nem, akkor kérdezz meg valaki tapasztaltabb szakembert a területen.

Mégegyszer a lépések baj esetén:
1. Dokumentáció
2. Google + Stack Overflow + stb. (netes keresések)
3. Kolléga, tanár, hozzáértő haver
4. Kapcsold ki a WoW-ot és aludj kicsit ;-)

`npm i -g json-server`

***

### GET
A kliens - szerver modell arról szól, hogy küld a kliens egy kérést a szervernek, az pedig válaszol rá. A kérés a Request a válasz a Response.

#### Get Request
Egy get kérés így néz ki, a böngésző ezt küldi a szerver felé:

`GET /images/logo.gif HTTP/1.1`

Elemezzük kicsit:
* `GET` : metódus, azaz hogy hogyan szeretné a kliens megkapni az adatokat a válaszban.
* `/images/logo.gif` : erőforrás, annak a címe amit kér, ez páldául egy .gif kép.
* `HTTP/1.1` : verzió, a HTTP szabvány melyik verziójával történik a kommunikáció.

Ezt a teljesen egyszerű szöveges kérést küldi a böngésző a szervered felé.

**Header:** a kérés része az első sor után következő haeader sorok. Ezek tövábbi adatokat tartalmaznak a kérésről és mindig HEADER: VALUE formában vannak megadva.
```
Host: origo.hu
Connection: close
User-Agent: Mozilla/5.0 (Windows; U; Windows NT 5.1; de; rv:1.9) Gecko/2008052906 Firefox/3.0
Accept-Charset: ISO-8859-1,UTF-8;q=0.7,*;q=0.7
Cache-Control: no-cache
Accept-Language: de,en;q=0.7,en-us;q=0.3
```
Ebből néhány érdekeset kiemelnék:
* `User-Agent` : a kliens által használt böngésző típusa.
* `Accept-Charset` : a böngésző milyen karakterkódolással tudja fogadni az adatokat.
* `Accept-Language` : a válasz nyelve milyen legyen.
* `Cache-Control` : azt határozza meg, hogy a kliens és szerver közti útvonalon kötelezően használjanak-e cache-elést, vagy sem.

#### Get Response
Egy ilyen get kérésre a szerver ilyen választ szokott küldeni:
* `HTTP/1.1 200 OK` : státusz, a válasz első sora. A státuszkód (jelent esetben 200) jelzi hogy mi lett a kérés eredménye. A 2xx, azaz a 2 -essel kezdődő sikeres kérést jelent.
* `HTTP/1.1 404 Not Found` : itt például nem volt sikeres a kérés, mert a kért erőforrás nem létezik. Ilyenkor kiegészülhet a válasz státusza egy szöveggel is, ami jelen esetben: Not Found.

A Response is tartalmaz header sorokat, a Request -hez hasonlóan. És a header után jön a BODY, ami már a konkrét adat, amit a kliens kért a szervertől.

***

# JSON
Azt jelenti, hogy JavaScript Object Notation. Egy szabványos adat leíró formátum, amivel egyszerűen lehet az adatokat küldeni alkamazások között vagy az interneten keresztül.

Tehát arra való, hogy adatot küldözgethess a szervernek, onnan is tudj fogadni dolgokat, sőt akár más programok is megértik. Ez nagyon jó.

### Hogyan épül fel?
* Csak objektum vagy tömb lehet az alapja ([]{}).
* Objektum esetén a kulcsokat és a string típusú értékeket is idézőjelek közé kell tenni ("").
* Az érték csak string, number, boolean, JSON object, JSON array vagy null típusú lehet.
* Ha muszáj idézőjeleket használni az értékekben, azt eszképelni kell (\).

#### Egy user JSON formátumban
```
{
  "name": "Handrix Gambler",
  "age": 44,
  "hobbies": [
    "poker",
    "blackjack"
  ],
  "serious": true
}
```
> **Fontos:**
> * Az összes kulcsot idézőjelbe tettem (ez js-ben nem kötelező, de itt igen).
> * A String-et idézőjelbe kell tenni.
> * A Number, Boolean típusokat nem kell idézőjelbe tenni.

#### JSON.parse()
A parse metódussal tudod a JSON stringet újra objektummá alakítani. Tehát a JSON az egy string. Ha szeretnéd úgy használni a benne lévő adatokat, mint tömb vagy objektum elemeket, akkor vissza kell alakítani változóvá, hogy újra objektum legyen.
```
JSON.parse(`{
    "name": "Handrix Gambler",
    "age": 42,
    "hobbies": [
        "poker",
        "blackjack"
    ],
    "serious": true
}`)
```

#### JSON.stringify()
A stringify metódussal pedig az objektumokat vagy tömböket lehet json-izálni. Ekkor készít belőlük egy JSON stringet a JS, ezt pedig küldhetjük a szervernek vagy másik alkalmazásnak is.
```
JSON.stringify(user);
```

***

### Az utasításvégrehajtás folyamata
#### Mi is az az aszinkron művelet?

Eddig bármilyen utasításokat is adtunk ki, azok mindig a leírás sorrendjében, vagy legalább is kiszámítható sorrendben hajtódtak végre.
```
let x = 5;
let y = x * 3 + x ** 2;
console.log(y);
```
A végrehajtás sorrendje itt egyértelmű: először az x változó értéke 5 lesz, majd ki kell számítani ennek a négyzetét és a háromszorosát, utána ezeket össze kell adni, és az eredményt bele kell tenni az y nevű változóba. Legvégül kiírjuk az y értékét. A kód pillanatok alatt lefut, észre sem vesszük és már meg is jelenik az eredmény a konzolon.

Vannak azonban olyan műveletek, melyek nem hajthatóak végre ilyen gyorsan. Ilyen például egy időzítetten végrehajtott művelet és egy adatkérés egy szerverről. A JavaScript egy ún. non-blocking nyelv, mely azt jelenti, hogy a lassabb műveleteket másik szálon futtatja, így a következő utasítás akkor is elindul és végrehajtódik, ha a lassabb művelet még nem fejeződött be. Mivel előre nem tudhatjuk, hogy az így párhuzamosan futtatott **aszinkron művelet** mikor ér véget, ezért azt sem tudhatjuk, hogy annak eredménye mikor áll rendelkezésre.
```
const asyncCall = () => {
  setTimeout(() => {
    return {message: "Ez egy időzített üzenet."};
  }, 2000);
};
const value = asyncCall();
console.log(value.message);
```
Az asyncCall egy olyan függvény, amelynek a return utasítása időzítetten hajtódik végre, azaz a függvény meghívásától kezdve csak minimum 2 másodperccel később áll rendelkezésre. Sajnos azt tapasztaljuk, hogy a `console.log()` függvény előbb hajtódik végre, mint ahogy a value változó értéket kapna, ezért az "Uncaught TypeError: Cannot read property 'message' of undefined at <anonymous>:8:19" hibaüzenetet kapjuk. Miért is? Nézzük meg a lefutást idődiagrammon!

Láthatjuk, hogy a `setTimeout()` függvény hívása valahogy kikerült az utasítások sorából, és velük párhuzamosan fut le. Miután a fő szálon lévő összes utasítás lefutott, ez a mellékszál visszatérhet, és a visszaadott érték megjelenhet a fő szálon. De már késő, ezzel sajnos már nem tudunk mit kezdeni.

Ennek feloldására két megoldás is született:
* a callback függvények és
* a Promise objektum.

***

### Callback függvény
Az aszinkron művelet eredményét a fő szálban nem használhatjuk, de átadhatunk egy olyan függvényt az aszinkron műveletnek, melyet akkor fog meghívni, amikor befejezte a végrehajtást, és visszatérhet a fő szállba. Ezt a függvényt hívjuk **callback függvénynek**.

Tulajdonképpen a `button.addEventListener('click' buttonClickHandler)` utasításban a buttonClickHandler egy callback függvény, mely azután hajtódik végre, hogy a JavaScript kódunk már teljesen lefutott. Hogy azután mikor? Hát akkor, amikor a gombon kattintunk. Azonban addig, míg a fő szálon lévő utolsó utasítás is le nem futott, hiába kattintgatunk. Milyen sorrendben hajtódnak végre ezek az utasítások?
```
function buttonClickHandler = () => console.log('Kattintottál');
const button = document.querySelector('#submitButton');
button.addEventListener('click', buttonClickHandler);
...
console.log('Utolsó utasítás');
```

***

A Promise egy aszinkron hívást körbeölelő objektum, amely a művelet aktuális állapotát hordozza magában. Minden Promise egyetlen egyszer futhat le, és a futás eredménye csak sikeres vagy sikertelen lehet. Az eredménytől függően képes a megfelelő callback metódusokat meghívni.

#### Promise állapotok
Egy promise a következő állapotokkal rendelkezhet:

* **fulfilled** : vagyis teljesített, ha az aszinkron művelet sikeresen
* **rejected** : lefutott, ha az aszinkron művelet sikertelen volt
* **pending** : ha a művelet még fut
* **settled** : ha az aszinkron hívás már megtörtént, függetlenül a sikerességétől

A specifikáció a Promise objektumoktól egyetlen metódust követel meg, a then()-t. Ez a függvény két callback paramétert vár melyeket attól függően hív meg, hogy milyen eredménnyel fog járni az aszinkron művelet. [Forrás](http://webprogramozas.inf.elte.hu/tananyag/weaf1/lecke9_lap1.html#hiv11)

Egy egyszerű példa:
```
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(Error("Error message"));
  }, 3000);
});
myPromise
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.error(err);
  });
```
A `Promise`-nak két paramétert adtunk. Az egyik a `resolve`, a másik a `reject`. Mindkettő egy-egy függvény. A `resolve`-ot akkor hívjuk meg, ha megfelelően futott le a folyamat, a `reject`-et pedig akkor, ha valamilyen hiba történt. Ha bármelyik függvény meghívásra kerül, a `Promise` megszűnik létezni. Egy `Promise`-ra csak az egyiket lehet meghívni. Mindkettő függvény paraméterezhető is ha szükség van rá.

Nézzünk meg egy összetettebb példát is:
```
const datas = [
  { firstName: "John", lastName: "Doe", age: 31 },
  { firstName: "Jane", lastName: "Doe", age: 20 },
  { firstName: "Anonim", lastName: "Anonymous", age: 62 }
];

function postDataFunc(age) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const post = datas.find(postdata => postdata.age === age);
      if (post) {
        resolve(post);
      } else {
        reject(Error("Data not found"));
      }
    }, 3000);
  });
}

postDataFunc(31)
  .then(post => {
    console.log(post);
    return post;
  })
  .then(post => {
    console.log("Name:", post.firstName, post.lastName);
  })
  .catch(err => {    console.error(err);  });
// Name: John Doe
```
A fenti Promise már egy fokkal összetettebb.

* A postDataFunc-be megadunk egy életkort.
* Ezen belül a Promise-nak megadjuk a resolve, és reject paramétereket.
* Indítunk egy setTimeout-ot. Ez egy aszinkron művelet, ezt fogja körbe a Promise.
* A post egy boolean, azaz hogy van e találatunk vagy nincs. Azaz megnézzük,hogy a tömbünkbe van e olyan objektum, ahol az age egyenlő a megadott értékkel.
* Ha nem volt találatunk a reject-et hívjuk meg.
* Ha volt találatunk a resolve-ot hívjuk meg.
* Meghívjuk a függvényt jelenleg a 31 paraméterrel. A függvényünk visszatérési értéke a Promise.
* Három másodperc múlva kiírja, hogy: Name: John Doe. (Ha nem talált akkor pedig: not found.)
* A catch a hibakezelésre van.

A következő példában egy újabb remek használatát láthatjátok a Promise-nak. Két Promise hozunk létre. A `Promise.all()` annyit tesz, hogy a paraméterként megadott, jelen esetben kettő darab Promise-ból egy darab összegyúrt Promise-t ad vissza. Ez az összetett Promise akkor lesz teljesített, ha a magába foglalt Promise-ok mindegyike lefutott.

Az alábbi példában az egyik 3 a másik 10 másodperc után fut le. Így a későbbi időpontban, tehát 10 másodperc múlva lesz mind a kettő teljesítve (Ne feledjük, aszinkron futnak!)
```
const cat = new Promise(resolve => {
  setTimeout(() => {
    resolve({
      sound: "miau",
      loyal: false
    });
  }, 10000);
});
const dog = new Promise(resolve => {
  setTimeout(() => {
    resolve({
      sound: "vau",
      loyal: true
    });
  }, 3000);
});

Promise.all([cat, dog]).then(responses => {
  const [catProps, dogProps] = responses;
  console.log(catProps, dogProps);
});
```

***

### Fetch
A `Fetch API` a még callback függvényt használó `XMLHttpRequest` kiváltására jött létre. Mind Google, mind Mozilla bácsi támogatja már a használatát. Különválasztották a kérést és a választ, valamint egyszerűbb a szintaxis, és könnyebb egyéni headeröket beállítani.

A gyakorlatbakérünk egy json formátumú adatot, és belerakjuk egy változóba. Figyeld meg, a `fecth()` egy Promise-szal tér vissza!

> **Megjegyzés:** üzemelj be egy json-server-t, és annak küldd a kéréseket!
```
let fetchInit = {
  method: "GET",
  headers: new Headers(),
  mode: "cors",
  cache: "default"
};
const fetchData = fetch("http://localhost:3000/users", fetchInit);
fetchData.then(data => data.json()).then(data => console.log(data));
```
### Kombináljuk!
A `fetch()` egy Promise-szal tér vissza, amit bátran használunk is. Elkérjük a JSON-t, és feldolgozzuk, mint az imént:
```
const postPromise = fetch("http://localhost:3000/users");
postPromise
  .then(data => data.json())
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.log(err);
  });
```

***