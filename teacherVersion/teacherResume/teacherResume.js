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
    isTrue:true,
    parentsInfoIndex:[0,0,0],
    recordIndex:0,
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
    dexcTextarea = that.data.dexcTextarea === undefined?'':that.data.dexcTextarea;
    
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
        url: '/teacherVersion/teaTags/teaTags?label=' + e.currentTarget.dataset.label + '&dexcTextarea=' + dexcTextarea,
      })
    }
  },

  /**
   * 简历标题验证
   * @param {*} e 
   */
  resumeTitleBindblur:function(e){
    let that = this;
    o.ridBlankSpace('resumeTitle',that,e.detail.value); // 去除空格
    if(e.detail.value === ""){
      o.funShowToast('简历标题不能为空');
      return;
    }else{
      that.setData({resumeTitle:e.detail.value});
    }
  },

  /**
   * 姓名验证
   * @param {*} e 
   */
  resumeNameBindblur:function(e){
    let that = this;
    o.ridBlankSpace('resumeName',that,e.detail.value); // 去除空格
    if(e.detail.value === ""){
      o.funShowToast('姓名不能为空');
      return;
    }else{
      that.setData({resumeName:e.detail.value});
    }
  },
  
  /**
   * 工作年限验证
   * @param {*} e 
   */
  workYearBindblur:function(e){
    let that = this;
    o.ridBlankSpace('workYear',that,e.detail.value); // 去除空格
    if(e.detail.value === ""){
      o.funShowToast('工作年限不能为空');
      return;
    }else{
      that.setData({workYear:e.detail.value});
    }
  },
  
  /**
   * 应聘职位验证
   * @param {*} e 
   */
  resumeJobBindblur:function(e){
    let that = this;
    o.ridBlankSpace('resumeJob',that,e.detail.value); // 去除空格
    if(e.detail.value === ""){
      o.funShowToast('应聘职位不能为空');
      return;
    }else{
      that.setData({resumeJob:e.detail.value});
    }
  },
  
  /**
   * 薪资验证
   * @param {*} e 
   */
  resumeSalaryBindblur:function(e){
    let that = this;
    o.ridBlankSpace('resumeSalary',that,e.detail.value); // 去除空格
    if(e.detail.value === ""){
      o.funShowToast('期望薪资不能为空');
      return;
    }else{
      that.setData({resumeSalary:e.detail.value});
    }
  },
  
  /**
   * 联系方式验证
   * @param {*} e 
   */
  resumeTelBindblur:function(e){
    let that = this,validationPhone = /^1[3456789]\d{9}$/;
    o.ridBlankSpace('resumeTel',that,e.detail.value); // 去除空格
    if(e.detail.value === ""){
      o.funShowToast('联系方式不能为空');
      return;
    }else if(!validationPhone.test(e.detail.value)){
      o.funShowToast('手机号输入有误，请重新输入');
      that.setData({resumeTel:''});
      return;
    }else{
      that.setData({resumeTel:e.detail.value});
    }
  },
  
  /**
   * 提交数据
   * @param {*} options 
   */
  formSubmit:function(e){
    let that = this,
    title = e.detail.value.resumeTitle, // 简历标题
    name = e.detail.value.resumeName, // 真实姓名
    workYear = e.detail.value.workYear, // 工作年限
    sex = that.data.sex, // 性别
    countyCode = that.data.county, // 区代码
    jobExperience = that.data.dexcTextarea === undefined?'':that.data.dexcTextarea, // 工作经历描述
    highestEducational = that.data.myRecord, // 最高学历
    evaluate = that.data.textareaValue === undefined?'':that.data.textareaValue, // 自我评价
    wantJob = e.detail.value.resumeJob, // 应聘职位
    salary = e.detail.value.resumeSalary, // 期望薪资
    tel = e.detail.value.resumeTel, // 电话
    email = e.detail.value.resumeEmail, // 邮箱
    tags = '',
    useTagInfo = that.data.useTagInfo; // 标签
    if(useTagInfo !== undefined && useTagInfo.length !== 0){
      if(useTagInfo.length === 1){
        tags = useTagInfo[0];
      }else{
        let len = useTagInfo.length;
        for(let i=0;i<useTagInfo.length-1;i++){
          tags += useTagInfo[i] + ';';
        }
        tags += useTagInfo[len-1];
      }
    }
    // 验证
    o.ridBlankSpace('resumeTitle',that,e.detail.value.resumeTitle); // 去除空格
    o.ridBlankSpace('resumeName',that,e.detail.value.resumeName); // 去除空格
    o.ridBlankSpace('workYear',that,e.detail.value.workYear); // 去除空格
    o.ridBlankSpace('resumeJob',that,e.detail.value.resumeJob); // 去除空格
    o.ridBlankSpace('resumeSalary',that,e.detail.value.resumeSalary); // 去除空格
    if(that,e.detail.value.resumeTitle === ""){
      o.funShowToast('简历标题不能为空');
      return;
    }else{
      that.setData({resumeTitle:e.detail.value.resumeTitle});
    }
    
    if(e.detail.value.resumeName === ""){
      o.funShowToast('姓名不能为空');
      return;
    }else{
      that.setData({resumeName:e.detail.value.resumeName});
    }
    
    if(e.detail.value.workYear === ""){
      o.funShowToast('工作年限不能为空');
      return;
    }else{
      that.setData({workYear:e.detail.value.workYear});
    }
    
    if(e.detail.value.resumeJob === ""){
      o.funShowToast('应聘职位不能为空');
      return;
    }else{
      that.setData({resumeJob:e.detail.value.resumeJob});
    }
    
    if(e.detail.value.resumeSalary === ""){
      o.funShowToast('期望薪资不能为空');
      return;
    }else{
      that.setData({resumeSalary:e.detail.value.resumeSalary});
    }

    const validationPhone = /^1[3456789]\d{9}$/;
    o.ridBlankSpace('resumeTel',that,e.detail.value.resumeTel); // 去除空格
    if(e.detail.value.resumeTel === ""){
      o.funShowToast('联系方式不能为空');
      return;
    }else if(!validationPhone.test(e.detail.value.resumeTel)){
      o.funShowToast('手机号输入有误，请重新输入');
      that.setData({resumeTel:''});
      return;
    }else{
      that.setData({resumeTel:e.detail.value.resumeTel});
    }
    if(e.detail.value.resumeEmail !== ""){
      o.ridBlankSpace('resumeEmail',that,e.detail.value.resumeEmail); // 去除空格
      const emailReg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
      if(!emailReg.test(e.detail.value.resumeEmail)){
        o.funShowToast('邮箱格式输入有误，请重新输入');
        that.setData({resumeEmail:''});
        return;
      }else{
        let setEmail = e.detail.value.resumeEmail.replace(/。/g,"."),
        newEmail = '';
        for(let i=0;i<setEmail.length;i++){
          if(setEmail[i] >= 'A' && setEmail[i] <= 'Z'){
            newEmail += setEmail[i].toLowerCase();
          }else{
            newEmail += setEmail[i];
          }
        }
        that.setData({resumeEmail:newEmail});
      }
    }else{
      that.setData({resumeEmail:''});
    }
    const setData = {};
    setData.title =  title;
    setData.name = name;
    setData.workYear = workYear;
    setData.sex = sex;
    setData.countyCode = countyCode;
    setData.jobExperience = jobExperience;
    setData.highestEducational = highestEducational;
    setData.tags = tags;
    setData.evaluate = evaluate;
    setData.wantJob = wantJob;
    setData.salary = salary;
    setData.tel = tel;
    setData.email = that.data.resumeEmail;
    if(that.data.id !== undefined && that.data.id !== ""){
      setData.id = that.data.myResumeInfo.id;
    }
    if(that.data.tid !== undefined && that.data.tid !== ""){
      setData.tid = that.data.myResumeInfo.tid;
    }
    console.log(setData,'需要提交的简历数据');
    o.FunSaveResume(that,setData);
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    // 获取设备的信息
    o.getSystemInfo(callback=>{
      that.setData({windowHeight:callback.windowHeight - 310 + 'px'});
    })
    // 查看我的简历
    o.FunResume(that,'myResumeInfo');
    // 授课教师 区域接口数据
    o.funThreeLevelLinkage(that,'resumeAreaMultiArray');
    // 最高学历接口数据请求
    o.funPriceSort(that,'app/com/dict/educational_limit','recordAreaMultiArray','sedRecordData');
    // 我的投递记录
    o.FunDeliverRecord(that,'insRecruitInfo');
    // 谁查看了我的简历
    o.FunMyResumeViewList();
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
      console.log(currentPage.__data__.useTagInfo,'用户的标签数据');
      if(useTagInfo.length !== 0){
        that.setData({useTagInfo:useTagInfo,useTagInfoArr:useTagInfo,tagNums:useTagInfo.length});
      }else{
        that.setData({tagNums:0});
      }
    }
    if(currentPage.__data__.textareaValue !== undefined){
      let textareaValue = currentPage.__data__.textareaValue; // 用户添加的评价
      console.log(currentPage.__data__.textareaValue,'用户的自我评价');
      if(textareaValue !== ""){
        that.setData({textareaValue:textareaValue,estimateNums:textareaValue.length});
      }else{
        that.setData({estimateNums:0});
      }
    }
    if(currentPage.__data__.dexcTextarea !== undefined){
      let dexcTextarea = currentPage.__data__.dexcTextarea; // 用户添加的工作经历描述
      console.log(currentPage.__data__.dexcTextarea,'用户的工作描述');
      if(dexcTextarea !== ""){
        that.setData({dexcTextarea:dexcTextarea,descNums:dexcTextarea.length});
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