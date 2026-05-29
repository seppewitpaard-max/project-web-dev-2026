// app.js — AC Milan Champions League Quiz logica

// Datastructuur: feitjes voor de surprise knop
var feitjes = [
    "AC Milan werd opgericht op 16 december 1899!",
    "Het San Siro stadion heeft een capaciteit van 75.923 toeschouwers!",
    "AC Milan heeft 7 Champions League titels gewonnen!",
    "Paolo Maldini speelde 902 officiële wedstrijden voor AC Milan!",
    "AC Milan won in 1989 de CL met 4-0 van Steaua Boekarest!",
    "Kaká scoorde 10 goals in de Champions League van 2006-2007!",
    "AC Milan en Inter Milan delen het San Siro stadion!",
    "Marco van Basten won 3 keer de Ballon d'Or als Milan speler!"
];

// Datastructuur: quizvragen over AC Milan en Champions League
var vragen = [
    { vraag: "Hoeveel keer won AC Milan de Champions League?", antwoord: "7", hint: "Meer dan 5 maar minder dan 10" },
    { vraag: "In welk jaar won AC Milan hun eerste Champions League?", antwoord: "1963", hint: "Begin jaren 60" },
    { vraag: "Wie was de aanvoerder van AC Milan in de jaren 90?", antwoord: "franco baresi", hint: "Een legendarische verdediger" },
    { vraag: "Welke speler won de Ballon d'Or in 2007 als Milan speler?", antwoord: "kaka", hint: "Een Braziliaanse middenvelder" },
    { vraag: "Hoe heet het stadion van AC Milan?", antwoord: "san siro", hint: "Ze delen het met Inter Milan" },
    { vraag: "In welk jaar werd AC Milan opgericht?", antwoord: "1899", hint: "Einde van de 19e eeuw" },
    { vraag: "Welke Nederlandse aanvaller speelde voor AC Milan in de jaren 90?", antwoord: "marco van basten", hint: "Hij won 3x de Ballon d'Or" },
    { vraag: "Wie scoorde 10 goals voor Milan in de CL van 2007?", antwoord: "kaka", hint: "Braziliaanse middenvelder" },
    { vraag: "Tegen welke club won Milan de CL finale van 2003?", antwoord: "juventus", hint: "Een andere Italiaanse club" },
    { vraag: "Hoeveel jaar speelde Paolo Maldini voor AC Milan?", antwoord: "24", hint: "Meer dan 20 jaar" },
    { vraag: "In welke stad ligt het stadion van AC Milan?", antwoord: "milaan", hint: "De naam van de club geeft het weg" },
    { vraag: "Welke kleur shirt draagt AC Milan thuis?", antwoord: "rood zwart", hint: "Twee kleuren in verticale strepen" },
    { vraag: "Tegen welke club won Milan de CL finale van 2007?", antwoord: "liverpool", hint: "Een Engelse club" },
    { vraag: "Welke Oekrainse aanvaller won de Ballon d'Or in 2004?", antwoord: "shevchenko", hint: "Hij speelde van 1999 tot 2006 voor Milan" },
    { vraag: "Hoeveel goals scoorde Van Basten in zijn carrière bij Milan?", antwoord: "200", hint: "Meer dan 150" }
];

// Variabelen
var score = 0;
var huidigIndex = 0;
var aantalVragen = 5;
var spelersnaam = "";
var spelBezig = false;
var scoreBord = [];
var gebruikteIndexen = [];

// Functie: surprise knop
function toonFeitje() {
    var willekeurig = Math.floor(Math.random() * feitjes.length);
    document.getElementById("feitje").textContent = feitjes[willekeurig];
}

// Functie: willekeurige vraag kiezen
function kiesVraag() {
    var beschikbaar = [];
    for (var i = 0; i < vragen.length; i++) {
        if (gebruikteIndexen.indexOf(i) === -1) {
            beschikbaar.push(i);
        }
    }
    var willekeurig = beschikbaar[Math.floor(Math.random() * beschikbaar.length)];
    gebruikteIndexen.push(willekeurig);
    return willekeurig;
}

// Functie: quiz starten
function startQuiz() {
    var naamVeld = document.getElementById("spelersnaam");
    var boodschap = document.getElementById("boodschap");

    // Controlestructuur: naam controleren
    if (naamVeld.value === "") {
        boodschap.textContent = "Vul eerst je naam in!";
        return;
    }

    spelersnaam = naamVeld.value;
    score = 0;
    huidigIndex = 0;
    spelBezig = true;
    gebruikteIndexen = [];
    aantalVragen = parseInt(document.getElementById("aantalVragen").value);

    document.getElementById("score").textContent = "Score: 0";
    boodschap.textContent = "Welkom " + spelersnaam + "! Beantwoord " + aantalVragen + " vragen!";

    toonVraag();
}

// Functie: vraag tonen
function toonVraag() {
    // Controlestructuur: zijn er nog vragen?
    if (huidigIndex >= aantalVragen) {
        eindQuiz();
        return;
    }

    var vraagIndex = kiesVraag();
    var huidigeVraag = vragen[vraagIndex];
    var hintsAan = document.getElementById("hintsCheckbox").checked;

    document.getElementById("vraagNummer").textContent = "Vraag " + (huidigIndex + 1) + " van " + aantalVragen;
    document.getElementById("vraag").textContent = huidigeVraag.vraag;
    document.getElementById("antwoord").dataset.juist = huidigeVraag.antwoord;

    // Hint tonen
    if (hintsAan) {
        document.getElementById("hint").textContent = "Hint: " + huidigeVraag.hint;
    } else {
        document.getElementById("hint").textContent = "";
    }

    document.getElementById("antwoord").value = "";
}

// Functie: antwoord controleren
function controleerAntwoord() {
    if (!spelBezig) {
        return;
    }

    var antwoord = document.getElementById("antwoord").value.toLowerCase().trim();
    var juistAntwoord = document.getElementById("antwoord").dataset.juist;
    var boodschap = document.getElementById("boodschap");
    var scoreElement = document.getElementById("score");

    // Controlestructuur: juist of fout
    if (antwoord === juistAntwoord) {
        score = score + 10;
        boodschap.textContent = "Juist! +10 punten!";
        scoreElement.textContent = "Score: " + score;
    } else {
        boodschap.textContent = "Fout! Het juiste antwoord was: " + juistAntwoord;
    }

    huidigIndex = huidigIndex + 1;
    toonVraag();
}

// Functie: einde quiz
function eindQuiz() {
    spelBezig = false;

    document.getElementById("vraagNummer").textContent = "";
    document.getElementById("vraag").textContent = "";
    document.getElementById("hint").textContent = "";
    document.getElementById("boodschap").textContent = spelersnaam + " heeft de quiz afgerond met " + score + " punten!";

    // Toevoegen aan scorebord
    scoreBord.push({ naam: spelersnaam, score: score, vragen: aantalVragen });

    // Sorteren van hoog naar laag
    scoreBord.sort(function(a, b) { return b.score - a.score; });

    toonScoreBord();
}

// Functie: scorebord tonen
function toonScoreBord() {
    var tabel = document.getElementById("scoreTabel");

    // Tabel leegmaken behalve header
    while (tabel.rows.length > 1) {
        tabel.deleteRow(1);
    }

    // Elke speler toevoegen
    for (var i = 0; i < scoreBord.length; i++) {
        var rij = tabel.insertRow();
        rij.insertCell().textContent = i + 1;
        rij.insertCell().textContent = scoreBord[i].naam;
        rij.insertCell().textContent = scoreBord[i].score;
        rij.insertCell().textContent = scoreBord[i].vragen;
    }
}

// Functie: quiz resetten
function resetQuiz() {
    score = 0;
    huidigIndex = 0;
    spelBezig = false;
    gebruikteIndexen = [];

    document.getElementById("spelersnaam").value = "";
    document.getElementById("antwoord").value = "";
    document.getElementById("boodschap").textContent = "";
    document.getElementById("score").textContent = "Score: 0";
    document.getElementById("vraag").textContent = "";
    document.getElementById("vraagNummer").textContent = "";
    document.getElementById("hint").textContent = "";
    document.getElementById("aantalVragen").value = "5";
    document.getElementById("hintsCheckbox").checked = false;
}

// Knoppen koppelen aan functies
document.getElementById("startKnop").addEventListener("click", startQuiz);
document.getElementById("bevestigKnop").addEventListener("click", controleerAntwoord);
document.getElementById("resetKnop").addEventListener("click", resetQuiz);

// Surprise knop alleen op homepagina
var surpriseKnop = document.getElementById("surpriseKnop");
if (surpriseKnop) {
    surpriseKnop.addEventListener("click", toonFeitje);
}