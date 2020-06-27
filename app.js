//app.js
var e = require("utils/core.js");
App({
  requirejs: function (e) {
    return require("utils/" + e + ".js");
  },

  FunGetSeting:function(t){
    wx.getSetting({
      success:function(res){
        return typeof t == "function" && t(res);
      }
    })
  },

  /**
   * 地图事件封装
   */
  MapEvent:function(url){
    this.FunGetSeting(data=>{
      console.log(data.authSetting['scope.userLocation'],'授权数据');
      // 用户授权的时候监听用户曾经是否有授权行为，如果授权则走true，否则走false
      if(data.authSetting['scope.userLocation']){
        e.FunGetLocation('gcj02',callback=>{
          let latitude = callback.latitude,longitude = callback.longitude;
          wx.navigateTo({
            url:url + '?latitude=' + latitude + '&longitude=' + longitude,
          });
        });
      }else{
        e.FunGetLocation('wgs84',callback=>{
          let errMsg = callback.errMsg;
          if(errMsg === "getLocation:ok"){
            const latitude = callback.latitude,longitude = callback.longitude;
            wx.navigateTo({
              url:url + '?latitude=' + latitude + '&longitude=' + longitude,
            });
          }else{
            wx.navigateTo({
              url:url + '?latitude=' + '23.02067' + '&longitude=' + '113.75179',
            });
          }
        });
      }
    });
  },

  globalData: {
    appid: "wxd5ec71e89a8e58e5", // 开发者的id
    api: "", //与后台连接的通讯地址
    userInfo: {},
  }
})