/*
    Promise függvény demó
*/

// resolve meghívása
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(
            {
                "name": "Piri"
            });
    }, 3000);
});

myPromise.then(
    data => console.log(data), //ez fut le
    err => console.error(err)
);

// reject meghívása
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(
            {
                "error": "Not Found!"
            });
    }, 3000);
});

myPromise.then(
    data => console.log(data),
    err => console.error(err) //ez fut le
);