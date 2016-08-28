(function(Frogger) {

    var _grid = {
            width: 80,
            height: 80
        },

        _numRows = 16,
        _numColumns = 11,
        _characterBounds = {
            left: 0,
            right: _numColumns * _grid.width,
            top: 2 * _grid.height,
            bottom: (_numRows - 2) * _grid.height
        },

        _rows = (function() {
            var output = [],
                index = 0,
                length = _numRows;

            for (; index < length; index++) {
                output.push(index * _grid.width);
            }

            return output;
        }()),
        _columns = (function() {
            var output = [],
                index = 0,
                length = _numColumns;

            for (; index < length; index++) {
                output.push(index * _grid.height);
            }

            return output;
        }());

    Frogger.observer.subscribe("game-load", function() {

        Frogger.observer.publish("game-board-initialize", {

            numRows: _numRows,
            numColumns: _numColumns,

            rows: _rows,
            columns: _columns,
            grid: {
                width: _grid.width,
                height: _grid.height
            },
            characterBounds: _characterBounds
        });
    });
}(Frogger));