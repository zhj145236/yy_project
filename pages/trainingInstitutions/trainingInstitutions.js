// pages/goodTeacher/goodTeacher.js
const datas = require('../../utils/data.js');
const app = getApp(), o = app.requirejs('core'),u = o.urlCon();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teacherSituation:datas.teacherSituation,
    userChoose:datas.userChoose,
    // nearTeacherDatas: datas.nearTeacherData, // 附近教师
    productCenterData:datas.productCenterData, // 教师产品
    chooseCategory:['培训机构','课程产品'],
    useClick:0,
    // multiArrayData:datas.multiArrayData,
    enterpriseMultiIndex: [0, 0], // 培训机构 课类
    enterpriseCourseIndex:[0,0], // 培训机构 区域
    enterpriseAreaIndex:[0,0,0], // 培训机构 服务范围
    enterpriseProductIndex:[0,0], // 课程产品 课类
    enterpriseProductAddIndex:[0,0,0], // 课程产品 区域
    enterpriseProductGradeIndex:[0,0], // 课程产品 服务范围
    chooseData:'',
  },

  /**
   * 
   * @param {*} e 
   * 点击机构课程产品进入产品详情
   */
  detailInfo(e){
    wx.navigateTo({
      url:'/pages/institutionsProductCenter/institutionsProductCenter?id=' + e.currentTarget.dataset.id,
    });
  },

  /**
   * 
   * @param {*} e
   * 查看附近机构
   */
  viewNearTeacher:function(){
    app.MapEvent('/pages/nearTeacherMap/nearTeacherMap','org');
  },
  

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
   * 
   * @param {*} e
   * 授课教师 点击事件按钮
   * || ========================== 6/18 张 start
   */
  enterprisePresentClick:function(e){
    let that = this,type = e.currentTarget.dataset.type;
    o.FunPresentClick(that,type,'enterpriseSetType');
  },
  /**
   * 
   * @param {*} e
   * 授课教师 点击事件按钮
   * || ========================== 6/18 张 end
   */

  /**
   * 
   * @param {*} e
   * 课程产品 点击事件按钮
   * || ========================== 6/18 张 start
   */
  courseEnterpriseClick:function(e){
    let that = this,type = e.currentTarget.dataset.type;
    o.FunPresentClick(that,type,'courseEnterpriseSetType');
  },
  /**
   * 
   * @param {*} e
   * 课程产品 点击事件按钮
   * || ========================== 6/18 张 end
   */

   /**
   * 
   * @param {*} e
   * 培训机构条件筛选弹出层 
   * || ============================================================ 6/18 张 start
   */ 

  /**
   * 
   * @param {*} e
   * 培训机构 课类组件弹出数据 
   * || ========================== 6/18 张 start
   */
  enterpriseBindMultiPickerChange:function(e){
    let that = this,
    teacherData = e.detail.value,
    enterpriseMultiArray = that.data.enterpriseMultiArray,
    sedData = enterpriseMultiArray[1][e.detail.value[1]],
    data = {"teachItem":sedData};
    o.FunBindMultiPickerChange(that,teacherData,'enterpriseMultiIndex');
    o.funGoodTeacher(that,data,'app/plat/org/goodOrg',0,5,'goodInstitutions','3');
  },

  enterpriseBindMultiPickerColumnChange:function(e){
    let that = this,
    stairType = that.data.enterpriseMultiArray[0],
    enterpriseMultiIndex = that.data.enterpriseMultiIndex,
    secondaryType = that.data.secondaryData;
    o.FunBindMultiPickerColumnChange(that,e,stairType,enterpriseMultiIndex,secondaryType,'enterpriseMultiArray');
  },
  /**
   * 
   * @param {*} e
   * 培训机构 课类组件弹出数据 
   * || ========================== 6/18 张 end
   */

  /**
   * 
   * @param {*} e 
   * 培训机构 省市区组件弹出数据 
   * || ========================== 6/18 张 start
   * 
   */
  enterpriseAreaBindchange:function(e){
    let that = this,
    province = that.data.enterpriseAreaMultiArray[0][e.detail.value[0]],
    city = that.data.enterpriseAreaMultiArray[1][e.detail.value[1]],
    area = that.data.enterpriseAreaMultiArray[2][e.detail.value[2]],
    needDataArea = that.data.needDataArea;
    console.log(needDataArea);
    for(let i in needDataArea){
      if(province === needDataArea[i].name){
        for(let s in needDataArea[i].child){
          if(city === needDataArea[i].child[s].name){
            for(let a in needDataArea[i].child[s].child){
              if(area === needDataArea[i].child[s].child[a].name){
                let data = {"countyCode":needDataArea[i].child[s].child[a].id};
                console.log(needDataArea[i].child[s].child[a].name,'授课教师数据');
                o.funGoodTeacher(that,data,'app/plat/org/goodOrg',0,5,'goodInstitutions','3');
              }
            }
          }
        }
      }
    }
  },
  enterpriseAreaColumnChange:function(e){
    let that = this,
    enterpriseAreaIndex = that.data.enterpriseAreaIndex,
    enterpriseAreaMultiArray = that.data.enterpriseAreaMultiArray;
    o.funThreeLevelLinkageChange(that,e,enterpriseAreaIndex,enterpriseAreaMultiArray,that.data.needTotalCity,that.data.needMarkProvince,that.data.needMarkCity,that.data.needMarkArea);
    that.setData({
      enterpriseAreaMultiArray:that.data.enterpriseAreaMultiArray,
      enterpriseAreaIndex:that.data.enterpriseAreaIndex
    });
  },
  /**
   * 
   * @param {*} e 
   * 培训机构 省市区组件弹出数据 
   * || ========================== 6/18 张 end
   * 
   */


   /**
   * 
   * @param {*} e
   * 培训机构 服务范围组件弹出数据 
   * || ========================== 6/18 张 start
   */
  enterpriseCourseBindChange:function(e){
    let that = this,
    courseData = e.detail.value,
    enterpriseCourseMultiArray = that.data.enterpriseCourseMultiArray,
    sedData = enterpriseCourseMultiArray[0][e.detail.value[0]]+enterpriseCourseMultiArray[1][e.detail.value[1]],
    data = {"teachObj":sedData};
    o.FunBindMultiPickerChange(that,courseData,'enterpriseCourseIndex');
    o.funGoodTeacher(that,data,'app/plat/org/goodOrg',0,5,'goodInstitutions','3');
  },
  enterpriseBindMultiCourseColumnChange:function(e){
    let that = this,
    stairCourseType = that.data.enterpriseCourseMultiArray[0],
    enterpriseCourseIndex = that.data.enterpriseCourseIndex,
    secondaryCourseType = that.data.secondaryCourseData;
    o.FunBindMultiPickerColumnChange(that,e,stairCourseType,enterpriseCourseIndex,secondaryCourseType,'enterpriseCourseMultiArray');
  },
  /**
   * 
   * @param {*} e
   * 培训机构 服务范围组件弹出数据 
   * || ========================== 6/18 张 end
   */

  /**
   * 
   * @param {*} e
   * 培训机构条件筛选弹出层 
   * || ============================================================ 6/18 张 end
   */ 



  /**
   * 
   * @param {*} e
   * 机构课程条件筛选弹出层 
   * || ============================================================ 6/18 张 start
   */

  /**
   * 
   * @param {*} e
   * 课程产品 课类组件弹出数据 
   * || ========================== 6/18 张 start
   */
    enterpriseProductClass:function(e){
      let that = this,
      classData = e.detail.value,
      enterpriseProductMultiArray = that.data.enterpriseProductMultiArray,
      sedData = enterpriseProductMultiArray[1][e.detail.value[1]];
      data = {"teachItem":sedData};
      o.FunBindMultiPickerChange(that,classData,'enterpriseProductIndex');
      o.funGoodTeacher(that,data,'app/plat/org/productList',0,5,'institutionsCourseList','4');
    },
    enterpriseProductClassChange:function(e){
      let that = this,
      stairType = that.data.enterpriseProductMultiArray[0],
      enterpriseProductIndex = that.data.enterpriseProductIndex,
      secondaryType = that.data.secondaryData;
      o.FunBindMultiPickerColumnChange(that,e,stairType,enterpriseProductIndex,secondaryType,'enterpriseProductMultiArray');
    },
  /**
   * 
   * @param {*} e
   * 课程产品 课类组件弹出数据 
   * || ========================== 6/18 张 end
   */

    /**
   * 
   * @param {*} e 
   * 课程产品 省市区组件弹出数据 
   * || ========================== 6/18 张 start
   * 
   */
  enterpriseproductAdd:function(e){
    // console.log(e.detail.value,'点击确定按钮的样式');
    let that = this,
    province = that.data.enterpriseProductAreaMultiArray[0][e.detail.value[0]],
    city = that.data.enterpriseProductAreaMultiArray[1][e.detail.value[1]],
    area = that.data.enterpriseProductAreaMultiArray[2][e.detail.value[2]],
    needDataArea = that.data.needDataArea;
    console.log(needDataArea);
    for(let i in needDataArea){
      if(province === needDataArea[i].name){
        for(let s in needDataArea[i].child){
          if(city === needDataArea[i].child[s].name){
            for(let a in needDataArea[i].child[s].child){
              if(area === needDataArea[i].child[s].child[a].name){
                let data = {"countyCode":needDataArea[i].child[s].child[a].id};
                o.funGoodTeacher(that,data,'app/plat/org/productList',0,5,'institutionsCourseList','4');
              }
            }
          }
        }
      }
    }
  },
  enterpriseProductAddChange:function(e){
    let that = this,
    enterpriseProductAddIndex = that.data.enterpriseProductAddIndex,
    enterpriseProductAreaMultiArray = that.data.enterpriseProductAreaMultiArray;
    o.funThreeLevelLinkageChange(that,e,enterpriseProductAddIndex,enterpriseProductAreaMultiArray,that.data.needTotalCity,that.data.needMarkProvince,that.data.needMarkCity,that.data.needMarkArea);
    that.setData({
      enterpriseProductAreaMultiArray:that.data.enterpriseProductAreaMultiArray,
      enterpriseProductAddIndex:that.data.enterpriseProductAddIndex
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
   * 课程产品 价格组件弹出数据 
   * || ========================== 6/18 张 start
   */
  enterpriseProductPrice:function(e){
    let that = this,
    OrgsedPriceData = that.data.OrgsedPriceData[e.detail.value].value,
    data = {'unitPriceValue':OrgsedPriceData};
    console.log(data);
    o.funGoodTeacher(that,data,'app/plat/org/productList',0,5,'institutionsCourseList','4');
  },
  /**
   * 
   * @param {*} e
   * 课程产品 价格组件弹出数据 
   * || ========================== 6/18 张 end
   */
   /**
   * 
   * @param {*} e
   * 课程产品 服务范围组件弹出数据 
   * || ========================== 6/18 张 start
   */
  enterpriseProductGrade:function(e){
      let that = this,
      productData = e.detail.value;
      enterpriseProductGradeArray = that.data.enterpriseProductGradeArray,
      sedData = enterpriseProductGradeArray[0][e.detail.value[0]]+enterpriseProductGradeArray[1][e.detail.value[1]],
      data = {"teachObj":sedData};
      o.FunBindMultiPickerChange(that,productData,'enterpriseProductGradeIndex');
      o.funGoodTeacher(that,data,'app/plat/org/productList',0,5,'institutionsCourseList','4');
    },
    enterpriseProductGradeChange:function(e){
      let that = this,
      stairCourseType = that.data.enterpriseProductGradeArray[0],
      enterpriseProductGradeIndex = that.data.enterpriseProductGradeIndex,
      secondaryCourseType = that.data.secondaryCourseData;
      o.FunBindMultiPickerColumnChange(that,e,stairCourseType,enterpriseProductGradeIndex,secondaryCourseType,'enterpriseProductGradeArray');
    },
  /**
   * 
   * @param {*} e
   * 课程产品 服务范围组件弹出数据 
   * || ========================== 6/18 张 end
   */
  
  /**
   * 
   * @param {*} e
   * 机构课程条件筛选弹出层 
   * || ============================================================ 6/18 张 end
   */


  // 点击机构简介进入机构详情
  teacherInfo:function(e){
    wx.navigateTo({
      url:'../institutionsDetails/institutionsDetails?id=' + e.currentTarget.dataset.id,
    });
  },
  
   // 点击更多机构进入机构列表页面
   moreTeacher:function(){
    wx.navigateTo({
      url:'../teacherList/teacherList',
    }); 
  },

  regionBindchange:function(e){
    console.log(e,'数据');
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this,
    // 培训机构 课类URL
    url = u + 'app/com/teachItem',
    data = {},
    header = {"content-type":"application/json"},
    // 培训机构 级段URL
    gradeUrl = u + 'app/com/cascadeGrade';

    // 培训机构 课类 数据请求
    o.get(url,data,header,callback=>{
      let d = callback.data,enterpriseMultiArray = d.stairType,secondaryData = d.childType;
      that.setData({
        // 培训机构 课类数据展示
        enterpriseMultiArray:enterpriseMultiArray,
        secondaryData:secondaryData,
        // 课程产品 课类数据展示
        enterpriseProductMultiArray:enterpriseMultiArray
      });
    });

    // 培训机构 服务范围 数据请求
    o.get(gradeUrl,data,header,callback=>{
      let d = callback.data,courseMultiArray = d.stairType,secondaryCourseData = d.childType;
      that.setData({
        // 培训机构 服务范围数据展示
        enterpriseCourseMultiArray:courseMultiArray,
        secondaryCourseData:secondaryCourseData,
        // 课程产品 服务范围数据展示
        enterpriseProductGradeArray:courseMultiArray,
      });
    });

    // 价格接口
    o.funPriceSort(that,'app/com/priceRange','enterpriseProductPriceArray','OrgsedPriceData');
    // 培训机构 区域接口数据
    o.funThreeLevelLinkage(that,'enterpriseAreaMultiArray');
    // 课程产品 区域接口数据
    o.funThreeLevelLinkage(that,'enterpriseProductAreaMultiArray');

    // 优质机构 机构列表接口
    o.funGoodTeacher(that,data,'app/plat/org/goodOrg',0,5,'goodInstitutions','3');
    // 机构课程产品 产品列表接口
    o.funGoodTeacher(that,data,'app/plat/org/productList',0,5,'institutionsCourseList','4');
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