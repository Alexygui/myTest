
var map,zoom=12,markerTool,marker;
var listener = null;
function onLoad()
{
    //初始化地图对象
    map=new TMap("mapDiv");
    //设置显示地图的中心点和级别
    map.centerAndZoom(new TLngLat(116.40969,39.94940),zoom);
    //允许鼠标双击放大地图
    map.enableHandleMouseScroll();

    //创建标注工具对象
    markerTool = new TMarkTool(map);
    //注册标注的mouseup事件
    TEvent.addListener(markerTool,"mouseup",mouseup);
}

//鼠标在地图上按下左键时添加一个点标记
function mouseup(point){
    debugger;
    marker = new TMarker(point);
    map.addOverLay(marker);
    markerTool.close();
}

//启动编辑点标记
function editMarker(){
    if(marker==null){
        alert('请先画点再进行编辑！');
        return;
    }
    else
    {
        marker.enableEdit();
        listener=TEvent.bind(marker,"dragend", marker, function(lnglat){
            TEvent.removeListener(listener);
            alert("当前坐标："+lnglat.getLng()+","+lnglat.getLat());
        });
    }
}
