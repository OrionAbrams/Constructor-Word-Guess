

// var guessesRemaining = 9

function Letter(letter) {
    this.letter = letter,
        this.letterGuessed = false,
        this.disp = function () {
            if (this.letterGuessed) {
                console.log(letter)
                return letter
            }
            else {
                console.log("_")
            }
        }
}
this.letterChecker = function (guess) {
    if (guess === this.letter) {
        this.letterGuessed = true
        this.disp()
        console.log("CORRECT!")
    }
}


module.exports = Letter
// word.js. will export later

// function Word(){
//     this.letters = []
//     this.addLetters = function(letter) {
//         this.letters.push(new Letter(letter));
//         console.log(this.letters.length)
//       };
//     this.string = function(word){
//         for (var i = 0; i < this.letters.length; i++){
//             var letter = new Letter(word)
//             letter.disp()

//         }

//     }
//     this.check = function(){
//         this.letters.letterChecker()
//     }
// }
// var yes = true
// var firstWord = new Word("Blue");


// function makeThem(){
//     if(yes){
//         inquirer.prompt([
//             {"name": "guess",
//              "message": "Guess a letter!"
//             }
//         ]).then(function(answer){
//             var guessedLetter = new Letter(answer.guess)
//             guessedLetter.letterChecker(answer.guess);
//             makeThem();
//         })
//     } 
// }

// makeThem();