var Letter = require("./Letter.js");

function Word(word){
    var that = this
    this.word = word
    this.letters = []
    this.addLetters = function(letter) {
        this.letters.push(new Letter(letter));
        console.log(this.letters.length)
      };
    this.string = function(){
        for (var i = 0; i < this.word.length; i++){
            var letter = new Letter(this.word[i])
            this.letters.push(letter)
            console.log(this.letters)
            // letter.disp()

        }

    }
    this.check = function(answer){
        this.letterChecker(answer)
    }
}

var firstWord = new Word("Blue")
firstWord.string()
console.log(firstWord.letters)