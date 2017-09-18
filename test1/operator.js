/**
 * Created by wangguigen on 2017/8/20.
 */
function Model(value) {
    this._value = typeof value === 'undefined' ? '' : value;
    this._listeners = [];
}
Model.prototype.set = function (value) {
    var self = this;
    self._value = value;
    // model中的值改变时，应通知注册过的回调函数 // 按照Javascript事件处理的一般机制，我们异步地调用回调函数 // 如果觉得setTimeout影响性能，也可以采用requestAnimationFrame
    setTimeout(function () {
        self._listeners.forEach(function (listener) {
            listener.call(self, value);
        });
    });
};
Model.prototype.watch = function (listener) { // 注册监听的回调函数
    this._listeners.push(listener);
};