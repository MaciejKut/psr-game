var scissors = document.getElementById('scissors');
var paper = document.getElementById('paper');
var rock = document.getElementById('rock');
var results = document.getElementById('output')
var roundcounter = 0;
var human = "human";
var bot = "bot";
var draw = "draw";
var manDraw;
var botDraw;

function computerDraw() {
    var example = Math.ceil((Math.random() * 3));
    return example;
}

function convertNumber(x) {
    if (x == 1) {
        return 'paper';
    } else if (x == 2) {
        return 'scissors';
    } else {
        return 'rock';
    }
};

function whoWins(x, y) {
    if ((x == 1 && y == 3) || (x == 2 && y == 1) || (x == 3 && y == 2)) {
        return human;
    } else if ((x == 1 && y == 1) || (x == 2 && y == 2) || (x == 3 && y == 3)) {
        return draw;
    } else {
        return bot;
    }
}

var callbackOutput = function (x) {
    if (x == "human") {
        this.insertAdjacentHTML('beforeend', '<tr><th scope="row">' + roundcounter + '</th><td>' + manDraw + '</td><td>' + botDraw + '</td><td>User Wins</td></tr >');
    } else if (x == "draw") {
        this.insertAdjacentHTML('beforeend', '<tr><th scope="row">' + roundcounter + '</th><td>' + manDraw + '</td><td>' + botDraw + '</td><td>It was draw!</td></tr >');

    } else {
        this.insertAdjacentHTML('beforeend', '<tr><th scope="row">' + roundcounter + '</th><td>' + manDraw + '</td><td>' + botDraw + '</td><td>Computer Wins</td></tr >');

    }
}




console.log(computerDraw());
console.log(computerDraw());
console.log(computerDraw());
console.log(computerDraw());
console.log(computerDraw());