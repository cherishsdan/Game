window.requestAnimationFrame = (function(){
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback){
        window.setTimeout(callback, 1000 / 60);
    };
})();


(function(Frogger) {
    var _score = 0,

        _highScore = 1000,

        _lives = 5,

        _timeTotal = 60000,

        _timeRemaining = _timeTotal,

        _refreshRate = 33.333,

        _timesAtGoal = 0,

        _maxTimesAtGoal = 5,

        _isPlayerFrozen = false,

        _lastTimeGameLoopRan = (new Date()).getTime();

    function countDown() {
        if (_timeRemaining > 0) {

            _timeRemaining -= _refreshRate;

            Frogger.observer.publish("time-remaining-change", _timeRemaining / _timeTotal);
        } else {

            loseLife();
        }
    }

    function gameOver() {

        freezePlayer();

        Frogger.observer.publish("game-over");
    }

    function gameWon() {

        Frogger.observer.publish("game-won");
    }

    function loseLife() {

        _lives--;

        freezePlayer();

        Frogger.observer.publish("player-lost-life");

        if (_lives === 0) {

            gameOver();
        } else {

            setTimeout(reset, 2000);
        }
    }

    function freezePlayer() {

        _isPlayerFrozen = true;

        Frogger.observer.publish("player-freeze");
    }

    function unfreezePlayer() {

        _isPlayerFrozen = false;

        Frogger.observer.publish("player-unfreeze");
    }

    function increaseScore(increaseBy) {


        _score += increaseBy || 0;

        Frogger.observer.publish("score-change", _score);

        if (_score > _highScore) {
            _highScore = _score;
            Frogger.observer.publish("high-score-change", _highScore);
        }
    }

    function playerAtGoal() {

        increaseScore(1000);

        _timesAtGoal++;

        freezePlayer();

        if (_timesAtGoal < _maxTimesAtGoal) {

            setTimeout(reset, 2000);
        } else {

            gameWon();
        }
    }

    function playerMoved() {
        increaseScore(20);
    }

    function reset() {

        _timeRemaining = _timeTotal;

        unfreezePlayer();

        Frogger.observer.publish("reset");
    }

    function gameLoop() {

        var currentTime = (new Date()).getTime(),
            timeDifference = currentTime - _lastTimeGameLoopRan;

        window.requestAnimationFrame(gameLoop);

        if (timeDifference >= _refreshRate) {

            Frogger.drawingSurface.clearRect(0, 0, Frogger.drawingSurfaceWidth, Frogger.drawingSurfaceHeight);

            if (!_isPlayerFrozen) {

                countDown();

                Frogger.observer.publish("check-collisions");
            }

            Frogger.observer.publish("render-base-layer");

            Frogger.observer.publish("render-character");

            _lastTimeGameLoopRan = currentTime;
        }
    }
    function start() {

        Frogger.observer.publish("high-score-change", _highScore);

        gameLoop();
    }


    Frogger.observer.subscribe("game-load", start);

    Frogger.observer.subscribe("player-at-goal", playerAtGoal);

    Frogger.observer.subscribe("player-moved", playerMoved);

    Frogger.observer.subscribe("collision", loseLife);


}(Frogger));