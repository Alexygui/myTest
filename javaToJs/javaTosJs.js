/**
 * Created by gui on 2017/11/18.
 */
$(function () {
  $('#configTitle').text('123');

  $('#jsTree').click(function (e) {
    let $t = $(e.target);
    $('#configTitle').val(123);
  });

  $('#javaBean').change(function () {
    //截取javaBean中可以用来生成json数据的有效数据，即从类的声明到所有的私有属性
    //public class 类名 以后的字符串
    let javaBean = $('#javaBean').val().match(/public class .*/gi)[0];
    // console.log(javaBean);
    // debugger;

    //获取modelName；public class 类名
    let modelArr = javaBean.match(/public class \w+/)[0].split(' ');
    let modelName = 'Model' + modelArr[modelArr.length - 1];
    // console.log(modelName);
    // debugger;


    //拼接状态json
    let xzStateStr = '//新增权限配置\n' +
      'var XzState = {\n' +
      modelName + ': {\n' +
      'disable: []\n' +
      '},\n';
    // 'ModelCcx: {\n' +
    // 'disable: []\n' +
    // '}\n' +
    // '}\n\n';
    let ckStateStr = '//查看权限配置\n' +
      'var CkState = {\n' +
      modelName + ': {\n' +
      'enable: []\n' +
      '},\n';
    // 'ModelCcx: {\n' +
    // 'enable: []\n' +
    // '}\n' +
    // '}\n\n';
    let chooseState = '//依据参数确定选择的状态配置\n' +
      'var stateJson;\n' +
      'if ("1" === sort && "true" === lookflg) {\n' +
      'stateJson = XzState;\n' +
      '} else {\n' +
      'stateJson = CkState;\n' +
      '}\n';


    //用于拼接的model字符串modelJson
    let modelJson = 'var ' + modelName + 'Json = {' + modelName + ':{\n';


    //将有效数据截取为json中的key及其注释在同一条字符串中，获取的值组成数组
    //(/** ... */ private ... ;)或者(// ... private ... ;)
    let items = javaBean.match(/(\/\*\*.*?\*\/.*?private \w+ \w+;)|(\/\/.*?private \w+ \w+;)/gi);
    // console.log(items);
    // debugger;

    //遍历数组，获取key和注释放到即将拼接的数组中
    let mainArr = [];  //用于保存主model的配置的数组
    if (null != items && items.length > 0) {
      for (let i = 0; i < items.length; i++) {
        let json = [];
        let item = items[i];
        let comment = item.match(/[\w\u4e00-\u9fa5]+/)[0];  //注释：多个中文或者字符
        let tempArr = item.split(' ');
        let temp = tempArr[tempArr.length - 1];
        let key = temp.substring(0, temp.length - 1);  //键-key
        $('#jsTree').append('<li><a href="javascript:void 0;" class="button" id="' + i + '">' + key + ':' + comment + '</a></li><br/>');
        json[0] = key + ': {  //' + comment + '\n';
        json[1] = '},\n';
        if ('sfyx_st' === key) {
          json.splice(1, 0, 'defaultValue: "VALID"\n');
        }
        mainArr.push(json);
      }
    }
    // console.log(mainArr);


    //获取关联从对象的数据
    //private List<类名而非Map<String,Object>> 键名;
    let children = javaBean.match(/private List<\w+> \w+;/g);
    let childrenArr = [];  //用于保存从对象的数组
    let modelChildren = '';  //拼接Model生成DetailModel和Collection的字符串
    let relations = '';  //从model对主model的依赖关系
    //遍历数组，获取key和注释放到即将拼接的数组中
    if (children != null && children.length > 0) {
      for (let i = 0; i < children.length; i++) {
        let json = [];
        let item = children[i];
        let tempArr = item.split(' ');
        let tempModelName = tempArr[1];
        //从对象的类名
        let beanName = tempModelName.substring(5, tempModelName.length - 1);
        let thisModelName = 'Model' + beanName;
        let temp = tempArr[2];
        let key = temp.substring(0, temp.length - 1);
        json[0] = thisModelName + ': {\n';
        json[1] = '},\n';
        childrenArr.push(json);

        //拼接状态json
        xzStateStr += thisModelName + ': {\n' +
          'disable: []\n' +
          '},\n';
        ckStateStr += thisModelName + ': {\n' +
          'enable: []\n' +
          '},\n';

        //拼接Model配置和依赖关系
        // let thisname = childrenArr[j][0];
        let configJson = modelName + 'Json';
        modelChildren += '//创建从Model对象\n' +
          'var ' + thisModelName + ' = DetailModel.extend({\n' +
          'className: "' + thisModelName + '",\n' +
          'initJson: ' + configJson + ',\n' +
          'stateJson: stateJson,\n' +
          'setModelName: function () {\n' +
          'this.set("ModelName", "' + thisModelName + '" + (++modelIndex));\n' +
          '}\n' +
          '});\n\n' +
          'var ' + beanName + 'Collection = Backbone.Collection.extend({\n' +
          'model: ' + thisModelName + '\n' +
          '});\n\n';

        //添加依赖关系
        relations += '{\n' +
          'type: Backbone.HasMany,\n' +
          'key: "' + key + '",\n' +
          'relatedModel: ' + thisModelName + ',\n' +
          'collectionType: ' + beanName + 'Collection\n' +
          '},\n';
      }

      //拼接状态json
      xzStateStr = xzStateStr.substring(0, xzStateStr.length - 2);
      xzStateStr += '}\n\n';
      ckStateStr = ckStateStr.substring(0, ckStateStr.length - 2);
      ckStateStr += '}\n\n';

      //删除末尾的',\n'，换行符算作一个字符
      relations = relations.substring(0, relations.length - 2)
    }

    //将修改状态的字符串拼接
    let stateStr = xzStateStr + ckStateStr + chooseState;

    //将定义属性的数组转换为字符串
    //modelJson：总的配置json字符串
    //mainArr：用于保存主model的配置的数组
    //childrenArr：用于保存从对象的数组
    //modelName：主Model的名字
    //modelChildren：拼接Model生成DetailModel和Collection的字符串
    //relations：从model对主model的依赖关系
    //状态配置的js字符串
    contactString(modelJson, mainArr, childrenArr, modelName, modelChildren, relations, stateStr);


  });

  //测试用
  $('#javaBean').val($('#tpl').html()).trigger('change');
});

//将定义属性的数组转换为字符串
//modelJson：总的配置json字符串
//mainArr：用于保存主model的配置的数组
//childrenArr：用于保存从对象的数组
//modelName：主Model的名字
//modelChildren：拼接Model生成DetailModel和Collection的字符串
//relations：从model对主model的依赖关系
function contactString(modelJson, mainArr, childrenArr, modelName, modelChildren, relations) {
  let str = '';//拼接所有的字符串

  //先拼接状态控制的字符串
  str += stateStr;

  //将mainArr数组的子字符串先拼接，不需要逗号
  for (let i = 0; i < mainArr.length; i++) {
    modelJson += mainArr[i].join('');
  }
  // console.log(modelJson);
  //删除末尾的',\n'，换行符算作一个字符
  modelJson = modelJson.substring(0, modelJson.length - 2);
  modelJson += '\n},\n';

  //将childrenArr数组的子字符串先拼接，不需要逗号
  for (let j = 0; j < childrenArr.length; j++) {
    modelJson += childrenArr[j].join('');
  }

  //删除末尾的',\n'，换行符算作一个字符
  modelJson = modelJson.substring(0, modelJson.length - 2);
  modelJson += '\n};\n\n';

  let relationToMain = '//创建主model对象\n' +
    'var ' + modelName + ' = DetailModel.extend({\n' +
    'className: "' + modelName + '",\n' +
    'initJson: ' + modelName + 'Json,\n' +
    'stateJson: stateJson,\n' +
    'relations: [\n' +
    relations + '\n' +
    ']\n' +
    '});\n\n';
  // console.log(modelJson);

  //将所有的字符串拼接
  str += modelJson;
  str += modelChildren;
  str += relationToMain;

  $('#json').val(str);
}