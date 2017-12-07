/**
 *实体:质量监督抽查-超期办理记录表表单js文件
 *created by ruixin on 2017-12-07.
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

//实体:质量监督抽查-超期办理记录表的DetailModel对象实例
var modelZljdccCqbljl = {};

$(function () {
    //新增权限配置
    var XzState = {
        ModelZljdccCqbljl: {
            disable: []
        }
    };

    //查看权限配置
    var CkState = {
        ModelZljdccCqbljl: {
            enable: []
        }
    };

    //依据参数确定选择的状态配置
    var stateJson;
    if ("1" === sort && "true" === lookflg) {
        stateJson = XzState;
    } else {
        stateJson = CkState;
    }

    //所有Model和字段的初始化Json配置
    var ModelZljdccCqbljlJson = {
        ModelZljdccCqbljl:{
            id: {  //主键
            },
            dwgcId: {  //单位工程ID
            },
            dwgcmc: {  //单位工程名称
            },
            zjrq: {  //最近一次检查日期，或最近一次暂缓抽查日期
            },
            zhccyy: {  //暂缓抽查原因
            },
            xcxcjdccrq: {  //下次现场监督检查日期
            },
            sfzh: {  //流程启动人是否选择暂缓抽查，0-未做选择；1-选择暂缓抽查；2-选择质量监督抽查；
            },
            tsType: {  //推送类型：1-显示类型1的页面；2-显示类型2的页
            },
            zljdy_id: {  //质量监督员ID
            },
            cjrId: {  //创建人ID
            },
            cjsj: {  //创建时间
            },
            xgrId: {  //修改人ID
            },
            xgsj: {  //创建时间
            },
            sfyx_st: {  //是否有效
                defaultValue: "VALID"
            }
        }
    };

    //创建主model对象
    var ModelZljdccCqbljl = DetailModel.extend({
        className: "ModelZljdccCqbljl",
        initJson: ModelZljdccCqbljlJson,
        stateJson: stateJson
    });

    //获取ZljdccCqbljl的数据，并赋值给zljdcccqbljl
    var zljdcccqbljl = {};
    if (id) {  //直接请求获取ZljdccCqbljl实体中的数据
        $.ajax({
            type: "post",
            url: "/ruixin/getZljdccCqbljl",
            async: false,
            data: {id: id},
            success: function (ar) {
                if (ar.success) {
                    zljdcccqbljl = ar.data;
                } else {
                    top.layer.alert(ar.msg);
                }
            }
        });
    } else {  //请求获取页面的初始化数据
        $.ajax({
            type: "post",
            url: "/ruixin/getNewZljdccCqbljl",
            async: false,
            data: {ruixin: ruixin},
            success: function (ar) {
                if (ar.success) {
                    zljdcccqbljl = ar.data;
                } else {
                    top.layer.alert(ar.msg);
                }
            }
        });
    }


    //生成model实例对象
    modelZljdccCqbljl = new ModelZljdccCqbljl(zljdcccqbljl);
    //将modelZljdccCqbljl中的数据渲染到表单页面
    modelZljdccCqbljl.render();

});

//保存验证
function checkSheetSave() {
    var checkflg = false;
    checkflg = modelZljdccCqbljl.saveVariable();
    return checkflg;
}

//保存方法
function sheetSave() {
    var saveResult = {msg: "", flg: false};
    $.ajax({
        type: "post",
        url: "/ruixin/saveZljdccCqbljl",
        data: { modelZljdccCqbljl: modelZljdccCqbljl.getJson() , wid: wid, sid: sid, sort: sort},
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
        type: "post",
        url: "/ruixin/deleteZljdccCqbljl",
        async: false,
        data: {id: id},
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

