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
    // productCenterData:datas.productCenterData, // 教师产品
    chooseCategory:['授课教师','课程产品'],
    useClick:0,
    region: ['', '', ''],
    // multiArrayData:datas.multiArrayData,
    // 授课教师数据设置
    multiIndex: [0, 0],
    courseIndex:[0,0],
    genderArray:['男','女','保密'],
    chooseData:'',
    // 课程产品数据设置
    ProductIndex:[0,0],
    ProductGradeIndex:[0,0],
    // 区域数据设置
    areaIndex:[0,0,0],
    ProductAddIndex:[0,0,0],
  },

  /**
   * 
   * @param {*} e
   * 查看附近教师 
   */
  viewNearTeacher:function(){
    app.MapEvent('/pages/nearTeacherMap/nearTeacherMap','teacher');
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
  teacherPresentClick:function(e){
    let that = this,type = e.currentTarget.dataset.type;
    o.FunPresentClick(that,type,'teacherSetType');
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
   * 授课教师条件筛选弹出层 
   * || ============================================================ 6/18 张 start
   */ 

  /**
   * 
   * @param {*} e
   * 授课教师 性别选择器
   * || ========================== 6/18 张 start 
   */
  bindSelectorPickerChange:function(e){
    let that = this,
    sendData = that.data.genderArray[e.detail.value],
    data = {"sex":sendData};
    o.funGoodTeacher(that,data,'app/plat/tea/goodTeacher',0,5,'nearTeacherDatas','1');
  },
  /**
   * 
   * @param {*} e
   * 授课教师 性别选择器
   * || ========================== 6/18 张 end
   */

  /**
   * 
   * @param {*} e
   * 授课教师 课类组件弹出数据 
   * || ========================== 6/18 张 start
   */
  bindMultiPickerChange:function(e){
    let that = this,
    teacherData = e.detail.value,
    teacherMultiArray = that.data.teacherMultiArray,
    sedData = teacherMultiArray[1][e.detail.value[1]],
    data = {"teachItem":sedData};
    o.FunBindMultiPickerChange(that,teacherData,'multiIndex');
    o.funGoodTeacher(that,data,'app/plat/tea/goodTeacher',0,5,'nearTeacherDatas','1');
  },

  bindMultiPickerColumnChange:function(e){
    let that = this,
    stairType = that.data.teacherMultiArray[0],
    multiIndex = that.data.multiIndex,
    secondaryType = that.data.secondaryData;
    o.FunBindMultiPickerColumnChange(that,e,stairType,multiIndex,secondaryType,'teacherMultiArray');
  },
  /**
   * 
   * @param {*} e
   * 授课教师 课类组件弹出数据 
   * || ========================== 6/18 张 end
   */

  /**
   * 
   * @param {*} e 
   * 授课教师 省市区组件弹出数据 
   * || ========================== 6/18 张 start
   * 
   */
  areaBindchange:function(e){
    let that = this,
    province = that.data.areaMultiArray[0][e.detail.value[0]],
    city = that.data.areaMultiArray[1][e.detail.value[1]],
    area = that.data.areaMultiArray[2][e.detail.value[2]],
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
                o.funGoodTeacher(that,data,'app/plat/tea/goodTeacher',0,5,'nearTeacherDatas','1');
              }
            }
          }
        }
      }
    }
  },
  areaColumnChange:function(e){
    let that = this,
    areaIndex = that.data.areaIndex,
    areaMultiArray = that.data.areaMultiArray;
    o.funThreeLevelLinkageChange(that,e,areaIndex,areaMultiArray,that.data.needTotalCity,that.data.needMarkProvince,that.data.needMarkCity,that.data.needMarkArea);
    that.setData({
      areaMultiArray:that.data.areaMultiArray,
      areaIndex:that.data.areaIndex
    });
  },
  /**
   * 
   * @param {*} e 
   * 授课教师 省市区组件弹出数据 
   * || ========================== 6/18 张 end
   * 
   */


   /**
   * 
   * @param {*} e
   * 授课教师 级段组件弹出数据 
   * || ========================== 6/18 张 start
   */
  courseBindChange:function(e){
    let that = this,
    courseData = e.detail.value,
    courseMultiArray = that.data.courseMultiArray,
    sedData = courseMultiArray[0][e.detail.value[0]]+courseMultiArray[1][e.detail.value[1]],
    data = {"teachObj":sedData};
    o.FunBindMultiPickerChange(that,courseData,'courseIndex');
    o.funGoodTeacher(that,data,'app/plat/tea/goodTeacher',0,5,'nearTeacherDatas','1');
  },
  bindMultiCourseColumnChange:function(e){
    let that = this,
    stairCourseType = that.data.courseMultiArray[0],
    courseIndex = that.data.courseIndex,
    secondaryCourseType = that.data.secondaryCourseData;
    o.FunBindMultiPickerColumnChange(that,e,stairCourseType,courseIndex,secondaryCourseType,'courseMultiArray');
  },
  /**
   * 
   * @param {*} e
   * 授课教师 级段组件弹出数据 
   * || ========================== 6/18 张 end
   */

  /**
   * 
   * @param {*} e
   * 授课教师条件筛选弹出层 
   * || ============================================================ 6/18 张 end
   */ 



  /**
   * 
   * @param {*} e
   * 授课教师条件筛选弹出层 
   * || ============================================================ 6/18 张 start
   */

  /**
   * 
   * @param {*} e
   * 课程产品 点击事件按钮
   * || ========================== 6/18 张 start
   */
  coursePresentClick:function(e){
    let that = this,type = e.currentTarget.dataset.type;
    o.FunPresentClick(that,type,'courseSetType');
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
   * 课程产品 课类组件弹出数据 
   * || ========================== 6/18 张 start
   */
    ProductClass:function(e){
      let that = this,
      classData = e.detail.value,
      ProductMultiArray = that.data.ProductMultiArray,
      sedData = ProductMultiArray[1][e.detail.value[1]];
      data = {"teachItem":sedData};
      o.FunBindMultiPickerChange(that,classData,'ProductIndex');
      o.funGoodTeacher(that,data,'app/plat/tea/courseList',0,5,'TeacherProductDatas','2');
    },

    ProductClassChange:function(e){
      let that = this,
      stairType = that.data.ProductMultiArray[0],
      ProductIndex = that.data.ProductIndex,
      secondaryType = that.data.secondaryData;
      o.FunBindMultiPickerColumnChange(that,e,stairType,ProductIndex,secondaryType,'ProductMultiArray');
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
  productAdd:function(e){
    // console.log(e.detail.value,'点击确定按钮的样式');
    let that = this,
    province = that.data.productAreaMultiArray[0][e.detail.value[0]],
    city = that.data.productAreaMultiArray[1][e.detail.value[1]],
    area = that.data.productAreaMultiArray[2][e.detail.value[2]],
    needDataArea = that.data.needDataArea;
    console.log(needDataArea);
    for(let i in needDataArea){
      if(province === needDataArea[i].name){
        for(let s in needDataArea[i].child){
          if(city === needDataArea[i].child[s].name){
            for(let a in needDataArea[i].child[s].child){
              if(area === needDataArea[i].child[s].child[a].name){
                let data = {"countyCode":needDataArea[i].child[s].child[a].id};
                o.funGoodTeacher(that,data,'app/plat/tea/courseList',0,5,'TeacherProductDatas','2');
              }
            }
          }
        }
      }
    }
  },
  productAddChange:function(e){
    let that = this,
    ProductAddIndex = that.data.ProductAddIndex,
    productAreaMultiArray = that.data.productAreaMultiArray;
    o.funThreeLevelLinkageChange(that,e,ProductAddIndex,productAreaMultiArray,that.data.needTotalCity,that.data.needMarkProvince,that.data.needMarkCity,that.data.needMarkArea);
    that.setData({
      productAreaMultiArray:that.data.productAreaMultiArray,
      ProductAddIndex:that.data.ProductAddIndex
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
  ProductPrice:function(e){
    let that = this,
    sedPriceData = that.data.sedPriceData[e.detail.value].value,
    data = {'unitPriceValue':sedPriceData};
    console.log();
    o.funGoodTeacher(that,data,'app/plat/tea/courseList',0,5,'TeacherProductDatas','2');
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
   * 课程产品 级段组件弹出数据 
   * || ========================== 6/18 张 start
   */
  productGrade:function(e){
      let that = this,
      productData = e.detail.value;
      ProductGradeArray = that.data.ProductGradeArray,
      sedData = ProductGradeArray[0][e.detail.value[0]]+ProductGradeArray[1][e.detail.value[1]],
      data = {"teachObj":sedData};
      o.FunBindMultiPickerChange(that,productData,'ProductGradeIndex');
      o.funGoodTeacher(that,data,'app/plat/tea/courseList',0,5,'TeacherProductDatas','2');
    },
    productGradeChange:function(e){
      let that = this,
      stairCourseType = that.data.ProductGradeArray[0],
      ProductGradeIndex = that.data.ProductGradeIndex,
      secondaryCourseType = that.data.secondaryCourseData;
      o.FunBindMultiPickerColumnChange(that,e,stairCourseType,ProductGradeIndex,secondaryCourseType,'ProductGradeArray');
    },
  /**
   * 
   * @param {*} e
   * 课程产品 级段组件弹出数据 
   * || ========================== 6/18 张 end
   */
  
  /**
   * 
   * @param {*} e
   * 授课教师条件筛选弹出层 
   * || ============================================================ 6/18 张 end
   */

  // 点击教师简介进入教师详情
  teacherInfo:function(e){
    wx.navigateTo({
      url:'../teacherDetails/teacherDetails?id=' + e.currentTarget.dataset.id,
    });
  },
  
   // 点击更多教师进入教师列表页面
   moreTeacher:function(){
    wx.navigateTo({
      url:'../teacherList/teacherList',
    }); 
  },

  regionBindchange:function(e){
    console.log(e,'数据');
  },

  detailInfo:function(e){
    wx.navigateTo({
      url:'../teacherProductCenter/teacherProductCenter?id=' + e.currentTarget.dataset.id,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('这是首页');
    let that = this,
    // 授课教师 课类
    url = u + 'app/com/teachItem',
    data = {},
    header = {"content-type":"application/json"},
    // 授课教师 级段
    gradeUrl = u + 'app/com/cascadeGrade';

    // 授课教师 课类 数据请求
    o.get(url,data,header,callback=>{
      let d = callback.data,teacherMultiArray = d.stairType,secondaryData = d.childType;
      that.setData({
        // 授课教师 课类数据展示
        teacherMultiArray:teacherMultiArray,
        secondaryData:secondaryData,
        // 课程产品 课类数据展示
        ProductMultiArray:teacherMultiArray
      });
    });

    // 授课教师 级段 数据请求
    o.get(gradeUrl,data,header,callback=>{
      let d = callback.data,courseMultiArray = d.stairType,secondaryCourseData = d.childType;
      that.setData({
        // 授课教师 级段数据展示
        courseMultiArray:courseMultiArray,
        secondaryCourseData:secondaryCourseData,
        // 课程产品 级段数据展示
        ProductGradeArray:courseMultiArray,
      });
    });
    
    // 价格接口
    o.funPriceSort(that,'app/com/priceRange','ProductPriceArray','sedPriceData');
    // 授课教师 区域接口数据
    o.funThreeLevelLinkage(that,'areaMultiArray');
    // 课程产品 区域接口数据
    o.funThreeLevelLinkage(that,'productAreaMultiArray');

    // 优质教师接口
    o.funGoodTeacher(that,data,'app/plat/tea/goodTeacher',0,5,'nearTeacherDatas','1');
    // 课程产品接口
    o.funGoodTeacher(that,data,'app/plat/tea/courseList',0,5,'TeacherProductDatas','2');
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