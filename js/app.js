// app.js — AC Milan Champions League Quiz logica

// Datastructuur: spelers voor de surprise knop
var spelers = [
    { naam: "Paolo Maldini", positie: "Verdediger", periode: "1985–2009", feit: "Speelde 902 officiële wedstrijden voor AC Milan. Een absolute legende." },
    { naam: "Franco Baresi", positie: "Verdediger", periode: "1977–1997", feit: "Aanvoerder tijdens de gouden jaren. Legendarische libero met 3 CL-titels." },
    { naam: "Kaká", positie: "Middenvelder", periode: "2003–2009", feit: "Ballon d'Or winnaar 2007. Scoorde 10 goals in de CL van 2006-2007." },
    { naam: "Andrea Pirlo", positie: "Spelmaker", periode: "2001–2011", feit: "Één van de beste spelmakers ooit. Won de CL in 2003 én 2007." },
    { naam: "Andriy Shevchenko", positie: "Aanvaller", periode: "1999–2006", feit: "Ballon d'Or winnaar 2004. Scoorde 173 goals voor Milan." },
    { naam: "Filippo Inzaghi", positie: "Spits", periode: "2001–2012", feit: "Scoorde beide goals in de CL finale van 2007 tegen Liverpool." },
    { naam: "Ruud Gullit", positie: "Aanvaller", periode: "1987–1995", feit: "Ballon d'Or winnaar 1987. Speelde mee in de gouden generatie met Van Basten." },
    { naam: "Marco van Basten", positie: "Aanvaller", periode: "1987–1995", feit: "3x Ballon d'Or winnaar. Één van de beste aanvallers in de voetbalgeschiedenis." },
    { naam: "Clarence Seedorf", positie: "Middenvelder", periode: "2002–2012", feit: "Enige speler ooit die de CL won met 3 verschillende clubs." },
    { naam: "Gennaro Gattuso", positie: "Middenvelder", periode: "1999–2012", feit: "Legendarische strijder op het middenveld. Het hart van Milan." },
    { naam: "Alessandro Nesta", positie: "Verdediger", periode: "2002–2012", feit: "Één van de beste verdedigers van zijn generatie. IJzersterk in de lucht." },
    { naam: "Dida", positie: "Doelman", periode: "2000–2010", feit: "Braziliaanse keeper en vaste nummer 1 tijdens de CL-titel van 2007." }
];

// Datastructuur: quizvragen
var vragen = [
    { vraag: "Hoeveel keer won AC Milan de Champions League?", antwoord: "7", hint: "Meer dan 5 maar minder dan 10" },
    { vraag: "In welk jaar won AC Milan hun eerste Champions League?", antwoord: "1963", hint: "Begin jaren 60" },
    { vraag: "Wie was de aanvoerder van AC Milan in de jaren 90?", antwoord: "franco baresi", hint: "Een legendarische verdediger" },
    { vraag: "Welke speler won de Ballon d'Or in 2007 als Milan speler?", antwoord: "kaka", hint: "Een Braziliaanse middenvelder" },
    { vraag: "Hoe heet het stadion van AC Milan?", antwoord: "san siro", hint: "Ze delen het met Inter Milan" },
    { vraag: "In welk jaar werd AC Milan opgericht?", antwoord: "1899", hint: "Einde van de 19e eeuw" },
    { vraag: "Welke Nederlandse aanvaller speelde voor AC Milan in de jaren 90?", antwoord: "marco van basten", hint: "Hij won 3x de Ballon d'Or" },
    { vraag: "Wie scoorde 2 goals voor Milan in de CL finale van 2007?", antwoord: "inzaghi", hint: "Italiaanse spits" },
    { vraag: "Tegen welke club won Milan de CL finale van 2003?", antwoord: "juventus", hint: "Een andere Italiaanse club" },
    { vraag: "Hoeveel jaar speelde Paolo Maldini voor AC Milan?", antwoord: "24", hint: "Meer dan 20 jaar" },
    { vraag: "In welke stad ligt het stadion van AC Milan?", antwoord: "milaan", hint: "De naam van de club geeft het weg" },
    { vraag: "Welke kleur shirt draagt AC Milan thuis?", antwoord: "rood zwart", hint: "Twee kleuren in verticale strepen" },
    { vraag: "Tegen welke club won Milan de CL finale van 2007?", antwoord: "liverpool", hint: "Een Engelse club" },
    { vraag: "Welke Oekraïense aanvaller won de Ballon d'Or in 2004?", antwoord: "shevchenko", hint: "Hij speelde van 1999 tot 2006 voor Milan" },
    { vraag: "Welke middenvelder van Milan wordt beschouwd als beste speler van 2006?", antwoord: "pirlo", hint: "Italiaanse spelmaker" }
];

// Variabelen
var score = 0;
var huidigIndex = 0;
var aantalVragen = 5;
var spelersnaam = "";
var spelBezig = false;
var scoreBord = [];
var gebruikteIndexen = [];

// Levenshtein afstand: telt hoeveel letters verschillen
function levenshtein(a, b) {
    var m = a.length, n = b.length;
    var dp = [];
    for (var i = 0; i <= m; i++) {
        dp[i] = [i];
        for (var j = 1; j <= n; j++) {
            if (i === 0) { dp[i][j] = j; }
            else {
                dp[i][j] = Math.min(
                    dp[i-1][j] + 1,
                    dp[i][j-1] + 1,
                    dp[i-1][j-1] + (a[i-1] === b[j-1] ? 0 : 1)
                );
            }
        }
    }
    return dp[m][n];
}

// Verbeterde check: tolereer typfouten op basis van woordlengte
function controleerGelijkenis(antwoord, juist) {
    antwoord = antwoord.toLowerCase().trim();
    juist = juist.toLowerCase().trim();

    if (antwoord === juist) return true;
    if (juist.includes(antwoord) || antwoord.includes(juist)) return true;

    // Per woord checken
    var juisteWoorden = juist.split(" ");
    var antwoordWoorden = antwoord.split(" ");

    // Elk woord in het juiste antwoord vergelijken
    var gevonden = 0;
    for (var i = 0; i < juisteWoorden.length; i++) {
        var jWoord = juisteWoorden[i];
        if (jWoord.length <= 3) { gevonden++; continue; } // korte woorden overslaan

        // Max 1 typfout voor woorden tot 6 letters, max 2 voor langere woorden
        var maxFouten = jWoord.length <= 6 ? 1 : 2;

        for (var j = 0; j < antwoordWoorden.length; j++) {
            if (levenshtein(antwoordWoorden[j], jWoord) <= maxFouten) {
                gevonden++;
                break;
            }
        }
    }

    // Als minstens de helft van de woorden kloppen, is het juist
    if (gevonden >= Math.ceil(juisteWoorden.length / 2)) return true;

    // Totale string vergelijken voor korte antwoorden
    if (juist.length <= 8) {
        return levenshtein(antwoord, juist) <= 1;
    }

    return false;
}

// Functie: surprise knop — toont random speler als naam ingevuld is
function toonRandomSpeler() {
    var naamVeld = document.getElementById("spelersnaam");
    var reveal = document.getElementById("spelerReveal");

    if (!naamVeld || !reveal) return;

    var naam = naamVeld.value.trim();
    if (naam === "") {
        reveal.innerHTML = "<p style='color:#cc0000;font-weight:700;'>Vul eerst je naam in om een speler te ontdekken!</p>";
        reveal.classList.add("zichtbaar");
        return;
    }

    var willekeurig = spelers[Math.floor(Math.random() * spelers.length)];
    reveal.innerHTML =
        "<h3>" + willekeurig.naam + "</h3>" +
        "<p>" + willekeurig.positie + " &nbsp;·&nbsp; " + willekeurig.periode + "</p>" +
        "<p class='feit'>" + willekeurig.feit + "</p>";
    reveal.classList.add("zichtbaar");
}

// Functie: willekeurige vraag kiezen
function kiesVraag() {
    var beschikbaar = [];
    for (var i = 0; i < vragen.length; i++) {
        if (gebruikteIndexen.indexOf(i) === -1) beschikbaar.push(i);
    }
    var willekeurig = beschikbaar[Math.floor(Math.random() * beschikbaar.length)];
    gebruikteIndexen.push(willekeurig);
    return willekeurig;
}

// Functie: quiz starten
function startQuiz() {
    var naamVeld = document.getElementById("spelersnaam");
    var boodschap = document.getElementById("boodschap");

    if (naamVeld.value.trim() === "") {
        boodschap.textContent = "Vul eerst je naam in!";
        boodschap.className = "fout";
        return;
    }

    spelersnaam = naamVeld.value.trim();
    score = 0;
    huidigIndex = 0;
    spelBezig = true;
    gebruikteIndexen = [];
    aantalVragen = parseInt(document.getElementById("aantalVragen").value);

    document.getElementById("score").textContent = "Score: 0";
    boodschap.textContent = "Welkom " + spelersnaam + "! Beantwoord " + aantalVragen + " vragen!";
    boodschap.className = "";

    toonVraag();
}

// Functie: vraag tonen
function toonVraag() {
    if (huidigIndex >= aantalVragen) { eindQuiz(); return; }

    var vraagIndex = kiesVraag();
    var huidigeVraag = vragen[vraagIndex];
    var hintsAan = document.getElementById("hintsCheckbox").checked;

    document.getElementById("vraagNummer").textContent = "Vraag " + (huidigIndex + 1) + " van " + aantalVragen;
    document.getElementById("vraag").textContent = huidigeVraag.vraag;
    document.getElementById("antwoord").dataset.juist = huidigeVraag.antwoord;
    document.getElementById("hint").textContent = hintsAan ? "Hint: " + huidigeVraag.hint : "";
    document.getElementById("antwoord").value = "";
    document.getElementById("antwoord").focus();
}

// Functie: antwoord controleren
function controleerAntwoord() {
    if (!spelBezig) return;

    var antwoord = document.getElementById("antwoord").value.toLowerCase().trim();
    var juistAntwoord = document.getElementById("antwoord").dataset.juist;
    var boodschap = document.getElementById("boodschap");

    if (antwoord === "") return;

    if (controleerGelijkenis(antwoord, juistAntwoord)) {
        score += 10;
        boodschap.textContent = "✓ Juist! +10 punten! Het antwoord was: " + juistAntwoord;
        boodschap.className = "juist";
        document.getElementById("score").textContent = "Score: " + score;
    } else {
        boodschap.textContent = "✗ Fout! Het juiste antwoord was: " + juistAntwoord;
        boodschap.className = "fout";
    }

    huidigIndex++;
    toonVraag();
}

// Enter-toets = bevestigen
document.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        var antwoordVeld = document.getElementById("antwoord");
        if (antwoordVeld && document.activeElement === antwoordVeld && spelBezig) {
            controleerAntwoord();
        }
    }
});

// Functie: einde quiz
function eindQuiz() {
    spelBezig = false;
    document.getElementById("vraagNummer").textContent = "";
    document.getElementById("vraag").textContent = "";
    document.getElementById("hint").textContent = "";

    var boodschap = document.getElementById("boodschap");
    boodschap.textContent = spelersnaam + " heeft de quiz afgerond met " + score + " punten!";
    boodschap.className = "";

    scoreBord.push({ naam: spelersnaam, score: score, vragen: aantalVragen });
    scoreBord.sort(function(a, b) { return b.score - a.score; });
    toonScoreBord();
}

// Functie: scorebord tonen
function toonScoreBord() {
    var tabel = document.getElementById("scoreTabel");
    while (tabel.rows.length > 1) tabel.deleteRow(1);
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
    score = 0; huidigIndex = 0; spelBezig = false; gebruikteIndexen = [];
    document.getElementById("spelersnaam").value = "";
    document.getElementById("antwoord").value = "";
    var boodschap = document.getElementById("boodschap");
    boodschap.textContent = ""; boodschap.className = "";
    document.getElementById("score").textContent = "Score: 0";
    document.getElementById("vraag").textContent = "";
    document.getElementById("vraagNummer").textContent = "";
    document.getElementById("hint").textContent = "";
    document.getElementById("aantalVragen").value = "5";
    document.getElementById("hintsCheckbox").checked = false;
}

// Knoppen koppelen — alleen als ze op de pagina staan
var startKnop = document.getElementById("startKnop");
if (startKnop) startKnop.addEventListener("click", startQuiz);

var bevestigKnop = document.getElementById("bevestigKnop");
if (bevestigKnop) bevestigKnop.addEventListener("click", controleerAntwoord);

var resetKnop = document.getElementById("resetKnop");
if (resetKnop) resetKnop.addEventListener("click", resetQuiz);

var surpriseKnop = document.getElementById("surpriseKnop");
if (surpriseKnop) surpriseKnop.addEventListener("click", toonRandomSpeler);