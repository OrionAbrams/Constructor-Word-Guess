function Letter(letter) {
    this.letter = letter,
        this.letterGuessed = false,
        this.isVisible = false,
        this.disp = function () {
            if (this.isVisible === false) {
                return " _ "
            }
            else {
                return this.letter
            }
        }
}
module.exports = Letter