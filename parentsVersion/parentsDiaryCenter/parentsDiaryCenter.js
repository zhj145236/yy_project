// parentsVersion/parentsDiaryCenter/parentsDiaryCenter.js
const datas = require('../../utils/data.js');
const app = getApp(), o = app.requirejs('core');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    publicData:[{name:true,value:'不公开',checked:true},{name:false,value:'公开',checked:false}],
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
    isUploadImg:true, // 是否上传视频
    isUploadVedio:true, // 是否上传图片
  },

  diaryList:function(){
    wx.navigateTo({
      url: '/parentsVersion/parentsinstDiaryList/parentsinstDiaryList',
    })
  },
  

  /**
   * 
   * @param {*} options
   * 上传图片
   */
  uploadImg:function(){
    let that = this,needUrl = that.data.needUrl;
    if(that.data.isUploadImg){
      o.FunchooseImage(that,that.data.newArr,6,['compressed'],['album', 'camera'],'tempFilePathsArr',callback=>{
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
    }else{
      o.funShowToast('您已经上传了视频，无法继续上传图片')
    }
  },

  /**
   * 视频上传
   */
  uploadVideo:function(){
    let that = this;
    if(that.data.isUploadVedio){
      o.FunUploadVideo(that,['album','camera'],60,'back',true,'duration','tempFilePathVideo','isShowVideo','api/localStorage/video','videoUrl','isUploadImg');
    }else{
      o.funShowToast('您已经上传了图片，无法继续上传视频');
    }
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

  /**
   * 点击天气弹出蒙层显示天气数据
   */
  weatherClick:function(){
    let that = this,
    weather = that.data.weather;
    o.FunCancelDetermine(that,true,'','isWeather',weather,'weatherIcon','weatherValue');
  },

  /**
   * 点击心情弹出数据
   */
  moodClick:function(){
   let that = this,
   feelingMood = that.data.feelingMood;
   o.FunCancelDetermine(that,true,'','isMood',feelingMood,'moodIcon','moodValue');
  },

  /**
   * 天气 点击弹出层取消按钮
   */
  cancelClick:function(){
    let that = this,
    weather = that.data.weather;
    o.FunCancelDetermine(that,false,'cancel','isWeather',weather,'weatherIcon','weatherValue');
    // 天气数据加载
    // o.FunPickerView(that,'app/com/dict/weather','weather','weatherIcon','weatherValue');
  },

  /**
   * 天气 点击蒙层确定按钮
   */
  determineClick:function(){
    let that = this,
    weather = that.data.weather;
    o.FunCancelDetermine(that,false,'','isWeather',weather,'weatherIcon','weatherValue');
  },

  /**
   * 心情 点击弹出层取消按钮
   */
  MoodCancelClick:function(){
    let that = this,
    feelingMood = that.data.feelingMood;
    o.FunCancelDetermine(that,false,'cancel','isMood',feelingMood,'moodIcon','moodValue');
    // 心情数据加载
    // o.FunPickerView(that,'app/com/dict/feeling','feelingMood','moodIcon','moodValue');
  },

  /**
   * 心情 点击蒙层确定按钮
   */
  MoodDetermineClick:function(){
    let that = this,
    feelingMood = that.data.feelingMood;
    o.FunCancelDetermine(that,false,'','isMood',feelingMood,'moodIcon','moodValue');
  },

  /**
   * 选择位置
   */
  chooseLocation:function(){
    let that = this;
    app.FunGetSeting(callback=>{
      if(callback.authSetting['scope.userLocation'] !== undefined){
        if(callback.authSetting['scope.userLocation']){
          o.FunChooseLocation(data=>{
            let lngLat = data.longitude + ',' + data.latitude;
            // console.log(data.address,'返回数据1');
            that.setData({address:data.address,lngLat:lngLat});
          });
        }else{
          wx.openSetting({
            success (res) {
              if(res.authSetting['scope.userLocation']){
                o.FunChooseLocation(data=>{
                  let lngLat = data.longitude + ',' + data.latitude;
                  that.setData({address:data.address,lngLat:lngLat});
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
              that.setData({address:callback.address,lngLat:lngLat});
            });
          }
        });
      }
    });
  },
  
  /**
   * 
   * @param {*} e 
   * 数据提交
   */
  formSubmit(e){
    let that = this,
    needUrl = that.data.needUrl,
    videoUrl = that.data.videoUrl === undefined?'':that.data.videoUrl, // 用户上传视频的id
    content = e.detail.value.desc, // 动态内容
    privateShow = e.detail.value.privateshow === 'true'? true: false, // 选择是否公开
    lngLat = that.data.lngLat === undefined?'':that.data.lngLat, // 用户现在发布位置的经纬度
    weatherValue = that.data.weatherValue, // 当天的天气
    moodValue = that.data.moodValue, // 现在的心情
    poosImg = '', // 需要上传的图片格式重新整理
    use = that.data.use,
    token = use.token;
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
    if(content === ''){
      o.funShowToast('动态/日记不能为空');
      return;
    }
    console.log(needUrl,'上传的图片路径');
    // console.log(content,'上传的内容');
    // console.log(poosImg,'上传的图片路径');
    // console.log(privateShow,'上传的是否公开字段');
    // console.log(videoUrl,'上传的视频id');
    // console.log(lngLat,'上传的经纬度');
    // console.log(weatherValue,'上传的天气');
    // console.log(moodValue,'上传的心情');
    return;
    const needDatas = {
      "content":content,
      "picture":poosImg,
      "video":videoUrl,
      "weather":weatherValue,
      "feeling":moodValue,
      "privateShow":privateShow,
      "lngLat":lngLat
    },
    url = o.urlCon() + 'app/par/center/createDiary',
    data = needDatas,
    header = {"content-type":"application/json","Authorization":token};
    o.post(url,data,header,callback=>{
      console.log(callback,'返回数据');
      if(callback.statusCode === 200){
        o.funShowToast('您已提交完成');
        setTimeout(function(){
          wx.navigateBack({
            delta: 1
          })
        },2000);
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this,
    use = app.globalData.userInfo;
    // 天气数据加载
    o.FunPickerView(that,'app/com/dict/weather','weather','weatherIcon','weatherValue');
    // 心情数据加载
    o.FunPickerView(that,'app/com/dict/feeling','feelingMood','moodIcon','moodValue');

    that.setData({
      height: wx.getSystemInfoSync().windowHeight + 'px',
      width: wx.getSystemInfoSync().windowWidth + 'px',
      use:use,
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