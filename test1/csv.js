/**
 * Created by wangguigen on 2017/9/9.
 */

_.chain([1,2,3,200])
    .filter(function(num) { return num % 2 == 0; })
    .tap(alert)
    .map(function(num) { return num * num })
    //.value()
    .tap(alert);