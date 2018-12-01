window.onload = function () {
    var scissors = document.getElementById('scissors');
    var paper = document.getElementById('paper');
    var rock = document.getElementById('rock');
    var results = document.getElementById('output')
    var wyniki = document.getElementById('wyniki');
    var roundcounter = 0;
    var human = "human";
    var bot = "bot";
    var draw = "draw";
    var manDraw;
    var botDraw;
    var manWins = 0;
    var botWins = 0;
    var remisy = 0;

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
            manWins++
            return human;
        } else if ((x == 1 && y == 1) || (x == 2 && y == 2) || (x == 3 && y == 3)) {
            remisy++;
            return draw;

        } else {
            botWins++
            return bot;
        }
    }

    var callbackOutput = function (x) {
        if (x == "human") {
            results.insertAdjacentHTML('beforeend', '<tr><th scope="row">' + roundcounter + '</th><td>' + convertNumber(manDraw) + '</td><td>' + convertNumber(botDraw) + '</td><td>User Wins</td></tr >');
        } else if (x == "draw") {
            results.insertAdjacentHTML('beforeend', '<tr><th scope="row">' + roundcounter + '</th><td>' + convertNumber(manDraw) + '</td><td>' + convertNumber(botDraw) + '</td><td>It was draw!</td></tr >');

        } else {
            results.insertAdjacentHTML('beforeend', '<tr><th scope="row">' + roundcounter + '</th><td>' + convertNumber(manDraw) + '</td><td>' + convertNumber(botDraw) + '</td><td>Computer Wins</td></tr >');

        }
    }


    function totalResult() {
        if (botWins < manWins) {
            return 'Człowiek wygrał: ' + manWins + 'rund, Komputer: ' + botWins + 'rundy' + "Remisy: " + remisy;
        } else if (botWins > manWins) {
            return ' Komputer wygrał, Komputer: ' + botWins + ', Człowiek: ' + manWins + "Remisy: " + remisy;
        } else {
            return 'Nieźle był remis Komputer: ' + botWins + ', Człowiek: ' + manWins + "Remisy: " + remisy;
        }
    }

    function totalRounds(x, b) {
        if (x < 5) {
            console.log('wewnątrz total Rounds' + x);

        } else if (x == 5) {
            console.log('wewnątrz total Rounds' + x);
            setTimeout(function () {
                alert(totalResult());
            }, 500);

        } else {
            roundcounter = 0;
            manWins = 0;
            botWins = 0;
            remisy = 0;
            results.innerHTML = ' ';
        }
    }

    scissors.addEventListener('click', function () {

        manDraw = 2;
        botDraw = computerDraw();
        var foo = whoWins(manDraw, botDraw);
        roundcounter++;
        callbackOutput(foo);
        totalRounds(roundcounter, foo);
    });

    rock.addEventListener('click', function () {

        manDraw = 3;
        botDraw = computerDraw();
        var foo = whoWins(manDraw, botDraw);
        roundcounter++;
        callbackOutput(foo);
        totalRounds(roundcounter, foo);
    });
    paper.addEventListener('click', function () {

        manDraw = 1;
        botDraw = computerDraw();
        var foo = whoWins(manDraw, botDraw);
        roundcounter++;
        callbackOutput(foo);
        totalRounds(roundcounter, foo);
    });



}