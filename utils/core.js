const app = getApp();
module.exports = {

  /**
   * 将时间戳转换成时分秒
   * @param {*} t time 需要传入的时间戳
   */
    FunGetTime:function(t){
      let date = new Date(t),
      Y = date.getFullYear() + '-',
      M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-',
      D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ',
      h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':',
      m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':',
      s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds()),
      strDate = Y+M+D+h+m+s;
      // console.log(strDate,'时间格式');
      return strDate;
      // f.setData({[b]:strDate});
    },
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
    funShowToast:function(t){
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
            return typeof t == "function" && t(res);
          }
        })
    },

    /**
     * input去除空格封装
     */
    ridBlankSpace:function(n,f,d){
        f.setData({
            [n]:d.replace(/\s/g,''),
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
            this.funShowToast(i);
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
    // console.log(t,'123');
    f.setData({
      [s]: t
    })
  },
  
  /**
   * 二级联动改变数据
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
   * @param {*} f this指向全局
   * @param {*} u 请求的地址
   * @param {*} d 传入的数据
   * @param {*} c 返回的数据
   */
  funThreeLevelLinkage:function(f,c){
    let url = this.urlCon() + 'app/com/loadAreaTree',
    data = {},
    header = {"content-type":"application/json"};
    this.get(url,data,header,callback=>{
      let z = [],
      n = callback.data,
      needMarkProvince = [],
      needMarkCity = [],
      needMarkArea = [],
      needTotalCity = [],
      needTotalArea = [];
      for(let i in n){
        let carr = [],city = n[i].child;
        for(let b in city){
          let area = city[b].child,aarr = [];
          for(let c in area){
            aarr.push(area[c].name);
            needTotalArea.push(area[c].name);
          }
          carr.push(city[b].name);
          needMarkArea.push(aarr);
          needTotalCity.push(city[b].name);
        }
        needMarkProvince.push(n[i].name);
        needMarkCity.push(carr);
      }  
      z.push(needMarkProvince,needTotalCity,needMarkArea[0]);
      f.setData({
        [c]:z,
        needTotalCity:needTotalCity,
        needMarkProvince:needMarkProvince,
        needMarkCity:needMarkCity,
        needMarkArea:needMarkArea,
        needDataArea:n,
      });
    });
  },

  /**
   * 三级联动省市区封装
   * @param {*} f this指向
   * @param {*} e 滚动改变时的数据
   * @param {*} ai value index 的值
   * @param {*} ar 返回给组件显示的值
   * @param {*} nt 总市数据
   * @param {*} np 省的数据
   * @param {*} nc 分市数据
   * @param {*} na 分区数据
   */
  funThreeLevelLinkageChange:function(f,e,ai,ar,nt,np,nc,na){
    let d = {
      i:ai,
      a:ar
    };
    switch(e.detail.column){
      case 0:
        if(d.i[0] !== e.detail.value){
          d.i[1] = 0;
          d.i[2] = 0;
        }
        break;
      case 1:
        if(d.i[1] !== e.detail.value){
          d.i[2] = 0;
        }
        break;
    }
    d.i[e.detail.column] = e.detail.value;
    for(let z in np){
      if(parseInt(z) === d.i[0]){
        d.a[1] = nc[z];
        for(let s in nt){
          if(nt[s] === d.a[1][d.i[1]]){
            d.a[2] = na[s];
            break;
          }
        }
        break;
      }
    }
    f.setData(d);
  },

  FunInterceptor:function(n){
    if(n == 401){
        this.funShowToast('未登录/无权限');
    }else if(n == 400){
        this.funShowToast('系统异常,请稍后再试');
    }
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
            let s = res.statusCode;
            if(s === 401){
                wx.showToast({
                    title: '未登录/无权限',
                    icon:'none',
                    mask:true,
                    duration: 1500
                });
            }else if(s === 500){
                wx.showToast({
                    title: '服务器开小差了,请稍后再试',
                    icon:'none',
                    mask:true,
                    duration: 1500
                }); 
            }else if(s === 400){
              wx.showToast({
                title: res.data.message,
                icon:'none',
                mask:true,
                duration: 1500
              }); 
            }else{
                return typeof c == "function" && c(res);
            }
        },
        fail:function(res){
          wx.showToast({
            title: '系统正在升级中,请稍后再试',
            icon:'none',
            mask:true,
            duration: 1500
          }); 
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
            let s = res.statusCode;
            if(s === 401){
                wx.showToast({
                    title: '未登录/无权限',
                    icon:'none',
                    mask:true,
                    duration: 1500
                }); 
            }else if(s === 500){
                wx.showToast({
                    title: '系统异常,请稍后再试',
                    icon:'none',
                    mask:true,
                    duration: 2000
                }); 
            }else if(s === 400){
              wx.showToast({
                title: res.data.message,
                icon:'none',
                mask:true,
                duration: 1500
              }); 
            }else{
                return typeof c == "function" && c(res);
            }
        },
        fail:function(){
          wx.showToast({
            title: '系统正在升级中,请稍后再试',
            icon:'none',
            mask:true,
            duration: 1500
        }); 
        }
    })
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
   * 优质教师接口封装
   * @param {*} f 修改this指向
   * @param {*} d 需要传的参数
   * @param {*} u 需要传的url
   * @param {*} p 需要传的页数
   * @param {*} s 需要返回的数目
   * @param {*} c 需要展示的数据
   * @param {*} t 接口类型 授课教师/教师产品/培训机构/机构产品
   * '1' 授课教师 '2' 教师产品 '3' 培训机构 '4' 机构产品
   */
  funGoodTeacher:function(f,d,u,p,s,c,t){
    let url = this.urlCon() + u + '?page=' + p + '&size=' + s,
    header = {"content-type":"application/json"};
    this.post(url,d,header,callback=>{
      let n = callback.data.content,a = [];
      console.log(n,'数据');
      for(let i in n){
        let o = {};
        if(t === '1'){
            o.headImg = this.down(this.urlCon(),n[i].headImg);
            o.id = n[i].id;
            o.name = n[i].name;
            o.teachItem = n[i].teachItem;
            o.teachObj = n[i].teachObj;
            if(n[i].sex === '男'){
                o.icon = '/image/sexnan.png';
            }else{
                o.icon = '/image/sexnv.png';
            }
            o.sex = n[i].sex;
        }else if(t === '2'){
            n[i].banner === null?o.banner = '/image/noimg.png':o.banner = this.down(this.urlCon(),n[i].banner);
            o.id = n[i].id;
            o.title = n[i].title;
            o.price = n[i].price;
            o.unitPrice = n[i].unitPrice === null?'未定':n[i].unitPrice + '元/节';
            o.teachWay = n[i].teachWay;
            o.setCount = n[i].setCount + '节';
            o.teachSite = n[i].teachSite;
            o.studentLimit = n[i].studentLimit + '人';
            n[i].destineCount === null?o.destineCount = '尚未预约':o.destineCount = n[i].destineCount + '人';
        }else if(t === '3'){
          // console.log(n,'数据');
          o.headImg = this.down(this.urlCon(),n[i].logo);
          o.id = n[i].id;
          o.name = n[i].name;
          o.teachItem = n[i].teachItem;
          o.teachObj = n[i].teachObj;
          o.locationDesc = n[i].locationDesc;
        }else{
          n[i].banner === null?o.banner = '/image/noimg.png':o.banner = this.down(this.urlCon(),n[i].banner);
          o.id = n[i].id;
          o.title = n[i].title;
          o.price = n[i].price;
          o.teachWay = n[i].teachWay;
          o.setCount = n[i].setCount + '节';
          o.teachSite = n[i].teachSite;
          o.studentLimit = n[i].studentLimit + '人';
          n[i].destineCount === null?o.destineCount = '尚未预约':o.destineCount = n[i].destineCount + '人';
        }
        a.push(o);
      }
      f.setData({[c]:a});
    });
  },
  /**
   * 
   * @param {*} f this指向
   * @param {*} i 课程id
   * @param {*} u 请求的url
   * @param {*} c 返回的数据
   * @param {*} t 接口类型 1 教师产品详情 2 机构产品详情
   */
  funClassDetail:function(f,i,u,c,t){
      // console.log(i);
      let url = this.urlCon() + u + '/' + i,
      data = {},
      header = {"content-type":"application/json"};
      this.get(url,data,header,callback=>{
        let n = callback.data, // 总数据
        coupons = n.coupons, // 优惠券
        course = n.course, // 课程详细信息
        o = {};
        console.log(n,'课程详情返回数据');
        wx.setNavigationBarTitle({
          title: course.title
        })
        // banner 图
        course.banner === null?o.banner = ['/image/nobanner.png']:o.banner = [this.urlCon() + 'file' + course.banner];
        // 基本信息
        if(t === '1'){
          o.teacherClassInfo = [
              {title:'课程名称',con:course.title},
              {title:'课程总价',con:course.price + '元'},
              {title:'课程单价',con:course.unitPrice === null?'未定':course.unitPrice + '元'},
              {title:'授课级段',con:course.teachObj},
              {title:'课程描述',con:course.desc},
              {title:'课程性质',con:course.teachWay},
              {title:'课程人数',con:course.studentLimit + '人'},
              {title:'已报名人数',con:course.destineCount === null?'暂无预约':course.destineCount + '人'},
              {title:'授课地点',con:course.teachSite},
              {title:'报名时间',con:course.enterStartDay},
              {title:'开课时间',con:course.startTime},
              {title:'上课时间',con:course.attendTime === null?'未定':course.attendTime},
              {title:'课程节数',con:course.setCount + '节'},
              {title:'课程福利',con:course.teachBoon},
              {title:'是否有优惠券',con:coupons.length === 0?'无':'有'},
          ];
        }else{
          o.teacherClassInfo = [
              {title:'课程名称',con:course.title},
              {title:'课程总价',con:course.price + '元'},
              {title:'课程单价',con:course.unitPrice === null?'未定':course.unitPrice + '元'},
              {title:'授课级段',con:course.teachObj},
              {title:'课程描述',con:course.desc},
              {title:'课程性质',con:course.teachWay},
              {title:'课程人数',con:course.studentLimit + '人'},
              {title:'已报名人数',con:course.destineCount === null?'暂无预约':course.destineCount + '人'},
              {title:'授课地点',con:course.teachSite},
              {title:'上课时间',con:course.attendTime === null?'未定':course.attendTime},
              {title:'课程节数',con:course.setCount + '节'},
              {title:'课程福利',con:course.teachBoon},
              {title:'是否有优惠券',con:coupons.length === 0?'无':'有'},
          ];
        }

        // 课程中心 优惠券
        console.log(coupons,'优惠券');
        if(coupons.length !== 0){
          o.couponsInfo = coupons;
        }else{
          o.couponsInfo = [];
        }
        
        // 课程详情图
        let detailImgs = course.detailImgs,classDetailsImg = [];
        detailImgs === null?o.classDetailsImg = []:iv = detailImgs.split(',');
        for(let e in iv){
            classDetailsImg.push(this.down(this.urlCon(),iv[e]));
        }
        o.classDetailsImg = classDetailsImg;

        // 他/她的课程
        let content = n.myCourseList.content,arr = [];
        for(let z in content){
            let obj = {};
            content[z].banner === null?obj.banner = '/image/noimg.png':obj.banner = this.down(this.urlCon(),content[z].banner);
            obj.id = content[z].id;
            obj.title = content[z].title;
            obj.price = content[z].price;
            obj.unitPrice = content[z].unitPrice === null?'未定':content[z].unitPrice + '元/节';
            obj.teachWay = content[z].teachWay;
            obj.setCount = content[z].setCount + '节';
            obj.teachSite = content[z].teachSite;
            obj.studentLimit = content[z].studentLimit + '人';
            content[z].destineCount === null?obj.destineCount = '尚未预约':obj.destineCount = content[z].destineCount + '人';
            arr.push(obj);
        }
        o.productCenterData = arr;
        console.log(o,'数据');
        f.setData({[c]:o});
      });
  },

/**
 * 
 * @param {*} f this指向
 * @param {*} u 请求的地址
 * @param {*} c 返回的数据
 */
  funPriceSort:function(f,u,c,d){
    let data = {},
    header = {"content-type":"application/json"},
    url = this.urlCon() + u;
    this.get(url,data,header,callback=>{
        let n = callback.data,arr = [];
        // console.log(n,'数据');
        for(let i in n){
            arr.push(n[i].label);
        }
        f.setData({[c]:arr,[d]:n});
        // console.log(arr);
    });
  },

  /**
   * 
   * @param {*} f this指向全局
   * @param {*} i 需要查询的id
   * @param {*} u 请求的url地址
   * @param {*} c 回调函数
   * @param {*} t 需要查询的接口类型 1 教师详情接口 2 机构详情接口
   */
  funTeacherDetails:function(f,i,u,c,t){
    let url = this.urlCon() + u + '/' + i,
    data = {},
    header = {"content-type":"application/json"};
    this.get(url,data,header,callback=>{
      let d = callback.data,
      commentsInfo = d.comments, // 评论信息（留言信息）
      certificates = d.myCertificates, // 证书信息
      content = d.myCourseList.content, // 课程列表
      commonCoupon = d.commonCoupon, // 优惠券
      obj = {};
      // console.log(d,'测试');
      if(t === '1'){
        let basicInfo = d.teacher;
        // 如果是教师则返回教师的名称
        wx.setNavigationBarTitle({
          title: basicInfo.name + '主页'
        })
        // 信息简介
        obj.teacherInfo = [
          {title:'昵称：',con:basicInfo.nickName},
          {title:'教师姓名：',con:basicInfo.name},
          {title:'联系电话：',con:basicInfo.callPhone},
          {title:'性别：',con:basicInfo.sex},
          {title:'毕业院校：',con:basicInfo.graduateSchool},
          {title:'教授科目：',con:basicInfo.teachItem},
          {title:'教授级段：',con:basicInfo.teachObj},
          {title:'现居地址：',con:basicInfo.locationDesc === null?basicInfo.locationDesc = '暂未上传':basicInfo.locationDesc},
          {title:'通用优惠券',con:commonCoupon.length === 0?'无':'有'},
        ];
        // 教师课程
        if(content.length !== 0){
          let Tarr = [];
          for(let z in content){
            let o = {};
            content[z].banner === null?o.banner = '/image/noimg.png':o.banner = this.down(this.urlCon(),content[z].banner);
            o.id = content[z].id;
            o.title = content[z].title;
            o.price = content[z].price;
            o.unitPrice = content[z].unitPrice === null?'未定':content[z].unitPrice + '元/节';
            o.teachWay = content[z].teachWay;
            o.setCount = content[z].setCount + '节';
            o.teachSite = content[z].teachSite;
            o.studentLimit = content[z].studentLimit + '人';
            content[z].destineCount === null?o.destineCount = '尚未预约':o.destineCount = content[z].destineCount + '人';
            Tarr.push(o);
          }
          obj.courseListData = Tarr;
        }else{
          obj.courseListData = [];
        }
        // 优惠券
        if(commonCoupon.length !== 0){
          obj.couponsInfo = commonCoupon;
        }else{
          obj.couponsInfo = [];
        }
        // 资质证书
        if(certificates.length !== 0){
          let Tarr = [];
          for(let a in certificates){
            let o = {};
            Tarr.push(o);
          }
          obj.approveInfo = Tarr;
          console.log('该教师尚未上传证书');
        }else{
          obj.approveInfo = [];
        }
        // banner图
        obj.banner = [this.down(this.urlCon(),basicInfo.banner)];
        // 座右铭
        obj.myInfo = basicInfo.motto;
        // 用户留言
        if(commentsInfo.length === 0){
          obj.commentsInfo = [];
        }else{
          console.log('有留言');
          let Tarr = [];
          for(let a in commentsInfo){
            let o = {};
            o.nickName1 = commentsInfo[a].nickName1;
            o.comment = commentsInfo[a].comment;
            commentsInfo[a].nickName2 === null?o.nickName2 = '':o.nickName2 = commentsInfo[a].nickName2;
            commentsInfo[a].replyContent === null?o.replyContent = '':o.replyContent = commentsInfo[a].replyContent;
            Tarr.push(o);
          }
          obj.commentsInfo = Tarr;
        }
      }else{
        let basicInfo = d.org;
        // 如果是机构则返回机构的名称
        wx.setNavigationBarTitle({
          title: basicInfo.name + '主页'
        })
        obj.institutionsInfo = [
          {title:'机构名称：',con:basicInfo.name},
          {title:'联系人：',con:basicInfo.linkName},
          {title:'联系电话：',con:basicInfo.callPhone},
          {title:'在职教师：',con:basicInfo.teacherCount + '人'},
          {title:'教授科目：',con:basicInfo.teachItem},
          {title:'服务范围：',con:basicInfo.teachObj},
          {title:'机构地址：',con:basicInfo.locationDesc},
          {title:'通用优惠券：',con:commonCoupon.length === 0?'无':'有'},
        ];
        // 机构课程
        if(content.length !== 0){
          let Tarr = [];
          for(let z in content){
            let o = {};
            content[z].banner === null?o.banner = '/image/noimg.png':o.banner = this.down(this.urlCon(),content[z].banner);
            o.id = content[z].id;
            o.title = content[z].title;
            o.price = content[z].price;
            o.teachWay = content[z].teachWay;
            o.setCount = content[z].setCount + '节';
            o.teachSite = content[z].teachSite;
            o.studentLimit = content[z].studentLimit + '人';
            content[z].destineCount === null?o.destineCount = '尚未预约':o.destineCount = content[z].destineCount + '人';
            Tarr.push(o);
          }
          obj.institutionsProductCenterData = Tarr;
        }else{
          obj.institutionsProductCenterData = [];
        }
        // 优惠券
        if(commonCoupon.length !== 0){
          obj.couponsInfo = commonCoupon;
        }else{
          obj.couponsInfo = [];
        }
        // 资质证书
        if(certificates.length !== 0){
          let Tarr = [];
          for(let a in certificates){
            let o = {};
            Tarr.push(o);
          }
          obj.institutionsApproveInfo = Tarr;
          console.log('该教师尚未上传证书');
        }else{
          obj.institutionsApproveInfo = [];
        }
        // banner图
        obj.banner = [this.down(this.urlCon(),basicInfo.banner)];
        // 视频
        obj.videoUrl = this.down(this.urlCon(),basicInfo.videoUrl);
        obj.name = this.down(this.urlCon(),basicInfo.name);
        // 企业简介
        obj.myInfo = basicInfo.desc;

        // 用户留言
        if(commentsInfo.length === 0){
          obj.commentsInfo = [];
        }else{
          console.log('有留言');
          let Tarr = [];
          for(let a in commentsInfo){
            let o = {};
            o.nickName1 = commentsInfo[a].nickName1;
            o.comment = commentsInfo[a].comment;
            commentsInfo[a].nickName2 === null?o.nickName2 = '':o.nickName2 = commentsInfo[a].nickName2;
            commentsInfo[a].replyContent === null?o.replyContent = '':o.replyContent = commentsInfo[a].replyContent;
            Tarr.push(o);
          }
          obj.commentsInfo = Tarr;
        }
      }
      console.log(obj,'1');
      f.setData({[c]:obj});
    });
  },

  /**
   * 微信登录
   */
  FunWxLogin:function(e,u,i,r){
    wx.getStorage({
      key: 'userInfo',
      success:(res)=>{
        console.log(JSON.parse(decodeURIComponent(res.data)),'微信缓存用户数据');
        getApp().globalData.userInfo = JSON.parse(decodeURIComponent(res.data));
        switch(parseInt(u)){
          case 0:
            wx.reLaunch({
              url: '/parentsVersion/parentshome/parentshome'
            });
            break;
          case 1:
            wx.reLaunch({
              url: '/teacherVersion/teacherhome/teacherhome'
            });
            break;
          case 2:
            wx.reLaunch({
              url: '/institutionVersion/institutionshome/institutionshome'
            });
            break;
        }
      },
      fail:(res)=>{
        wx.login({
          success:(res)=>{
            let codes = res.code;
            url = this.urlCon() + 'app/login3?role=' + r,
            data = {code:codes,encryptedData:e,iv:i},
            header = {"content-type":"application/x-www-form-urlencoded"};
            this.post(url,data,header,callback=>{
              console.log(callback,'用户数据');
              if(callback.statusCode === 200){
                let s = callback.data;
                getApp().globalData.userInfo = s;
                wx.setStorage({
                  key:"userInfo",
                  data:encodeURIComponent(JSON.stringify(s))
                })
                switch(parseInt(u)){
                  case 0:
                    wx.reLaunch({
                      url: '/parentsVersion/parentshome/parentshome'
                    });
                    break;
                  case 1:
                    wx.reLaunch({
                      url: '/teacherVersion/teacherhome/teacherhome'
                    });
                    break;
                  case 2:
                    wx.reLaunch({
                      url: '/institutionVersion/institutionshome/institutionshome'
                    });
                    break;
                }
              }
            });
          }
        })
      }
    })
  },

  /**
   * 获取手机验证码
   */
  FunGetCode:function(p){
    let url = this.urlCon() + 'app/sendCode?tel=' + p,
    data = {},
    header = {"content-type":"application/json"};
    this.post(url,data,header,callback=>{
      console.log(callback,'返回数据');
      this.funShowToast('验证码为：' + callback.data);
    });
  },

  /**
   * 
   * @param {*} p 手机号
   * @param {*} c 验证码
   * @param {*} r role 用户角色
   */
  FunCodeLogin:function(p,c,u,r){
    wx.getStorage({
      key: 'userInfo',
      success:(res)=>{
        console.log(JSON.parse(decodeURIComponent(res.data)),'微信缓存用户数据');
        getApp().globalData.userInfo = JSON.parse(decodeURIComponent(res.data));
        switch(parseInt(u)){
          case 0:
            wx.reLaunch({
              url: '/parentsVersion/parentshome/parentshome'
            });
            break;
          case 1:
            wx.reLaunch({
              url: '/teacherVersion/teacherhome/teacherhome'
            });
            break;
          case 2:
            wx.reLaunch({
              url: '/institutionVersion/institutionshome/institutionshome'
            });
            break;
        }
      },
      fail:(res)=>{
        wx.login({
          success: (res) => {
            let code = res.code,
            url  = this.urlCon() + 'app/login2?tel=' + p + '&yzm=' + c + '&code=' + code + '&role=' + r,
            data = {},
            header = {"content-type":"application/x-www-form-urlencoded"};
            this.post(url,data,header,callback=>{
              console.log(callback,'返回用户数据');
              if(callback.statusCode === 200){
                let s = callback.data;
                getApp().globalData.userInfo = s;
                wx.setStorage({
                  key:"userInfo",
                  data:encodeURIComponent(JSON.stringify(s))
                })
                switch(parseInt(u)){
                  case 0:
                    wx.reLaunch({
                      url: '/parentsVersion/parentshome/parentshome'
                    });
                    break;
                  case 1:
                    wx.reLaunch({
                      url: '/teacherVersion/teacherhome/teacherhome'
                    });
                    break;
                  case 2:
                    wx.reLaunch({
                      url: '/institutionVersion/institutionshome/institutionshome'
                    });
                    break;
                }
              }
            });
          },
          fail:function(res){
            console.log(res,'返回错误信息');
          },
        })
      }
    })
  },

  /**
   * 获取动态列表数据
   * @param {*} f this指向
   * @param {*} l lngLat 经纬度
   * @param {*} p page 第几页，用于分页
   * @param {*} t 用户token
   * @param {*} d 返回页面展示的属性
   */
  FunDynamic:function(f,l,p,t,d){
    let url = this.urlCon() + 'app/par/dynamic?lngLat=' + l + '&page=' + p,
    data = {},
    header = {"content-type":"application/json","Authorization":t};
    this.get(url,data,header,callback=>{
      console.log(callback,'动态返回数据');
      if(callback.statusCode === 200){
        let res = callback.data,Darr = [];
        if(res !== ""){
          for(let i in res){
            let o = {},Sarr = [];
            if(res[i].picture !== ''){
              if(res[i].picture.indexOf(',') === -1){
                let y = {};
                y.specificImg = this.down(this.urlCon(),res[i].picture);
                Sarr.push(y);
              }else{
                let conImg = res[i].picture.split(',');
                for(let z in conImg){
                  let y = {};
                  y.specificImg = this.down(this.urlCon(),conImg[z]);
                  Sarr.push(y);
                }
              }
            }
            o.releaseImg = Sarr;
            o.uid = res[i].uid;
            o.id = res[i].id;
            o.membersImg = this.down(this.urlCon(),res[i].headImg);
            o.membersName = res[i].nickName;
            o.releaseText = res[i].content;
            o.createBtnData = [
              {icon:res[i].hasAdmire?'/image/yz.png':'/image/z.png',con:res[i].like},
              {icon:'/image/xx.png',con:res[i].commentCount},
              {icon:'/image/sj.png',con:res[i].publishDesc},
              {icon:'/image/jl.png',con:res[i].distanceDesc}
            ];
            o.picture = res[i].picture;
            o.fbrole = res[i].role;
            o.followed = res[i].followed;
            o.hasAdmire = res[i].hasAdmire;
            o.video = res[i].video;
            Darr.push(o);
          }
          console.log(Darr,'组合数据');
          f.setData({[d]:Darr});
        }
      }
    });
  },

  /**
   * 点赞接口
   * @param {*} f this指向
   * @param {*} p pid 动态的主键id
   * @param {*} r role 用户的角色
   * @param {*} t token 用户的token
   */
  FunClickPraise:function(p,r,t,e){
    let url = this.urlCon() + 'app/par/dynamic/like?pid=' + p + '&role=' + r,
    data = {},
    header = {"content-type":"application/json","Authorization":t};
    this.post(url,data,header,callback=>{
      // console.log(callback,'点赞返回的数据');
      return typeof e == "function" && e(callback);
      // FunDynamic:function(f,l,p,t,d)
    });
  },

  /**
   * 获取评论列表接口
   * @param {*} f this指向
   * @param {*} p pid 该条动态的id
   * @param {*} r 发布这条动态的用户角色
   * @param {*} t token
   * @param {*} l 接口调用成功后返回的数据
   */
  FunLeaveMessageList:function(f,p,r,t,l){
    let url = this.urlCon() + 'app/par/dynamic/messageList?pid=' + p + '&role=' + r,
    data = {},
    header = {"content-type":"application/x-www-form-urlencoded","Authorization":t};
    this.get(url,data,header,callback=>{
      console.log(callback,'留言条数');
      if(callback.statusCode === 200){
        let needData = callback.data;
        if(needData.length !== 0){
          console.log('有留言');
          let Tarr = [];
          for(let a in needData){
            let o = {};
            o.nickName1 = needData[a].nickName1;
            o.comment = needData[a].comment;
            needData[a].nickName2 === null?o.nickName2 = '':o.nickName2 = needData[a].nickName2;
            needData[a].replyContent === null?o.replyContent = '':o.replyContent = needData[a].replyContent;
            o.id = needData[a].id;
            o.replyId = needData[a].replyId;
            Tarr.push(o);
          }
          console.log(Tarr,'留言数据查看');
          f.setData({[l]:Tarr});
        }else{
          f.setData({[l]:needData});
        }
      }
    });
  },

  /**
   * 用户评论接口
   * @param {*} f thi指向
   * @param {*} p pid 动态的id
   * @param {*} u uid 发布该条动态的用户id
   * @param {*} r fbrole 发布该条动态的用户角色
   * @param {*} m message 用户留言的信息
   * @param {*} t token 留言用户的平台token
   * @param {*} l 留言成功后将数据返回
   */
  FunMessage:function(f,p,u,r,m,t,l){
    let url = this.urlCon() + 'app/par/dynamic/sendMessage',
    data = {"pid":p,"role":r,"message":m,"uid":u},
    header = {"content-type":"application/x-www-form-urlencoded","Authorization":t};
    this.post(url,data,header,callback=>{
      if(callback.statusCode === 200){
        console.log(callback,'返回数据');
        this.funShowToast('恭喜，评论成功');
        this.FunLeaveMessageList(f,p,r,t,l);
      }
    });
  },

  /**
   * 用户回复留言
   * @param {*} f this指向
   * @param {*} i id 要回复的留言的主键id
   * @param {*} m message 用户回复的内容信息
   * @param {*} t token
   */
  FunReplyMessge:function(i,m,t,e){
    let url = this.urlCon() + 'app/par/dynamic/replyMessage',
    data = {'id':i,'message':m},
    header = {"content-type":"application/x-www-form-urlencoded","Authorization":t};
    this.post(url,data,header,callback=>{
      console.log(callback,'返回数据');
      if(callback.statusCode === 200){
        // this.funShowToast('恭喜，回复成功');
        return typeof e == "function" && e(callback);
      }
    });
  },

  /**
   * 关注接口
   * @param {*} u uid 发布动态者的id
   * @param {*} r role 发布动态者的角色
   * @param {*} t token 登录者的token
   */
  FunFocusOn:function(u,r,t,e){
    let url = this.urlCon() + 'app/par/dynamic/follow?uid=' + u + '&role=' + r,
    data = {},
    header = {"content-type":"application/json","Authorization":t};
    this.post(url,data,header,callback=>{
      if(callback.statusCode === 200){
        return typeof e == "function" && e(callback);
      }
    });
  },

  /**
   * 选择图片封装
   * @param {*} f this 指向
   * @param {*} a newArr 传入的空数组，用于承载数据传递给页面进行渲染
   * @param {*} z number 最多上传几张图片
   * @param {*} s sizeType 上传的图片为压缩图还是原图
   * @param {*} c sourceType 图片是从相册选取还是使用相机
   * @param {*} d 承载页面渲染的容器
   * @param {*} e 回调函数
   */
  FunchooseImage:function(f,a,z,s,c,d,e){
    let b = parseInt(z) - a.length, // b 用户还能上传的图片数量 如果为0 则用户能够上传的图片已经到达了最大限制 
    arr = a;   
    if(b === 0){
      this.funShowToast('您已经上传了' + z + '张，无法继续上传');
    }else{
      wx.chooseImage({
        count: b,
        sizeType: s, //上传的图片为压缩图
        sourceType: c, // 从相册选图或使用相机
        success: (res) => {
          // tempFilePath可以作为img标签的src属性显示图片
          let tempFilePaths = res.tempFilePaths;
          for(let i in tempFilePaths){
            arr.push(tempFilePaths[i]);
          }
          f.setData({[d]:arr});
          return typeof e == "function" && e(res);
        },
        fail: (res) => {},
        complete: (res) => {},
      })
    }
  },

  /**
   * 上传图片封装
   * @param {*} i 图片循环的下标
   * @param {*} f 图片的文件格式 file
   * @param {*} t 用户token
   * @param {*} tfp tempFilePaths 返回的图片数组
   * @param {*} e 回调函数
   */
  FunUploadImg:function(i,f,t,tfp,e){
    wx.uploadFile({
      url:this.urlCon() + 'api/pictures',
      header:{"content-type":"application/x-www-form-urlencoded","Authorization":t},
      filePath: tfp[i],
      name: f,
      success: (res) =>{
        return typeof e == "function" && e(res);
      },
      fail: (res) => {
        return typeof e == "function" && e(res);
      },
      complete: (res) => {},
    });
  },

  /**
   * 
   * @param {*} f this 指向
   * @param {*} s 控制蒙层显示还是隐藏
   * @param {*} c 监听用户是点击确定还是取消
   * @param {*} t 需要传出的数据
   * @param {*} n 总数据
   * @param {*} i icon 需要加载的第一个icon
   * @param {*} v value 需要加载的第一个value
   */
  FunCancelDetermine:function(f,s,c,t,n,i,v){
    if(c === 'cancel'){
      f.setData({
        [i]:n[0].label,
        [v]:n[0].value,
      });
    }
    if(s){
      f.setData({[t]:true});
    }else{
      f.setData({[t]:false});
    }
  },

  /**
   * 心情/天气数据加载封装
   * @param {*} f this 指向
   * @param {*} u url 请求地址
   * @param {*} b back 返回数据
   * @param {*} i icon 数据预加载时显示的数组中第一个图标
   * @param {*} v value 数据预加载时显示的数组中第一个数据
   */
  FunPickerView:function(f,u,b,i,v){
    let url = this.urlCon() + u,
    data = {},
    header = {"content-type":"application/json"};
    this.get(url,data,header,callback=>{
      console.log(callback,'返回数据');
      let needData = callback.data,arr = [];
      for(let i in needData){
        let obj = {};
        obj.id = needData[i].id;
        obj.label = this.down(this.urlCon(),needData[i].label);
        // obj.label = '/image/wdtq.png';
        obj.value = needData[i].value;
        arr.push(obj);
      }
      f.setData({
        [b]:arr,
        [i]:arr[0].label,
        [v]:arr[0].value,
      });
    });
  },


  /**
   * 视频上传数据封装
   * @param {*} f this 指向
   * @param {*} t sourceType 视频选择的来源
   * @param {*} d maxDuration 拍摄视频最长拍摄时间，单位秒
   * @param {*} m camera 默认拉起的是前置或者后置摄像头。部分 Android 手机下由于系统 ROM 不支持无法生效
   * @param {*} p compressed 是否压缩所选择的视频文件
   * @param {*} n duration 返回数据 显示视频时长
   * @param {*} e tempFilePathVideo 返回数据用于页面展示视频
   * @param {*} v isShowVideo 是否显示视频组件
   * @param {*} u url 请求保存视频的地址
   * @param {*} a videoUrl 需要保存的视频地址
   * @param {*} i isUploadImg 
   */
  FunUploadVideo:function(f,t,d,m,p,n,e,v,u,a,i){
    let use = getApp().globalData.userInfo,
    token = use.token;
    this.alert('友情提示','为了更友好的体验，请上传60秒内的短视频',callback=>{
      console.log(callback,'返回函数');
      if(callback.confirm){
        wx.chooseVideo({
          sourceType: t,
          maxDuration: d,
          camera: m,
          compressed: p,
          success:(res) => {
            if(res.duration.toFixed(0)<60){
              if(res.duration.toFixed(0)<10){
                f.setData({
                  [n]:'0:0' + res.duration.toFixed(0),
                  [e]:res.tempFilePath,
                  [v]:true
                });
              }else{
                f.setData({
                  [n]:'0:' + res.duration.toFixed(0),
                  [e]:res.tempFilePath,
                  [v]:true
                });
              }
            }else if(res.duration.toFixed(0) === 60){
              f.setData({
                [n]:'1:00',
                [e]:res.tempFilePath,
                [v]:true
              });
            }else{
              this.funShowToast('您上传的视频大于60秒，请重新上传');
              f.setData({[v]:false});
              return;
            }
            wx.uploadFile({
              url:this.urlCon() + u,
              header:{"content-type":"application/x-www-form-urlencoded","Authorization":token},
              filePath: res.tempFilePath,
              name: 'file',
              success: (res) =>{
                console.log(res,'视频返回路径');
                f.setData({[a]:JSON.parse(decodeURIComponent(res.data)).data[0],[i]:false});
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
        return u + "file" + n;
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