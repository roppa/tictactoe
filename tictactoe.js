var tictactoe = tictactoe || (function () {

    var elements = 9, //how big we want the matrix
        matrix = [], //will store x o or null
        users = ["x", "o"],
        winningSequences = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
        ],
        result = {
            status : null, //won = true, game on = null, draw = false
            winner : null, 
            message : "",
            currentUser : users[0],
            lastUser : null,
            winningSequence : null
        },
        //private data so provide getter methods
        game = {
            getStatus : function () {
                return result.status;
            },
            getWinner : function () {
                return result.winner;
            },
            getMessage : function () {
                return result.message;
            },
            getCurrentUser : function () {
                return result.currentUser;
            },
            getLastUser : function () {
                return result.lastUser;
            },
            getWinningSequence : function () {
                return result.winningSequence;
            },
            choose : choose
        };

    /*
    * Establish the current state of game. Loop through winning sequences, if they are all equal than we have a winner
    */
    function updateResult() {

        'use strict';

        var i, one, two, three;

        //for each possible winning condition
        for (i = 0; i < winningSequences.length; i = i + 1) {
            one = matrix[winningSequences[i][0]];
            two = matrix[winningSequences[i][1]];
            three = matrix[winningSequences[i][2]];
            //if the users choice is in the winning sequence, 0 = 1 = 2 i.e. x = x = x or o = o = o
            if (one !== null && one === two && two === three) {
                result.winner = one;
                result.message = one + " is the winner!";
                result.status = true;
                result.winningSequence = winningSequences[i];
                return;
            }
        }

        if (matrix.indexOf(null) === -1) { //if board is full up we have a draw
            result.message = "It's a draw";
            result.status = false;
        }

    }

    /*
    * Player makes a move. Set the index.
    * @param {number} the index of the matrix
    */
    function choose(choice) {

        'use strict';

        //if the game is over, don't do anything
        if (result.status !== null) {
            return;
        }

        //is it a valid choice?
        if (isNaN(choice) || choice < 0 || choice > 8) {
            result.message = "Invalid number";
            return;
        }

        //is it already set?
        if (matrix[choice] !== null) {
            result.message = "Already set!";
            return;
        }

        //set the users choice
        matrix[choice] = result.currentUser;
        //current user becomes last user
        result.lastUser = result.currentUser;
        //get the next user
        result.currentUser = (users[0] === result.lastUser) ? users[1] : users[0];

        //set game state
        updateResult();

    }

    /*
    * Start a new game. Resets the results of game
    * @param {string} optional starting user
    */
    function newGame(user) {

        'use strict';

        var i;

        result.currentUser = (user && users.indexOf(user) !== -1) ? users[users.indexOf(user)] : users[0];

        for (i = 0; i < elements; i = i + 1) {
            matrix[i] = null;
        }

        result.status = null;
        result.winner = null;
        result.message = "";
        result.lastUser = null;
        result.winningSequence = null;

        return game;
    }

    return {
        newGame : newGame
    }

}());