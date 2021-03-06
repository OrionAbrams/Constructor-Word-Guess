var inquirer = require("inquirer")
var Word = require("./Word.js")
var wordAnswers = ["bulbasaur", "ivysaur", "venusaur", "charmander", "charmeleon", "charizard", "squirtle", "wartortle", "blastoise", "caterpie", "metapod", "butterfree", "weedle", "kakuna", "beedrill", "pidgey", "pidgeotto", "pidgeot", "rattata", "raticate", "spearow", "fearow", "ekans", "arbok", "pikachu", "raichu", "sandshrew", "sandslash", "nidoran", "nidorina", "nidoqueen", "nidoran", "nidorino", "nidoking", "clefairy", "clefable", "vulpix", "ninetales", "jigglypuff", "wigglytuff", "zubat", "golbat", "oddish", "gloom", "vileplume", "paras", "parasect", "venonat", "venomoth", "diglett", "dugtrio", "meowth", "persian", "psyduck", "golduck", "mankey", "primeape", "growlithe", "arcanine", "poliwag", "poliwhirl", "poliwrath", "abra", "kadabra", "alakazam", "machop", "machoke", "machamp", "bellsprout", "weepinbell", "victreebel", "tentacool", "tentacruel", "geodude", "graveler", "golem", "ponyta", "rapidash", "slowpoke", "slowbro", "magnemite", "magneton", "farfetch'd", "doduo", "dodrio", "seel", "dewgong", "grimer", "muk", "shellder", "cloyster", "gastly", "haunter", "gengar", "onix", "drowzee", "hypno", "krabby", "kingler", "voltorb", "electrode", "exeggcute", "exeggutor", "cubone", "marowak", "hitmonlee", "hitmonchan", "lickitung", "koffing", "weezing", "rhyhorn", "rhydon", "chansey", "tangela", "kangaskhan", "horsea", "seadra", "goldeen", "seaking", "staryu", "starmie", "mr. mime", "scyther", "jynx", "electabuzz", "magmar", "pinsir", "tauros", "magikarp", "gyarados", "lapras", "ditto", "eevee", "vaporeon", "jolteon", "flareon", "porygon", "omanyte", "omastar", "kabuto", "kabutops", "aerodactyl", "snorlax", "articuno", "zapdos", "moltres", "dratini", "dragonair", "dragonite", "mewtwo", "mew"]
var randNumber
var charactersGuessed = []
var newWordArray = []
var currentWord
var guessesRemaining
var gotGuess = false
var wholeWordGuessed = false
var hasGuessedThatCharacter = true

console.log("\n")
console.log("The 150 original pokemon hangman terminal game!")
console.log("\n")
console.log('* * * * * * * * * * * * * * * * * * * * * * * *')
console.log("\n")

function resetWord() {
    charactersGuessed = []
    randNumber = Math.floor(Math.random() * wordAnswers.length)
    currentWord = new Word(wordAnswers[randNumber])
    guessesRemaining = 9
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
            message: "\nPlay again?",
            name: "confirm"
        }
    ]).then(function (response) {
        if (response.confirm) {
            resetWord()
        }
        else {
            console.log("\nBuh-bye til next time!\n")
            process.exit()
        }
    })
}

function askForLetter() {
    inquirer.prompt([
        {
            name: "guess",
            message: "\nGuess a letter!",
            validate: function (value) {
                var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
                 "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
                var flag = false;
                for (var i = 0; i < alphabet.length; i++) {
                    if (value === alphabet[i]) {
                        flag = true;
                    }
                }
                return flag;
            }
        }
    ]).then(function (answer) {
        letterChecker(answer.guess.toLowerCase())
        for (var i = 0; i < charactersGuessed.length; i++) {
            if (answer.guess.toLowerCase() != charactersGuessed[i].toLowerCase()) {
            }
            else {
                console.log("Already guessed that!")

                if (charactersGuessed[i].toLowerCase() === charactersGuessed[i].toLowerCase()) {
                    charactersGuessed.splice(i, 1)
                }
                hasGuessedThatCharacter = true
            }
        }
        charactersGuessed.push(answer.guess)
        console.log("Already guessed: " + charactersGuessed + "\n")
        if (!gotGuess && !hasGuessedThatCharacter) {

            guessesRemaining--
            console.log("Wrong! You have " + guessesRemaining + " guesses left! \n")
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
            console.log("\nCongrats! You got it!")
            ask();
            return
        }
        askForLetter()
    })
}

function letterChecker(guess) {
    console.log(guess)
    for (var i = 0; i < currentWord.letters.length; i++) {
        if (guess === currentWord.letters[i].letter) {
            currentWord.letters[i].letterGuessed = true
            currentWord.letters[i].isVisible = true
            gotGuess = true
        }
    }
    if (gotGuess) {
        console.log("\nCorrect! You're almost a pokemon trainer! You still have " + guessesRemaining + " guesses left! \n")
    }
    else hasGuessedThatCharacter = false
}
