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
    var modal1Show = document.querySelector('#modal-one');
    var modal1 = document.querySelector('#modal-one #outputInModal');
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
        // console.log('pierwszy console log' + params.user);
        //params.user = document.querySelector("#fname").value;

        console.log('Po pobraniu parms.user' + params.user);
        params.roundcounter = 0;
        params.manWins = 0;
        params.botWins = 0;
        params.remisy = 0;
        modal1.innerHTML = "";
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

    var callbackOutputInModal = function (x) {
        console.log('params.botDraw ' + params.botDraw);
        console.log('params.manDraw ' + params.manDraw);

        if (x == "human") {
            modal1.insertAdjacentHTML('beforeend', '<tr><th scope="row">' + params.roundcounter + '</th><td>' + translate(params.manDraw) + '</td><td>' + translate(params.botDraw) + '</td><td>Wygrywa  ' + params.user + '</td></tr >');

        } else if (x == "draw") {
            modal1.insertAdjacentHTML('beforeend', '<tr><th scope="row">' + params.roundcounter + '</th><td>' + translate(params.manDraw) + '</td><td>' + translate(params.botDraw) + '</td><td>Remis!</td></tr >');

        } else {
            modal1.insertAdjacentHTML('beforeend', '<tr><th scope="row">' + params.roundcounter + '</th><td>' + translate(params.manDraw) + '</td><td>' + translate(params.botDraw) + '</td><td>Wygrywa Komputer</td></tr >');

        }

    }


    function totalResult() {
        if (params.botWins < params.manWins) {

            return '<h2>Zwyciężył: ' + params.user + ' Stosunkeim ' + params.manWins + ' : ' + params.botWins + " Ilość remisów: " + params.remisy + '</h2>';

        } else if (params.botWins > params.manWins) {
            return '<h2> Komputer wygrał Stosunkem: ' + params.botWins + ' : ' + params.manWins + " Ilość remisów: " + params.remisy + '</h2>';
        } else {
            return '<h2>Nieźle był remis  Komputer: ' + params.botWins + ' wygranych, ' + params.user + ' ' + params.manWins + " wygranych  Ilość remisów: " + params.remisy + '</h2>';
        }
    }

    function totalRounds(x, b) {
        if (x < 5) {
            return;
        } else if (x == 5) {
            // setTimeout(function () {
            var modal1Header = document.querySelector('#modal-one header');
            console.log(modal1Header);
            modal1Header.innerHTML = totalResult();
            modal1Show.classList.add('show');
            document.querySelector('.overlay').classList.add('show');
            //alert(totalResult());
            //  }, 500);
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
        callbackOutputInModal(foo);
    }

    var playerButtons = document.querySelectorAll('.player-move');

    for (var i = 0; i < playerButtons.length; i++) {
        playerButtons[i].addEventListener('click', function () {
            params.manDraw = event.target.getAttribute('data-move');
            play(params.manDraw);
            return;
        });
    }

    var showModal = function (event) {
        event.preventDefault();
        var foo = event.target.getAttribute('href');
        console.log('to jest foo:' + foo);
        document.querySelector(foo).classList.add('show');
        document.querySelector('.overlay').classList.add('show');
    };

    var modalLinks = document.querySelectorAll('.show-modal');

    for (var i = 0; i < modalLinks.length; i++) {
        modalLinks[i].addEventListener('click', hideModal);
        modalLinks[i].addEventListener('click', showModal);
    }



    var hideModal = function (event) {
        event.preventDefault();
        document.querySelector('#modal-overlay').classList.remove('show');
        for (var i = 0; i < modals.length; i++) {
            modals[i].classList.remove('show');
        };



    };

    var closeButtons = document.querySelectorAll('.modal .close');

    for (var i = 0; i < closeButtons.length; i++) {
        closeButtons[i].addEventListener('click', hideModal);
    }

    document.querySelector('#modal-overlay').addEventListener('click', hideModal);

    var modals = document.querySelectorAll('.modal');

    for (var i = 0; i < modals.length; i++) {
        modals[i].addEventListener('click', function (event) {
            event.stopPropagation();
        });
    }

}