// parentsVersion/parentshome/parentshome.js
const datas = require('../../utils/data.js');
const app = getApp(), o = app.requirejs('core'),u = o.urlCon();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teacherSituation:datas.teacherSituation, // 教师/机构 保障
    chooseClass:['教师产品','机构产品'],
    chooseCategory:['找教师','找机构'],
    useClick:0,
    useChooleClick:0,
    teacherClassIndex: [0, 0], // 教师产品课类
    parentsAreaIndex:[0,0,0], // 教师产品 区域
    parentsCourseIndex:[0,0], // 教师产品 级段
    insProductIndex:[0,0], // 机构产品 课类
    insProductAddIndex:[0,0,0], // 机构产品 区域 
    insProductGradeIndex:[0,0], // 机构产品 服务范围
    teaParentsIndex:[0,0], // 找教师 课类
    teaAreaIndex:[0,0,0], // 找教师 区域
    partentsGenderArray:['男','女','保密'], // 找教师 性别
    teaClassIndex:[0,0], // 找教师 级段
    partentsInsIndex:[0,0], // 找机构 课类
    insAreaIndex:[0,0,0], // 找机构 区域
    insServiceIndex:[0,0], // 找机构 服务范围
    personalFun:datas.personalFun, // 个人中心信息
    foundData:'附近动态',

    // 重要数据，不要轻易修改
    blockid:0,
    bgcolor:'#ffffff',
    color:"#707070",
    selectedColor:'#f2b04a',
    showborder:true,
    bordercolor:"#cccccc",
    tabbar:[
      {
        pagePath: "page/home0/index",
        selectedIconPath: '/tabBarImg/homeh.png',
        iconPath: '/tabBarImg/home.png',
        text: '首页',
        isdot: false,
        number: 0
      }, {
        pagePath: "page/home1/index",
        selectedIconPath: '/tabBarImg/kindh.png',
        iconPath: '/tabBarImg/kind.png',
        text: '附近教育',
        isdot: false,
        number: 0
      }, {
        pagePath: "page/home2/index",
        selectedIconPath: '/tabBarImg/myh.png',
        iconPath: '/tabBarImg/my.png',
        text: '最新动态',
        isdot: false,
        number: 0
      }, {
        pagePath: "page/home3/index",
        selectedIconPath: '/tabBarImg/shopcarth.png',
        iconPath: '/tabBarImg/shopcart.png',
        text: '个人中心',
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
   * 教师产品 点击事件
   * || ========================== 6/18 张 start
   */
  teacherPresentClick:function(e){
    let that = this,type = e.currentTarget.dataset.type;
    o.FunPresentClick(that,type,'parentsTeacherSetType');
  },
  /**
   * 
   * @param {*} e
   * 教师产品 点击事件
   * || ========================== 6/18 张 end
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
  userChooleClick:function(e){
    let that = this,useChooleClick = e.currentTarget.dataset.index;
    that.setData({
      useChooleClick:useChooleClick,
    });
  },

  /**
   * 
   * @param {*} e
   * 机构产品 点击事件 
   */
  InsPresentClick:function(e){
    let that = this,type = e.currentTarget.dataset.type;
    o.FunPresentClick(that,type,'parentsCourseSetType');
  },

   /**
   * 
   * @param {*} e
   * 教师课程列表 
   */
  classMore:function(e){
    wx.navigateTo({
      url:'/parentsVersion/parentsTeacherProductList/parentsTeacherProductList',
    });
  },

  /**
   * 机构课程点击进入机构产品详情
   */
  institutionInfo:function(e){
    wx.navigateTo({
      url:'/parentsVersion/parentsInstitutionProductCenter/parentsInstitutionProductCenter?id=' + e.currentTarget.dataset.id,
    });
  },

  /**
   * 
   * @param {*} e
   * 教师课程点击进入教师产品详情
   */
  teacherInfo:function(e){
    wx.navigateTo({
      url:'/parentsVersion/parentsTeacherProductCenter/parentsTeacherProductCenter?id=' + e.currentTarget.dataset.id,
    });
  },

  /**
   * 
   * @param {*} e
   * 教师课程产品 课类组件弹出数据 
   * || ========================== 6/18 张 start
   */
    teacherClassPickerChange:function(e){
      let that = this,
      teaClassData = e.detail.value,
      teacherClassArray = that.data.teacherClassArray,
      sedData = teacherClassArray[1][e.detail.value[1]];
      data = {"teachItem":sedData};
      o.FunBindMultiPickerChange(that,teaClassData,'teacherClassIndex');
      o.funGoodTeacher(that,data,'app/plat/tea/courseList',0,5,'ParentsTeacherProductDatas','2');
    },

    teacherClassColumnChange:function(e){
      let that = this,
      stairType = that.data.teacherClassArray[0],
      teacherClassIndex = that.data.teacherClassIndex,
      parentsSecondaryType = that.data.secondaryData;
      o.FunBindMultiPickerColumnChange(that,e,stairType,teacherClassIndex,parentsSecondaryType,'teacherClassArray');
    },
  /**
   * 
   * @param {*} e
   * 教师课程产品 课类组件弹出数据 
   * || ========================== 6/18 张 end
   */

 /**
   * 
   * @param {*} e 
   * 教师产品 省市区组件弹出数据 
   * || ========================== 6/18 张 start
   * 
   */
    parentsAreaBindchange:function(e){
      let that = this,
      province = that.data.parentsAreaMultiArray[0][e.detail.value[0]],
      city = that.data.parentsAreaMultiArray[1][e.detail.value[1]],
      area = that.data.parentsAreaMultiArray[2][e.detail.value[2]],
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
                  o.funGoodTeacher(that,data,'app/plat/tea/courseList',0,5,'ParentsTeacherProductDatas','2');
                }
              }
            }
          }
        }
      }
    },
    parentsAreaColumnChange:function(e){
      let that = this,
      parentsAreaIndex = that.data.parentsAreaIndex,
      parentsAreaMultiArray = that.data.parentsAreaMultiArray;
      o.funThreeLevelLinkageChange(that,e,parentsAreaIndex,parentsAreaMultiArray,that.data.needTotalCity,that.data.needMarkProvince,that.data.needMarkCity,that.data.needMarkArea);
      that.setData({
        parentsAreaMultiArray:that.data.parentsAreaMultiArray,
        parentsAreaIndex:that.data.parentsAreaIndex
      });
    },
  /**
   * 
   * @param {*} e 
   * 教师产品 省市区组件弹出数据 
   * || ========================== 6/18 张 end
   * 
   */

   /**
   * 
   * @param {*} e
   * 教师课程产品 价格组件弹出数据 
   * || ========================== 6/18 张 start
   */
    PrentsPickerChange:function(e){
      let that = this,
      parentsSedPriceData = that.data.parentsSedPriceData[e.detail.value].value,
      data = {'unitPriceValue':parentsSedPriceData};
      o.funGoodTeacher(that,data,'app/plat/tea/courseList',0,5,'ParentsTeacherProductDatas','2');
    },
  /**
   * 
   * @param {*} e
   * 教师课程产品 价格组件弹出数据 
   * || ========================== 6/18 张 end
   */

  /**
   * 
   * @param {*} e
   * 教师课程产品 级段组件弹出数据 
   * || ========================== 6/18 张 start
   */
    parentsCourseBindChange:function(e){
      let that = this,
      partensData = e.detail.value;
      parentsCourseMultiArray = that.data.parentsCourseMultiArray,
      sedData = parentsCourseMultiArray[0][e.detail.value[0]]+parentsCourseMultiArray[1][e.detail.value[1]],
      data = {"teachObj":sedData};
      o.FunBindMultiPickerChange(that,partensData,'parentsCourseIndex');
      o.funGoodTeacher(that,data,'app/plat/tea/courseList',0,5,'ParentsTeacherProductDatas','2');
    },
    parentsCourseColumnChange:function(e){
      let that = this,
      stairCourseType = that.data.parentsCourseMultiArray[0],
      parentsCourseIndex = that.data.parentsCourseIndex,
      parentsCourseType = that.data.secondaryCourseData;
      o.FunBindMultiPickerColumnChange(that,e,stairCourseType,parentsCourseIndex,parentsCourseType,'parentsCourseMultiArray');
    },
  /**
   * 
   * @param {*} e
   * 教师课程产品 级段组件弹出数据 
   * || ========================== 6/18 张 end
   */

   /**
   * 
   * @param {*} e
   * 机构课程产品 课类组件弹出数据 
   * || ========================== 6/18 张 start
   */
    insProductClass:function(e){
      let that = this,
      insClassData = e.detail.value,
      insProductMultiArray = that.data.insProductMultiArray,
      sedData = insProductMultiArray[1][e.detail.value[1]];
      data = {"teachItem":sedData};
      o.FunBindMultiPickerChange(that,insClassData,'insProductIndex');
      o.funGoodTeacher(that,data,'app/plat/org/productList',0,5,'parentsInstitutionsCourseList','4');
    },

    insProductClassChange:function(e){
      let that = this,
      stairType = that.data.insProductMultiArray[0],
      insProductIndex = that.data.insProductIndex,
      insSecondaryType = that.data.secondaryData;
      o.FunBindMultiPickerColumnChange(that,e,stairType,insProductIndex,insSecondaryType,'insProductMultiArray');
    },
  /**
   * 
   * @param {*} e
   * 机构课程产品 课类组件弹出数据 
   * || ========================== 6/18 张 end
   */

 /**
   * 
   * @param {*} e 
   * 机构产品 省市区组件弹出数据 
   * || ========================== 6/18 张 start
   * 
   */
    insProductAdd:function(e){
      let that = this,
      province = that.data.insProductAreaMultiArray[0][e.detail.value[0]],
      city = that.data.insProductAreaMultiArray[1][e.detail.value[1]],
      area = that.data.insProductAreaMultiArray[2][e.detail.value[2]],
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
                  o.funGoodTeacher(that,data,'app/plat/org/productList',0,5,'parentsInstitutionsCourseList','4');
                }
              }
            }
          }
        }
      }
    },
    insProductAddChange:function(e){
      let that = this,
      insProductAddIndex = that.data.insProductAddIndex,
      insProductAreaMultiArray = that.data.insProductAreaMultiArray;
      o.funThreeLevelLinkageChange(that,e,insProductAddIndex,insProductAreaMultiArray,that.data.needTotalCity,that.data.needMarkProvince,that.data.needMarkCity,that.data.needMarkArea);
      that.setData({
        insProductAreaMultiArray:that.data.insProductAreaMultiArray,
        insProductAddIndex:that.data.insProductAddIndex
      });
    },
  /**
   * 
   * @param {*} e 
   * 机构产品 省市区组件弹出数据 
   * || ========================== 6/18 张 end
   * 
   */

   /**
   * 
   * @param {*} e
   * 机构课程产品 价格组件弹出数据 
   * || ========================== 6/18 张 start
   */
    insProductPrice:function(e){
      let that = this,
      insSedPriceData = that.data.insSedPriceData[e.detail.value].value,
      data = {'unitPriceValue':insSedPriceData};
      o.funGoodTeacher(that,data,'app/plat/org/productList',0,5,'parentsInstitutionsCourseList','4');
    },
  /**
   * 
   * @param {*} e
   * 机构课程产品 价格组件弹出数据 
   * || ========================== 6/18 张 end
   */

  /**
   * 
   * @param {*} e
   * 机构课程产品 服务范围组件弹出数据 
   * || ========================== 6/18 张 start
   */
    insProductGrade:function(e){
      let that = this,
      partensInsData = e.detail.value;
      insProductGradeArray = that.data.insProductGradeArray,
      sedData = insProductGradeArray[0][e.detail.value[0]] + insProductGradeArray[1][e.detail.value[1]],
      data = {"teachObj":sedData};
      o.FunBindMultiPickerChange(that,partensInsData,'insProductGradeIndex');
      o.funGoodTeacher(that,data,'app/plat/org/productList',0,5,'parentsInstitutionsCourseList','4');
    },
    insProductGradeChange:function(e){
      let that = this,
      insCourseType = that.data.insProductGradeArray[0],
      insProductGradeIndex = that.data.insProductGradeIndex,
      parentsInsCourseType = that.data.secondaryCourseData;
      o.FunBindMultiPickerColumnChange(that,e,insCourseType,insProductGradeIndex,parentsInsCourseType,'insProductGradeArray');
    },
  /**
   * 
   * @param {*} e
   * 机构课程产品 服务范围组件弹出数据 
   * || ========================== 6/18 张 end
   */

/**
 * 首页数据点击事件数据请求============================================== end
 */


/**
 * 附近教育数据点击事件数据请求============================================== end
 */

  /**
 * 
 * @param {*} e
 * 查看更多教师 进入教师列表
 */
teaSearchList:function(){
    wx.navigateTo({
      url:'/parentsVersion/parentsTeacherList/parentsTeacherList',
    });
  },

  /**
   * 
   * @param {*} e
   * 附近教育 点击查看更多 进入机构列表
   */
  insSearchList:function(e){
    wx.navigateTo({
      url:'/parentsVersion/parentsInstitutionList/parentsInstitutionList',
    });
  },
 
  /**
   * 
   * @param {*} e 
   * 附近教育 点击进入教师详情
   */
  teaDetails:function(e){
    wx.navigateTo({
      url:'/parentsVersion/parentsTeacherDetails/parentsTeacherDetails?id=' + e.currentTarget.dataset.id,
    });
  },
 
  /**
   * 
   * @param {*} e 
   * 附近教育 点击进入机构详情
   */
  insDetails:function(e){
    wx.navigateTo({
      url:'/parentsVersion/parentsInstitutionDetails/parentsInstitutionDetails?id=' + e.currentTarget.dataset.id,
    });
  },

  /**
   * 
   * @param {*} e
   * 查看附近教师 
   */
  viewNearTeacher:function(){
    app.MapEvent('/parentsVersion/parentsNearTeacherMap/parentsNearTeacherMap','teacher');
  },

  /**
   * 
   * @param {*} e
   * 查看附近机构
   */
  viewNearInstitution:function(){
    app.MapEvent('/parentsVersion/parentsNearTeacherMap/parentsNearTeacherMap','org');
  },

  /**
   * 
   * @param {*} e
   * 找教师 点击事件 
   */
  parentsTeacherPresentClick:function(e){
    let that = this,type = e.currentTarget.dataset.type;
    o.FunPresentClick(that,type,'partentsTeacherSetType');
  },

  /**
   * 
   * @param {*} e
   * 找机构 点击事件 
   */
  partentsCoursePresentClick:function(e){
    let that = this,type = e.currentTarget.dataset.type;
    o.FunPresentClick(that,type,'partentsCourseSetType');
  },

  /**
   * 
   * @param {*} e
   * 找教师 课类组件弹出数据 
   * || ========================== 6/18 张 start
   */
    partentsChange:function(e){
      let that = this,
      parentsTeacherData = e.detail.value,
      parentsteacherArray = that.data.parentsteacherArray,
      sedData = parentsteacherArray[1][e.detail.value[1]],
      data = {"teachItem":sedData};
      o.FunBindMultiPickerChange(that,parentsTeacherData,'teaParentsIndex');
      o.funGoodTeacher(that,data,'app/plat/tea/goodTeacher',0,5,'partentsNearTeacherDatas','1');
    },

    partentsColumnChange:function(e){
      let that = this,
      teaStairType = that.data.parentsteacherArray[0],
      teaParentsIndex = that.data.teaParentsIndex,
      teaSecondaryType = that.data.reqSecondaryData;
      o.FunBindMultiPickerColumnChange(that,e,teaStairType,teaParentsIndex,teaSecondaryType,'parentsteacherArray');
    },
  /**
   * 
   * @param {*} e
   * 找教师 课类组件弹出数据 
   * || ========================== 6/18 张 end
   */

  /**
   * 
   * @param {*} e 
   * 找教师 省市区组件弹出数据 
   * || ========================== 6/18 张 start
   * 
   */
  teaAreaChange:function(e){
    let that = this,
    province = that.data.teaAreaMultiArray[0][e.detail.value[0]],
    city = that.data.teaAreaMultiArray[1][e.detail.value[1]],
    area = that.data.teaAreaMultiArray[2][e.detail.value[2]],
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
                o.funGoodTeacher(that,data,'app/plat/tea/goodTeacher',0,5,'partentsNearTeacherDatas','1');
              }
            }
          }
        }
      }
    }
  },
  teaAreaColumnChange:function(e){
    let that = this,
    teaAreaIndex = that.data.teaAreaIndex,
    teaAreaMultiArray = that.data.teaAreaMultiArray;
    o.funThreeLevelLinkageChange(that,e,teaAreaIndex,teaAreaMultiArray,that.data.needTotalCity,that.data.needMarkProvince,that.data.needMarkCity,that.data.needMarkArea);
    that.setData({
      teaAreaMultiArray:that.data.teaAreaMultiArray,
      teaAreaIndex:that.data.teaAreaIndex
    });
  },
  /**
   * 
   * @param {*} e 
   * 找教师 省市区组件弹出数据 
   * || ========================== 6/18 张 end
   * 
   */

  /**
   * 
   * @param {*} e
   * 找教师 性别选择器
   * || ========================== 6/18 张 start 
   */
    partentsTeaGenderChange:function(e){
      let that = this,
      sendData = that.data.partentsGenderArray[e.detail.value],
      data = {"sex":sendData};
      o.funGoodTeacher(that,data,'app/plat/tea/goodTeacher',0,5,'partentsNearTeacherDatas','1');
    },
  /**
   * 
   * @param {*} e
   * 找教师 性别选择器
   * || ========================== 6/18 张 end
   */


   /**
   * 
   * @param {*} e
   * 找教师 级段组件弹出数据 
   * || ========================== 6/18 张 start
   */
    teaClassChange:function(e){
      let that = this,
      teaCourseData = e.detail.value,
      teaClassMultiArray = that.data.teaClassMultiArray,
      sedData = teaClassMultiArray[0][e.detail.value[0]]+teaClassMultiArray[1][e.detail.value[1]],
      data = {"teachObj":sedData};
      o.FunBindMultiPickerChange(that,teaCourseData,'teaClassIndex');
      o.funGoodTeacher(that,data,'app/plat/tea/goodTeacher',0,5,'partentsNearTeacherDatas','1');
    },
    teaClassColumnChange:function(e){
      let that = this,
      teaStairCourseType = that.data.teaClassMultiArray[0],
      teaClassIndex = that.data.teaClassIndex,
      teaSecondaryCourseType = that.data.teaSecondaryCourseData;
      o.FunBindMultiPickerColumnChange(that,e,teaStairCourseType,teaClassIndex,teaSecondaryCourseType,'teaClassMultiArray');
    },
  /**
   * 
   * @param {*} e
   * 找教师 级段组件弹出数据 
   * || ========================== 6/18 张 end
   */

  /**
   * 
   * @param {*} e
   * 找机构 课类组件弹出数据 
   * || ========================== 6/18 张 start
   */
    partentsInsChange:function(e){
      let that = this,
      partentsInsData = e.detail.value,
      partentsInsMultiArray = that.data.partentsInsMultiArray,
      sedData = partentsInsMultiArray[1][e.detail.value[1]],
      data = {"teachItem":sedData};
      o.FunBindMultiPickerChange(that,partentsInsData,'partentsInsIndex');
      o.funGoodTeacher(that,data,'app/plat/org/goodOrg',0,5,'partentsGoodInstitutions','3');
    },

    partentsInsColumnChange:function(e){
      let that = this,
      partentsInsStairType = that.data.partentsInsMultiArray[0],
      partentsInsIndex = that.data.partentsInsIndex,
      reqSecondaryType = that.data.reqSecondaryData;
      o.FunBindMultiPickerColumnChange(that,e,partentsInsStairType,partentsInsIndex,reqSecondaryType,'partentsInsMultiArray');
    },
  /**
   * 
   * @param {*} e
   * 找机构 课类组件弹出数据
   * || ========================== 6/18 张 end
   */

  /**
   * 
   * @param {*} e 
   * 找机构 省市区组件弹出数据 
   * || ========================== 6/18 张 start
   * 
   */
    insAreaChange:function(e){
      let that = this,
      province = that.data.insAreaMultiArray[0][e.detail.value[0]],
      city = that.data.insAreaMultiArray[1][e.detail.value[1]],
      area = that.data.insAreaMultiArray[2][e.detail.value[2]],
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
                  o.funGoodTeacher(that,data,'app/plat/org/goodOrg',0,5,'partentsGoodInstitutions','3');
                }
              }
            }
          }
        }
      }
    },
    insAreaColumnChange:function(e){
      let that = this,
      insAreaIndex = that.data.insAreaIndex,
      insAreaMultiArray = that.data.insAreaMultiArray;
      o.funThreeLevelLinkageChange(that,e,insAreaIndex,insAreaMultiArray,that.data.needTotalCity,that.data.needMarkProvince,that.data.needMarkCity,that.data.needMarkArea);
      that.setData({
        insAreaMultiArray:that.data.insAreaMultiArray,
        insAreaIndex:that.data.insAreaIndex
      });
    },
  /**
   * 
   * @param {*} e 
   * 找机构 省市区组件弹出数据 
   * || ========================== 6/18 张 end
   * 
   */


   /**
   * 
   * @param {*} e
   * 找机构 服务范围组件弹出数据 
   * || ========================== 6/18 张 start
   */
  insServiceChange:function(e){
    let that = this,
    insServiceData = e.detail.value,
    insServiceMultiArray = that.data.insServiceMultiArray,
    sedData = insServiceMultiArray[0][e.detail.value[0]]+insServiceMultiArray[1][e.detail.value[1]],
    data = {"teachObj":sedData};
    o.FunBindMultiPickerChange(that,insServiceData,'insServiceIndex');
    o.funGoodTeacher(that,data,'app/plat/org/goodOrg',0,5,'partentsGoodInstitutions','3');
  },
  insServiceColumnChange:function(e){
    let that = this,
    insServiceType = that.data.insServiceMultiArray[0],
    insServiceIndex = that.data.insServiceIndex,
    insServiceCourseType = that.data.teaSecondaryCourseData;
    o.FunBindMultiPickerColumnChange(that,e,insServiceType,insServiceIndex,insServiceCourseType,'insServiceMultiArray');
  },
  /**
   * 
   * @param {*} e
   * 找机构 服务范围组件弹出数据 
   * || ========================== 6/18 张 end
   */

/**
 * 附近教育数据点击事件数据请求============================================== end
 */

/**
 * 最新动态数据点击事件数据请求============================================== start
 */

  /**
   * 选择位置
   */
  releaseDynamic:function(){
    let that = this,
    page = 0,
    use = that.data.use,
    token = use.token;
    app.FunGetSeting(callback=>{
      if(callback.authSetting['scope.userLocation'] !== undefined){
        if(callback.authSetting['scope.userLocation']){
          o.FunChooseLocation(data=>{
            let lgnLat = data.longitude + ',' + data.latitude;
            console.log(data,'返回数据1');
            o.FunDynamic(that,lgnLat,page,token,'dynamicInfo');
            that.setData({foundData:data.address});
          });
        }else{
          wx.openSetting({
            success (res) {
              if(res.authSetting['scope.userLocation']){
                o.FunChooseLocation(data=>{
                  console.log(data,'返回数据2');
                  let lgnLat = data.longitude + ',' + data.latitude;
                  o.FunDynamic(that,lgnLat,page,token,'dynamicInfo');
                  that.setData({foundData:data.address});
                });
              }
            }
          })
        }
      }else{
        o.FunGetLocation('gcj02',callback=>{
          if(callback.errMsg === "getLocation:ok"){
            o.FunChooseLocation(callback=>{
              let lngLat = callback.longitude + ',' + callback.latitude;
              console.log(callback,'返回数据3');
              that.setData({foundData:callback.address,lngLat:lngLat});
            });
          }
        });
      }
    });
  },

  /**
   * 评论/点赞等点击事件
   */
  smallIcon:function(e){
    let that = this,
    needIndex = e.currentTarget.dataset.index,
    use = app.globalData.userInfo,
    token = use.token,
    pid = parseInt(e.currentTarget.dataset.id),
    needData = encodeURIComponent(JSON.stringify(e.currentTarget.dataset));
    if(needIndex === 0){
      if(e.currentTarget.dataset.hasadmire){
        o.funShowToast('您已为该动态点赞过，无需重复点赞');
      }else{
        console.log(that.data.dynamicInfo);
        o.FunClickPraise(pid,e.currentTarget.dataset.fbrole,token,callback=>{
          if(callback.statusCode === 200){
            console.log(callback,'点赞数据');
            let dynamicInfo = that.data.dynamicInfo;
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
            o.funShowToast('点赞成功 +1');
          }
        });
      }
    }
    if(needIndex === 1){
      console.log(needData,'数据');
      wx.navigateTo({
        url:'/parentsVersion/parentsReview/parentsReview?needData=' + needData,
      });
    }
  },

  /**
   * 用户点击关注的点击事件
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
   * 图片预览
   */
  previewImg:function(e){
    let that = this,
    index = e.currentTarget.dataset.numindex,
    totalnum = e.currentTarget.dataset.totalnum,
    src = e.currentTarget.dataset.src,
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
 * 最新动态数据点击事件数据请求============================================== end
 */

/**
 * 个人中心数据点击事件数据请求============================================== start
 */

 /**
  * 修改头像
  * @param {*} e 
  */
 customImg:function(){
  wx.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success (res) {
      // tempFilePath可以作为img标签的src属性显示图片
      const tempFilePaths = res.tempFilePaths
      wx.navigateTo({
        url: '/pages/cutFace/cutFace?src=' + tempFilePaths,
      })
    }
  })
 },

 /**
  * 进入消息列表
  * @param {*} e 
  */
 remindClick:function(){
  wx.navigateTo({
    url: '/pages/remind/remind?type=' + 'par',
  })
 },

  /**
   * 
   * @param {*} e
   * 用户点击功能事件 
   */
  funClick:function(e){
    let that = this,num = e.currentTarget.dataset.index,personalFuns = that.data.personalFun,needId = e.currentTarget.dataset.id;
    if(needId !== 4){
      wx.navigateTo({
        url:'/parentsVersion' + personalFuns[num].url,
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
   * 进入日记中心 
   */
  DiaryCenterClick:function(){
    wx.navigateTo({
      url:'/parentsVersion/parentsDiaryCenter/parentsDiaryCenter',
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
 * 个人中心数据点击事件数据请求============================================== end
 */

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this,use = app.globalData.userInfo;
    that.setData({use:use});
    if(that.data.blockid === 0){
      // 首页
      let data = {},
      url = u + 'app/com/teachItem', // 课类接口
      header = {"content-type":"application/json"},
      gradeUrl = u + 'app/com/cascadeGrade';
      // 课类 数据请求
      o.get(url,data,header,callback=>{
        let d = callback.data,teacherClassArray = d.stairType,secondaryData = d.childType;
        that.setData({
          teacherClassArray:teacherClassArray, // 教师产品 课类数据展示
          secondaryData:secondaryData, // 课类的二级数据
          insProductMultiArray:teacherClassArray // 机构产品 课类数据展示
        });
      });

      // 教师/机构 级段 数据请求
      o.get(gradeUrl,data,header,callback=>{
        let d = callback.data,courseMultiArray = d.stairType,secondaryCourseData = d.childType;
        that.setData({
          secondaryCourseData:secondaryCourseData, // 课程产品 级段二级数据
          parentsCourseMultiArray:courseMultiArray, // 教师课程产品 级段数据展示
          insProductGradeArray:courseMultiArray, // 机构课程产品 级段数据展示
        });
      });

      // 教师产品 区域接口数据
      o.funThreeLevelLinkage(that,'parentsAreaMultiArray');
      // 教师产品 价格接口数据
      o.funPriceSort(that,'app/com/priceRange','PrentsGenderArray','parentsSedPriceData');

      // 机构产品 区域接口数据
      o.funThreeLevelLinkage(that,'insProductAreaMultiArray');
      // 机构产品 价格接口数据
      o.funPriceSort(that,'app/com/priceRange','insProductPriceArray','insSedPriceData');


      // 教师课程 产品接口
      o.funGoodTeacher(that,data,'app/plat/tea/courseList',0,5,'ParentsTeacherProductDatas','2');
      // 机构课程产品 产品列表接口
      o.funGoodTeacher(that,data,'app/plat/org/productList',0,5,'parentsInstitutionsCourseList','4');

    }else if(that.data.blockid === 1){
      // 附近教育
      let data = {},
      url = u + 'app/com/teachItem', // 课类接口
      header = {"content-type":"application/json"},
      gradeUrl = u + 'app/com/cascadeGrade'; // 级段接口
      // 课类 数据请求
      o.get(url,data,header,callback=>{
        let d = callback.data,teacherArray = d.stairType,reqSecondaryData = d.childType;
        that.setData({
          parentsteacherArray:teacherArray, // 找教师 课类数据展示
          reqSecondaryData:reqSecondaryData, // 课类的二级数据
          partentsInsMultiArray:teacherArray, // 找机构 课类数据展示
        });
      });
      // 找教师 级段 数据请求
      o.get(gradeUrl,data,header,callback=>{
        let d = callback.data,teaCourseMultiArray = d.stairType,teaSecondaryCourseData = d.childType;
        that.setData({
          teaClassMultiArray:teaCourseMultiArray, // 找教师 级段数据展示
          teaSecondaryCourseData:teaSecondaryCourseData, // 级段二级数据
          insServiceMultiArray:teaCourseMultiArray, // 找机构 服务范围数据展示
        });
      });
      // 找教师 区域接口数据
      o.funThreeLevelLinkage(that,'teaAreaMultiArray');
      // 找机构 区域接口数据
      o.funThreeLevelLinkage(that,'insAreaMultiArray');

      // 教师数据
      o.funGoodTeacher(that,data,'app/plat/tea/goodTeacher',0,5,'partentsNearTeacherDatas','1');
      // 机构数据
      o.funGoodTeacher(that,data,'app/plat/org/goodOrg',0,5,'partentsGoodInstitutions','3');

    }else if(that.data.blockid === 2){
      console.log('测试返回');
      let token = use === ''?'':use.token,
      userId = parseInt(use.user.userId),
      page = 0;
      app.FunGetSeting(callback=>{
        if(callback.authSetting['scope.userLocation'] !== undefined){
          if(callback.authSetting['scope.userLocation']){
            o.FunGetLocation('gcj02',callback=>{
              console.log(callback,'返回数据');
              let lgnLat = callback.longitude + ',' + callback.latitude;
              o.FunDynamic(that,lgnLat,page,token,'dynamicInfo');
            });
          }else{
            let lgnLat = "";
            o.FunDynamic(that,lgnLat,page,token,'dynamicInfo');
          }
        }else{
          let lgnLat = "";
          o.FunDynamic(that,lgnLat,page,token,'dynamicInfo');
        }
      });
      that.setData({userId: userId});
    }else{
      // 个人中心数据加载
      if(use !== ""){
        let userData = {};
        if(use.user.headImg.indexOf('https') !== -1){
          userData.headImg = use.user.headImg;
        }else if(use.user.headImg.indexOf('http') !== -1){
          userData.headImg = use.user.headImg;
        }else{
          userData.headImg = o.down(u,use.user.headImg);
        }
        userData.nickName = use.user.nickName;
        that.setData(userData);
      }
      // 获取用户未读消息数量
      o.FunUnreadNoticeCount(that,'isShowNum');
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
    let that = this,use = that.data.use;
    if(that.data.blockid === 2){
      console.log('测试返回');
      let token = use === ''?'':use.token,
      page = 0;
      app.FunGetSeting(callback=>{
        if(callback.authSetting['scope.userLocation'] !== undefined){
          if(callback.authSetting['scope.userLocation']){
            o.FunGetLocation('gcj02',callback=>{
              console.log(callback,'返回数据');
              let lgnLat = callback.longitude + ',' + callback.latitude;
              o.FunDynamic(that,lgnLat,page,token,'dynamicInfo');
            });
          }else{
            let lgnLat = "";
            o.FunDynamic(that,lgnLat,page,token,'dynamicInfo');
          }
        }else{
          let lgnLat = "";
          o.FunDynamic(that,lgnLat,page,token,'dynamicInfo');
        }
      });
    }else if(that.data.blockid === 3){
      console.log(use,'用户数据');
      // 个人中心数据加载
      if(use !== ""){
        let userData = {};
        if(use.user.headImg.indexOf('https') !== -1){
          userData.headImg = use.user.headImg;
        }else if(use.user.headImg.indexOf('http') !== -1){
          userData.headImg = use.user.headImg;
        }else{
          userData.headImg = o.down(u,use.user.headImg);
        }
        userData.nickName = use.user.nickName;
        that.setData(userData);
      }
    }
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