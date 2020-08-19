const WeCropper = require('../../components/we-cropper/we-cropper.js');
const device = wx.getSystemInfoSync(); // 获取设备信息
const width = device.windowWidth; // 示例为一个与屏幕等宽的正方形裁剪框
const height = device.windowHeight + 10;
const app = getApp(), o = app.requirejs('core');
 
Page({
    data: {
        cropperOpt: {
            id: 'cropper', // 用于手势操作的canvas组件标识符
            targetId: 'targetCropper', // 用于用于生成截图的canvas组件标识符
            pixelRatio: device.pixelRatio, // 传入设备像素比
            width, // 画布宽度
            height, // 画布高度
            src: '',
            scale: 2.5, // 最大缩放倍数
            zoom: 8, // 缩放系数
            cut: {
                x: (width - 320) / 2, // 裁剪框x轴起点
                y: (width - 320) / 2, // 裁剪框y轴起点
                width: 320, // 裁剪框宽度
                height: 320 // 裁剪框高度
            }
        }
    },
    // 页面onLoad函数中实例化WeCropper
    onLoad: function(options) {
      const {cropperOpt} = this.data;
      cropperOpt.src = options.src;
      cropperOpt.upImg = options.upImg;
      if (cropperOpt.src) {
        this.cropper = new WeCropper(cropperOpt)
          .on('ready', (ctx) => {
            console.log(`wecropper is ready for work!`)
          })
          .on('beforeImageLoad', (ctx) => {
            wx.showToast({
              title: '上传中',
              icon: 'loading',
              duration: 3000
            })
          })
          .on('imageLoad', (ctx) => {
            wx.hideToast()
          })
      }
    },
    // 插件通过touchStart、touchMove、touchEnd方法来接收事件对象。
    touchStart(e) {
        this.cropper.touchStart(e)
    },
    touchMove(e) {
        this.cropper.touchMove(e)
    },
    touchEnd(e) {
        this.cropper.touchEnd(e)
    },
    // 自定义裁剪页面的布局中，可以重新选择图片
    uploadTap() {
        const self = this
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success(res) {
                const src = res.tempFilePaths[0]
                self.cropper.pushOrign(src)
            }
        })
    },
    
    // 生成图片
    getCropperImage(){
        let that = this;
        this.cropper.getCropperImage(tempFilePath => {
            // tempFilePath 为裁剪后的图片临时路径
            if (tempFilePath) {
              // console.log(tempFilePath,'成功可以返回了');
              o.FunCustomImg(tempFilePath,callback=>{
                console.log(callback,'返回数据');
                if(callback.statusCode === 200){
                  // app.globalData.userInfo.user.headImg = tempFilePath;
                  let pages = getCurrentPages(), //页面栈
                  prevPage = pages[pages.length - 2], //上一个页面
                  imgPath = JSON.parse(decodeURIComponent(callback.data)).url;
                  prevPage.setData({ //直接给上一个页面赋值
                    headImg: tempFilePath,
                    imgPath:imgPath
                  });
                  o.funShowToast('上传成功');
                  setTimeout(function(){
                    wx.navigateBack({
                      delta: 1
                    })
                  },2000);
                }
              });
            }else{
                console.log('获取图片地址失败，请稍后重试')
            }
        })
    }
})