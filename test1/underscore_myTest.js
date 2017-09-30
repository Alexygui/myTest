(function () {
    var root = this;


    //通常obj对象不是_的实例，那么判断this是不是_的实例，这个时候this一般指向window
    //所以返回new _(obj)，递归调用，这个时候_函数中的this就指向_了，所以两个判断都不会执行，
    //并且将obj赋值给了_wrapped私有变量
    //短短三句话，非常精妙，考虑了所有的可能的情况
    var _ = function (obj) {
        if (obj instanceof _) return obj;
        if (!(this instanceof _)) return new _(obj);
        this._wrapped = obj;
    };

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = _;
        }
        exports._ = _;
    } else {
        root._ = _;
    }

    _.VERSION = '1.8.3';

    var cb = function (value, context, argCount) {
        if (null == value) {
            return _.identity;
        }
        // if (_.isFunction(value)) {
        //     return optimizeCb(value, context, argCount);
        // }
        // if (_.isObject()) {
        //     return _.matcher(value);
        // }
        return _.property(value);
    };

    //返回一个检测函数，检测当前key是否是该函数的参数对象中的属性
    var property = function (key) {
        return function (obj) {
            return null == obj ? void 0 : obj[key];
        }
    };
    _.property = property;

    var optimizeCb = function (func, context, argCount) {
        if (null === void 0) return func;
    };

    _.iteratee = function (value, context) {
        return cb(value, context, Infinity);
    };

    _.identity = function (value) {
        return value;
    };

    _.isFunction = function (obj) {
        return typeof obj === 'function';
    };

    _.map = _.collect = function (obj, iteratee, context) {
        iteratee = cb(iteratee, context);
        var keys = !isArrayLike(obj) && _.keys(obj);
    };

    var getLength = property('length');
    var isArrayLike = function (collection) {
        var length = getLength(collection);
        return typeof length === 'number' && length >= 0 && length < MAX_ARRAY_INDEX;
    };


    if (typeof define === 'function' && define.amd) {
        define('underscore', [], function () {
            return _;
        });
    }

}).call(this);
