window.onload = function () {
    var scissors = document.getElementById('scissors');
    var paper = document.getElementById('paper');
    var rock = document.getElementById('rock');
    var results = document.getElementById('output')
    var wyniki = document.getElementById('wyniki');
    var newGame = document.getElementById('newGame');
    var mainDiv1 = document.getElementById('mainDiv1');
    var mainDiv2 = document.getElementById('mainDiv2');
    var welcome = document.getElementById('welcome');
    var playerResult = document.getElementById('userResult')
    var computerResult = document.getElementById('compResult');
    var drawResult = document.getElementById('drawResult');
    var roundcounter = 0;
    var human = "human";
    var bot = "bot";
    var draw = "draw";
    var manDraw;
    var botDraw;
    var manWins = 0;
    var botWins = 0;
    var remisy = 0;
    var user;

    newGame.addEventListener('click', function () {
        user = window.prompt('Podaj imię', 'Stranger');
        console.log(user);
        roundcounter = 0;
        manWins = 0;
        botWins = 0;
        remisy = 0;
        results.innerHTML = ' ';
        welcome.innerHTML = '<h1>Cześć ' + user + '!</h1>';
        wyniki.classList.remove('nonVisible');
        wyniki.classList.add('visible');
        mainDiv1.classList.add('visible');
        mainDiv1.classList.remove('nonVisible');
        mainDiv2.classList.add('nonVisible');
        console.log(mainDiv2.classList);
        console.log(mainDiv1.classList);
        updateResults();


    });


    function computerDraw() {
        var example = Math.ceil((Math.random() * 3));
        return example;
    }

    function convertNumber(x) {
        if (x == 1) {
            return 'Papier';
        } else if (x == 2) {
            return 'Nożyczki';
        } else {
            return 'Kamień';
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

    function updateResults() {
        playerResult.innerHTML = manWins;
        computerResult.innerHTML = botWins;
        drawResult.innerHTML = remisy;
    }

    var callbackOutput = function (x) {

        if (x == "human") {

            results.innerHTML = '<tr><th scope="row">' + roundcounter + '</th><td>' + convertNumber(manDraw) + '</td><td>' + convertNumber(botDraw) + '</td><td>Wygrywa  ' + user + '</td></tr >';
        } else if (x == "draw") {
            results.innerHTML = '<tr><th scope="row">' + roundcounter + '</th><td>' + convertNumber(manDraw) + '</td><td>' + convertNumber(botDraw) + '</td><td>Remis!</td></tr >';

        } else {
            results.innerHTML = '<tr><th scope="row">' + roundcounter + '</th><td>' + convertNumber(manDraw) + '</td><td>' + convertNumber(botDraw) + '</td><td>Wygrywa Komputer</td></tr >';

        }

    }


    function totalResult() {
        if (botWins < manWins) {

            return 'Zwyciężył: ' + user + ' Stosunkeim ' + manWins + ' : ' + botWins + " Ilość remisów: " + remisy;

        } else if (botWins > manWins) {
            return ' Komputer wygrał Stosunkem: ' + botWins + ' : ' + manWins + " Ilość remisów: " + remisy;
        } else {
            return 'Nieźle był remis <br/> Komputer: ' + botWins + ' wygranych,<br/>' + user + ' ' + manWins + " wygranych <br/> Ilość remisów: " + remisy;
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
            mainDiv1.classList.add('nonVisible');
            mainDiv1.classList.remove('Visible');
            mainDiv2.classList.add('Visible');
            mainDiv2.classList.remove('nonVisible');
            results.innerHTML = '';
            // wyniki.classList.remove('visible');
            // wyniki.classList.add('nonVisible');
        } else {

            mainDiv1.classList.add('nonVisible');
            mainDiv1.classList.remove('Visible');
            mainDiv2.classList.add('Visible');
            mainDiv2.classList.remove('nonVisible');

        }
    }

    scissors.addEventListener('click', function () {

        manDraw = 2;
        botDraw = computerDraw();
        var foo = whoWins(manDraw, botDraw);
        updateResults();
        roundcounter++;
        callbackOutput(foo);
        totalRounds(roundcounter, foo);
    });

    rock.addEventListener('click', function () {

        manDraw = 3;
        botDraw = computerDraw();
        var foo = whoWins(manDraw, botDraw);
        updateResults();
        roundcounter++;
        callbackOutput(foo);
        totalRounds(roundcounter, foo);
    });
    paper.addEventListener('click', function () {

        manDraw = 1;
        botDraw = computerDraw();
        var foo = whoWins(manDraw, botDraw);
        updateResults();
        roundcounter++;
        callbackOutput(foo);
        totalRounds(roundcounter, foo);
    });



}