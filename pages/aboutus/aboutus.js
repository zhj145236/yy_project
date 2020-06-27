// pages/aboutus/aboutus.js
const datas = require('../../utils/data.js');
const app = getApp(), o = app.requirejs('core'),u = o.urlCon();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personalCenter:datas.personalCenter, // 悦优简介信息
    ysInfo:datas.ysInfo,  // 昱升信息
    promptInfo:'安全提示：如果您在使用本平台时遇到任何问题亲及时与本台取得联系，我们将会在12小时内安排相关工作人员与您取得联系，以确保您的个人利益不受侵犯', // 安全提示
    
    latitude:"22.934935574931625", // 纬度
    longitude:"113.66992540475465", // 经度
    name:"东莞市昱升科技有限公司",
    address:"广东省东莞市厚街镇莞太路厚街段281号2号楼406室",
  },

  /**
   * 
   * @param {*} options
   * 用户点击简介、协议、政策、权限等 
   */
  funClick:function(e){
    let that = this,num = e.currentTarget.dataset.index;
    console.log(typeof num);
    if(num === 0){
      wx.navigateTo({
        url:'../yyAbstract/yyAbstract',
      });
    }else if(num === 1){
      wx.navigateTo({
        url:'../serviceDeal/serviceDeal',
      });
    }else if(num === 2){
      wx.navigateTo({
        url:'../privacyPolicy/privacyPolicy',
      });
    }else{
      wx.openSetting({
        success (res) {
          console.log(res.authSetting);
        }
      })
    }
  },

  /**
   * 
   * @param {*} options
   * 昱升科技总部信息点击事件 
   */
  ysInfoClick:function(e){
    let that = this,num = e.currentTarget.dataset.index;
    switch(num){
      case 0:
        // 平台地址
        wx.getLocation({
          type:'gcj02',
          altitude:true,
          success: function(res) {
            // console.log(res,'这是地图的经纬度');
            // console.log(Number(that.data.latitude),'设置经度');
            wx.openLocation({
              latitude: Number(that.data.latitude), //纬度
              longitude: Number(that.data.longitude), // 经度
              name: that.data.name,
              address: that.data.address,
              scale: 10
            })
          },
          fail:function(res){
            wx.navigateTo({
              url: '../map/map?lat=' + Number(that.data.latitude) + '&lon=' + Number(that.data.longitude) + '&name=' + that.data.name + '&address=' + that.data.address,
            });
          }
        });
        break;
      case 1:
        // 联系电话
        wx.makePhoneCall({
          phoneNumber: '13310829325'
        });
        break;
      case 2:
        // 公示栏
        wx.navigateTo({
          url:'../bulletinBoard/bulletinBoard',
        });
        break;
      case 3:
        // 昱升简介
        wx.navigateTo({
          url:'../ysAbstract/ysAbstract',
        });
        break;
      case 4:
        // 帮助中心
        wx.navigateTo({
          url:'../helpCenter/helpCenter',
        });
        break;
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    app.FunGetSeting((data)=>{
    });
    url = u + 'app/plat/center/ysinfo',
    data = {},
    herder = {"content-type":"application/json"};
    // 请求简介数据
    o.get(url,data,herder,callback=>{
      let statusCode = callback.statusCode;
      if(statusCode === 200){
        console.log(callback,'1');
        that.setData({basicInfo:callback.data});
      }else{
        o.FunInterceptor(statusCode);
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    setTimeout(()=>{
      // 再此调取接口，如果接口回调速度太快，为了展示loading效果，可以使用setTimeout
      wx.stopPullDownRefresh();
    }, 1000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})