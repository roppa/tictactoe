var tictactoe = (function () {

    var elements = 9, //how big we want the matrix
        elementArray = [], //will store x o or null
        userArray = ["x", "o"],
        winningArrays = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 6], [2, 5, 8], [0, 3, 8], [2, 4, 6]
        ],
        lastUser = null,
        winner;

    function checkResults() {

        'use strict';

        var i, current;
        //for each possibility
        for (i = 0; i < winningArrays.length; i = i + 1) {
            current = elementArray[winningArrays[i][0]];
            //if the users choice is in the winning sequence, 0 = 1 = 2 i.e. x = x = x or o = o = o
            if (current !== null && current === elementArray[winningArrays[i][1]] && elementArray[winningArrays[i][1]] === elementArray[winningArrays[i][2]]) {
                winner = current;
                return current + " is the winner!";
            }
        }
        //otherwise
        return null;
    }

    function choose(user, choice) {

        'use strict';

        if (isNaN(choice) || choice < 0 || choice > 8) {
            return "Invalid number";
        }

        if (elementArray[choice] !== null || userArray.indexOf(user) === -1) {
            return "Already set!";
        }

        if (lastUser === null || lastUser !== user) {
            elementArray[choice] = user;
            lastUser = user;
            return checkResults();
        }

        if (winner !== undefined) {
            return winner + " won!";
        }

        return "Not your go!";

    }

    function newGame() {

        'use strict';

        var i;

        for (i = 0; i < elements; i = i + 1) {
            elementArray[i] = null;
        }

        winner = undefined;
    }

    newGame();

    return {
        choose : choose,
        newGame : newGame,
        checkResults : checkResults
    }

}());