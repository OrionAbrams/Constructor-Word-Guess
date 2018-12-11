var inquirer = require("inquirer")
var Word = require("./Word.js")
var wordAnswers = ["bulbasaur", "ivysaur", "venusaur", "charmander", "charmeleon", "charizard", "squirtle", "wartortle", "blastoise", "caterpie", "metapod", "butterfree", "weedle", "kakuna", "beedrill", "pidgey", "pidgeotto", "pidgeot", "rattata", "raticate", "spearow", "fearow", "ekans", "arbok", "pikachu", "raichu", "sandshrew", "sandslash", "nidoran", "nidorina", "nidoqueen", "nidoran", "nidorino", "nidoking", "clefairy", "clefable", "vulpix", "ninetales", "jigglypuff", "wigglytuff", "zubat", "golbat", "oddish", "gloom", "vileplume", "paras", "parasect", "venonat", "venomoth", "diglett", "dugtrio", "meowth", "persian", "psyduck", "golduck", "mankey", "primeape", "growlithe", "arcanine", "poliwag", "poliwhirl", "poliwrath", "abra", "kadabra", "alakazam", "machop", "machoke", "machamp", "bellsprout", "weepinbell", "victreebel", "tentacool", "tentacruel", "geodude", "graveler", "golem", "ponyta", "rapidash", "slowpoke", "slowbro", "magnemite", "magneton", "farfetch'd", "doduo", "dodrio", "seel", "dewgong", "grimer", "muk", "shellder", "cloyster", "gastly", "haunter", "gengar", "onix", "drowzee", "hypno", "krabby", "kingler", "voltorb", "electrode", "exeggcute", "exeggutor", "cubone", "marowak", "hitmonlee", "hitmonchan", "lickitung", "koffing", "weezing", "rhyhorn", "rhydon", "chansey", "tangela", "kangaskhan", "horsea", "seadra", "goldeen", "seaking", "staryu", "starmie", "mr. mime", "scyther", "jynx", "electabuzz", "magmar", "pinsir", "tauros", "magikarp", "gyarados", "lapras", "ditto", "eevee", "vaporeon", "jolteon", "flareon", "porygon", "omanyte", "omastar", "kabuto", "kabutops", "aerodactyl", "snorlax", "articuno", "zapdos", "moltres", "dratini", "dragonair", "dragonite", "mewtwo", "mew"]
var randNumber
var newWordArray = []
var currentWord
var guessesRemaining
var gotGuess = false
var wholeWordGuessed = false

console.log("\n")
console.log("The 150 original pokemon hangman terminal game!")
console.log("\n")
console.log('* * * * * * * * * * * * * * * * * * * * * * * *')
console.log("\n")

function resetWord() {
    randNumber = Math.floor(Math.random() * wordAnswers.length)
    currentWord = new Word(wordAnswers[randNumber])
    guessesRemaining = 10
    currentWord.string()
    displayStuff()
    askForLetter()
}
resetWord()


function displayStuff() {
    for (var i = 0; i < currentWord.letters.length; i++) {
        newWordArray.push(currentWord.letters[i].disp())
    }
    console.log(newWordArray.join(" "))
    newWordArray = []
}

function ask() {
    inquirer.prompt([
        {
            type: "confirm",
            message: "Play again?",
            name: "confirm"
        }
    ]).then(function (response) {
        if (response.confirm) {
            resetWord()
        }
        else {
            console.log("Buh-bye til next time!")
            process.exit()
        }
    })
}

function askForLetter() {
    inquirer.prompt([
        {
            name : "guess",
            message : "\n Guess a letter!",
            validate : function(value) {
                var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
                var flag = false;
                for (var i = 0; i < alphabet.length; i++) {
                  if (value === alphabet[i]) {
                    flag = true;
                    for (var j = 0; j < currentWord.letters.length; j++) {
                      if (value === currentWord.letters[i]) {
                        flag = false;
                      }
                    }
                  }
                }
                return flag;
              }
        }
    ]).then(function (answer) {
        letterChecker(answer.guess)
        if (gotGuess === false) {
            guessesRemaining--
            console.log("\n Wrong! You have " + guessesRemaining + " guesses left! \n")
            if (guessesRemaining === 0) {
                console.log("Out of guesses! You lose!")
                ask();
                return
            }
        }

        gotGuess = false
        displayStuff()
        wholeWordGuessed = true
        for (var i = 0; i < currentWord.letters.length; i++) {
            if (!currentWord.letters[i].letterGuessed) {
                wholeWordGuessed = false
            }
        }
        if (wholeWordGuessed) {
            console.log("Congrats! You got it!")
            ask();
            return
        }
        askForLetter()
    })
}

function letterChecker(guess) {
    for (var i = 0; i < currentWord.letters.length; i++) {
        if (guess === currentWord.letters[i].letter) {
            currentWord.letters[i].letterGuessed = true
            currentWord.letters[i].isVisible = true
            gotGuess = true
        }
    }
    if (gotGuess = true){
        console.log("\n Correct! You're almost a pokemon trainer! \n")
    }
}
