/**
 * I seriously suck at this
 */

var game = new Game(50, 4500, 2500);

$("#overlay").click(function () {
    $(this).hide();
    game.start();
})

function Game(minDist, maxSpeed, minSpeed) {
    var oscarPos = 270;
    var minDist = minDist;
    var maxSpeed = maxSpeed;
    var minSpeed = minSpeed;

    var getSpeed = function() {
        return Math.random()  * (maxSpeed - minSpeed) + minSpeed;
    };

    var makeItRight = function(callback) {
        var currPos = parseInt($('#oscar').css('left'), 10);
        var dist = oscarPos - currPos;
        var absDist = Math.abs(dist);

        if (absDist < minDist) {
			var mv;

			if (dist !== 0) {
				mv = (absDist - minDist) * (dist / absDist);
			}
			else {
				mv = minDist;
			}

            $('#oscar').animate({left: currPos + mv}, 1500, callback);

        }
        else {
            callback();
        }
    };

    var calculateScore = function() {
        return Math.abs(oscarPos - parseInt($('#oscar').css('left'), 10));
    };

    var end = function() {
        var _this = this;

        $('#game').unbind("click");
        $('#oscar').stop();

        setTimeout(function () {
            makeItRight(function() {
                var score = calculateScore();
                var msg;

                if (score === minDist) {
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
            end();
        });

        $('#oscar').css('left', '-200px');
        $('#oscar').animate({left: '900'}, getSpeed(), function () {
            $('#game').unbind("click");
            _this.start();
        });
    };


}
