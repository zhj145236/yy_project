// teacherVersion/teacherResume/teacherResume.js
const datas = require('../../utils/data.js');
const app = getApp(), o = app.requirejs('core');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nums:0,
    chooseCoupons:['制作简历','我的简历','我的投递','谁查看了我'],
    resumeTitle:'求职简历书',
    resumeName:'XXXX',
    isShowSex:true,
    isTrue:true,
    parentsInfoIndex:[0,0,0],
    county:11201, // 默认 厚街镇 // 求职地点
    recordIndex:0,
    myRecord:'本科', // 最高学历
    resumeTel:'130xxxxxxxx', // 电话
    resumeJob:'语文', // 求职职位
    resumeSalary:'80', // 每节价格
    descNums:0,
    tagNums:0, // 标签数量
    estimateNums:0, // 评价字数
    workYear:3, // 工作年限
  },

  /**
   * 用户选择性别
   * @param {*} e 
   */
  sexClick:function(e){
    let that = this;
    if(e.currentTarget.dataset.sextype === 'nan'){
      that.setData({isShowSex:true,sex:'男'});
    }else{
      that.setData({isShowSex:false,sex:'女'});
    }
  },

  /**
   * 
   * @param {*} options
   * 简历中心选项 
   */
  chooseCoupons:function(e){
    console.log(e);
    let that = this,index = e.currentTarget.dataset.index,type = e.currentTarget.dataset.type;
    that.setData({
      nums:index
    });
  },

  

    /**
   * 
   * @param {*} e 
   * 省市区组件弹出数据 
   * || ========================== 6/18 张 start
   * 
   */
  resumeChagne:function(e){
    // console.log(e.detail.value,'点击确定按钮的样式');
    let that = this,
    province = that.data.resumeAreaMultiArray[0][e.detail.value[0]],
    city = that.data.resumeAreaMultiArray[1][e.detail.value[1]],
    area = that.data.resumeAreaMultiArray[2][e.detail.value[2]],
    needDataArea = that.data.needDataArea;
    console.log(needDataArea);
    for(let i in needDataArea){
      if(province === needDataArea[i].name){
        for(let s in needDataArea[i].child){
          if(city === needDataArea[i].child[s].name){
            for(let a in needDataArea[i].child[s].child){
              if(area === needDataArea[i].child[s].child[a].name){
                let countyCode = needDataArea[i].child[s].child[a].id,
                myLocation = needDataArea[i].child[s].child[a].name;
                that.setData({myLocation:myLocation,county:countyCode});
              }
            }
          }
        }
      }
    }
  },
  resumeColumnChange:function(e){
    let that = this,
    resumeIndex = that.data.resumeIndex,
    resumeAreaMultiArray = that.data.resumeAreaMultiArray;
    o.funThreeLevelLinkageChange(that,e,resumeIndex,resumeAreaMultiArray,that.data.needTotalCity,that.data.needMarkProvince,that.data.needMarkCity,that.data.needMarkArea);
    that.setData({
      resumeAreaMultiArray:that.data.resumeAreaMultiArray,
      resumeIndex:that.data.resumeIndex
    });
  },
  /**
   * 
   * @param {*} e 
   * 省市区组件弹出数据 
   * || ========================== 6/18 张 end
   * 
   */

    /**
   * 
   * @param {*} e
   * 课程产品 价格组件弹出数据 
   * || ========================== 6/18 张 start
   */
  recordChagne:function(e){
    let that = this,
    sedRecordData = that.data.sedRecordData[e.detail.value].label;
    // console.log(sedRecordData,'学历');
    that.setData({myRecord:sedRecordData});
  },
  /**
   * 
   * @param {*} e
   * 课程产品 价格组件弹出数据 
   * || ========================== 6/18 张 end
   */

  /**
   * 用户点击标签或评论
   * @param {*} options 
   */
  chooseClick:function(e){
    let that = this,
    useTagInfo = that.data.useTagInfo === undefined?'':that.data.useTagInfo,
    textareaValue = that.data.textareaValue === undefined?'':that.data.textareaValue,
    jobExperience = that.data.jobExperience === undefined?'':that.data.jobExperience;
    
    if(e.currentTarget.dataset.label === '1'){
      wx.navigateTo({
        url: '/teacherVersion/teaTags/teaTags?label=' + e.currentTarget.dataset.label + '&useTagInfo=' + useTagInfo,
      })
    }else if(e.currentTarget.dataset.label === '2'){
      wx.navigateTo({
        url: '/teacherVersion/teaTags/teaTags?label=' + e.currentTarget.dataset.label + '&textareaValue=' + textareaValue,
      })
    }else{
      wx.navigateTo({
        url: '/teacherVersion/teaTags/teaTags?label=' + e.currentTarget.dataset.label + '&jobExperience=' + jobExperience,
      })
    }
  },

  /**
   * 提交数据
   * @param {*} options 
   */
  formSubmit:function(e){
    let that = this,
    title = '', // 简历标题
    name = '', // 真实姓名
    workYear = '', // 工作年限
    sex = '', // 性别
    countyCode = '', // 区代码
    jobExperience = ''; // 工作经历描述
    console.log(e,'需要提交的数据');
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    // 获取设备的信息
    o.getSystemInfo(callback=>{
      that.setData({windowHeight:callback.windowHeight - 310 + 'px'});
    })
    // 查看我的简历
    o.FunResume(that);
    // 授课教师 区域接口数据
    o.funThreeLevelLinkage(that,'resumeAreaMultiArray');
    // 最高学历接口数据请求
    o.funPriceSort(that,'app/com/dict/educational_limit','recordAreaMultiArray','sedRecordData');
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
    let that = this,
    pages = getCurrentPages(), // 创建页面栈
    currentPage = pages[pages.length - 1]; // 当前页面
    if(currentPage.__data__.useTagInfo !== undefined){
      let useTagInfo = currentPage.__data__.useTagInfo; // 用户添加的标签
      if(useTagInfo.length !== 0){
        console.log(currentPage.__data__.useTagInfo,'用户的标签数据');
        that.setData({useTagInfo:useTagInfo,tagNums:useTagInfo.length});
      }else{
        that.setData({tagNums:0});
      }
    }
    if(currentPage.__data__.textareaValue !== undefined){
      let textareaValue = currentPage.__data__.textareaValue; // 用户添加的标签
      if(textareaValue !== ""){
        that.setData({textareaValue:textareaValue,estimateNums:textareaValue.length});
      }else{
        that.setData({estimateNums:0});
      }
    }
    if(currentPage.__data__.dexcTextarea !== undefined){
      let jobExperience = currentPage.__data__.dexcTextarea; // 用户添加的标签
      if(jobExperience !== ""){
        that.setData({jobExperience:jobExperience,descNums:jobExperience.length});
      }else{
        that.setData({descNums:0});
      }
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('页面隐藏了');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('页面卸载了');
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