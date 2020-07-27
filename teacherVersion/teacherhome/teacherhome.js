// parentsVersion/parentshome/parentshome.js
const datas = require('../../utils/data.js');
const app = getApp(), o = app.requirejs('core');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // banner
    imgUrls: [
      '../../image/banner1.png',
      '../../image/banner1.png',
    ],
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 3000,
    duration: 1000,
    useClick:0,

    // count
    recruitInfo:datas.recruitInfo, // 机构招聘
    dynamicInfo:datas.dynamicInfo, // 动态信息
    bottomInfo:datas.bottomInfo, // 动态信息底部
    teacherFun:datas.teacherFun, // 个人中心信息
    chooseCategory:['看家长','看机构'],


    blockid:0,
    bgcolor:'#ffffff',
    color:"#707070",
    selectedColor:'#74cdce',
    showborder:true,
    bordercolor:"#cccccc",
    tabbar:[
      {
        pagePath: "page/home0/index",
        selectedIconPath: '/tabBarImg/jshome.png',
        iconPath: '/tabBarImg/jshomeother.png',
        text: '首页',
        isdot: false,
        number: 0
      }, {
        pagePath: "page/home1/index",
        selectedIconPath: '/tabBarImg/jsdt.png',
        iconPath: '/tabBarImg/jsdtother.png',
        text: '附近动态',
        isdot: false,
        number: 0
      }, {
        pagePath: "page/home2/index",
        selectedIconPath: '/tabBarImg/jszp.png',
        iconPath: '/tabBarImg/jszpother.png',
        text: '机构招聘',
        isdot: false,
        number: 0
      }, {
        pagePath: "page/home3/index",
        selectedIconPath: '/tabBarImg/jszx.png',
        iconPath: '/tabBarImg/jszxother.png',
        text: '教师中心',
        isdot: true,
        number: 0
      }
    ]
  },
  // event.detail 的值为当前选中项的索引
  tabbarChange(e) {
    var index = parseInt(e.detail),that = this;
    this.setData({
      blockid:index
    });
    that.onLoad();
  },

  /**
   * 首页数据点击事件数据请求============================================== start
   */

  /**
   * 
   * @param {*} e 
   * 首页 点击机构 进入机构详情
   */
  insDetails:function(e){
    wx.navigateTo({
      url:'/teacherVersion/teacherInstitutionDetail/teacherInstitutionDetail?id=' + e.currentTarget.dataset.id,
    });
  },

  /**
   * 点击更多 进入机构列表
   */
  insList:function(){
    wx.navigateTo({
      url:'/teacherVersion/teacherInstitutionList/teacherInstitutionList'
    });
  },

  /**
   * 地图查看更多机构
   */
  viewNearIns:function(){
    app.MapEvent('/teacherVersion/TeacherNearInstitutionMap/TeacherNearInstitutionMap','org');
  },

  /**
   * 首页数据点击事件数据请求============================================== end
   */

  /**
   * 附近动态数据点击事件数据请求============================================== start
   */
  
    /**
     * 
     * @param {*} e 
     * 发布动态
     */
    releaseDynamic:function(){
      wx.navigateTo({
        url:'/teacherVersion/teacherReleaseDynamic/teacherReleaseDynamic',
      });
    },

    /**
     * 评论/点赞等点击事件
     */
    smallIcon:function(e){
      let that = this,needIndex = e.currentTarget.dataset.index;
      if(needIndex === 1){
        wx.navigateTo({
          url:'/teacherVersion/teacherReview/teacherReview',
        });
      }
    },

  /**
   * 附近动态数据点击事件数据请求============================================== end
   */

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
  recruitInfo:function(){
    wx.navigateTo({
      url:'/teacherVersion/teacherRecruit/teacherRecruit',
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
     data = {'value':teaSalaryData};
     console.log(that.data.teaSalaryData,'数据');
     console.log(data,'薪资传提交数据');
    //  o.funGoodTeacher(that,data,'app/plat/org/productList',0,5,'parentsInstitutionsCourseList','4');
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
      teaAgeData = that.data.teaAgeData[e.detail.value].value,
      data = {'value':teaAgeData};
      console.log(that.data.teaAgeData,'数据');
      console.log(data,'薪资传提交数据');
    //  o.funGoodTeacher(that,data,'app/plat/org/productList',0,5,'parentsInstitutionsCourseList','4');
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
      learnData = that.data.learnData[e.detail.value].value,
      data = {'value':learnData};
      console.log(that.data.learnData,'数据');
      console.log(data,'薪资传提交数据');
    //  o.funGoodTeacher(that,data,'app/plat/org/productList',0,5,'parentsInstitutionsCourseList','4');
    },
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
   * 教师中心数据点击事件数据请求============================================== start
   */

    /**
     * 
     * @param {*} e
     * 教师中心，点击发布课程产品，跳转发布页面 
     */
    jumpRelease:function(){
      wx.navigateTo({
        url:'../teacherPeleaseProduct/teacherPeleaseProduct',
      });
    },

    /**
     * 
     * @param {*} e
     * 用户点击功能事件 
     */
    funClick:function(e){
      let that = this,num = e.currentTarget.dataset.index,teacherFuns = that.data.teacherFun,needId = e.currentTarget.dataset.id;
      if(needId !== 9){
        wx.navigateTo({
          url:'/teacherVersion' + teacherFuns[num].url,
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
     * @param {*} e
     * 完善资料 
     */
    perfectData:function(){
      wx.navigateTo({
        url:'/teacherVersion/teacherPerfectInfo/teacherPerfectInfo',
      });
    },

    /**
     * 
     * @param {*} options
     * 返回悦优中心 
     */
    backyy:function(){
      wx.reLaunch({
        url: '/pages/aboutus/aboutus',
      });
    },

  /**
   * 教师中心数据点击事件数据请求============================================== end
   */
  
  /**
  * 用户选择类目
  */
 categoryClick:function(e){
   let that = this,useClick = e.currentTarget.dataset.index;
   that.setData({
     useClick:useClick,
   });
 },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    if(that.data.blockid === 0){
      let data = {};
      // 机构列表接口
      o.funGoodTeacher(that,data,'app/plat/org/goodOrg',0,5,'teaHomeInstitutions','3');
    }else if(that.data.blockid === 1){
      console.log('附近动态');
    }else if(that.data.blockid === 2){
      console.log('机构招聘');
      // 机构招聘 薪资接口数据
      o.funPriceSort(that,'app/com/dict/salary_range','teaSalaryArray','teaSalaryData');
      // 机构招聘 教龄接口数据
      o.funPriceSort(that,'app/com/dict/work_year','teaAgeArray','teaAgeData');
      // 机构招聘 学历接口数据
      o.funPriceSort(that,'app/com/dict/educational_limit','learnArray','learnData');
    }else{
      // 个人中心数据加载
      /**
       * 判断用户是否授权
       * 如果授权获取全局变量中的数据
       * 否则加载默认数据
       * 2020/6/5增 --- 张 showVendor用户授权判断
       */
      // if(app.globalData.userInfo !== ''){
      //   let userInfo = app.globalData.userInfo;
      //   that.setData({
      //     userInfo:userInfo
      //   });
      // }else{
      //   let userInfo = {};
      //   userInfo.avatarUrl = '/image/dtimg.jpg';
      //   userInfo.nickName = '游客登录';
      //   that.setData({
      //     userInfo:userInfo
      //   });
      // }
    }
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