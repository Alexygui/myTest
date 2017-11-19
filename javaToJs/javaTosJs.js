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
    let javaBean = $('#javaBean').val().match(/import.*? public class .*/gi)[0];
    // console.log(javaBean);
    // debugger;

    //获取className；public class 类名
    let classStr = javaBean.match(/\/\*\*.*?\*\/.*?public class \w+/)[0];
    let classArr = classStr.split(' ');
    let classComment = classStr.match(/[\w\u4e00-\u9fa5]+/)[0];
    let className = classArr[classArr.length - 1];
    let ModelName = 'Model' + className;
    // console.log(className);
    // debugger;


    //拼接状态json
    let xzStateStr = '//新增权限配置\n' +
      'let XzState = {\n' +
      ModelName + ': {\n' +
      'disable: []\n' +
      '},\n';
    // 'ModelCcx: {\n' +
    // 'disable: []\n' +
    // '}\n' +
    // '}\n\n';
    let ckStateStr = '//查看权限配置\n' +
      'let CkState = {\n' +
      ModelName + ': {\n' +
      'enable: []\n' +
      '},\n';
    // 'ModelCcx: {\n' +
    // 'enable: []\n' +
    // '}\n' +
    // '}\n\n';
    let chooseState = '//依据参数确定选择的状态配置\n' +
      'let stateJson;\n' +
      'if ("1" === sort && "true" === lookflg) {\n' +
      'stateJson = XzState;\n' +
      '} else {\n' +
      'stateJson = CkState;\n' +
      '}\n\n';


    //用于拼接的model字符串modelJson
    let modelJson = '//所有Model和字段的初始化Json配置\n' +
      'let ' + ModelName + 'Json = {' + ModelName + ':{\n';


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
    //先筛选出所有的含private的注释加变量声明的字符串，再从其中筛选出包含List<类名>的变量声明
    let childrenArr = [];  //用于保存从对象的数组
    let modelChildren = '';  //拼接Model生成DetailModel和Collection的字符串
    let relations = '';  //从model对主model的依赖关系

    let allPrivate = javaBean.match(/(\/\*\*.*?\*\/.*?private .*? \w+;)|(\/\/.*?private .*? \w+;)/gi);
    if (null != allPrivate && allPrivate.length > 0) {
      //遍历数组，获取key和注释放到即将拼接的数组中
      for (let k = 0; k < allPrivate.length; k++) {
        //private List<类名而非Map<String,Object>> 键名;
        let children = allPrivate[k].match(/(\/\*\*.*?\*\/.*? private List<\w+> \w+;)|(\/\/.*? private List<\w+> \w+;)/g);
        if (children != null && children.length > 0) {
          // for (let i = 0; i < children.length; i++) {
          let json = [];
          let item = children[0];
          // debugger;
          let comment = item.match(/[\w\u4e00-\u9fa5]+/)[0];  //注释：多个中文或者字符
          let tempArr = item.split(' ');
          let tempModelName = tempArr[tempArr.length - 2];
          //从对象的类名
          let beanName = tempModelName.substring(5, tempModelName.length - 1);
          let thisModelName = 'Model' + beanName;
          let temp = tempArr[tempArr.length - 1];
          let key = temp.substring(0, temp.length - 1);
          json[0] = thisModelName + ': {  //' + comment + '\n';
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
          let configJson = ModelName + 'Json';
          modelChildren += '//创建从Model对象\n' +
            'let ' + thisModelName + ' = DetailModel.extend({\n' +
            'className: "' + thisModelName + '",\n' +
            'initJson: ' + configJson + ',\n' +
            'stateJson: stateJson,\n' +
            'setModelName: function () {\n' +
            'this.set("ModelName", "' + thisModelName + '" + (++modelIndex));\n' +
            '}\n' +
            '});\n\n' +
            'let ' + beanName + 'Collection = Backbone.Collection.extend({\n' +
            'model: ' + thisModelName + '\n' +
            '});\n\n';

          //添加依赖关系
          relations += '{\n' +
            'type: Backbone.HasMany,\n' +
            'key: "' + key + '",\n' +
            'relatedModel: ' + thisModelName + ',\n' +
            'collectionType: ' + beanName + 'Collection\n' +
            '},\n';
          // }

        }
      }
      //拼接状态json
      xzStateStr = xzStateStr.substring(0, xzStateStr.length - 2);
      xzStateStr += '\n};\n\n';
      ckStateStr = ckStateStr.substring(0, ckStateStr.length - 2);
      ckStateStr += '\n};\n\n';

      //删除末尾的',\n'，换行符算作一个字符
      relations = relations.substring(0, relations.length - 2)
    }
    //将修改状态的字符串拼接
    let stateStr = xzStateStr + ckStateStr + chooseState;

    //将定义属性的数组转换为字符串
    //modelJson：总的配置json字符串
    //mainArr：用于保存主model的配置的数组
    //childrenArr：用于保存从对象的数组
    //className：主Model的名字
    //modelChildren：拼接Model生成DetailModel和Collection的字符串
    //relations：从model对主model的依赖关系
    //状态配置和控制的js字符串
    contactString(modelJson, mainArr, childrenArr, className, classComment, modelChildren, relations, stateStr);


  });

  //测试用
  $('#javaBean').val($('#tpl').html()).trigger('change');
});

//将定义属性的数组转换为字符串
//modelJson：总的配置json字符串
//mainArr：用于保存主model的配置的数组
//childrenArr：用于保存从对象的数组
//className：主Model的名字
//modelChildren：拼接Model生成DetailModel和Collection的字符串
//relations：从model对主model的依赖关系
//状态配置和控制的js字符串
function contactString(modelJson, mainArr, childrenArr, className, classComment, modelChildren, relations, stateStr) {
  //拼接所有的字符串
  let str = '';

  //拼接js文件头
  jsHead = '/**\n' +
    '*' + classComment + '表单js文件\n' +
    '*created by ruixin on ' + (new Date()).Format('yyyy-MM-dd') + '.\n' +
    '*/\n\n' +
    '//流程相关变量声明\n' +
    'var sort = GetQueryString("sort");  //流程环节\n' +
    'var rwid = GetQueryString("rwid");  //任务id\n' +
    'var wid = GetQueryString("wid");    //工作流id\n' +
    'var sid = GetQueryString("sid");    //环节页面关系实例id\n' +
    'var lookflg = GetQueryString("lookflg"); //可编辑标志\n' +
    'var id = GetQueryString("id"); //主键ID\n' +
    'if (GetQueryString("WdataId")) {\n' +
    'id = GetQueryString("WdataId"); //工作流data_id\n' +
    '}\n' +
    'var type = GetQueryString("type"); //操作类型\n\n' +
    'var status = GetQueryString("Wstatus");  //流程状态\n' +
    'var edit = GetQueryString("edit"); //页面是否可保存\n' +
    'var lcid = GetQueryString("lcid"); //工作流流程id\n' +
    'var path = GetQueryString("path");  //生成的word的文件名（非路径，路径在后端拼接添加）\n\n' +
    '//' + classComment + '的DetailModel对象实例\n' +
    'var model' + className + ' = {};\n\n' +
    '$(function () {\n';


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

  let ModelName = 'Model' + className;
  let relationToMain = '//创建主model对象\n' +
    'let ' + ModelName + ' = DetailModel.extend({\n' +
    'className: "' + ModelName + '",\n' +
    'initJson: ' + ModelName + 'Json,\n' +
    'stateJson: stateJson,\n' +
    'relations: [\n' +
    relations + '\n' +
    ']\n' +
    '});\n\n';
  // console.log(modelJson);


  let modelName = 'model' + className;
  //将所有的字符串拼接------------------------------
  str += jsHead;  //拼接表头
  str += stateStr;  //拼接状态控制的字符串
  str += modelJson;  //拼接ModelJson字符串
  str += modelChildren;  //拼接从Model对象的声明
  str += relationToMain;  //拼接主Model对象
  //拼接保存、删除方法
  str += '});\n\n' +
    '//保存验证\n' +
    'function checkSheetSave() {\n' +
    'var checkflg = false;\n' +
    'checkflg = ' + modelName + '.saveVariable();\n' +
    'return checkflg;\n' +
    '}\n\n' +
    '//保存方法\n' +
    'function sheetSave() {\n' +
    'var saveResult = {msg: "", flg: false};\n' +
    '$.ajax({\n' +
    'type: "post",\n' +
    'url: "/ruixin/save' + className + '",\n' +
    'data: { ' + modelName + ': ' + modelName + '.getJson() , wid: wid, sid: sid, sort: sort},\n' +
    'async: false,\n' +
    'dataType: "json",\n' +
    'success: function (ar) {\n' +
    'if (ar.success) {\n' +
    'saveResult.flg = true;\n' +
    '} else {\n' +
    'saveResult.msg = ar.msg;\n' +
    'saveResult.flg = false;\n' +
    '}\n' +
    '}\n' +
    '});\n' +
    'return saveResult;\n' +
    '}\n\n' +
    '// 删除验证\n' +
    'function checkSheetDelete() {\n' +
    '// 办理状态为未提交时（第一环节）返回true，可删除；否则返回false，不可删除\n' +
    'return "1"=== sort;    \n' +
    '}\n\n' +
    '// 删除表单\n' +
    'function sheetDelete() {\n' +
    'var delResult = {msg: "", flg: false};\n' +
    '$.ajax({\n' +
    'type: "get",\n' +
    'url: "/ruixin/delete' + className + '?id=" + id + "&random=" + Math.random(),\n' +
    'async: false,\n' +
    'success: function (ar) {\n' +
    'if (ar.success) {\n' +
    'delResult.flg = true;\n' +
    '} else {\n' +
    'delResult.msg = ar.msg;\n' +
    'delResult.flg = false;\n' +
    '}\n' +
    '}\n' +
    '});\n' +
    'return delResult;\n' +
    '}\n\n';

  $('#json').val(str);
}

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) { //author: meizz
  let o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
    "H+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (let k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};