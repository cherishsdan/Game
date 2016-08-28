(function(Frogger) {

    var _font = "67px Arcade Classic",

        _score = 0,
        _highScore = 0,
        _gameWon = false,
        _gameOver = false,

        _gameBoard = {};

    function renderScore() {

        Frogger.drawingSurface.font = _font;
        Frogger.drawingSurface.textAlign = "end";


        Frogger.drawingSurface.fillStyle = "#FFF";
        Frogger.drawingSurface.fillText("1-UP", _gameBoard.columns[3], _gameBoard.grid.height / 2);

    
        Frogger.drawingSurface.fillStyle = "#F00";
        Frogger.drawingSurface.fillText(_score, _gameBoard.columns[3], _gameBoard.grid.height);

        
        Frogger.drawingSurface.fillStyle = "#FFF";
        Frogger.drawingSurface.fillText("HI-SCORE", _gameBoard.columns[8], _gameBoard.grid.height / 2);

      
        Frogger.drawingSurface.fillStyle = "#F00";
        Frogger.drawingSurface.fillText(_highScore, _gameBoard.columns[8], _gameBoard.grid.height);
    }


    function renderGameOver() {

   
        Frogger.drawingSurface.font = _font;
        Frogger.drawingSurface.textAlign = "center";
        Frogger.drawingSurface.fillStyle = "#FFF";

        Frogger.drawingSurface.fillText("GAME OVER", Frogger.drawingSurfaceWidth / 2, _gameBoard.rows[9]);
    }

    
    function renderGameWon() {

       
        Frogger.drawingSurface.font = _font;
        Frogger.drawingSurface.textAlign = "center";
        Frogger.drawingSurface.fillStyle = "#FF0";

       
        Frogger.drawingSurface.fillText("YOU WIN!", Frogger.drawingSurfaceWidth / 2, _gameBoard.rows[9]);
    }

   
    function renderTimeLabel() {

      
        Frogger.drawingSurface.font = _font;
        Frogger.drawingSurface.textAlign = "end";
        Frogger.drawingSurface.fillStyle = "#FF0";

        
        Frogger.drawingSurface.fillText("TIME", Frogger.drawingSurfaceWidth, Frogger.drawingSurfaceHeight);
    }

   
    function render() {
        renderScore();
        renderTimeLabel();

        
        if (_gameOver) {
            renderGameOver();
        }

       
            renderGameWon();
        }
    }

    Frogger.observer.subscribe("game-won", function() {
        _gameWon = true;
    });

    Frogger.observer.subscribe("game-over", function() {
        _gameOver = true;
    });

    Frogger.observer.subscribe("reset", function() {
        _gameOver = false;
        _gameWon = false;
    });

    Frogger.observer.subscribe("score-change", function(newScore) {
        _score = newScore;
    });

    Frogger.observer.subscribe("high-score-change", function(newHighScore) {
        _highScore = newHighScore;
    });

    Frogger.observer.subscribe("game-board-initialize", function(gameBoard) {
        _gameBoard = gameBoard;

        Frogger.observer.subscribe("render-base-layer", render);
    });
}(Frogger));