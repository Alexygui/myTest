/**
 * Created by wangguigen on 2017/9/8.
 */

var map;
var zoom = 12;
function onLoad()
{
    //初始化地图对象
    map=new TMap("mapDiv");
    //设置显示地图的中心点和级别
    map.centerAndZoom(new TLngLat(116.40969,39.89945),zoom);
    //允许鼠标滚轮缩放地图
    map.enableHandleMouseScroll();

    //创建图片对象
    var icon = new TIcon("http://api.tianditu.com/img/map/markerA.png",new TSize(19,27),{anchor:new TPixel(9,27)});
    //向地图上添加自定义标注
    var marker = new TMarker(new TLngLat(116.411794,39.9068),{icon:icon});
    marker.setTitle('abcdefg');
    map.addOverLay(marker);
}