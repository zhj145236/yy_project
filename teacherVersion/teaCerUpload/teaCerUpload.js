// teacherVersion/teaCertificate/teaCertificate.js
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
    isShowData:false,
    startCouponsDate:"2016.5.1",
    isuploadImg:false,
    cerData:'',
    isClick:false
  },

  /**
   * 添加证书
   */
  addClick:function(e){
    console.log('这是添加');
    let that = this;
  },

  /**
   * 取消添加
   */
  cancelClick:function(e){
    console.log('这是取消添加');
  },
  

  /**
   * 
   * @param {*} options
   * 上传图片
   */
  uploadImg:function(){
    let that = this;
    if(that.data.isuploadImg){
      let needUrl = that.data.needUrl,
      tempFilePathsArrs = that.data.tempFilePathsArrs;
      o.FunchooseImage(that,that.data.newArr,1,['compressed'],['album', 'camera'],tempFilePathsArrs,'tempFilePathsArrs',callback=>{
        let tempFilePaths = callback.tempFilePaths,
        len = tempFilePaths.length,
        use = that.data.use,
        token = use.token;
        console.log(tempFilePaths,'图片用户显示的临时路径');
        that.setData({tempFilePaths:tempFilePaths});
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
    }else{
      o.funShowToast('请先选择证书的类型');
    }
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
   * 证书类型
   * @param {*} e 
   */
  placeBindPickerChange:function(e){
    let that = this,
    showPlaceData = that.data.placeArray[e.detail.value];
    that.setData({showPlaceData:showPlaceData,isShowData:true,isuploadImg:true});
  },

  /**
   * 资格证书信息上传
   * @param {*} options 
   */
  formSubmit:function(e){
    o.alert('提示','证书提交成功后将在1~3个工作日审核完成，审核通过后将无法进行修改或删除操作。',callback=>{
      if(callback.confirm){
        let that = this,
        needUrl = that.data.needUrl,
        poosImg = ''; // 需要上传的图片格式重新整理
        console.log(needUrl,'测试');
        if(needUrl.length !== 0){
          poosImg += needUrl[0];
        }
        if(poosImg === "" && e.detail.value.cerNo === ""){
          o.funShowToast('证书图片与证书编号必须上传一个');
          return;
        }
        if(e.detail.value.certificate === '是'){
          openShow = true;
        }else{
          openShow = false;
        }
        console.log(that.data.id,'返回数据');
        const d = {};
        d.cerType = that.data.showPlaceData; // 证书类型
        d.openShow = openShow; // 证书是否对外公开
        // 证书图片
        if(poosImg !== ""){
          d.cerImage = poosImg;
        }
        // 证书编号
        if(e.detail.value.cerNo !== ""){
          d.cerNo = e.detail.value.cerNo;
        }
        // 证书注册日期
        if(e.detail.value.regDate !== ""){
          d.regDate = e.detail.value.regDate;
        }
        // 如果为修改证书的时候需要将证书id传入
        if(that.data.id !== undefined){
          d.id = that.data.id
        }
        console.log(d,'需要上传的数据');
        that.setData({cerData:d,isClick:true});
        o.FunSupplyCertificate(that,d,'cerObj');
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this,
    z = {};
    console.log(options.id,'携带的参数');
    z.headImg = options.headImg;
    z.uid = options.uid;
    z.nickName = options.nickName;
    z.use = app.globalData.userInfo;
    z.typenum = options.typenum;
    if(options.typenum !== ""){
      const a = {},cerData = {};
      a.showPlaceData = options.cerType;
      a.tempFilePathsArrs = options.tempFilePathsArrs === ''?[]:[options.tempFilePathsArrs];
      a.cerNo = options.cerNo === 'undefined'?'您尚未填写证书编号':options.cerNo;
      a.regDate =  options.regDate === 'undefined'?'证书注册日期尚未填写':options.regDate;
      a.openShow =  options.openShow;
      a.isShowData = true;
      a.isuploadImg = true;
      a.id = options.id;
      that.setData(a);
    }else{
      that.setData({openShow:'true'});
    }
    // 查询证书类型
    o.funPriceSort(that,'app/com/dict/cer_type','placeArray','placeData');
    that.setData(z);
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
    const that = this;
    console.log(that.data.isClick,'用户是否点击了确定按钮');
    if(that.data.isClick){
      let tempFilePathsArrs = that.data.tempFilePathsArrs,
      pages = getCurrentPages(), //页面栈
      prevPage = pages[pages.length - 2]; //上一个页面
      console.log(that.data.needUrl,'证书图片1');
      console.log(that.data.tempFilePathsArrs,'证书图片2');
      if(tempFilePathsArrs.length !== 0){
        console.log('A');
        if(tempFilePathsArrs[0].split('file')[1] === undefined){
          console.log('B');
          prevPage.setData({
            tempFilePathsArrs:that.data.needUrl,
            cerData: that.data.cerData,
            typenum:that.data.typenum,
          });
        }else{
          console.log('C');
          console.log(tempFilePathsArrs[0].split('file')[1],'返回的数据图片');
          prevPage.setData({
            tempFilePathsArrs:[tempFilePathsArrs[0].split('file')[1]],
            cerData: that.data.cerData,
            typenum:that.data.typenum,
          });
        }
      }else{
        console.log('D');
        prevPage.setData({ //直接给上一个页面赋值
          cerData: that.data.cerData,
          typenum:that.data.typenum,
          tempFilePathsArrs:[]
        });
      }
    }
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