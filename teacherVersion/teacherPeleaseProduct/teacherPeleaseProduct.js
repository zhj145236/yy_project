// teacherVersion/teacherPeleaseProduct/teacherPeleaseProduct.js
const datas = require('../../utils/data.js');
const app = getApp(), o = app.requirejs('core');
const dataTime = new Date();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newArr:[],
    needUrl:[], // 提交图片的容器数组
    oneArr:[],
    isUpload:true,
    classTitle:'XXX课程',
    placeArray:['教师家','悦优场地','其他'],
    objectPlaceArray:[{id: 0,name: '教师家'},{id: 1,name: '悦优场地'},{id: 2,name: '其他'}],
    SetClassIndex:[0,0],
    typeIndex:0,
    siteIndex:0,
    startDate:(dataTime.getFullYear()) + '-' + (((dataTime.getMonth()+1)<10)?'0' + (dataTime.getMonth()+1):(dataTime.getMonth()+1)) + '-' + ((dataTime.getDate())<10? + '0' + (dataTime.getDate()):(dataTime.getDate())),
    endDate:(dataTime.getFullYear()) + '-' + (((dataTime.getMonth()+1)<10)?'0' + (dataTime.getMonth()+1):(dataTime.getMonth()+1)) + '-' + ((dataTime.getDate())<10? + '0' + (dataTime.getDate()):(dataTime.getDate())),
    classesDate:(dataTime.getFullYear()) + '-' + (((dataTime.getMonth()+1)<10)?'0' + (dataTime.getMonth()+1):(dataTime.getMonth()+1)) + '-' + ((dataTime.getDate())<10? + '0' + (dataTime.getDate()):(dataTime.getDate())),
    sectionNum:15,
    singlePrice:100,
    startDateTime:(dataTime.getHours()<10?('0' + dataTime.getHours()):dataTime.getHours()) + ':' + (dataTime.getMinutes()<10?('0' + dataTime.getMinutes()):dataTime.getMinutes()),
    endDateTime:(dataTime.getHours()<10?('0' + dataTime.getHours()):dataTime.getHours()) + ':' + (dataTime.getMinutes()<10?('0' + dataTime.getMinutes()):dataTime.getMinutes()),
    classesDateTime:(dataTime.getHours()<10?('0' + dataTime.getHours()):dataTime.getHours()) + ':' + (dataTime.getMinutes()<10?('0' + dataTime.getMinutes()):dataTime.getMinutes()),
    startCouponsDateTime:(dataTime.getHours()<10?('0' + dataTime.getHours()):dataTime.getHours()) + ':' + (dataTime.getMinutes()<10?('0' + dataTime.getMinutes()):dataTime.getMinutes()),
    endCouponsDateTime:(dataTime.getHours()<10?('0' + dataTime.getHours()):dataTime.getHours()) + ':' + (dataTime.getMinutes()<10?('0' + dataTime.getMinutes()):dataTime.getMinutes()),
    ClassStartTime:(dataTime.getHours()<10?('0' + dataTime.getHours()):dataTime.getHours()) + ':' + (dataTime.getMinutes()<10?('0' + dataTime.getMinutes()):dataTime.getMinutes()),
    ClassEndTime:(dataTime.getHours()<10?('0' + dataTime.getHours()):dataTime.getHours()) + ':' + (dataTime.getMinutes()<10?('0' + dataTime.getMinutes()):dataTime.getMinutes()),
    startCouponsDate:(dataTime.getFullYear()) + '-' + (((dataTime.getMonth()+1)<10)?'0' + (dataTime.getMonth()+1):(dataTime.getMonth()+1)) + '-' + ((dataTime.getDate())<10? + '0' + (dataTime.getDate()):(dataTime.getDate())),
    endCouponsDate:(dataTime.getFullYear()) + '-' + (((dataTime.getMonth()+1)<10)?'0' + (dataTime.getMonth()+1):(dataTime.getMonth()+1)) + '-' + ((dataTime.getDate())<10? + '0' + (dataTime.getDate()):(dataTime.getDate())),
    isWelfare:false,
    switch1Checked:false,
    switch2Checked:false,
    switch3Checked:false,
    couponsDetails:datas.couponsDetails,
    couponsSum:80,
    couponsDesc:'该优惠券仅供该课程使用',
    couponsName:'XXX课程',
  },

  checkboxChange:function(e){
    let that = this,
    value = e.detail.value;
    if(value.length === 0){
      that.setData({isWelfare:false});
    }else{
      for(let i in value){
        if(value[i] === '其他'){
          that.setData({isWelfare:true});
          break;
        }else{
          that.setData({isWelfare:false});
        }
      }
      that.setData({value:value});
    }
  },

  FunSwitchChange:function(f,e,d){
    let vd = e.detail.value;
    f.setData({[d]:vd});
  },

  switch1Change:function(e){
    let that = this;
    if(!(e.detail.value)){
      that.setData({
        switch2Checked:false,
        switch3Checked:false,
      });
    }
    this.FunSwitchChange(that,e,'switch1Checked');
  },

  switch2Change:function(e){
    let that = this;
    this.FunSwitchChange(that,e,'switch2Checked');
  },

  switch3Change:function(e){
    let that = this;
    this.FunSwitchChange(that,e,'switch3Checked');
  },

  /**
   * 
   * @param {*} options
   * 上传产品详情图片
   */
  uploadImg:function(){
    let that = this,needUrl = that.data.needUrl;
    tempFilePathsArr = that.data.tempFilePathsArr;
    o.FunchooseImage(that,that.data.newArr,8,['compressed'],['album', 'camera'],tempFilePathsArr,'tempFilePathsArr',callback=>{
      let tempFilePaths = callback.tempFilePaths,
      len = tempFilePaths.length,
      use = that.data.use,
      token = use.token;
      for(let z=0;z<len;z++){
        o.FunUploadImg(z,'file',token,tempFilePaths,callback=>{
          console.log(callback,'返回上传图片的信息');
          if(Number(z+1) == len){
            wx.hideLoading();
            o.funShowToast('已经完成上传了');
          }
          needUrl.push(JSON.parse(decodeURIComponent(callback.data)).url);
          that.setData({isUploadVedio:false});
        });
      }
    });
  },

  /**
   * 删除图片
   * @param {*} e 
   */
  dealImg:function(e){
    o.alert('提示','请确定您是否要删除该图片',callback=>{
      if(callback.confirm){
        let that = this,
        nums = e.currentTarget.dataset.nums,
        needUrl = that.data.needUrl,
        tempFilePathsArr = that.data.tempFilePathsArr,
        data = [needUrl[nums]];
        o.FunDealImg(that,data,tempFilePathsArr,needUrl,nums,'tempFilePathsArr','needUrl');
      }
    });
  },

  /**
   * 
   * @param {*} e 
   * 图片预览
   */
  previewImg:function(e){
    let that = this,
    index = e.currentTarget.dataset.index,
    tempFilePathsArr = that.data.tempFilePathsArr;
    wx.previewImage({
      current: tempFilePathsArr[index], //当前显示图片
      urls: tempFilePathsArr //所有图片
    });
  },

  /**
   * 单张产品图预览
   * @param {*} e 
   */
  lookImg:function(e){
    let that = this,
    // index = e.currentTarget.dataset.lookindex,
    lookImg = [that.data.productCoverImg];
    wx.previewImage({
      current: lookImg[0], //当前显示图片
      urls: lookImg //所有图片
    });
  },

  /**
   * 删除单张图片数据
   * （尚未封装，使用场景不多，封装文件core.js已经有对删除多张图片的数据进行封装）
   */
  dealClick:function(){
    o.alert('提示','请确定您是否要删除该图片',callback=>{
      if(callback.confirm){
        console.log(this.data.imgPath,'图片路径')
        let that = this,
        url = o.urlCon() + 'api/pictures/url',
        data = [that.data.imgPath],
        use = app.globalData.userInfo,
        token = use.token,
        header = {"content-type":"application/json","Authorization":token};
        o.delete(url,data,header,callback=>{
          if(callback.statusCode === 200){
            o.funShowToast('删除成功');
            that.setData({
              productCoverImg:'',
              isHideImg:false
            });
          }
        });
      }
    });
  },



  /**
   * 
   * @param {*} options
   * 产品封面图上传 
   */
  coverImg:function(){
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

  // 授课方式
  // bindPickerChange: function(e) {
  //   console.log(e)
  //   this.setData({
  //     typeIndex: e.detail.value
  //   })
  // },

  // 报名开始时间
  startBindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startDate: e.detail.value
    })
  },
  startBindDateTimeChange:function(e){
    this.setData({
      startDateTime: e.detail.value
    })
  },

  // 报名结束时间
  endBindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endDate: e.detail.value
    })
  },
  endDateTimeChange:function(e){
    this.setData({
      endDateTime: e.detail.value
    })
  },

  // 优惠券有效日期开始
  startCouponsBindDateChange:function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startCouponsDate: e.detail.value
    })
  },
  startCouponsDateTimeChange:function(e){
    this.setData({
      startCouponsDateTime: e.detail.value
    })
  },

   // 优惠券有效日期结束
   endCouponsBindDateChange:function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endCouponsDate: e.detail.value
    })
  },
  endCouponsDateTimeChange:function(e){
    this.setData({
      endCouponsDateTime: e.detail.value
    })
  },

  // 上课开始时间
  startBindTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      ClassStartTime: e.detail.value
    })
  },

  // 上课开始时间
  endBindTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      ClassEndTime: e.detail.value
    })
  },

  // 开课日期
  classesDateChange:function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      classesDate: e.detail.value
    })
  },
  classesDateTimeChange:function(e){
    this.setData({
      classesDateTime: e.detail.value
    })
  },

  /**
   * 
   * @param {*} options
   * 授课地点 
   */
  placeBindPickerChange:function(e){
    let that = this,
    placeArray = that.data.placeArray;
    this.setData({
      siteIndex: e.detail.value,
      teachSite:placeArray[parseInt(e.detail.value)]
    })
  },

  /**
   * 选择级段
   */
  bindSetClassChange: function (e) {
    let that = this,
    ClassData = e.detail.value,
    SetClassArray = that.data.SetClassArray,
    sedData = SetClassArray[0][e.detail.value[0]]+SetClassArray[1][e.detail.value[1]];
    that.setData({teachObj:sedData});
    o.FunBindMultiPickerChange(that,ClassData,'SetClassIndex');
  },

  bindSetClassColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    let that = this,
    ClassCourseType = that.data.SetClassArray[0],
    SetClassIndex = that.data.SetClassIndex,
    SetClassCourseType = that.data.SetClassCourseData;
    o.FunBindMultiPickerColumnChange(that,e,ClassCourseType,SetClassIndex,SetClassCourseType,'SetClassArray');
  },

  /**
   * 课程节数失去焦点验证
   * @param {*} e 
   */
  sectionBindblur:function(e){
    console.log(e.detail.value,'111');
    let that = this;
    o.ridBlankSpace('sectionNum',that,e.detail.value); // 去除空格
    if(e.detail.value === ""){
      o.funShowToast('课程节数不能为空');
      return;
    }else{
      that.setData({sectionNum:e.detail.value});
    }
  },

  /**
   * 课程单价失去焦点验证
   * @param {*} e 
   */
  singleBindblur:function(e){
    let that = this;
    o.ridBlankSpace('singlePrice',that,e.detail.value); // 去除空格
    if(e.detail.value === ""){
      o.funShowToast('课程单价不能为空');
      return;
    }else{
      that.setData({singlePrice:e.detail.value});
    }
  },

  /**
   * 
   * @param {*} options
   * 提交数据 
   */
  formSubmit:function(e){
    let that = this,
    title = e.detail.value.classTitle, // 标题
    banner = that.data.imgPath, // 产品封面图
    teachItem = e.detail.value.classType, // 该课程所属科目
    teachSite = that.data.placeArray[that.data.siteIndex], // 授课地点
    teachObj = that.data.teachObj === undefined?that.data.SetClassArray[0][that.data.SetClassIndex[0]] + that.data.SetClassArray[1][that.data.SetClassIndex[1]]:that.data.teachObj, // 授课范围
    ClassStartTime = that.data.ClassStartTime, // 上课开始时间
    ClassEndTime = that.data.ClassEndTime, // 上课结束时间
    enterStartDay = that.data.startDate, // 报名开始时间
    enterEndDay = that.data.endDate, // 报名结束时间
    startTime = that.data.classesDate, // 正式上课的日期
    desc = e.detail.value.classDesc, // 课程描述
    setCount = e.detail.value.sectionNum, // 总节数
    unitPrice = e.detail.value.singlePrice, // 单价
    price = e.detail.value.totalPrice, // 总价
    needUrl = that.data.needUrl,
    poosImg = '', // 需要上传的图片格式重新整理
    welfare = e.detail.value.welfare,
    welfareData = that.data.value === undefined?[]:that.data.value, // 福利待遇
    welfareValue = ''; // 福利待遇数据处理
    if(needUrl.length !== 0){
      if(needUrl.length === 1){
        poosImg += needUrl[0];
      }else{
        let len = needUrl.length;
        for(let i=0;i<needUrl.length-1;i++){
          poosImg += needUrl[i] + ',';
        }
        poosImg += needUrl[len-1];
      }
    }
    if(welfareData.length !== 0){
      let len = welfareData.length;
      for(let i=0;i<len;i++){
        if(welfareData[i] === '其他'){
          welfareData.splice(i,1);
          break;
        }
      }
    }
    if(welfareData.length !== 0){
      console.log(welfare,'自己填写的值A');
      if(that.data.isWelfare){
        console.log('A');
        if(welfare !== ''){
          console.log('B');
          if(welfareData.length === 1){
            console.log('C');
            welfareValue += (welfareData[0] + ',' + welfare);
          }else{
            console.log('D');
            let len = welfareData.length;
            for(let i=0;i<len;i++){
              welfareValue += welfareData[i] + ',';
            }
            welfareValue +=  welfare;
          }
        }else{
          console.log('E');
          if(welfareData.length === 1){
            console.log('F');
            welfareValue += welfareData[0];
          }else{
            console.log('G');
            let len = welfareData.length;
            for(let i=0;i<len-1;i++){
              welfareValue += welfareData[i] + ',';
            }
            welfareValue += welfareData[len-1];
          }
        }
      }else{
        console.log('H');
        if(welfareData.length === 1){
          console.log('I');
          welfareValue += welfareData[0];
        }else{
          console.log('J');
          let len = welfareData.length;
          for(let i=0;i<len-1;i++){
            welfareValue += welfareData[i] + ',';
          }
          welfareValue += welfareData[len-1];
        }
      }
    }else{
      console.log('K');
      if(that.data.isWelfare){
        console.log('L');
        if(welfare !== ''){
          console.log('M');
          welfareValue += welfare;
        }else{
          console.log('N');
          welfareValue += '';
        }
      }else{
        console.log('O');
        welfareValue += '';
      }
    }

    // 课程标题非空验证
    if(title === ""){
      o.funShowToast('提交失败，课程标题不能为空');
      return;
    }

    // 课程描述非空验证
    if(desc === ""){
      o.funShowToast('提交失败，课程描述不能为空');
      return;
    }

    // 报名日期大小比较
    if(new Date(enterStartDay).valueOf((new Date(enterStartDay))) - new Date(enterEndDay).valueOf((new Date(enterEndDay))) === 0){
      o.funShowToast('报名开始日期与结束日期不能相同');
      return;
    }else if(new Date(enterStartDay).valueOf((new Date(enterStartDay))) - new Date(enterEndDay).valueOf((new Date(enterEndDay))) > 0){
      o.funShowToast('报名开始日期不能大于结束日期');
      return;
    }

    // 上课日期与报名结束日期比较
    if(new Date(startTime).valueOf((new Date(startTime))) - new Date(enterEndDay).valueOf((new Date(enterEndDay))) === 0){
      o.funShowToast('开课日期与报名结束日期不能相同');
      return;
    }else if(new Date(startTime).valueOf((new Date(startTime))) - new Date(enterEndDay).valueOf((new Date(enterEndDay))) < 0){
      o.funShowToast('开课日期不能小于报名结束日期');
      return;
    }
    
    // 上课开始时间与上课结束时间比较
    let nt1 = ClassStartTime.split(':'),
    nt2 = ClassEndTime.split(':');
    if(parseInt(nt1[0]) === parseInt(nt2[0])){
      if(parseInt(nt1[1]) === parseInt(nt2[1])){
        o.funShowToast('上课开始时间不能等于上课结束时间');
        return;
      }else if(parseInt(nt1[1]) > parseInt(nt2[1])){
        o.funShowToast('上课开始时间不能大于上课结束时间');
        return;
      }
    }else if(parseInt(nt1[0]) > parseInt(nt2[0])){
      o.funShowToast('上课开始时间不能大于上课结束时间');
      return;
    }

    // 设置优惠券字段验证
    if(that.data.switch3Checked){
      var teaCoupon = {};
      teaCoupon.title = e.detail.value.couponsName; // 优惠券标题
      teaCoupon.desc = e.detail.value.couponsDesc; // 优惠券描述
      teaCoupon.couponType1 = e.detail.value.couponsSum; // 优惠券金额
      if(new Date(that.data.startCouponsDate).valueOf((new Date(that.data.startCouponsDate))) - new Date(that.data.endCouponsDate).valueOf((new Date(that.data.endCouponsDate))) === 0){
        o.funShowToast('优惠券有效开始日期与结束日期不能相同');
        return;
      }else if(new Date(that.data.startCouponsDate).valueOf((new Date(that.data.startCouponsDate))) - new Date(that.data.endCouponsDate).valueOf((new Date(that.data.endCouponsDate))) > 0){
        o.funShowToast('优惠券有效开始日期不能大于结束日期');
        return;
      }
      teaCoupon.beginTime = that.data.startCouponsDate + ' ' + that.data.startCouponsDateTime + ':00'; // 优惠券有效期开始时间
      teaCoupon.endTime = that.data.endCouponsDate + ' ' + that.data.endCouponsDateTime + ':00'; // 优惠券有效期结束时间
    }else{
      var teaCoupon = {};
    }
    
    const data = {
      "title": title,
      "banner": banner === undefined?'':banner,
      "detailImgs": poosImg === undefined?'':poosImg,
      "desc": desc,
      "teachItem": teachItem,
      "teachSite": teachSite,
      "teachObj": teachObj,
      "teachBoon": welfareValue,
      "price": parseInt(price),
      "setCount": parseInt(setCount),
      "unitPrice": parseInt(unitPrice),
      "attendTime": ClassStartTime + '-' + ClassEndTime,
      "enterStartDay": enterStartDay + ' ' + that.data.startDateTime + ':00',
      "enterEndDay": enterEndDay + ' ' + that.data.endDateTime + ':00',
      "startTime": startTime + ' ' + that.data.classesDateTime + ':00',
      "teaCoupon": teaCoupon,
    }
    console.log(data,'提交的数据data');
    o.FunSaveCourse(data);
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this,use = app.globalData.userInfo,
    data = {},
    header = {"content-type":"application/json"},
    // 授课教师 级段
    gradeUrl = o.urlCon() + 'app/com/cascadeGrade';
    that.setData({use:use});
    // 授课教师 级段 数据请求
    o.get(gradeUrl,data,header,callback=>{
      let d = callback.data,SetClassArray = d.stairType,SetClassCourseData = d.childType;
      that.setData({
        // 授课教师 级段数据展示
        SetClassArray:SetClassArray,
        SetClassCourseData:SetClassCourseData,
      });
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
    let that = this,pages = getCurrentPages(), // 创建页面栈
    currentPage = pages[pages.length - 1]; // 当前页面
    if(currentPage.__data__.headImg !== undefined){
      that.setData({
        productCoverImg:currentPage.__data__.headImg,
        imgPath:currentPage.__data__.imgPath,
        isHideImg:true
      });
    }else{
      that.setData({isHideImg:false});
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