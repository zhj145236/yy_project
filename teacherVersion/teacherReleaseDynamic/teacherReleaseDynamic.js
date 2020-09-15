const datas = require('../../utils/data.js');
const app = getApp(), o = app.requirejs('core');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeholder: '这一刻我的心情...',
    content: '',
    isUploadVedio:true,
    isUploadImg:true,
    newArr:[],
    needUrl:[],
    controls:false, // 是否显示视频控件
    fullscreen:true, // 是否显示全屏按钮
    playBtn:false, // 是否显示底部控制栏的播放按钮
    centerPlay:false, // 是否显示视频中间的播放按钮
    gestureFullscreen:false, // 在全屏模式下，是否开启高亮与音量调节
    progressGesture: false, // 是否开启控制进度的手势
    autoplay:false, // 是否自动播放 (注意自动播放跟视频中间的播放按钮是不能同时为true的，正常情况下视频在播放的时候中间就不会在有播放的按钮)
    muted: false, // 是否静音播放
    playGesture:false, // 是否双击切换播放/暂停
    isShowVideo:false, // 是否显示视频容器
    btnPosition:'center', // 播放按钮的位置
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 视频上传
   */
  uploadVideo:function(){
    let that = this;
    if(that.data.isUploadVedio){
      o.FunUploadVideo(that,['album','camera'],60,'back',true,'duration','tempFilePathVideo','isShowVideo','api/localStorage/video','videoUrl','isUploadImg','videoId');
    }else{
      o.funShowToast('您已经上传了图片，无法继续上传视频');
    }
  },

  /**
   * 删除视频
   * @param {*} e 
   */
  dealVideo:function(e){
    o.alert('提示','您确定要删除该视频吗？',callback=>{
      if(callback.confirm){
        let that = this,
        videoid = that.data.videoId;
        o.FunDealVideo(that,videoid,'tempFilePathVideo','isShowVideo');
      }
    });
  },

  /**
   * 视频跳转
   * @param {*} e 
   */
  enterVedio:function(e){
    wx.navigateTo({
      url:'/pages/video/video?src=' + e.currentTarget.dataset.src,
    });
  },

  /**
   * 
   * @param {*} options
   * 上传图片
   */
  uploadImg:function(){
    let that = this,needUrl = that.data.needUrl;
    tempFilePathsArr = that.data.tempFilePathsArr;
    if(that.data.isUploadImg || !that.data.isShowVideo){
      o.FunchooseImage(that,that.data.newArr,6,['compressed'],['album', 'camera'],tempFilePathsArr,'tempFilePathsArr',callback=>{
        let tempFilePaths = callback.tempFilePaths,
        len = tempFilePaths.length,
        use = that.data.use,
        token = use.token;
        for(let z=0;z<len;z++){
          o.FunUploadImg(z,'file',token,tempFilePaths,callback=>{
            if(Number(z+1) == len){
              wx.hideLoading();
              o.funShowToast('图片上传完成');
            }
            needUrl.push(JSON.parse(decodeURIComponent(callback.data)).url);
            that.setData({isUploadVedio:false});
          });
        }
      });
    }else{
      o.funShowToast('您已经上传了视频，无法继续上传图片')
    }
  },

  /**
   * 删除图片
   * @param {*} e 
   */
  dealImg:function(e){
    o.alert('提示','您确定要删除该图片吗？',callback=>{
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
   * 
   * @param {*} e 
   * 发布动态
   */
  bindFormSubmit:function(e){
    let that = this,
    use = that.data.use,
    token = use.token,
    content = e.detail.value.content,
    needUrl = that.data.needUrl,
    videoUrl = that.data.videoUrl === undefined?'':that.data.videoUrl, // 用户上传视频的id
    poosImg = ''; // 需要上传的图片格式重新整理
    if(needUrl){
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
    if(content === ''){
      o.funShowToast('动态内容不能为空');
      return;
    }
    const data = {
      "content":content,
      "picture":poosImg,
      "video":videoUrl
    },
    url = o.urlCon() + 'app/tea/dynamic/create',
    header = {"content-type":"application/json","Authorization":token};
    o.post(url,data,header,callback=>{
      console.log(callback,'发布动态返回');
      if(callback.statusCode === 200){
        o.funShowToast('您的动态已提交成功');
        setTimeout(function(){
          wx.navigateBack({
            delta: 1
          })
        },2000);
      }
    });
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})