var Letter = require("./Letter.js");

function Word(word){
    this.word = word
    this.letters = []
    this.string = function(){
        for (var i = 0; i < this.word.length; i++){
            var letter = new Letter(this.word[i])
            this.letters.push(letter)
        }
    }
}

module.exports = Word