var Frogger = (function() {

    var canvas = document.getElementById("canvas"),

        drawingSurface = canvas.getContext("2d"),

        backgroundCanvas = document.getElementById("background-canvas"),

        backgroundDrawingSurface = backgroundCanvas.getContext("2d"),

        drawingSurfaceWidth = canvas.width,
        drawingSurfaceHeight = canvas.height;

    return {

        canvas: canvas,
        drawingSurface: drawingSurface,
        drawingSurfaceWidth: drawingSurfaceWidth,
        drawingSurfaceHeight: drawingSurfaceHeight,

        backgroundDrawingSurface: backgroundDrawingSurface,

        direction: {
            UP: "up",
            DOWN: "down",
            LEFT: "left",
            RIGHT: "right"
        },

        observer: (function() {
            var events = {};

            return {
                subscribe: function(eventName, callback) {

                    if (!events.hasOwnProperty(eventName)) {
                        events[eventName] = [];
                    }

                    events[eventName].push(callback);
                },

                publish: function(eventName) {
                    var data = Array.prototype.slice.call(arguments, 1),
                        index = 0,
                        length = 0;

                    if (events.hasOwnProperty(eventName)) {
                        length = events[eventName].length;

                        for (; index < length; index++) {
                            events[eventName][index].apply(this, data);
                        }
                    }
                }
            };
        }()),

        
        intersects: function(position1, position2) {
            var doesIntersect = false;

            if ((position1.left > position2.left && position1.left < position2.right) ||
                (position1.right > position2.left && position1.left < position2.right)) {
                doesIntersect = true;
            }

            return doesIntersect;
        }
    };
}());