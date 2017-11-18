/**
 * Created by wangguigen on 2017/11/18.
 */
$(function () {
  //测试用
  $('#javaBean').val($('#tpl').html());

  $('#beanBtn').click(function () {
    //截取javaBean中可以用来生成json数据的有效数据
    let javaBean = $('#javaBean').val().match(/public class .*? (public)/)[0];
    console.log(javaBean);

    let modelArr = javaBean.match(/public class \w+/)[0].split(' ');
    let modelName = 'Model' + modelArr[modelArr.length - 1];
    console.log(modelName);

    //用于拼接的model字符串
    let modelJson ='var '+ modelName + 'Json = {' + modelName + ':{<br/>';


    //将有效数据截取为json中的key及其注释在同一条字符串中，获取的值组成数组
    let items = javaBean.match(/\/\*\*.*?\*\/.*?private \w+ \w+;/gi);

    //遍历数组，获取key和注释放到即将拼接的数组中
    let jsonArr = [];
    for (let i = 0; i < items.length; i++) {
      let json = [];
      let item = items[i];
      let comment = item.match(/[\w\u4e00-\u9fa5]+/)[0];
      let tempArr = item.split(' ');
      let temp = tempArr[tempArr.length - 1];
      let key = temp.substring(0, temp.length - 1);
      json[0] = key + ': {  //' + comment+'<br/>';
      json[1] = '},<br/>';
      jsonArr.push(json);
    }
    console.log(jsonArr);

    for (let i = 0; i < jsonArr.length; i++) {
      modelJson += jsonArr[i].join('');
    }
    modelJson = modelJson.substring(0, modelJson.length - 1);
    modelJson += '},<br/>';


    //获取关联子对象的数组
    let children = javaBean.match(/private List<\w+> \w+;/gi);
    let childrenArr = [];
    //遍历数组，获取key和注释放到即将拼接的数组中
    for (let i = 0; i < children.length; i++) {
      let json = [];
      let item = children[i];
      let tempArr = item.split(' ');
      let temp = tempArr[tempArr.length - 1];
      let key = temp.substring(0, temp.length - 1);
      json[0] = 'Model' + key + ': {';
      json[1] = '},';
      childrenArr.push(json);
    }

    for (let j = 0; j < childrenArr.length; j++) {
      modelJson += childrenArr[j].join('');
    }
    modelJson = modelJson.substring(0, modelJson.length - 1);
    modelJson += '};<br/>';
    console.log(modelJson);
    $('#json').html(modelJson);

  }).trigger('click');  //测试用

});

/*

 获取所有的
 /\/\*\*.*?\*\/.*?private.*?;/gi

 /[\w\u4e00-\u9fa5]+/i

 .match(/private \w+ \w+;/i)[0].split(' ')[2]

 /List<\w+> \w+;/gi

 */

