angular
    .module('ticTacToe')
    .controller('MainController', MainController);

    MainController$inject = ['firebaseObject'];

    ///////////////////////////////////////////////////////////////////////
    // This is the start of the MainController() function and includes
    // all properties and methods used locally.
    /////////////////////////////////////////////////////////////////////// 

    function MainController($firebaseObject){
        var self = this;

        self.grid = getGrid();
        self.resetAll = resetAll;
        self.checkMove = checkMove;
        self.getMove = getMove;
        self.checkWinner = checkWinner;
        self.countWins = countWins;

        // self.winner = false;
        // self.xCounter = 0;
        // self.oCounter = 0;



        ///////////////////////////////////////////////////////////////////////
        // Function getGrid() performs the initial setup of the TicTacToe board
        // and pushes it to Firebase as the grid object. The grid{} object 
        // contains an array called squares[].
        /////////////////////////////////////////////////////////////////////// 
        
        function getGrid(){
            var ref = new Firebase('https://ttt-alok.firebaseIO.com/home');
            var board = $firebaseObject(ref);

            board.winner = false;
            board.xCounter = 0;
            board.oCounter = 0;

            board.$loaded(function(){
                board.squares = [];
                board.clicks = 0;

                for(var i=0; i<9; i++){
                    board.squares.push({clicked: false, move: "", won: false});
                }

            });

            board.$save();
            return board;
        };
        debugger

        ///////////////////////////////////////////////////////////////////////
        // Function resetAll() clears the bord and resets associated game data,
        // checkMove() filters clicks to counteract a player clicking a square
        // already containing an x or an o, and getMove() returns an x or an o
        // when clicked.
        ///////////////////////////////////////////////////////////////////////        

        function resetAll(){
            self.grid.clicks = 0;
            self.grid.winner = false;

            for(var i=0; i<self.grid.squares.length; i++){
                self.grid.squares[i].clicked = false;
                self.grid.squares[i].move = "";
                self.grid.squares[i].won = false;
            }

            self.grid.$save();
        };
        // End of resetAll function

        function checkMove(index){
            
            if(self.grid.winner !== false){
                resetAll();
            }

            else if (self.grid.squares[index].clicked === true){
                alert("This square is full!");
            }

            else{
                self.getMove(index);
            }
        };
        // End of checkMove function

        function getMove(index){
        	self.grid.clicks++;

        	if(self.grid.clicks === 1){
        		self.grid.squares[index].clicked = true;
        		self.grid.squares[index].move = "x";
        	}

        	else if(self.grid.clicks%2 === 0){
        		self.grid.squares[index].clicked = true;
        		self.grid.squares[index].move = "o";
        	}

        	else{
        		self.grid.squares[index].clicked = true;
        		self.grid.squares[index].move = "x";
        		self.grid.squares[index].move;

        	}
            
            self.checkWinner();
            console.log(self.grid.clicks);
            self.grid.$save();
        };


        // This function runs after getMove to look for three moves in sequence.
        // If one player wins, it ends the game, displays the winner, and resets
        // the global variables. It also checks to see if one player has won 3 
        // games yet. If not, it calls functions that switches players 1
        // and 2 for the start of the next game.

        ///////////////////////////////////////////////////////////////////////
        // Function checkWinner() runs right after getMove() to determine if 
        // a player has one the game (occupied three consecutive squares). If
        // a winner has been found, it will set the .winner property to the
        // string x or o, call a countWins() function, and 
        /////////////////////////////////////////////////////////////////////// 
        
        function checkWinner(){
        	var one = self.grid.squares[0].move;
        	var two = self.grid.squares[1].move;
        	var three = self.grid.squares[2].move;
        	var four = self.grid.squares[3].move;
        	var five = self.grid.squares[4].move;
        	var six = self.grid.squares[5].move;
        	var seven = self.grid.squares[6].move;
        	var eight = self.grid.squares[7].move;
        	var nine = self.grid.squares[8].move;

            if(one !== "" && one === four && one === seven){
                self.grid.winner = one;
                countWins();
                self.grid.squares[0].won = true;
                self.grid.squares[3].won = true;
                self.grid.squares[6].won = true;
                console.log(one + " first column");
        	}

        	else if(two !== "" && two === five && two === eight){
                console.log(two, two !== null  );
                self.grid.winner = two;
                self.countWins();
                self.grid.squares[1].won = true;
                self.grid.squares[4].won = true;
                self.grid.squares[7].won = true;
                console.log(two + " second column");
        	}

        	else if(three !== "" && three === six && three === nine){
                self.grid.winner = three;
                self.countWins();
                self.grid.squares[2].won = true;
                self.grid.squares[5].won = true;
                self.grid.squares[8].won = true;

                console.log(three + " first column");
        	}

        	else if(one !== "" && one === two && one === three){
                self.grid.winner = one;
                self.countWins();
                self.grid.squares[0].won = true;
                self.grid.squares[1].won = true;
                self.grid.squares[2].won = true;
                console.log(one + " first row");
        	}

        	else if(four !== "" && four === five && four === six){
                self.grid.winner = four;
                self.countWins();
                self.grid.squares[3].won = true;
                self.grid.squares[4].won = true;
                self.grid.squares[5].won = true;
                console.log(four + " second row");
        	}

        	else if(seven !== "" && seven === eight && seven === nine){
                self.grid.winner = seven;
                self.countWins();
                self.grid.squares[6].won = true;
                self.grid.squares[7].won = true;
                self.grid.squares[8].won = true;
                console.log(seven + " third row");
            }

        	else if(one !== "" && one === five && one === nine){
                self.grid.winner = one;
                self.countWins();
                self.grid.squares[0].won = true;
                self.grid.squares[4].won = true;
                self.grid.squares[8].won = true;
                console.log(one + " first diagonal");
            }

        	else if(three !== "" && three === five && three === seven){
                self.grid.winner = three;
                self.countWins();
                self.grid.squares[2].won = true;
                self.grid.squares[4].won = true;
                self.grid.squares[6].won = true;
                console.log(three + " second diagonal");
        	}

        	else if(self.grid.clicks === 9 && self.grid.winner === false){
                self.grid.winner = "tie";
                self.countWins();
        	}

            else{
                self.grid.winner = false;
            }
            
            self.grid.$save();
            return self.grid.winner;
        };

        // This function is going to count the number of wins, change the display 
        // class property based on who won in what row/column, and clear the board.
        // If a player has reached 3 wins, it will reset the win counter.
        function countWins(){

            if(self.grid.winner === "x"){
                self.grid.xCounter++;
                console.log("x wins!");
            }
            else if(self.grid.winner === "o"){
                self.grid.oCounter++;
                console.log("o wins!");
            }
            else if(self.grid.winner === "tie"){
                console.log("Tie Game!");
            }
            if(self.grid.xCounter === 3 || self.grid.oCounter === 3){
                console.log("Game Over!");
            }
        };
    }; //End of MainController function


