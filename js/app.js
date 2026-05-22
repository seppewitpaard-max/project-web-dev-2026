// app.js — Pokémon Kanto Quiz logica

// Datastructuur: lijst van vragen over Kanto
var vragen = [
    { vraag: "Wat is het eerste Pokemon dat je krijgt in Kanto?", antwoord: "bulbasaur", hint: "Dit Pokemon is groen" },
    { vraag: "Wie is de eerste gym leader in Kanto?", antwoord: "brock", hint: "Hij gebruikt rots Pokemon" },
    { vraag: "Wat is de hoofdstad van Kanto?", antwoord: "pallet town", hint: "Hier begint je avontuur" },
    { vraag: "Wie is de leider van Team Rocket?", antwoord: "giovanni", hint: "Hij is ook de achtste gym leader" },
    { vraag: "Welk Pokemon evolueert met een watersteen?", antwoord: "staryu", hint: "Dit Pokemon heeft een ster vorm" },
    { vraag: "Wat is het type van Snorlax?", antwoord: "normaal", hint: "Dit Pokemon slaapt altijd" },
    { vraag: "Wie is de vijfde gym leader in Kanto?", antwoord: "koga", hint: "Hij gebruikt gif Pokemon" },
    { vraag: "Wat is het evolutie van Magikarp?", antwoord: "gyarados", hint: "Dit Pokemon is een draak" },
    { vraag: "Welk Pokemon heeft het nummer 001 in de Pokedex?", antwoord: "bulbasaur", hint: "Dit Pokemon is groen met een bol op zijn rug" },
    { vraag: "Wat is de stad waar je de SS Anne vindt?", antwoord: "vermilion city", hint: "Hier is ook de derde gym" },
    { vraag: "Wie is de zevende gym leader in Kanto?", antwoord: "blaine", hint: "Hij gebruikt vuur Pokemon" },
    { vraag: "Wat is het type van Gastly?", antwoord: "geest", hint: "Dit Pokemon is een spook" },
    { vraag: "Welk Pokemon beschermt de Safari Zone?", antwoord: "kangaskhan", hint: "Dit Pokemon draagt haar kind bij zich" },
    { vraag: "Wat is de evolutie van Slowpoke?", antwoord: "slowbro", hint: "Dit Pokemon heeft een Shellder op zijn staart" },
    { vraag: "Wie is de Elite Four die ijsPokemon gebruikt?", antwoord: "lorelei", hint: "Ze is een vrouw" }
];

// Variabelen
var score = 0;
var huidigVraagIndex = 0;
var aantalVragen = 0;
var spelersnaam = "";
var spelBezig = false;
var scoreBord = [];

// Functie: quiz starten
function startQuiz() {
    var naamVeld = document.getElementById("spelersnaam");
    var boodschap = document.getElementById("boodschap");
    var moeilijkheid = document.getElementById("moeilijkheid").value;

    // Controlestructuur: naam controleren
    if (naamVeld.value === "") {
        boodschap.textContent = "Vul eerst je naam in!";
    } else {
        spelersnaam = naamVeld.value;
        score = 0;
        huidigVraagIndex = 0;
        spelBezig = true;

        // Aantal vragen instellen op basis van moeilijkheid
        if (moeilijkheid === "makkelijk") {
            aantalVragen = 5;
        } else if (moeilijkheid === "normaal") {
            aantalVragen = 10;
        } else {
            aantalVragen = 15;
        }

        document.getElementById("score").textContent = "Score: 0";
        boodschap.textContent = "Welkom " + spelersnaam + "! Beantwoord " + aantalVragen + " vragen!";
        toonVraag();
    }
}

// Functie: vraag tonen
function toonVraag() {
    var hintsAan = document.getElementById("hintsCheckbox").checked;
    var hint = document.getElementById("hint");

    // Controlestructuur: zijn er nog vragen?
    if (huidigVraagIndex < aantalVragen) {
        var huidigeVraag = vragen[huidigVraagIndex];
        document.getElementById("vraagNummer").textContent = "Vraag " + (huidigVraagIndex + 1) + " van " + aantalVragen;
        document.getElementById("vraag").textContent = huidigeVraag.vraag;

        if (hintsAan) {
            hint.textContent = "Hint: " + huidigeVraag.hint;
        } else {
            hint.textContent = "";
        }
    } else {
        eindSpel();
    }
}

// Functie: antwoord controleren
function controleerAntwoord() {
    if (!spelBezig) return;

    var antwoord = document.getElementById("antwoord").value.toLowerCase().trim();
    var boodschap = document.getElementById("boodschap");
    var scoreElement = document.getElementById("score");
    var huidigeVraag = vragen[huidigVraagIndex];

    // Controlestructuur: juist of fout
    if (antwoord === huidigeVraag.antwoord) {
        score = score + 10;
        boodschap.textContent = "Juist! +10 punten!";
        scoreElement.textContent = "Score: " + score;
    } else {
        boodschap.textContent = "Fout! Het juiste antwoord was: " + huidigeVraag.antwoord;
    }

    huidigVraagIndex = huidigVraagIndex + 1;
    document.getElementById("antwoord").value = "";
    toonVraag();
}

// Functie: einde spel
function eindSpel() {
    spelBezig = false;
    var moeilijkheid = document.getElementById("moeilijkheid").value;
    document.getElementById("vraag").textContent = "";
    document.getElementById("vraagNummer").textContent = "";
    document.getElementById("hint").textContent = "";
    document.getElementById("boodschap").textContent = "Quiz afgelopen! Jouw score: " + score + " punten!";

    // Speler toevoegen aan scorebord
    var spelerScore = { naam: spelersnaam, score: score, moeilijkheid: moeilijkheid };
    scoreBord.push(spelerScore);

    // Scorebord sorteren van hoog naar laag
    scoreBord.sort(function(a, b) { return b.score - a.score; });

    // Scorebord tonen
    toonScoreBord();
}

// Functie: scorebord tonen
function toonScoreBord() {
    var tabel = document.getElementById("scoreTabel");

    // Tabel leegmaken behalve de header
    while (tabel.rows.length > 1) {
        tabel.deleteRow(1);
    }

    // Elke speler toevoegen aan de tabel
    for (var i = 0; i < scoreBord.length; i++) {
        var rij = tabel.insertRow();
        var rangCell = rij.insertCell();
        var naamCell = rij.insertCell();
        var scoreCell = rij.insertCell();
        var moeilijkheidCell = rij.insertCell();

        rangCell.textContent = i + 1;
        naamCell.textContent = scoreBord[i].naam;
        scoreCell.textContent = scoreBord[i].score;
        moeilijkheidCell.textContent = scoreBord[i].moeilijkheid;
    }
}

// Functie: quiz resetten
function resetQuiz() {
    score = 0;
    huidigVraagIndex = 0;
    spelBezig = false;
    document.getElementById("spelersnaam").value = "";
    document.getElementById("antwoord").value = "";
    document.getElementById("boodschap").textContent = "";
    document.getElementById("score").textContent = "Score: 0";
    document.getElementById("vraag").textContent = "";
    document.getElementById("vraagNummer").textContent = "";
    document.getElementById("hint").textContent = "";
    document.getElementById("moeilijkheid").value = "makkelijk";
    document.getElementById("hintsCheckbox").checked = false;
}

// Knoppen koppelen aan functies
document.getElementById("startKnop").addEventListener("click", startQuiz);
document.getElementById("bevestigKnop").addEventListener("click", controleerAntwoord);
document.getElementById("resetKnop").addEventListener("click", resetQuiz);