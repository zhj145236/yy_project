// teacherVersion/TeacherNearInstitutionMap/TeacherNearInstitutionMap.js
const datas = require('../../utils/data.js');
const app = getApp(), o = app.requirejs('core'),u = o.urlCon();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:false,
    isShowAreaInfo:false,
  },
  /**
   * 
   * @param {*} options
   * 拨打电话 
   */
  callTel:function(){
    wx.makePhoneCall({
      phoneNumber: '13310829325'
    });
  },
  
  /**
   * 
   * @param {*} f 修改this指向
   * @param {*} n 需要传入的经纬度参数
   * @param {*} k 公里数
   * @param {*} s 距离最近的几条
   * @param {*} t 判断用户是查看附近教师还是培训机构 teacher 教师 org 培训机构
   */
  funMapData:function(f,n,k,s,t){
    let url = '',
    data = {},
    header = {"content-type":"application/json"},
    lon = n.split(',')[0],
    lat = n.split(',')[1],
    setLonLat = {lat:lat,lon:lon};
    f.setData(setLonLat);
    if(t === 'teacher'){
      url = u + 'app/plat/tea/mapTeaView?lngLat=' + n + '&km=' + k + '&size=' + s;
    }else{
      url = u + 'app/plat/org/mapOrgView?lngLat=' + n + '&km=' + k + '&size=' + s
    }
    console.log(url);
    o.get(url,data,header,callback=>{
      let needData = callback.data,newArr = [];
      if(Object.keys(needData).length === 0){
        o.funShowToast('暂无数据');
        let markersData = {
          markers:'',
          detailInfo:'',
          numData:Object.keys(needData).length,
        };
        if(t === 'teacher'){
          markersData.numDataInfo = '很抱歉，在您附近我们暂未找到注册的教师信息'
        }else{
          markersData.numDataInfo = '很抱歉，在您附近我们暂未找到注册的机构信息'
        }
        f.setData(markersData);
      }else{
        if(t === 'teacher'){
          o.funShowToast('为您找到' + Object.keys(needData).length + '条教师数据');
          f.setData({
            numDataInfo:'很高兴为您服务，我们为您找到了' + Object.keys(needData).length + '条相关的教师信息',
            numData:Object.keys(needData).length,
          });
          for(let i in needData){
            let newObj = {},str = needData[i].lngLat,longitude = str.split(',')[0],latitude = str.split(',')[1];
            newObj.title = needData[i].name,
            newObj.id = needData[i].id,
            newObj.iconPath =  "/image/ghbjt.png",
            newObj.longitude = longitude,
            newObj.latitude = latitude,
            newObj.callout = {
              content:'姓名：' + needData[i].name + '\n' + '擅长：' + needData[i].teachItem,
              color:'#fff',
              fontSize:'12',
              borderRadius:'5',
              borderWidth:'',
              bgColor:'#007bd0',
              display:'ALWAYS',
              textAlign:'left',
              padding:'10',
              borderColor:'#007bd0',
            },
            newObj.width = 30,
            newObj.height = 30;
            newArr.push(newObj);
          }
        }else{
          o.funShowToast('为您找到' + Object.keys(needData).length + '条机构数据');
          f.setData({
            numDataInfo:'很高兴为您服务，我们为您找到了' + Object.keys(needData).length + '条相关的机构信息',
            numData:Object.keys(needData).length,
          });
          for(let i in needData){
            let newObj = {},str = needData[i].lngLat,longitude = str.split(',')[0],latitude = str.split(',')[1];
            newObj.title = needData[i].name,
            newObj.id = needData[i].id,
            newObj.iconPath =  "/image/ghbjt.png",
            newObj.longitude = longitude,
            newObj.latitude = latitude,
            newObj.callout = {
              content:'机构名称：' + needData[i].name + '\n' + '主教科目：' + needData[i].teachItem,
              color:'#fff',
              fontSize:'12',
              borderRadius:'5',
              borderWidth:'',
              bgColor:'#007bd0',
              display:'ALWAYS',
              textAlign:'left',
              padding:'10',
              borderColor:'#007bd0',
            },
            newObj.width = 30,
            newObj.height = 30;
            newArr.push(newObj);
          }
        }
        let markersData = {markers:newArr,detailInfo:needData,numData:Object.keys(needData).length}
        f.setData(markersData);
      }
    });
  },

  /**
   * 
   * @param {*} e
   * 点击地图地图时触发，返回经纬度 
   */
  mapLonLat:function(e){
    let that = this,
    lngLat = e.detail.longitude + ',' + e.detail.latitude,
    km = 100,
    size = 5,
    type = that.data.type;
    that.funMapData(that,lngLat,km,size,type);
  },
  clickBub:function(e){},

  /**
   * 
   * @param {*} e 
   * 点击选择位置
   */
  chooleArea:function(){
    let that = this;
    console.log('123');
    app.FunGetSeting(callback=>{
      if(callback.authSetting['scope.userLocation']){
        o.FunChooseLocation(data=>{
          let lngLat = data.longitude + ',' + data.latitude,
          km = 100,
          size = 5,
          type = that.data.type;
          that.funMapData(that,lngLat,km,size,type);
          that.setData({
            newName:data.name,
            newAddress:data.address,
            isShowAreaInfo:true,
            isShow:true,
          });
        });
      }else{
        wx.openSetting({
          success (res) {
            if(res.authSetting['scope.userLocation']){
              o.FunChooseLocation(data=>{
                let lngLat = data.longitude + ',' + data.latitude,
                km = 100,
                size = 5,
                type = that.data.type;
                that.funMapData(that,lngLat,km,size,type);
                that.setData({
                  newName:data.name,
                  newAddress:data.address,
                  isShowAreaInfo:true,
                  isShow:true,
                });
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
   * 点击标记点的时候触发 
   */
  bjd:function(e){
    console.log(e,'点击地图上面的标记点');

  },

  /**
   * 
   * @param {*} e 
   * 点击气泡的时候触发
   */
  qipaoClick:function(e){
    let that = this,
    detailInfo = that.data.detailInfo,
    markerId = e.markerId,
    isOptimize = true;
    // console.log(detailInfo,'点击标记点上面的名称触发');
    // console.log(markerId,'点击标记点上面的名称触发');
    if(isOptimize){
      for(let i in detailInfo){
        if(markerId == detailInfo[i].id){
          let showData = {
            name:detailInfo[i].name,
            sex:detailInfo[i].sex,
            teachItem:detailInfo[i].teachItem,
            teachObj:detailInfo[i].teachObj,
            locationDesc:detailInfo[i].locationDesc,
            isOptimize:false,
            isShow:true,
            isShowAreaInfo:false,
          }
          that.setData(showData);
          return;
        }
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    const that = this,
    lngLat = options.longitude+ ',' + options.latitude,
    km = 100,
    size = 5,
    type = options.type;
    that.funMapData(that,lngLat,km,size,type);
    that.setData({type:type});
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