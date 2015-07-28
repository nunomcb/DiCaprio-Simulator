/**
 * I seriously suck at this
 */

var game = new Game();

$("#overlay").click(function () {
    $(this).hide();
    game.start();
})

function Game() {
    this.oscarPos = 270;
    this.minDist = 50;

    this.getSpeed = function() {
        return Math.random()  * (4500 - 2500) + 2500;
    };

    this.makeItRight = function(callback) {
        var currPos = parseInt($('#oscar').css('left'), 10);
        var dist = this.oscarPos - currPos;
        var absDist = Math.abs(dist);

        if (Math.abs(dist) < this.minDist) {
            $('#oscar').animate({left: currPos + (absDist - this.minDist) * (dist / absDist)}, 1500, callback);
        }
        else {
            callback();
        }
    };

    this.end = function() {
        var _this = this;

        $('#game').unbind("click");
        $('#oscar').stop();

        setTimeout(function () {
            _this.makeItRight(function() {
                var score = _this.calculateScore();
                var msg;

                if (score === 50) {
                    msg = "So close!";
                }
                else {
                    msg = "Well... you could do better.";
                }

                $("#overlay").html(
                    "<p>" +
                    msg +
                    "<br>You scored:<br><br>" +
                    score +
                    "<br><br>Better luck next time!<br>Click to start again.</p>"
                );

                $("#overlay").show();
            });
        }, 1000);
    }

    this.start = function() {
        var _this = this;

        $('#game').click(function () {
            _this.end();
        });

        $('#oscar').css('left', '-200px');
        $('#oscar').animate({left: '900'}, this.getSpeed(), function () {
            $('#game').unbind("click");
            _this.start();
        });
    };

    this.calculateScore = function() {
        return Math.abs(this.oscarPos - parseInt($('#oscar').css('left'), 10));
    };
}