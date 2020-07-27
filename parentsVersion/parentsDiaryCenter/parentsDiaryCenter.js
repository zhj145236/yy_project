// parentsVersion/parentsDiaryCenter/parentsDiaryCenter.js
const datas = require('../../utils/data.js');
const app = getApp(), o = app.requirejs('core');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    publicData:[{name:'yes',value:'不公开',checked:true},{name:'no',value:'公开',checked:false}],
    instructions:'注意：如果选择“公开”，那么悦优将以“动态”的形式在平台进行展示。如果您选择“不公开”，悦优将会以“日记”的形式进行保存，除了您个人以外不会对其他的任何人进行展示。',
    newArr:[],
    needUrl:[], // 提交图片的容器数组
    // videoUrl:'', // 提交视频的容器字段
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

    isWeather:false, // 是否显示天气选择器
    isMood:false, // 是否显示心情选择器
    address:'', // 显示的地址
  },
  

  /**
   * 
   * @param {*} options
   * 上传图片
   */
  uploadImg:function(){
    let that = this,needUrl = that.data.needUrl;
    o.FunchooseImage(that,that.data.newArr,6,['compressed'],['album', 'camera'],'tempFilePathsArr',callback=>{
      let tempFilePaths = callback.tempFilePaths,
      len = tempFilePaths.length,
      use = that.data.use,
      // token = use.token;
      token = "yueyou eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNTAxMTExMTExMSIsImF1dGgiOiIiLCJqdGkiOiIxM2EzYjNhYTM1ODg0ZmJlYTNlMGUzYzYyMTI1Y2UzNiJ9.qyURat4yZszj8nQNa2ML1vn-vvS9Xwnu4BUGH_pmSxhwecDN_8WrFSrtPIw_lFUZnflBGeoPkPuuICy_LOFyZQ";
      for(let z=0;z<len;z++){
        o.FunUploadImg(z,'file',token,tempFilePaths,callback=>{
          console.log(typeof z,'数据类型');
          if(Number(z+1) == len){
            wx.hideLoading();
            o.funShowToast('已经完成上传了');
          }else{
            wx.showLoading({
              title:'正在上传第' + Number(z+1) + '张',
            });
          }
          needUrl.push(JSON.parse(decodeURIComponent(callback.data)).url);
        });
      }
    });
  },

  enterVedio:function(e){
    wx.navigateTo({
      url:'/pages/video/video?src=' + e.currentTarget.dataset.src,
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
   * 视频上传
   */
  uploadVideo:function(){
    let that = this;
    o.FunUploadVideo(that,['album','camera'],60,'back',true,'duration','tempFilePathVideo','isShowVideo','api/localStorage/video','videoUrl');
    return;
    let use = that.data.use,
    // token = use.token;
    token = "yueyou eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNTAxMTExMTExMSIsImF1dGgiOiIiLCJqdGkiOiIxM2EzYjNhYTM1ODg0ZmJlYTNlMGUzYzYyMTI1Y2UzNiJ9.qyURat4yZszj8nQNa2ML1vn-vvS9Xwnu4BUGH_pmSxhwecDN_8WrFSrtPIw_lFUZnflBGeoPkPuuICy_LOFyZQ";
    o.alert('友情提示','为了更友好的体验，请上传60秒内的短视频',callback=>{
      console.log(callback,'返回函数');
      if(callback.confirm){
        wx.chooseVideo({
          sourceType: ['album','camera'],
          maxDuration: 60,
          camera: 'back',
          compressed:true,
          success(res) {
            console.log(res.duration.toFixed(0),'返回数据');
            if(res.duration.toFixed(0)<60){
              that.setData({
                duration:'0:' + res.duration.toFixed(0),
                tempFilePathVideo:res.tempFilePath,
                isShowVideo:true
              });
            }else if(res.duration.toFixed(0) === 60){
              that.setData({
                duration:'1:00',
                tempFilePathVideo:res.tempFilePath,
                isShowVideo:true
              });
            }else{
              o.funShowToast('您上传的视频大于60秒，请重新上传');
              that.setData({isShowVideo:false});
              return;
            }
            wx.uploadFile({
              url:o.urlCon() + 'api/localStorage/video',
              header:{"content-type":"application/x-www-form-urlencoded","Authorization":token},
              filePath: res.tempFilePath,
              name: 'file',
              success: (res) =>{
                console.log(res,'上传视频');
              },
              fail: (res) => {},
              complete: (res) => {},
            });
          }
        })
      }
    });
  },

  /**
   * 点击天气弹出蒙层显示天气数据
   */
  weatherClick:function(){
    let that = this;
    o.FunCancelDetermine(that,true,'isWeather');
  },

  /**
   * 点击心情弹出数据
   */
  moodClick:function(){
   let that = this;
   o.FunCancelDetermine(that,true,'isMood');
  },

  /**
   * 天气 点击弹出层取消按钮
   */
  cancelClick:function(){
    let that = this;
    o.FunCancelDetermine(that,false,'isWeather');
  },

  /**
   * 天气 点击蒙层确定按钮
   */
  determineClick:function(){
    let that = this;
    o.FunCancelDetermine(that,false,'isWeather');
  },

  /**
   * 心情 点击弹出层取消按钮
   */
  MoodCancelClick:function(){
    let that = this;
    o.FunCancelDetermine(that,false,'isMood');
  },

  /**
   * 心情 点击蒙层确定按钮
   */
  MoodDetermineClick:function(){
    let that = this;
    o.FunCancelDetermine(that,false,'isMood');
  },

  /**
   * 
   * @param {*} e 
   * 天气滚动器
   */
  bindchange:function(e){
    console.log(e.detail,'选择的值');
    let that = this,
    weather = that.data.weather;
    that.setData({
      weatherIcon:weather[e.detail.value[0]].label,
      weatherValue:weather[e.detail.value[0]].value
    });
  },

  /**
   * 
   * @param {*} e 
   * 心情滚动器
   */
  bindMoodchange:function(e){
    console.log(e.detail,'选择的值');
    let that = this,
    feelingMood = that.data.feelingMood;
    that.setData({
      moodIcon:feelingMood[e.detail.value[0]].label,
      moodValue:feelingMood[e.detail.value[0]].value
    });
  },

  chooseLocation:function(){
    let that = this;
    app.FunGetSeting(callback=>{
      if(callback.authSetting['scope.userLocation']){
        o.FunChooseLocation(data=>{
          let lngLat = data.longitude + ',' + data.latitude;
          console.log(data.address,'返回数据1');
          that.setData({address:data.address});
        });
      }else{
        wx.openSetting({
          success (res) {
            if(res.authSetting['scope.userLocation']){
              o.FunChooseLocation(data=>{
                let lngLat = data.longitude + ',' + data.latitude;
                console.log(data,'返回数据2');
                that.setData({address:data.address});
              });
            }
          }
        })
      }
    });
  },
  
  /**
   * 
   * @param {*} e 
   * 数据提交
   */
  formSubmit(e){
    let that = this;
    // console.log(that.data.needUrl,'需要的url');
    // console.log(that.data.videoUrl,'上传的视频路径');
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    // 天气数据加载
    o.FunPickerView(that,'app/com/dict/weather','weather','weatherIcon','weatherValue');
    // 心情数据加载
    o.FunPickerView(that,'app/com/dict/feeling','feelingMood','moodIcon','moodValue');
    that.setData({
      height: wx.getSystemInfoSync().windowHeight + 'px',
      width: wx.getSystemInfoSync().windowWidth + 'px',
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