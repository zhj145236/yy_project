// teacherVersion/teacherRecruit/teacherRecruit.js
const datas = require('../../utils/data.js');
const app = getApp(), o = app.requirejs('core');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoAbstract:datas.infoAbstract,
    descCon:'无不良嗜好，敬岗爱业，不迟到，不早退，衣着得体大方，性格阳光开朗有耐心。',
    isShowIcon:true,
  },

  /**
   * 投递简历
   */
  deliveryClick:function(){
    let that = this,
    id = that.data.id;
    o.FunCenterPostResume(that,id);
  },

  /**
   * 职位收藏
   */
  collectionClick:function(){
    let that = this,
    use = that.data.use,
    type = 7;
    if(Object.keys(use).length !== 0){
      if(that.data.isShowIcon){
        o.FunCollect(that,that.data.id,type);
      }else{
        o.funShowToast('该职位您已收藏');
      }
    }else{
      o.alert('提示','登录已失效，请点击“ 确定 ”选择角色进行登录',res=>{
        if(res.confirm){
          wx.reLaunch({
            url: '/pages/chooseRole/chooseRole'
          })
        }
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this,id = parseInt(options.id);
    that.setData({id:id}),
    use = app.globalData.userInfo;
    if(Object.keys(use).length !== 0){
      let token = use.token;
      o.FunCollectStatus(that,id,'7',token,'isShowIcon');
    }
    o.FunRecruitDetail(that,id);
    that.setData({use:use});
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