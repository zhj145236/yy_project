const app = getApp();
module.exports = {

    /**
     * 获取设备信息
     */
    getSystemInfo:function(t){
        wx.getSystemInfo({
          success: (res) => {
              t(res);
          },
        })
    },

    /**
     * 倒计时封装
     * n 倒计时的时间
     * f 修改this指向
     * i 是否停止倒计时
     */
    timesFun:function(n,f,i){
        var num = n;
        f.setData({times:num + '秒后获取',});
        var t = setInterval(function(){
        if(num === 0){
            clearInterval(t);
            f.setData({
                [i]:false,
            });
        }else{
            num--;
            f.setData({
                times:num + '秒后获取',
                [i]:true,
            });
        }
        },1000);
    },

    /**
     * 弹出框封装
     */
    showToast:function(t){
        wx.showToast({
            title: t,
            icon:'none',
            mask:true,
            duration: 1500
        });         
    },

    /**
     * 模态框封装
     * l标题
     * m提示的内容
     * t返回函数
     */
    alert:function(l,m,t){
        wx.showModal({
          title:l,
          content:m,
          success: (res) => {
              t(res);
          }
        })
    },

    /**
     * input去除空格封装
     */
    ridBlankSpace:function(s,f,d){
        f.setData({
            [s]:d.replace(/(^\s*)|(\s*$)/g,""),
        });

    },

    /**
     * 密码验证封装
     * i 提醒消息
     * v 传入的value值
     */
    pasdFun:function(i,v){
        var phoneEx = /^1[3456789]\d{9}$/,passwordEx = /^[a-zA-Z0-9]{4,23}$/;
        // 手机号验证
        if(!phoneEx.text(v)){
            this.showToast(i);
            return false;
        }else{
            return true;
        }
    },

    /**
   * 
   * @param {*} e
   * 封装文件 || ========================== 6/17 张 start
   */

  /**
   * 
   * @param {*} options
   * 用户点击筛选页面函数封装 
   * f 改变this指向
   * t 需要传出的参数值
   * s 接收参数值的变量
   */
  FunPresentClick:(f,t,s)=>{
    f.setData({
      [s]:t
    });
  },

  /**
   * 
   * @param {*} e
   * 二级联动函数封装 
   * f this指向
   * t 需要传出的数据
   * s 接收参数值的变量
   */
  FunBindMultiPickerChange: function (f,t,s) {
    console.log(t,'123');
    f.setData({
      [s]: t
    })
  },
  
  /**
   * @param {*} f 修改this指向
   * @param {*} d 联动改变事件数据 e
   * @param {*} t 一级类目数据（接口请求）
   * @param {*} m 一二级数据位置所在下标
   * @param {*} z 二级类目（接口请求）
   * @param {*} s 需要展示的数据参数
   */
  FunBindMultiPickerColumnChange: function (f,d,t,m,z,s) {
    let a = [];
    m[d.detail.column] = d.detail.value;
    a[0] = t;
    a[1] = z[m[0]];
    m[1] = 0;
    f.setData({
      [s]:a
    });
  },

  /**
   * 
   * @param {*} u url地址
   * @param {*} d 发送给地址的数据
   * @param {*} h 请求头
   * @param {*} c 返回的数据
   */
  post:function(u,d,h,c){
      wx.request({
        url: u,
        data:d,
        method:'POST',
        header:h,
        success:function(res){
            return typeof c == "function" && c(res);
        },
        fail:function(res){
            return typeof c == "function" && c(res);
        }
      })
  },

  /**
   * 
   * @param {*} u 请求的地址
   * @param {*} d 发送的数据
   * @param {*} h 请求头
   * @param {*} c 返回的数据
   */
  get:function(u,d,h,c){
    wx.request({
        url: u,
        data:d,
        method:'GET',
        header:h,
        success:function(res){
            return typeof c == "function" && c(res);
        },
        fail:function(res){
            return typeof c == "function" && c(res);
        }
    })
  },

  FunInterceptor:function(n){
    if(n == 401){
        this.showToast('未登录/无权限');
    }else if(n == 400){
        this.showToast('系统异常,请稍后再试');
    }
  },

  /**
   * 地图选择位置
   * c 回调函数
   */
  FunChooseLocation:function(c){
    wx.chooseLocation({
        success:function(res){
            return typeof c == "function" && c(res);
        },
    });
  },

  /**
   * 获取经纬度
   * t 传入的type值 gcj02/wgs84
   * c 回调函数
   */
  FunGetLocation:function(t,c){
    wx.getLocation({
        type: t,
        success (res) {
            return typeof c == "function" && c(res);
        },
        fail(res){
            return  typeof c == "function" && c(res);
        }
    })
  },

  

  /**
   * 
   * @param {*} e
   * 封装文件 || ========================== 6/17 张 end
   */


    /**
     * ip/域名封装
     */
    urlCon:function(){
        // 线上ip
        // return 'https://www.hlguanjia.com/';
        // return 'http://47.115.57.64/';
        
        // 测试ip
        return "http://192.168.31.97:8000/";

        //开发人员IP
        // return "http://192.168.31.174:8000/"
    },

    // 下载接口配置
    down:(u,n)=>{
        return u + "files" + n;
    },
    // 原图查看
    imgLook:(u,n)=>{
        return u + "files/prev" + n + '?isBigPic=1';
    },
    // 压缩图片预览，查看pdf
    comImg:(u,n)=>{
        return u + 'files/prev' + n;
    },
};