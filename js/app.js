// app.js — Pokémon Raadspel logica

// Datastructuur: lijst van Pokémon met hints per moeilijkheidsgraad
var pokemon = [
    { naam: "pikachu", makkelijk: "Dit Pokémon is geel", normaal: "Dit Pokémon heeft rode wangen", moeilijk: "Dit Pokémon is van het type elektrisch" },
    { naam: "charmander", makkelijk: "Dit Pokémon is oranje", normaal: "Dit Pokémon heeft een vlam op zijn staart", moeilijk: "Dit Pokémon is van het type vuur" },
    { naam: "bulbasaur", makkelijk: "Dit Pokémon is groen", normaal: "Dit Pokémon heeft een plant op zijn rug", moeilijk: "Dit Pokémon is van het type gras" },
    { naam: "squirtle", makkelijk: "Dit Pokémon is blauw", normaal: "Dit Pokémon heeft een schild op zijn rug", moeilijk: "Dit Pokémon is van het type water" },
    { naam: "mewtwo", makkelijk: "Dit Pokémon is paars", normaal: "Dit Pokémon is een legendarisch Pokémon", moeilijk: "Dit Pokémon is van het type psycho" }
];

// Variabelen voor het spel
var score = 0;
var huidigPokemon = null;
var spelersnaam = "";

// Functie: willekeurig Pokémon kiezen
function kiesPokemon() {
    var willekeurig = Math.floor(Math.random() * pokemon.length);
    huidigPokemon = pokemon[willekeurig];
}

// Functie: spel starten
function startSpel() {
    var naamVeld = document.getElementById("spelersnaam");
    var boodschap = document.getElementById("boodschap");
    var moeilijkheid = document.getElementById("moeilijkheid").value;
    var hintsAan = document.getElementById("geluidsCheckbox").checked;
    var hint = document.getElementById("hint");

    // Controlestructuur: naam controleren
    if (naamVeld.value === "") {
        boodschap.textContent = "Vul eerst je naam in!";
    } else {
        spelersnaam = naamVeld.value;
        boodschap.textContent = "Welkom " + spelersnaam + "! Raad de Pokémon!";

        // Kies een willekeurig Pokémon
        kiesPokemon();

        // Hint tonen als checkbox aangevinkt is
        if (hintsAan) {
            hint.textContent = "Hint: " + huidigPokemon[moeilijkheid];
        } else {
            hint.textContent = "";
        }
    }
}

// Functie: antwoord controleren
function controleerAntwoord() {
    var antwoord = document.getElementById("antwoord").value.toLowerCase();
    var boodschap = document.getElementById("boodschap");
    var scoreElement = document.getElementById("score");
    var moeilijkheid = document.getElementById("moeilijkheid").value;
    var hintsAan = document.getElementById("geluidsCheckbox").checked;
    var hint = document.getElementById("hint");

    // Controlestructuur: juist of fout
    if (antwoord === huidigPokemon.naam) {
        score = score + 10;
        boodschap.textContent = "Juist! Goed gedaan " + spelersnaam + "!";
        scoreElement.textContent = "Score: " + score;
        kiesPokemon();

        if (hintsAan) {
            hint.textContent = "Hint: " + huidigPokemon[moeilijkheid];
        }
    } else {
        boodschap.textContent = "Fout! Probeer opnieuw!";
    }

    document.getElementById("antwoord").value = "";
}

// Functie: spel resetten
function resetSpel() {
    score = 0;
    huidigPokemon = null;
    document.getElementById("spelersnaam").value = "";
    document.getElementById("antwoord").value = "";
    document.getElementById("boodschap").textContent = "";
    document.getElementById("score").textContent = "Score: 0";
    document.getElementById("hint").textContent = "";
    document.getElementById("moeilijkheid").value = "makkelijk";
    document.getElementById("geluidsCheckbox").checked = false;
}

// Knoppen koppelen aan functieS