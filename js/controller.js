angular
    .module('ticTacToe')
    .controller('MainController', MainController);

    MainController$inject = ['firebaseObject'];

    ///////////////////////////////////////////////////////////////////////
    // This is the start of the MainController function and also includes
    // all properties and methods used
    /////////////////////////////////////////////////////////////////////// 

    function MainController($firebaseObject){
        var self = this;

        self.grid = getGrid();
        self.resetAll = resetAll;
        self.checkMove = checkMove;
        self.getMove = getMove;
        self.checkWinner = checkWinner;
        self.countWins = countWins;

        self.winner = false;
        self.xCounter = 0;
        self.oCounter = 0;


        ///////////////////////////////////////////////////////////////////////
        // These functions perform the initial setup of the TicTacToe board
        // and push it to Firebase
        /////////////////////////////////////////////////////////////////////// 
        
        function getGrid(){
            var ref = new Firebase('https://ttt-alok.firebaseIO.com/home');
            var board = $firebaseObject(ref);



            board.$loaded(function(){
                board.squares = [];
                board.clicks = 0;


                for(var i=0; i<9; i++){
                    board.squares.push({clicked: false, move: "", won: false});
                }
                
                board.$save();
            });

            return board;
        };


        // Strategy: Create two unique classes "x" and "o". Use the ng-class
        // directive to determine which class to display based on whichever
        // player's turn it is. Use ng-click to register a click. The ng-click
        // directive will pass the index value ($index) to a function 
        // getMove(index) it calls when any square in the ng-repeat is clicked.
        // This getMove function first checks to see if it is the
        // first play on the board. If it is the first, it will display
        // class "x". After that, this function will serve the role of 
        // alternating the plays between X and O, and execute those plays
        // (again, using the ng-class directive). When it makes a play, this
        // function will also change the value of the "grid.move" property to 
        // eithern"x" or "o", depending on the play. Finally, it will call a 
        // separate function checkWinner() that will check the board to look for 
        // where the x's and o'x are currently located. If it sees 3 x's in a row 
        // or 3 o's in a row either by row, column, or diagonally, it will end 
        // the game and display the winner. 


        ///////////////////////////////////////////////////////////////////////
        // Consists of functions that set up the board, reset the board and 
        // associate properties at the end of a game, and check to see if the
        // click is valid (square not already occupied)
        ///////////////////////////////////////////////////////////////////////        

        function resetAll(){
            self.grid.clicks = 0;
            self.winner = false;

            for(var i=0; i<self.grid.squares.length; i++){
                self.grid.squares[i].clicked = false;
                self.grid.squares[i].move = "";
                self.grid.squares[i].won = false;
            }
            self.grid.$save();
            // self.winner.$save();  //this might be a bug
        }

        function checkMove(index){
            
            if(self.winner !== false){
                resetAll();
            }

            else if (self.grid.squares[index].clicked === true){
                alert("This square is full!");
            }

            else{
                self.getMove(index);
            }
        };

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
            //console.log(self.checkWinner);
            self.checkWinner();
        	//self.grid.squares.$save();
            //self.grid.clicks.$save();

            console.log(self.grid.clicks);
            self.grid.$save();
        };


        // This function runs after getMove to look for three moves in sequence.
        // If one player wins, it ends the game, displays the winner, and resets
        // the global variables. It also checks to see if one player has won 3 
        // games yet. If not, it calls functions that switches players 1
        // and 2 for the start of the next game. 
        
        function checkWinner(){
            console.log(self.grid.squares);
        	var one = self.grid.squares[0].move;
        	var two = self.grid.squares[1].move;
        	var three = self.grid.squares[2].move;
        	var four = self.grid.squares[3].move;
        	var five = self.grid.squares[4].move;
        	var six = self.grid.squares[5].move;
        	var seven = self.grid.squares[6].move;
        	var eight = self.grid.squares[7].move;
        	var nine = self.grid.squares[8].move;
            console.log(one, two);

            if(one !== "" && one === four && one === seven){
                self.winner = one;
                self.countWins();
                self.grid.squares[0].won = true;
                self.grid.squares[3].won = true;
                self.grid.squares[6].won = true;
                console.log(one + " first column");
        	}

        	else if(two !== "" && two === five && two === eight){
                console.log(two, two !== null  );
                self.winner = two;
                self.countWins();
                self.grid.squares[1].won = true;
                self.grid.squares[4].won = true;
                self.grid.squares[7].won = true;
                console.log(two + " second column");
        	}

        	else if(three !== "" && three === six && three === nine){
                self.winner = three;
                self.countWins();
                self.grid.squares[2].won = true;
                self.grid.squares[5].won = true;
                self.grid.squares[8].won = true;

                console.log(three + " first column");
        	}

        	else if(one !== "" && one === two && one === three){
                self.winner = one;
                self.countWins();
                self.grid.squares[0].won = true;
                self.grid.squares[1].won = true;
                self.grid.squares[2].won = true;
                console.log(one + " first row");
        	}

        	else if(four !== "" && four === five && four === six){
                self.winner = four;
                self.countWins();
                self.grid.squares[3].won = true;
                self.grid.squares[4].won = true;
                self.grid.squares[5].won = true;
                console.log(four + " second row");
        	}

        	else if(seven !== "" && seven === eight && seven === nine){
                self.winner = seven;
                self.countWins();
                self.grid.squares[6].won = true;
                self.grid.squares[7].won = true;
                self.grid.squares[8].won = true;
                console.log(seven + " third row");
            }

        	else if(one !== "" && one === five && one === nine){
                self.winner = one;
                self.countWins();
                self.grid.squares[0].won = true;
                self.grid.squares[4].won = true;
                self.grid.squares[8].won = true;
                console.log(one + " first diagonal");
            }

        	else if(three !== "" && three === five && three === seven){
                self.winner = three;
                self.countWins();
                self.grid.squares[2].won = true;
                self.grid.squares[4].won = true;
                self.grid.squares[6].won = true;
                console.log(three + " second diagonal");
        	}

        	else if(self.grid.clicks === 9 && self.winner === false){
                self.winner = "tie";
                self.countWins();
        	}

            else{
                self.winner = false;
            }
            
            //console.log(self.grid.squares.$save);
            self.grid.$save();
            return self.winner;
        };

        // This function is going to count the number of wins, change the display 
        // class property based on who won in what row/column, and clear the board.
        // If a player has reached 3 wins, it will reset the win counter.
        function countWins(){

            if(self.winner === "x"){
                self.xCounter++;
                console.log("x wins!");
            }

            else if(self.winner === "o"){
                self.oCounter++;
                console.log("o wins!");
            }

            else if(self.winner === "tie"){
                console.log("Tie Game!");
            }

            if(self.xCounter === 3 || self.oCounter === 3){
                console.log("Game Over!");
            }
        };
    }; //End of MainController function


