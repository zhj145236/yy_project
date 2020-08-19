// parentsVersion/parentsinstPerfectInfo/parentsinstPerfectInfo.js
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
    professionData:[
      {value:'贸易',checked:false,name:'贸易'},
      {value:'制造',checked:false,name:'制造'},
      {value:'科技',checked:false,name:'科技'},
      {value:'金融',checked:false,name:'金融'},
      {value:'医疗',checked:false,name:'医疗'},
      {value:'建筑',checked:false,name:'建筑'},
      {value:'广告',checked:false,name:'广告'},
      {value:'教育',checked:false,name:'教育'},
      {value:'服务',checked:false,name:'服务'},
      {value:'物流',checked:false,name:'物流'},
      {value:'运输',checked:false,name:'运输'},
      {value:'能源',checked:false,name:'能源'},
      {value:'环保',checked:false,name:'环保'},
      {value:'化工',checked:false,name:'化工'},
      {value:'政府',checked:false,name:'政府'},
      {value:'其他',checked:false,name:'其他'}
    ]
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
    console.log(e,'返回信息');
    let that = this,
    use = that.data.use,
    userid = use.user.userId,
    name = e.detail.value.name, // 姓名
    nickName = e.detail.value.nickName, // 昵称
    nImg = that.data.nImg, // 图像
    needUrl = that.data.needUrl, // 生活照地址路径
    poosImg = '', // 需要上传的图片格式重新整理
    address = e.detail.value.address, // 详细地址
    sex = e.detail.value.sex, // 性别
    tag = e.detail.value.tag, // 个性签名
    profession = e.detail.value.profession, // 职业
    job = '', // 处理后需要传入接口的工作字段
    province = that.data.province, // 省
    city = that.data.city, // 市
    county = that.data.county; // 区
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

    // 处理职业数据
    if(profession.length !== 0){
      if(profession.length === 1){
        job += profession[0];
      }else{
        let leng = profession.length;
        for(let a=0;a<profession.length-1;a++){
          job += profession[a] + ',';
        }
        job += profession[leng-1];
      }
    }else{
      job = ''; 
    }

    // console.log(name,'名称');
    // console.log(nickName,'昵称');
    // console.log(nImg,'图像');
    // console.log(address,'详细地址');
    // console.log(sex,'性别');
    // console.log(tag,'个性签名');
    // console.log(job,'工作');
    // console.log(province,'省');
    // console.log(city,'市');
    // console.log(county,'区');
    let data = {
      "id":userid,
      "name":name,
      "nickName":nickName,
      "job":job,
      "motto":tag,
      "headImg":nImg,
      "sex":sex,
      "lifePicture":poosImg,
      "locationDesc":address,
      "provinceCode":province,
      "cityCode":city,
      "countyCode":county
    }
    o.FunPerfectInfo(data);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this,
    use = app.globalData.userInfo;
    o.FunCallbackUseInfo(that,userData={},callback=>{
      console.log(callback,'返回数据');
      let d = callback.data,
      professionData = that.data.professionData;
      for(let z in professionData){
        professionData[z].checked = false;
      }
      if(d.job !== '' && d.job !== null){
        if(d.job.indexOf(',') === -1){
          for(let z in professionData){
            if(professionData[z].value === d.job){
              professionData[z].checked = true;
            }
          }
        }else{
          let jobName = d.job.split(',');
          for(let i in jobName){
            for(let z in professionData){
              if(jobName[i] === professionData[z].value){
                professionData[z].checked = true;
                break;
              }
            }
          }
        }
      }else{
        for(let z in professionData){
          professionData[z].checked = false;
        }
      }
      that.setData({professionData:professionData});
    });
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