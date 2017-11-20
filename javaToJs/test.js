/**
 *合同备案信息表单js文件
 *created by ruixin on 2017-11-19.
 */

//流程相关变量声明
var sort = GetQueryString("sort");  //流程环节
var wid = GetQueryString("wid");    //工作流id
var sid = GetQueryString("sid");    //环节页面关系实例id
var lookflg = GetQueryString("lookflg"); //可编辑标志
var id = GetQueryString("id"); //主键ID
if (GetQueryString("WdataId")) {
  id = GetQueryString("WdataId"); //工作流data_id
}
var type = GetQueryString("type"); //操作类型

var status = GetQueryString("Wstatus");  //流程状态
var edit = GetQueryString("edit"); //页面是否可保存
var lcid = GetQueryString("lcid"); //工作流流程id
var rwid = GetQueryString("rwid");  //任务id
var path = GetQueryString("path");  //生成的word的文件名（非路径，路径在后端拼接添加）

//合同备案信息的DetailModel对象实例
var modelHtba = {};

$(function () {
//新增权限配置
  let XzState = {
    ModelHtba: {
      disable: []
    },
    ModelHtbadwgcgl: {
      disable: []
    },
    ModelHtbadwgcgl22222: {
      disable: []
    }
  };

//查看权限配置
  let CkState = {
    ModelHtba: {
      enable: []
    },
    ModelHtbadwgcgl: {
      enable: []
    },
    ModelHtbadwgcgl22222: {
      enable: []
    }
  };

//依据参数确定选择的状态配置
  let stateJson;
  if ("1" === sort && "true" === lookflg) {
    stateJson = XzState;
  } else {
    stateJson = CkState;
  }

//所有Model和字段的初始化Json配置
  let ModelHtbaJson = {ModelHtba:{
    id: {  //ID
    },
    htqd_id: {  //合同签订id
    },
    htlb_no: {  //合同类别NO
    },
    fbgclb_no: {  //分包类别
    },
    htbah: {  //合同备案号
    },
    htmc: {  //合同名称
    },
    xm_id: {  //项目ID
    },
    xmmc: {  //项目名称
    },
    jsgm: {  //建设规模
    },
    xmdz: {  //项目地址
    },
    bd_id: {  //标段ID
    },
    bdmc: {  //标段名称
    },
    jfdw_id: {  //甲方单位ID
    },
    jfdwmc: {  //甲方单位名称
    },
    xmfzr_id: {  //项目负责人id
    },
    xmfzrxm: {  //项目负责人名称
    },
    jfhtqdr: {  //甲方合同签订人姓名
    },
    jfqdsj: {  //甲方签订时间
    },
    yfdw_id: {  //乙方单位ID
    },
    yfdwmc: {  //乙方单位名称
    },
    yfdwzz_no: {  //Column
    },
    xmjl_id: {  //项目经理id
    },
    xmjlxm: {  //项目经理名称
    },
    xmzj_id: {  //项目总监id
    },
    xmzjxm: {  //项目总监姓名
    },
    yfhtqdrmc: {  //乙方合同签订人姓名
    },
    yfqdsj: {  //乙方签订时间
    },
    htje: {  //合同金额
    },
    htkgrq: {  //合同开工日期
    },
    htjgrq: {  //合同竣工日期
    },
    aqcsf: {  //合同备案单位工程关联信息
    },
    acfyhzh: {  //安措费银行账号
    },
    bazt_st: {  //备案状态
    },
    fj_id: {  //附件ID
    },
    cjr_id: {  //创建人ID
    },
    cjsj: {  //创建时间
    },
    xgr_id: {  //修改人ID
    },
    xgsj: {  //修改时间
    },
    sfyx_st: {  //是否有效
      defaultValue: "VALID"
    },
    sgzcbdwzz: {  //合同备案单位工程test22222
    },
    acfzffs: {  //安措费支付方式
    },
    acfyh: {  //安措费银行
    },
    acfzh: {  //安措费账号
    },
    nmgyh: {  //农民工工资银行
    },
    nmgzh: {  //农民工工资账号
    },
    lwfbnrnos: {  //劳务分包内容
    },
    jldw: {  //监理单位
    },
    sfqz: {  //是否签章
    },
    acfyh_no: {  //安措费银行NO
    },
    htdzpath: {  //合同签章文件
    }
  },
    ModelHtbadwgcgl: {  //合同备案单位工程关联信息
    },
    ModelHtbadwgcgl22222: {  //合同备案单位工程test22222
    }
  };

//创建从Model对象
  let ModelHtbadwgcgl = DetailModel.extend({
    className: "ModelHtbadwgcgl",
    initJson: ModelHtbaJson,
    stateJson: stateJson,
    setModelName: function () {
      this.set("ModelName", "ModelHtbadwgcgl" + (++modelIndex));
    }
  });

  let HtbadwgcglCollection = Backbone.Collection.extend({
    model: ModelHtbadwgcgl
  });

//创建从Model对象
  let ModelHtbadwgcgl22222 = DetailModel.extend({
    className: "ModelHtbadwgcgl22222",
    initJson: ModelHtbaJson,
    stateJson: stateJson,
    setModelName: function () {
      this.set("ModelName", "ModelHtbadwgcgl22222" + (++modelIndex));
    }
  });

  let Htbadwgcgl22222Collection = Backbone.Collection.extend({
    model: ModelHtbadwgcgl22222
  });

//创建主model对象
  let ModelHtba = DetailModel.extend({
    className: "ModelHtba",
    initJson: ModelHtbaJson,
    stateJson: stateJson,
    relations: [
      {
        type: Backbone.HasMany,
        key: "dwgcglList",
        relatedModel: ModelHtbadwgcgl,
        collectionType: HtbadwgcglCollection
      },
      {
        type: Backbone.HasMany,
        key: "dwgcglList2222",
        relatedModel: ModelHtbadwgcgl22222,
        collectionType: Htbadwgcgl22222Collection
      }
    ]
  });

//获取Htba的数据，并赋值给htba
  var htba = {};
  if (id) {  //直接请求获取Htba实体中的数据
    $.ajax({
      type: "get",
      url: "/ruin/getHtba?id=" + id + "&random=" + Math.random(),
      async: false,
      success: function (ar) {
        if (ar.success) {
          htba = ar.data;
        } else {
          top.layer.alert(ar.msg);
        }
      }
    });
  } else {  //请求获取页面的初始化数据
    $.ajax({
      type: "get",
      url: "/ruixin/getNewHtba?ruixin=" + ruixin + "&random=" + Math.random(),
      async: false,
      success: function (ar) {
        if (ar.success) {
          htba = ar.data;
        } else {
          top.layer.alert(ar.msg);
        }
      }
    });
  }


//将modelHtba中的数据渲染到表单页面
  modelHtba.render();

});

//保存验证
function checkSheetSave() {
  var checkflg = false;
  checkflg = modelHtba.saveVariable();
  return checkflg;
}

//保存方法
function sheetSave() {
  var saveResult = {msg: "", flg: false};
  $.ajax({
    type: "post",
    url: "/ruixin/saveHtba",
    data: { modelHtba: modelHtba.getJson() , wid: wid, sid: sid, sort: sort},
    async: false,
    dataType: "json",
    success: function (ar) {
      if (ar.success) {
        saveResult.flg = true;
      } else {
        saveResult.msg = ar.msg;
        saveResult.flg = false;
      }
    }
  });
  return saveResult;
}

// 删除验证
function checkSheetDelete() {
// 办理状态为未提交时（第一环节）返回true，可删除；否则返回false，不可删除
  return "1"=== sort;
}

// 删除表单
function sheetDelete() {
  var delResult = {msg: "", flg: false};
  $.ajax({
    type: "get",
    url: "/ruixin/deleteHtba?id=" + id + "&random=" + Math.random(),
    async: false,
    success: function (ar) {
      if (ar.success) {
        delResult.flg = true;
      } else {
        delResult.msg = ar.msg;
        delResult.flg = false;
      }
    }
  });
  return delResult;
}

