
var model = {
    boardSize:  7, //Размер игрового поля
    numShips: 3, //колв-во кораблей
    shipLength: 3, //длина корабля
    shipsSunk: 0, //потопленные корабли

    ships: [{ locations: [0, 0, 0], hits: ["", "", ""]},
            { locations: [0, 0, 0], hits: ["", "", ""]},
            { locations: [0, 0, 0], hits: ["", "", ""]}],

    fire: function(guess) {

        for (var i = 0; i < this.numShips; i++){
            var ship = this.ships[i];
            var index = ship.locations.indexOf(guess);

            if (index >= 0) {
                ship.hits[index] = "hit";
                view.displayHit(guess);
                view.displayMessage("Есть пробитие");

                if (this.isSunk(ship)) {
                    view.displayMessage("Рядовой, поздравляю, ты уничтожил корабль!");
                    this.shipsSunk++;
                }
            
                return true;
            };
        };

        view.displayMiss(guess);
        view.displayMessage("Промазал");

        return false;

    },

    isSunk: function(ship) {

        if (ship.hits.filter(item => item == "hit").length == this.shipLength) {
            return true;
        };

        return false;
    },

    generateShipLocations: function() {

        var locations;

        for (var i = 0; i < this.numShips; i++) {
            do {
                locations = this.generateShip();
            } while (this.collision(locations));
            this.ships[i].locations = locations;
        }
    },

    generateShip: function() {

        var direction = Math.floor(Math.random() * 2);
        var row, col;

        if (direction === 1) {
            //сгенерировать начальную позицию для горизонтального корабля
            row = Math.floor(Math.random() * this.boardSize);
            col = Math.floor(Math.random() * (this.boardSize - this.shipLength));
        } else {
            //сгенерировать начальную позицию для вертикального корабля 
            row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
            col = Math.floor(Math.random() * this.boardSize);
        }

        var newShipLocations = [];
        for (var i = 0; i < this.shipLength; i++) {
            if (direction === 1) {
                //добавить в массив для горизонтального корабля
                newShipLocations.push(row + "" + (col + i));
            } else {
                //добавить в массив для вертикального корабля
                newShipLocations.push((row + i) + "" + col);
            }
        }
        
        return newShipLocations;
    },

    collision: function(locations){

        for (var i = 0; i < this.numShips; i++) {
            var ship = model.ships[i];

            for (var j = 0; j < locations.length; j++) {
                if (ship.locations.indexOf(locations[j]) >= 0) {
                    return true;
                }
            }
        }

        return false;
    }
}