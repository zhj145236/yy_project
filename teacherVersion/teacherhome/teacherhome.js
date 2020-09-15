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
    dynamicInfo:[], // 动态信息
    bottomInfo:[], // 动态信息底部
    teacherFun:datas.teacherFun, // 个人中心信息
    chooseCategory:['看家长','看机构'],
    teaHomeAreaIndex:[0,0,0],


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
    sendreleaseDynamic:function(){
      wx.navigateTo({
        url:'/teacherVersion/teacherReleaseDynamic/teacherReleaseDynamic',
      });
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
    let that = this,use = app.globalData.userInfo;
    that.setData({use:use});
    // 获取设备的信息
    o.getSystemInfo(callback=>{
      that.setData({windowHeight:callback.windowHeight - 460 + 'px'});
    })
    if(that.data.blockid === 0){
      let data = {};
      // 机构列表接口
      o.funGoodTeacher(that,data,'app/plat/org/goodOrg',0,5,'teaHomeInstitutions','3');
    }else if(that.data.blockid === 1){
      console.log('附近动态');
      that.releaseDynamic();
    }else if(that.data.blockid === 2){
      let page = 0,size = 10;
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
      // (f,e,w,s,c,p,z)
    }else{
      // 个人中心数据加载
      if(use !== ""){
        let userData = {};
        if(use.user.headImg.indexOf('https') !== -1){
          userData.headImg = use.user.headImg;
        }else if(use.user.headImg.indexOf('http') !== -1){
          userData.headImg = use.user.headImg;
        }else{
          userData.headImg = o.down(o.urlCon(),use.user.headImg);
        }
        userData.nickName = use.user.nickName;
        that.setData(userData);
      }
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
    let that = this,use = app.globalData.userInfo;
    that.setData({use:use});
    // 获取设备的信息
    o.getSystemInfo(callback=>{
      that.setData({windowHeight:callback.windowHeight - 460 + 'px'});
    })
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
   * 教师端动态
   */
  releaseDynamic:function(){
    let that = this,
    page = 0,
    use = that.data.use,
    userId = parseInt(use.user.userId),
    token = use.token;
    that.setData({userId:userId});
    app.FunGetSeting(callback=>{
      if(callback.authSetting['scope.userLocation'] !== undefined){
        if(callback.authSetting['scope.userLocation']){
          o.FunChooseLocation(data=>{
            let lgnLat = data.longitude + ',' + data.latitude;
            console.log(data,'返回数据1');
            o.FunDynamic('app/tea/dynamic/list',that,lgnLat,page,token,'dynamicInfo');
            that.setData({foundData:data.address});
          });
        }else{
          let lgnLat = "";
          o.FunDynamic('app/tea/dynamic/list',that,lgnLat,page,token,'dynamicInfo');
          // wx.openSetting({
          //   success (res) {
          //     if(res.authSetting['scope.userLocation']){
          //       o.FunChooseLocation(data=>{
          //         console.log(data,'返回数据2');
          //         let lgnLat = data.longitude + ',' + data.latitude;
          //         o.FunDynamic('app/tea/dynamic/list',that,lgnLat,page,token,'dynamicInfo');
          //         that.setData({foundData:data.address});
          //       });
          //     }
          //   }
          // })
        }
      }else{
        let lgnLat = "";
        o.FunDynamic('app/tea/dynamic/list',that,lgnLat,page,token,'dynamicInfo');
        // o.FunGetLocation('gcj02',callback=>{
        //   if(callback.errMsg === "getLocation:ok"){
        //     o.FunChooseLocation(callback=>{
        //       let lngLat = callback.longitude + ',' + callback.latitude;
        //       console.log(callback,'返回数据3');
        //       that.setData({foundData:callback.address,lngLat:lngLat});
        //     });
        //   }
        // });
      }
    });
  },

  /**
   * 教师点击关注用户
   */
  focusOnClick:function(e){
    let that = this,
    use = that.data.use,
    token = use.token,
    uid = parseInt(e.currentTarget.dataset.uid),
    fbrole = e.currentTarget.dataset.fbrole,
    lgnLat = that.data.lgnLat,
    page = 0;
    if(e.currentTarget.dataset.followed){
      o.funShowToast('您已经关注了该用户，无需重复关注');
    }else{
      o.FunFocusOn(uid,fbrole,token,callback=>{
        if(callback.statusCode === 200){
          let dynamicInfo = that.data.dynamicInfo;
          for(let i in dynamicInfo){
            if(dynamicInfo[i].uid === uid){
              dynamicInfo[i].followed = true;
            }
          }
          that.setData({dynamicInfo:dynamicInfo});
          o.funShowToast('关注成功');
        }
      });
    }
  },

  /**
   * 
   * @param {*} e 
   * 动态中图片预览
   */
  previewImg:function(e){
    let that = this,
    index = e.currentTarget.dataset.numindex,
    totalnum = e.currentTarget.dataset.totalnum,
    arr = [];
    for(let i in totalnum){
      arr.push(totalnum[i].specificImg);
    }
    wx.previewImage({
      current: arr[index], //当前显示图片
      urls: arr //所有图片
    });
  },

    /**
   * 评论/点赞等点击事件
   */
  smallIcon:function(e){
    let that = this,
    needIndex = e.currentTarget.dataset.index,
    idx = e.currentTarget.dataset.idx,
    use = that.data.use,
    token = use.token,
    pid = parseInt(e.currentTarget.dataset.id);
    let dynamicInfo = that.data.dynamicInfo;
    if(needIndex === 0){
      if(e.currentTarget.dataset.hasadmire){
        o.funShowToast('您已为该动态点赞过，无需重复点赞');
      }else{
        console.log('动态信息',that.data.dynamicInfo);
        o.FunClickPraise(pid,e.currentTarget.dataset.fbrole,token,callback=>{
          if(callback.statusCode === 200){
            for(let i in dynamicInfo){
              if(parseInt(dynamicInfo[i].id) === pid){
                let createBtnData = dynamicInfo[i].createBtnData;
                dynamicInfo[i].hasAdmire = true;
                createBtnData[0].con += 1;
                createBtnData[0].icon = '/image/yz.png';
                break;
              }
            }
            that.setData({dynamicInfo:dynamicInfo});
            o.funShowToast('点赞成功');
          }
        });
      }
    }
    if(needIndex === 1){
      let needData = encodeURIComponent(JSON.stringify(dynamicInfo[idx]));
      wx.navigateTo({
        url:'/teacherVersion/teacherReview/teacherReview?needData=' + needData,
      });
    }
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