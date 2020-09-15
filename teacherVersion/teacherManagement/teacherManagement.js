// teacherVersion/teacherManagement/teacherManagement.js
const datas = require('../../utils/data.js');
const app = getApp(), o = app.requirejs('core');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recruitInfo:datas.recruitInfo, // 机构招聘
    teaHomeAreaIndex:[0,0,0],
  },

  /**
   * 机构招聘数据请求============================================== start
   */

  /**
   * 
   * @param {*} e
   * 条件筛选 点击事件
   * || ========================== 6/18 张 start
   */
  teaRecruitClick:function(e){
    let that = this,type = e.currentTarget.dataset.type;
    o.FunPresentClick(that,type,'teaRecruitType');
  },

  /**
   * 
   * @param {*} options
   * 教师点击查看更多招聘信息 
   */
  moreRecruit:function(){
    wx.navigateTo({
      url:'/teacherVersion/teacherRecruitList/teacherRecruitList',
    });
  },

  /**
   * 
   * @param {*} options 
   * 招聘详情页
   */
  recruitInfo:function(e){
    wx.navigateTo({
      url:'/teacherVersion/teacherRecruit/teacherRecruit?id=' + e.currentTarget.dataset.id,
    });
  },

  /**
  * 
  * @param {*} e
  * 机构招聘 薪资组件弹出数据 
  * || ========================== 6/18 张 start
  */
 teaSalaryChange:function(e){
     let that = this,
     teaSalaryData = that.data.teaSalaryData[e.detail.value].value,
     page = 0,
     size = 10;
     // 机构招聘数据
     o.FunRecruitList(that,'','',teaSalaryData,'',page,size,'insRecruitInfo');
   },
 /**
  * 
  * @param {*} e
  * 机构招聘 薪资组件弹出数据
  * || ========================== 6/18 张 end
  */

  /**
  * 
  * @param {*} e
  * 机构招聘 教龄组件弹出数据 
  * || ========================== 6/18 张 start
  */
    teaAgeChange:function(e){
      let that = this,
      workYear = that.data.teaAgeData[e.detail.value].value,
      page = 0,
      size = 10;
      // 机构招聘数据
      o.FunRecruitList(that,'',workYear,'','',page,size,'insRecruitInfo');
    },
  /**
  * 
  * @param {*} e
  * 机构招聘 教龄组件弹出数据
  * || ========================== 6/18 张 end
  */

  /**
  * 
  * @param {*} e
  * 机构招聘 学历组件弹出数据 
  * || ========================== 6/18 张 start
  */
    learnChange:function(e){
      let that = this,
      educational = that.data.learnData[e.detail.value].value,
      page = 0,
      size = 10;
      // 机构招聘数据
      o.FunRecruitList(that,educational,'','','',page,size,'insRecruitInfo');
    },

    /**
   * 
   * @param {*} e 
   * 课程产品 省市区组件弹出数据 
   * || ========================== 6/18 张 start
   * 
   */
  teaHomeAreaChange:function(e){
    // console.log(e.detail.value,'点击确定按钮的样式');
    let that = this,
    province = that.data.teaHomeAreaArray[0][e.detail.value[0]],
    city = that.data.teaHomeAreaArray[1][e.detail.value[1]],
    area = that.data.teaHomeAreaArray[2][e.detail.value[2]],
    needDataArea = that.data.needDataArea;
    console.log(needDataArea,'省市区');
    for(let i in needDataArea){
      if(province === needDataArea[i].name){
        for(let s in needDataArea[i].child){
          if(city === needDataArea[i].child[s].name){
            for(let a in needDataArea[i].child[s].child){
              if(area === needDataArea[i].child[s].child[a].name){
                let countyCode = needDataArea[i].child[s].child[a].id,
                page = 0,
                size = 10;
                // 机构招聘数据
                o.FunRecruitList(that,'','','',countyCode,page,size,'insRecruitInfo');
              }
            }
          }
        }
      }
    }
  },
  teaHomeAreaColumnChange:function(e){
    let that = this,
    teaHomeAreaIndex = that.data.teaHomeAreaIndex,
    teaHomeAreaArray = that.data.teaHomeAreaArray;
    o.funThreeLevelLinkageChange(that,e,teaHomeAreaIndex,teaHomeAreaArray,that.data.needTotalCity,that.data.needMarkProvince,that.data.needMarkCity,that.data.needMarkArea);
    that.setData({
      teaHomeAreaArray:that.data.teaHomeAreaArray,
      teaHomeAreaIndex:that.data.teaHomeAreaIndex
    });
  },
  /**
   * 
   * @param {*} e 
   * 课程产品 省市区组件弹出数据 
   * || ========================== 6/18 张 end
   * 
   */
  /**
  * 
  * @param {*} e
  * 机构招聘 学历组件弹出数据
  * || ========================== 6/18 张 end
  */

  /**
   * 机构招聘数据请求============================================== end
   */

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this,page = 0,size = 10;
    // 机构招聘 薪资接口数据
    o.funPriceSort(that,'app/com/dict/salary_range','teaSalaryArray','teaSalaryData');
    // 机构招聘 教龄接口数据
    o.funPriceSort(that,'app/com/dict/work_year','teaAgeArray','teaAgeData');
    // 机构招聘 学历接口数据
    o.funPriceSort(that,'app/com/dict/educational_limit','learnArray','learnData');
    // 机构招聘 区域接口数据
    o.funThreeLevelLinkage(that,'teaHomeAreaArray');
    // 机构招聘数据
    o.FunRecruitList(that,'','','','',page,size,'insRecruitInfo');
    // 我的收藏
    o.FunMyCollect(that,page);
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