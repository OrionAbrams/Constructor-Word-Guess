var Letter = require("./Letter.js");

function Word(word){
    this.name = word
    this.letters = []
    this.addLetters = function(letter) {
        this.letters.push(new Letter(letter));
        console.log(this.letters.length)
      };
    this.string = function(x){
        for (var i = 0; i < this.letters.length; i++){
            var letter = new Letter(x)
            letter.disp()

        }

    }
    this.check = function(answer){
        this.letterChecker(answer)
    }
}
var firstWord = new Word("Blue")
firstWord.addLetters(this.name)
firstWord.string()
module.exports = Word