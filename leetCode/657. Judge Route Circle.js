/**
 * Created by Administrator on 2017-10-11.
 */
/**
 * @param {string} moves
 * @return {boolean}
 */
var judgeCircle = function (moves) {
    var x = 0, y = 0;
    for (var i = 0; i < moves.length; i++) {
        if ('L' === moves[i].toUpperCase()) {
            x--;
        } else if ('R' === moves[i].toUpperCase()) {
            x++;
        } else if ('U' === moves[i].toUpperCase()) {
            y++;
        } else if ('D' === moves[i].toUpperCase()) {
            y--;
        }
    }
    return x === 0 && y === 0;
};