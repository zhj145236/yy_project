// teacherVersion/teaCertificate/teaCertificate.js
const datas = require('../../utils/data.js');
const app = getApp(), o = app.requirejs('core');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePathsArrs:[],
    newArr:[],
    needUrl:[], // 提交图片的容器数组
    siteIndex:0,
    // isShowData:false,
    startCouponsDate:"2016.5.1",
    isShowCerData:false,
    cerDataArr:[],
  },
  

  /**
   * 
   * @param {*} options
   * 上传图片
   */
  uploadImg:function(){
    let that = this,needUrl = that.data.needUrl,
    tempFilePathsArrs = that.data.tempFilePathsArrs;
    o.FunchooseImage(that,that.data.newArr,1,['compressed'],['album', 'camera'],tempFilePathsArrs,'tempFilePathsArrs',callback=>{
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
    tempFilePathsArrs = [e.currentTarget.dataset.img];
    console.log(e,'携带数据');
    console.log(tempFilePathsArrs,'图片');
    wx.previewImage({
      current: tempFilePathsArrs[index], //当前显示图片
      urls: tempFilePathsArrs //所有图片
    });
  },

  /**
   * 证书类型
   * @param {*} e 
   */
  placeBindPickerChange:function(e){
    let that = this,
    showPlaceData = that.data.placeArray[e.detail.value];
    // that.setData({showPlaceData:showPlaceData,isShowData:true});
    that.setData({showPlaceData:showPlaceData});
  },

  /**
   * 跳转上传证书界面
   * @param {*} options 
   */
  uploadClick:function(){
    let that = this;
    wx.navigateTo({
      url: '/teacherVersion/teaCerUpload/teaCerUpload?id=' + '&uid=' + that.data.uid + '&headImg=' + that.data.headImg + '&nickName=' + that.data.nickName + '&typenum=' + '',
    })
  },

  /**
   * 跳转到上传修改证书界面
   * @param {*} options 
   */
  backClick:function(e){
    let that = this,
    d = {};
    d.cerNo = e.currentTarget.dataset.cerno === null?'':e.currentTarget.dataset.cerno;
    d.regDate = e.currentTarget.dataset.regdate === null?'':e.currentTarget.dataset.regdate;
    d.cerType = e.currentTarget.dataset.certype;
    d.openShow = e.currentTarget.dataset.openshow;
    d.id = e.currentTarget.dataset.id;
    d.typenum = e.currentTarget.dataset.typenum;
    console.log(e,'返回数据');
    console.log(e.currentTarget.dataset.tempfilepathsarrs.length,'返回的数据长度');
    if(e.currentTarget.dataset.tempfilepathsarrs.length === 0){
      d.tempFilePathsArrs = '';
    }else{
      d.tempFilePathsArrs = e.currentTarget.dataset.tempfilepathsarrs;
    }
    console.log(d,'跳转的数据');
    wx.navigateTo({
      url: '/teacherVersion/teaCerUpload/teaCerUpload?id=' + '&id=' + d.id + '&headImg=' + that.data.headImg + '&nickName=' + that.data.nickName + '&tempFilePathsArrs=' + d.tempFilePathsArrs + '&cerNo=' + d.cerNo + '&regDate=' + d.regDate + '&cerType=' + d.cerType + '&openShow=' + d.openShow + '&typenum=' + d.typenum + '&uid=' + that.data.uid,
    })
  },

  /**
   * 删除单个证书
   * @param {*} options 
   */
  dealCerClick:function(e){
    let that = this;
    console.log(e.currentTarget.dataset.id,'删除');
    o.FunDealCer(that,e.currentTarget.dataset.id,that.data.cerDataArr,e.currentTarget.dataset.dealnum,'cerDataArr','isShowCerData');
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this,z = {};
    console.log(options,'携带的参数');
    z.headImg = options.headImg;
    z.uid = options.uid;
    z.nickName = options.nickName;
    z.use = app.globalData.userInfo;
    that.setData(z);
    // 查询证书类型
    o.funPriceSort(that,'app/com/dict/cer_type','placeArray','placeData');
    if(options.cerData === ""){
      console.log('不需要在调用接口');
      that.setData({isShowCerData:false});
    }else{
      console.log('需要调用接口');
      o.FunCertificate(callback=>{
        console.log(callback,'教师资格证数据');
        let cerDataArr = callback.data;
        for(let i in cerDataArr){
          if(cerDataArr[i].cerImage === null){
            cerDataArr[i].tempFilePathsArrs = [];
          }else{
            cerDataArr[i].tempFilePathsArrs = [o.down(o.urlCon(),cerDataArr[i].cerImage)];
          }
        }
        console.log(cerDataArr,'数据');
        that.setData({cerDataArr:cerDataArr,isShowCerData:true});
      });
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
    let that = this,
    pages = getCurrentPages(), // 创建页面栈
    currentPage = pages[pages.length - 1], // 当前页面
    typenum = currentPage.__data__.typenum; // 如果typenum为空用户是在新增资料，否则用户是在修改资料
    console.log(currentPage.__data__);
    // 属于用户新增证书
    if(currentPage.__data__.cerData !== undefined && typenum !== undefined){
      if(typenum === '' && currentPage.__data__.cerData !== ""){
        currentPage.__data__.cerData.tempFilePathsArrs = [o.down(o.urlCon(),currentPage.__data__.tempFilePathsArrs[0])];
        console.log(currentPage.__data__.cerData.tempFilePathsArrs,'数据模式');
        let cerDataArr = that.data.cerDataArr;
        cerDataArr.push(currentPage.__data__.cerData);
        that.setData({
          cerDataArr:cerDataArr,
          isShowCerData:true,
        });
      }
    }
    
    // 用户修改证书
    if(that.data.cerDataArr.length !== 0 && typenum !== undefined){
      if(typenum !== ''){
        const _data_ = currentPage.__data__,
        cerDataArr = that.data.cerDataArr;
        console.log(_data_,'用户是否公开显示证书');
        cerDataArr[parseInt(typenum)].cerNo = _data_.cerData.cerNo;
        cerDataArr[parseInt(typenum)].cerType = _data_.cerData.cerType;
        cerDataArr[parseInt(typenum)].openShow = _data_.cerData.openShow;
        cerDataArr[parseInt(typenum)].regDate = _data_.cerData.regDate;
        if(_data_.tempFilePathsArrs.length === 0){
          cerDataArr[parseInt(typenum)].tempFilePathsArrs = [];
        }else{
          cerDataArr[parseInt(typenum)].tempFilePathsArrs = [o.down(o.urlCon(),_data_.tempFilePathsArrs[0])];
          cerDataArr[parseInt(typenum)].cerImage = _data_.tempFilePathsArrs[0];
        }
        console.log(cerDataArr[typenum],'用户');
        that.setData({
          isShowCerData:true,
          cerDataArr:cerDataArr,
        });
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