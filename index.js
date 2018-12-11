var inquirer = require("inquirer")
var Word = require("./Word.js");
var Letter = require("./Letter.js")

var guessesRemaining = 9
var yes = true
var firstWord = new Word("Blue");


function makeThem(){
    if(yes){
        inquirer.prompt([
            {"name": "guess",
             "message": "Guess a letter!"
            }
        ]).then(function(answer){
            var guessedWord = new Word(answer.guess)
            guessedWord.check(answer.guess);
            makeThem();
        })
    } 
}

makeThem();