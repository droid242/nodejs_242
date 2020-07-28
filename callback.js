/*
    Gomb ID: submitButton
    Callback függvény demó
*/

const buttonClickHandler = () => console.log("Katt");
const button = document.querySelector("#submitButton");

button.addEventListener("click", buttonClickHandler);
console.log("Utolsó utasítás");