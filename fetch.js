/*
    fetch() függvény demó
*/

let fetchInit = {
    "method": "GET",
    "headers": new Headers(),
    "mode": "cors",
    "cache": "default"
};

fetch("http://localhost:3000/users", fetchInit).then(
    data => data.json(),
    err => console.error(err)
).then(
    users => console.log(users)
);