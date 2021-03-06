/* eslint-disable no-undef */
"use strict";
let aktuelleFrage = 0;
let MAX_FRAGEN = 0;
let docTitle = document.title;
if (docTitle.match("Meteorologie"))
    MAX_FRAGEN = 170;

// 4 Antwortmöglichkeiten, auf die geklickt werden kann
let radioA;
let radioB;
let radioC;
let radioD;

let modusNurGespeicherteFragen = false;

blaettern(true);

function setzeFarbe() {
    let meinTextA = document.getElementById(aktuelleFrage + "a" + "Text");
    let meinTextB = document.getElementById(aktuelleFrage + "b" + "Text");
    let meinTextC = document.getElementById(aktuelleFrage + "c" + "Text");
    let meinTextD = document.getElementById(aktuelleFrage + "d" + "Text");
    meinTextA.style.backgroundColor = "white";
    meinTextB.style.backgroundColor = "white";
    meinTextC.style.backgroundColor = "white";
    meinTextD.style.backgroundColor = "white";
    meinTextA.style.backgroundColor = "LightGreen";
    if (radioB.checked) {
        meinTextB.style.backgroundColor = "red";
    }
    if (radioC.checked) {
        meinTextC.style.backgroundColor = "red";
    }
    if (radioD.checked) {
        meinTextD.style.backgroundColor = "red";
    }
    // Korrekt, dann automatisch weiterblättern
    if (radioA.checked) {
        // etwas Zeit verstreichen lassen
        window.setTimeout(function () { blaettern(true); }, 1000);
    }
}

let myBtnGehezu = document.getElementById("gehezu");
myBtnGehezu.addEventListener("click", setzeNummer);
function setzeNummer() {
    bootbox.prompt({
        title: "Bitte neue Nummer eingeben:",
        value: "123",
        callback: function(result) {
            if (result === null) {
                //keine Aktion
            } else {
                aktuelleFrage = Number(result) - 1; 
                blaettern(true);
            }
        }
      });
    //let meineEingabe = prompt("Bitte neue Nummer eingeben:", "123");
    //aktuelleFrage = Number(meineEingabe) - 1;
    //blaettern(true);
}

let myBtnWeiter = document.getElementById("weiter");
myBtnWeiter.addEventListener("click", blaettern.bind(this, true));
let myBtnZurueck = document.getElementById("zurueck");
myBtnZurueck.addEventListener("click", blaettern.bind(this, false));

// weiter gibt an, ob vorwärts oder rückwärts geblättert wird
function blaettern(weiter) {
    if (!modusNurGespeicherteFragen) {
        if (weiter)
            aktuelleFrage++;
        else
            aktuelleFrage--;
    }
    // Nur gespeicherte Fragen anzeigen
    if (modusNurGespeicherteFragen) {
        let myData = localStorage.getItem(docTitle);
        let arrayGesplittet = myData.split(",");
        let index = arrayGesplittet.indexOf(aktuelleFrage.toString());
        //alert("Index ist: " + index + " Array-Länge: " + arrayGesplittet.length);
        if (aktuelleFrage == -1)
            aktuelleFrage = arrayGesplittet[0]; //erstes Element anzeigen
        else {
            if (weiter && index + 1 < arrayGesplittet.length) {
                aktuelleFrage = arrayGesplittet[index + 1];
            }
            if (!weiter && index > 0) {
                aktuelleFrage = arrayGesplittet[index - 1];
            }
        }
    }

    radioA = document.getElementById(aktuelleFrage + "aRadio");
    radioA.addEventListener("click", setzeFarbe);
    radioB = document.getElementById(aktuelleFrage + "bRadio");
    radioB.addEventListener("click", setzeFarbe);
    radioC = document.getElementById(aktuelleFrage + "cRadio");
    radioC.addEventListener("click", setzeFarbe);
    radioD = document.getElementById(aktuelleFrage + "dRadio");
    radioD.addEventListener("click", setzeFarbe);

    anzeigeAnzahl();
    for (let i = 1; i <= MAX_FRAGEN; i++) {
        if (i == aktuelleFrage) {
            document.getElementById(i).style.display = 'block';
        }
        else {
            //nicht anzeigen
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

let myBtnSpeichern = document.getElementById("speichern");
myBtnSpeichern.addEventListener("click", speichern);
function speichern() {
    let myData = localStorage.getItem(docTitle);
    if (myData == null) {
        localStorage.setItem(docTitle, aktuelleFrage);
    }
    else {
        let arrayGesplittet = myData.split(",");
        if (arrayGesplittet.indexOf(aktuelleFrage.toString()) == -1) {
            // noch nicht gespeicherte Frage kommt hinzu
            arrayGesplittet.push(aktuelleFrage);
            arrayGesplittet.sort(function (a, b) {
                return a - b; // numerisch sortieren, nicht alphabetisch
            });
            localStorage.setItem(docTitle, arrayGesplittet);
            // alert(arrayGesplittet + " Index of: " + arrayGesplittet.indexOf(aktuelleFrage.toString()) + " localStorage: " + localStorage.getItem(docTitle));
        }
    }

    //localStorage.setItem('myCat', 'Tom');
    //let cat = localStorage.getItem('myCat');
    //localStorage.removeItem('myCat');
    //localStorage.clear(); //alles löschen
    //alert(localStorage.getItem(docTitle));
}

let myBtnNurGespeicherte = document.getElementById("gespeichert");
myBtnNurGespeicherte.addEventListener("click", nurGespeicherte);
function nurGespeicherte() {
    let myData = localStorage.getItem(docTitle);
    let anzeigeText = "Gespeicherte Fragen: " + myData;
    anzeigeText += "<br>Falls Daten nicht gespeichert werden, dann: ";
    anzeigeText += "<br> - Firefox: Einstellungen, Datenschutz, Cookies erlauben, aber nicht zur Verfolgung";
    anzeigeText += "<br> - Chrome: Einstellungen, Datenschutz, Browserdaten löschen, Cookies und Websitedaten zulassen";
    anzeigeText += "<br>Zusatzinfo zur Verwaltung des lokalen Speichers im Browser: F12, dann Application tab (Web-Speicher). Storage section: Local Storage";
    bootbox.alert(anzeigeText);
    aktuelleFrage = -1; //später erstes Element anzeigen
    modusNurGespeicherteFragen = true;
    blaettern(true);
}

let myBtnLoeschen = document.getElementById("loeschen");
myBtnLoeschen.addEventListener("click", loescheListe);
function loescheListe() {
    bootbox.confirm("Sollen alle gespeicherten Fragen der Kategorie " + docTitle + " aus der Merkliste gelöscht werden?", function (result) {
        //alert("Bootbox Ergebnis" + result);
        if (result == true) {
            localStorage.removeItem(docTitle);
            let myData = localStorage.getItem(docTitle);
            bootbox.alert("Gespeicherte Fragen: " + myData);
            modusNurGespeicherteFragen = false;
            aktuelleFrage = 0;
            blaettern(true);
        }
    });
}
