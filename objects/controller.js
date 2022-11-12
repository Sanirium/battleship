

var controller = {
    guesses: 0,

    processGuess: function(guess) {
        var location = this.parseGuess(guess);

        if (location) {
            this.guesses++;
            var hit = model.fire(location);
            if (hit && model.shipsSunk === model.numShips) {
                view.displayMessage(`Вы дезинтегрировали мои корабли за ${this.guesses} выстрелов! Удача не на вашей стороне=)`);
            }
        } else alert("О боже мой, введите правильные координаты");
    },

    parseGuess: function(guess) {
        if (guess === null) alert("О боже мой, зачем вы тыкаете в холостую!");
        guess = guess.replace(' ', '').toUpperCase().split("").sort().reverse();
        var dictionary = this.getDictionary();
        var updateQues = "";

        console.log(guess);
        if (guess.length !== 2) {
            alert("О боже мой, вы не можете нормально ввести координаты, введите букву и цифру!");
        } 
        else {
            var index = dictionary.indexOf(guess[0]);
            if (index != -1 && guess[1] < model.boardSize && isNaN(guess))  {
                return index + guess[1];
            }
        };

        return null;
        
    },

    getDictionary: function() {
        var dictionary = [];
        var charStart = "A".charCodeAt();
        for (var i = charStart; i < charStart + model.boardSize; i++) {
            dictionary.push(String.fromCharCode(i));
        };
        return dictionary;
    }
}