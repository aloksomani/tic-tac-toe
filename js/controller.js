angular
    .module('ticTacToe')
    .controller('MainController', MainController);

    function MainController(){
        var self = this;

        self.test = "Controller working";
    }