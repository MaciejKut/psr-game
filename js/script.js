window.onload = function () {

    var results = document.getElementById('output')
    var wyniki = document.getElementById('wyniki');
    var newGame = document.getElementById('newGame');
    var mainDiv1 = document.getElementById('mainDiv1');
    var mainDiv2 = document.getElementById('mainDiv2');
    var welcome = document.getElementById('welcome');
    var playerResult = document.getElementById('userResult')
    var computerResult = document.getElementById('compResult');
    var drawResult = document.getElementById('drawResult');
    var params = {
        'roundcounter': 0,
        'manWins': 0,
        'botWins': 0,
        'remisy': 0,
        'user': '',
        'manDraw': 0,
        'botDraw': 0
    };


    newGame.addEventListener('click', function () {
        params.user = window.prompt('Podaj imię', 'Stranger');
        params.roundcounter = 0;
        params.manWins = 0;
        params.botWins = 0;
        params.remisy = 0;
        results.innerHTML = ' ';
        welcome.innerHTML = '<h1>Cześć ' + params.user + '!</h1>';
        wyniki.classList.remove('nonVisible');
        wyniki.classList.add('visible');
        mainDiv1.classList.add('visible');
        mainDiv1.classList.remove('nonVisible');
        mainDiv2.classList.add('nonVisible');
        updateResults();
    });


    function computerDraw() {
        var example = Math.floor((Math.random() * 3) + 1);
        if (example == 1) {
            example = 'paper';
        } else if (example == 2) {
            example = 'scissors';
        } else {
            example = 'rock';
        }
        return example;
    }

    function translate(x) {
        if (x == 'paper') {
            return 'Papier';
        } else if (x == 'scissors') {
            return 'Nożyczki';
        } else {
            return 'Kamień';
        }
    };

    function whoWins(x, y) {
        if ((x == 'paper' && y == 'rock') || (x == 'scissors' && y == 'paper') || (x == 'rock' && y == 'scissors')) {
            params.manWins++
            return 'human';
        } else if (x === y) {
            params.remisy++;
            return 'draw';

        } else {
            params.botWins++
            return 'bot';
        }

    }

    function updateResults() {
        playerResult.innerHTML = params.manWins;
        computerResult.innerHTML = params.botWins;
        drawResult.innerHTML = params.remisy;
    }

    var callbackOutput = function (x) {
        console.log('params.botDraw ' + params.botDraw);
        console.log('params.manDraw ' + params.manDraw);

        if (x == "human") {

            results.innerHTML = '<tr><th scope="row">' + params.roundcounter + '</th><td>' + translate(params.manDraw) + '</td><td>' + translate(params.botDraw) + '</td><td>Wygrywa  ' + params.user + '</td></tr >';
        } else if (x == "draw") {
            results.innerHTML = '<tr><th scope="row">' + params.roundcounter + '</th><td>' + translate(params.manDraw) + '</td><td>' + translate(params.botDraw) + '</td><td>Remis!</td></tr >';

        } else {
            results.innerHTML = '<tr><th scope="row">' + params.roundcounter + '</th><td>' + translate(params.manDraw) + '</td><td>' + translate(params.botDraw) + '</td><td>Wygrywa Komputer</td></tr >';

        }

    }


    function totalResult() {
        if (params.botWins < params.manWins) {

            return 'Zwyciężył: ' + params.user + ' Stosunkeim ' + params.manWins + ' : ' + params.botWins + " Ilość remisów: " + params.remisy;

        } else if (params.botWins > params.manWins) {
            return ' Komputer wygrał Stosunkem: ' + params.botWins + ' : ' + params.manWins + " Ilość remisów: " + params.remisy;
        } else {
            return 'Nieźle był remis  Komputer: ' + params.botWins + ' wygranych, ' + params.user + ' ' + params.manWins + " wygranych  Ilość remisów: " + params.remisy;
        }
    }

    function totalRounds(x, b) {
        if (x < 5) {
            return;
        } else if (x == 5) {
            setTimeout(function () {
                alert(totalResult());
            }, 500);
            results.innerHTML = '';
        }
        mainDiv1.classList.add('nonVisible');
        mainDiv1.classList.remove('Visible');
        mainDiv2.classList.add('Visible');
        mainDiv2.classList.remove('nonVisible');
    }

    function play(x) {
        // console.log('z funkcji play ' + x);
        params.botDraw = computerDraw();
        var foo = whoWins(x, params.botDraw);
        updateResults();
        params.roundcounter++;
        // console.log(params.roundcounter);
        callbackOutput(foo, x);
        totalRounds(params.roundcounter, foo);
    }

    var playerButtons = document.querySelectorAll('.player-move');

    for (var i = 0; i < playerButtons.length; i++) {
        playerButtons[i].addEventListener('click', function () {
            params.manDraw = event.target.getAttribute('data-move');
            play(params.manDraw);
            return;
        });
    }

}