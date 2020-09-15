// parentsVersion/parentsRegistered/parentsRegistered.js
const datas = require('../../utils/data.js');
const app = getApp(), o = app.requirejs('core');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    perfectInfoData:datas.perfectInfoData,
    newArr:[],
    needUrl:[], // 提交图片的容器数组
    parentsInfoIndex:[0,0,0],
    province:9655, // 默认 广东省
    city:9799, // 默认 东莞市
    county:11201, // 默认 厚街镇
    max:100,
    checkedSexNan:true,
    checkedSexNv:false,
    checkedSexBm:false,
    startCouponsDate:'1991-01-01',
    teachItem:'语文',
    teachObj:'六年级',
    workingSchool:'XXX学校就职',
    graduateSchool:'毕业于XXX院校',
    priceRange:'100-200元/节',
    isShowBtns:true
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
  
  /**
   * 年月日
   * @param {*} e 
   */
  startCouponsBindDateChange:function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startCouponsDate: e.detail.value
    })
  },

  /**
   * 地图点击选址
   * @param {*} e 
   */
  addressClick:function(){
    let that = this;
    console.log('123');
    app.FunGetSeting(callback=>{
      if(callback.authSetting['scope.userLocation']){
        o.FunChooseLocation(data=>{
          let lngLat = data.longitude + ',' + data.latitude,s = {};
          console.log(data,'返回数据1');
          s.lngLat = lngLat;
          s.address = data.address;
          that.setData(s);
        });
      }else{
        wx.openSetting({
          success (res) {
            if(res.authSetting['scope.userLocation']){
              o.FunChooseLocation(data=>{
                let lngLat = data.longitude + ',' + data.latitude,s = {};
                console.log(data,'返回的数据2');
                s.lngLat = lngLat;
                s.address = data.address;
                that.setData(s);
              });
            }
          }
        })
      }
    });
  },

  /**
   * 录音
   * @param {*} e 
   */
  tapeClick:function(e){
    console.log(e,'11');
    wx.startRecord({
      success (res) {
        const tempFilePath = res.tempFilePath
      }
    })
    setTimeout(function () {
      wx.stopRecord() // 结束录音
    }, 10000)
  },

  /***
   * 输入手机号验证
   */
  bindblurSjh:function(e){
    let that = this,validationPhone = /^1[3456789]\d{9}$/;
    o.ridBlankSpace('callphone',that,e.detail.value); // 去除空格
    if(that.data.callphone !== ''){
      // 当手机号输入框失去焦点时验证
      if(!validationPhone.test(that.data.callphone)){
        o.funShowToast('手机号输入有误，请重新输入');
        that.setData({
          callphone:'',
          isPhone:false
        });
        return;
      }else{
        that.setData({
          callphone:that.data.callphone,
          isPhone:true
        });
      }
    }
  },

  /**
   * 昵称去除空格
   */
  bindblurNickName:function(e){
    let that = this;
    o.ridBlankSpace('nickName',that,e.detail.value); // 去除空格
    that.setData({nickName:that.data.nickName});
  },

  /**
   * 姓名去除空格
   */
  bindblurName:function(e){
    let that = this;
    o.ridBlankSpace('name',that,e.detail.value); // 去除空格
    that.setData({name:that.data.name});
  },

  /**
   * 个性签名去除空格
   */
  bindblurTar:function(e){
    let that = this;
    o.ridBlankSpace('tag',that,e.detail.value); // 去除空格
    that.setData({tag:that.data.tag});
  },

  /**
   * 详细地址去除空格
   */
  bindblurAddress:function(e){
    let that = this;
    o.ridBlankSpace('address',that,e.detail.value); // 去除空格
    that.setData({address:that.data.address});
  },
  

  /**
   * 
   * @param {*} options
   * 上传图片
   */
  uploadImg:function(){
    let that = this,needUrl = that.data.needUrl,
    tempFilePathsArrs = that.data.tempFilePathsArrs;
    o.FunchooseImage(that,that.data.newArr,6,['compressed'],['album', 'camera'],tempFilePathsArrs,'tempFilePathsArrs',callback=>{
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
        tempFilePathsArrs = that.data.tempFilePathsArrs,
        data = [needUrl[nums]];
        o.FunDealImg(that,data,tempFilePathsArrs,needUrl,nums,'tempFilePathsArrs','needUrl');
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
    tempFilePathsArrs = that.data.tempFilePathsArrs;
    wx.previewImage({
      current: tempFilePathsArrs[index], //当前显示图片
      urls: tempFilePathsArrs //所有图片
    });
  },

  /**
   * 
   * @param {*} e 
   * 授课教师 省市区组件弹出数据 
   * || ========================== 6/18 张 start
   * 
   */
  parentsInfoBindchange:function(e){
    let that = this,
    province = that.data.parentsInfoMultiArray[0][e.detail.value[0]],
    city = that.data.parentsInfoMultiArray[1][e.detail.value[1]],
    area = that.data.parentsInfoMultiArray[2][e.detail.value[2]],
    needDataArea = that.data.needDataArea;
    console.log(needDataArea,'省市区数据');
    for(let i in needDataArea){
      if(province === needDataArea[i].name){
        for(let s in needDataArea[i].child){
          if(city === needDataArea[i].child[s].name){
            for(let a in needDataArea[i].child[s].child){
              if(area === needDataArea[i].child[s].child[a].name){
                myLocation = needDataArea[i].name + ' ' +  needDataArea[i].child[s].name + ' ' +  needDataArea[i].child[s].child[a].name;
                that.setData({
                  myLocation:myLocation,
                  province:needDataArea[i].id,
                  city:needDataArea[i].child[s].id,
                  county:needDataArea[i].child[s].child[a].id,
                });
                // console.log(needDataArea[i].id,needDataArea[i].child[s].id,needDataArea[i].child[s].child[a].id,'省市区');
                break;
              }
            }
            break;
          }
        }
        break;
      }
    }
  },
  parentsInfoColumnChange:function(e){
    let that = this,
    parentsInfoIndex = that.data.parentsInfoIndex,
    parentsInfoMultiArray = that.data.parentsInfoMultiArray;
    o.funThreeLevelLinkageChange(that,e,parentsInfoIndex,parentsInfoMultiArray,that.data.needTotalCity,that.data.needMarkProvince,that.data.needMarkCity,that.data.needMarkArea);
    that.setData({
      parentsInfoMultiArray:that.data.parentsInfoMultiArray,
      parentsInfoIndex:that.data.parentsInfoIndex
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
    * 提交信息
    * @param {*} e 
    */
  formSubmit:function(e){
    let that = this,
    id = that.data.id, // 用户id
    name = e.detail.value.name, // 姓名
    nickName = e.detail.value.nickName, // 昵称
    banner = that.data.imgPath, // banner图
    needUrl = that.data.needUrl, // 生活照地址路径
    poosImg = '', // 需要上传的图片格式重新整理
    address = e.detail.value.address, // 详细地址
    sex = e.detail.value.sex, // 性别
    motto = e.detail.value.tag, // 个性签名
    teachItem = e.detail.value.teachItem, // 教授的课程
    teachObj = e.detail.value.teachObj, // 教授的年级
    workingSchool = e.detail.value.workingSchool, // 现在就职的学校
    graduateSchool = e.detail.value.graduateSchool, // 毕业院校
    priceRange = e.detail.value.priceRange, // 平均每节课程的价格
    bornDate = that.data.startCouponsDate, // 出生年月日
    lngLat = that.data.lngLat, // 经纬度
    province = that.data.province, // 省
    city = that.data.city, // 市
    county = that.data.county; // 区
    // console.log(that.data.startCouponsDate,'出生年月');
    // console.log(that.data.myLocation,'省市区地址');
    // console.log(that.data.imgPath,'详情banner图');
    // console.log(that.data.needUrl,'生活图片');
    // 处理图片数据
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

    // console.log(poosImg,'生活图片');
    // console.log(banner,'banner图片');
    // console.log(id,'用户id');
    // console.log(name,'姓名');
    // console.log(nickName,'昵称');
    // console.log(address,'详细地址');
    // console.log(sex,'性别');
    // console.log(motto,'个性签名');
    // console.log(teachItem,'教授课程');
    // console.log(teachObj,'教授年级');
    // console.log(workingSchool,'现在就职学校');
    // console.log(graduateSchool,'毕业院校');
    // console.log(priceRange,'平均每节课程的价格');
    // console.log(bornDate,'出生年月');
    // console.log(lngLat,'经纬度');
    console.log(province,city,county,'省市区');

    const data = {};
    data.id = id;
    data.sex = sex;
    data.bornDate = bornDate;
    data.provinceCode = province;
    data.cityCode = city;
    data.countyCode = county;
    if(poosImg !== ""){data.lifePicture = poosImg;}
    if(name !== ""){data.name = name;}
    if(nickName !== ""){data.nickName = nickName;}
    if(address !== ""){data.locationDesc = address;}
    if(motto !== ""){data.motto = motto;}
    if(teachItem !== ""){data.teachItem = teachItem;}
    if(teachObj !== ""){data.teachObj = teachObj;}
    if(workingSchool !== ""){data.workingSchool = workingSchool;}
    if(graduateSchool !== ""){data.graduateSchool = graduateSchool;}
    if(priceRange !== ""){data.priceRange = priceRange;}
    if(lngLat !== undefined){data.lngLat = lngLat;}
    if(banner !== undefined){data.banner = banner;}

    const d = {};
    d.useImg = that.data.useImg;
    d.nickName = that.data.nickName;
    d.uid = that.data.id;
    d.cerData = that.data.cerData;
    console.log(d,'uid');
    o.FunTeaDomain(data,'/teacherVersion/teaCertificate/teaCertificate',d,e.detail.target.dataset.type);
  },

  /**
   * 跳转到下一页
   * @param {*} options 
   */
  jumpClick:function(){
    let that = this,d = {};
    d.useImg = that.data.useImg;
    d.nickName = that.data.nickName;
    d.uid = that.data.id;
    d.cerData = that.data.cerData;
    console.log(that.data.cerData,'数据');
    console.log(d,'uid');
    wx.navigateTo({
      url: '/teacherVersion/teaCertificate/teaCertificate?headImg=' + d.useImg + '&nickName=' + d.nickName + '&uid=' + d.uid + '&cerData=' + 'true',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this,
    use = app.globalData.userInfo;
    
    // 获取教师自己的信息
    o.FunDomainInfo(that,userData={});
    // 省市区接口数据
    o.funThreeLevelLinkage(that,'parentsInfoMultiArray');
    that.setData({use:use})
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
        // isHideImg:true
      });
    }else{
      that.setData({
        // isHideImg:false,
        productCoverImg:[]
      });
    }
    
    // 返回教师的证书
    o.FunCertificate(callback=>{
      console.log(callback,'教师资格证数据');
      if(callback.data.length === 0){
        console.log('证书信息为空');
        that.setData({isShowBtns:true});
      }else{
        console.log('证书信息不为空');
        that.setData({isShowBtns:false});
      }
      that.setData({cerData:callback.data});
    });
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