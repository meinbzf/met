"use strict";
let aktuelleFrage = 0;
const MAX_FRAGEN = 170;
const korrekteAntwort = 'a';

verstecke(true);

let myBtnPruefe = document.getElementById("pruefe");
myBtnPruefe.addEventListener("click", setzeFarbe);


function setzeFarbe() {
    let radioA = document.getElementById(aktuelleFrage + "aRadio");
    let meinTextA = document.getElementById(aktuelleFrage + "a" + "Text");
    let radioB = document.getElementById(aktuelleFrage + "bRadio");
    let meinTextB = document.getElementById(aktuelleFrage + "b" + "Text");
    let radioC = document.getElementById(aktuelleFrage + "cRadio");
    let meinTextC = document.getElementById(aktuelleFrage + "c" + "Text");
    let radioD = document.getElementById(aktuelleFrage + "dRadio");
    let meinTextD = document.getElementById(aktuelleFrage + "d" + "Text");
    meinTextA.style.backgroundColor = "white";
    meinTextB.style.backgroundColor = "white";
    meinTextC.style.backgroundColor = "white";
    meinTextD.style.backgroundColor = "white";
    meinTextA.style.backgroundColor = "LightGreen";
    if (radioB.checked) {
        meinTextB.style.backgroundColor = "red"; //LightCoral
    }
    if (radioC.checked) {
        meinTextC.style.backgroundColor = "red";
    }
    if (radioD.checked) {
        meinTextD.style.backgroundColor = "red";
    }

    /*
    if (radioA.checked && korrekteAntwort == 'a') {
        //meinTextA.innerHTML = "neu";
        //meinTextA.style.color = "green";
        meinTextA.style.backgroundColor = "LightGreen";
    }
    */
}
let myBtnGehezu = document.getElementById("gehezu");
myBtnGehezu.addEventListener("click", setzeNummer);

function setzeNummer() {
    let meineEingabe = prompt("Bitte neue Nummer eingeben:", "123");
    aktuelleFrage = Number(meineEingabe) - 1;
    verstecke(true);
}

let myBtnWeiter = document.getElementById("weiter");
myBtnWeiter.addEventListener("click", verstecke.bind(this, true));
let myBtnZurueck = document.getElementById("zurueck");
myBtnZurueck.addEventListener("click", verstecke.bind(this, false));

// weiter gibt an, ob vorwärts oder rückwärts geblättert wird
function verstecke(weiter) {
    if (weiter)
        aktuelleFrage++;
    else
        aktuelleFrage--;

    anzeigeAnzahl();
    for (let i = 1; i <= MAX_FRAGEN; i++) {
        if (i == aktuelleFrage) {
            document.getElementById(i).style.display = 'block';
        }
        else {
            document.getElementById(i).style.display = 'none';
        }
    }
    verschiebe();
}

function verschiebe() {
    let meinFeld = new Array();
    //for (let i = 0; i < 4; i++) 
    meinFeld[0] = document.getElementById(aktuelleFrage + "a");
    meinFeld[1] = document.getElementById(aktuelleFrage + "b");
    meinFeld[2] = document.getElementById(aktuelleFrage + "c");
    meinFeld[3] = document.getElementById(aktuelleFrage + "d");

    let min = 0;
    let max = 3;
    let zufall1 = Math.floor(Math.random() * (max + 1 - min)) + min;
    let zufall2 = Math.floor(Math.random() * (max + 1 - min)) + min;
    let zufall3 = Math.floor(Math.random() * (max + 1 - min)) + min;

    meinFeld[zufall1].after(meinFeld[2]);
    meinFeld[zufall2].after(meinFeld[1]);
    meinFeld[zufall3].after(meinFeld[0]);
    //console.log("a eingeordnet an Position " + zufall3);   
}

function anzeigeAnzahl() {
    let meineAnzeige = document.getElementById("anzeigeAnzahl");
    meineAnzeige.innerHTML = aktuelleFrage + "/" + MAX_FRAGEN;
}
// Hinweis Firefox: Einstellungen: Datenschutz: Private Daten beim Beenden löschen: Gespeicherte Formulardaten