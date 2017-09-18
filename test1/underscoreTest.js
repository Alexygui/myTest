/**
 * Created by wangguigen on 2017/8/21.
 */

var datas;
$(function () {
    var list = [
        {firstName: '<a href="#">Zhang</a>', lastName: 'San', city: 'Shanghai'},
        {firstName: 'Li', lastName: 'Si', city: '<a href="#">Beijing</a>'},
        {firstName: 'Wang', lastName: 'Wu', city: 'Guangzhou'},
        {firstName: 'Zhao', lastName: 'Liu', city: 'Shenzhen'}
    ];
    var tplFunc = _.template($('#tpl').html());
    var html = '';
    for (var i = 0; i < list.length; i++) {
        var model = list[i];
        html += tplFunc(model);
    }
    $('#table1').html(html);
    // $('#table1').html(_.template($('#tplList').html(), list));


     datas = [
        {
            name: 'mike',
            age: 18,
            sex: '男'
        },
        {
            name: 'nina',
            age: 20,
            sex: '女'
        },
        {
            name: 'elle',
            age: 26,
            sex: '女'
        }
    ];
    $('body').html(_.template($('#tpl2').html(), datas));
});

function f(obj) {
    var __t, __p = '', __j = Array.prototype.join, print = function () {
        __p += __j.call(arguments, '');
    };
    with (obj || {}) {
        __p += '\n    <tr>\n        <td>' + ((__t = (firstName)) == null ? '' : __t) + '</td>\n        <td>' + ((__t = (lastName)) == null ? '' : _.escape(__t)) + '</td>\n        <td>' + ((__t = (city)) == null ? '' : __t) + '</td>\n    </tr>\n';
    }
    return __p;
}

function a(obj){
    var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
    with(obj||{}){
        __p+='\n    ';
        _.each(list, function(n){
            __p+='\n    <p>姓名：'+
                ((__t=( n.name ))==null?'':__t)+
                ',年龄：'+
                ((__t=( n.age ))==null?'':__t)+
                ',性别：'+
                ((__t=( n.sex ))==null?'':__t)+
                '</p>\n    ';
        });
        __p+='\n';
    }
    return __p;
}