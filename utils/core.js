const app = getApp();
module.exports = {

  /**
   * 将时间戳转换成时分秒
   * @param {*} t time 需要传入的时间戳
   * @param {*} l 需要获取时间的方式 "1" 年月日 时分秒 "2"  年月日
   */
    FunGetTime:function(t,l){
      let date = new Date(t),
      Y = date.getFullYear() + '-',
      M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-',
      D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ',
      h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':',
      m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':',
      s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds()),
      strDatens = Y+M+D;
      strDate = Y+M+D+h+m+s;
      if(l === "1"){
        return strDate;
      }else{
        return strDatens;
      }
    },
    /**
     * 获取设备信息
     */
    getSystemInfo:function(t){
        wx.getSystemInfo({
          success: (res) => {
            return typeof t == "function" && t(res);
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
   * POST
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
        success:(res)=>{
            let s = res.statusCode;
            if(s === 401){
              this.funShowToast('未登录/无权限');
            }else if(s === 500){
              this.funShowToast('服务器开小差了,请稍后再试');
            }else if(s === 400){
              this.funShowToast(res.data.message);
            }else{
                return typeof c == "function" && c(res);
            }
        },
        fail:(res)=>{
          this.funShowToast('系统正在升级中,请稍后再试');
        }
      })
  },

  /**
   * GET
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
        success:(res)=>{
            let s = res.statusCode;
            if(s === 401){
              this.funShowToast('未登录/无权限');
            }else if(s === 500){
              this.funShowToast('服务器开小差了,请稍后再试');
            }else if(s === 400){
              this.funShowToast(res.data.message);
            }else{
                return typeof c == "function" && c(res);
            }
        },
        fail:(res)=>{
          this.funShowToast('系统正在升级中,请稍后再试');
        }
    })
  },

  /**
   * DELETE
   * @param {*} u url地址
   * @param {*} d 发送给地址的数据
   * @param {*} h 请求头
   * @param {*} c 返回的数据
   */
  delete:function(u,d,h,c){
      wx.request({
        url: u,
        data:d,
        method:'DELETE',
        header:h,
        success:(res)=>{
            let s = res.statusCode;
            if(s === 401){
              this.funShowToast('未登录/无权限');
            }else if(s === 500){
              this.funShowToast('服务器开小差了,请稍后再试');
            }else if(s === 400){
              this.funShowToast(res.data.message);
            }else{
                return typeof c == "function" && c(res);
            }
        },
        fail:(res)=>{
          this.funShowToast('系统正在升级中,请稍后再试');
        }
      })
  },

  /**
   * PUT
   * @param {*} u url地址
   * @param {*} d 发送给地址的数据
   * @param {*} h 请求头
   * @param {*} c 返回的数据
   */
  put:function(u,d,h,c){
      wx.request({
        url: u,
        data:d,
        method:'PUT',
        header:h,
        success:(res)=>{
            let s = res.statusCode;
            if(s === 401){
              this.funShowToast('未登录/无权限');
            }else if(s === 500){
              this.funShowToast('服务器开小差了,请稍后再试');
            }else if(s === 400){
              this.funShowToast(res.data.message);
            }else{
                return typeof c == "function" && c(res);
            }
        },
        fail:(res)=>{
          this.funShowToast('系统正在升级中,请稍后再试');
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
      console.log(a,'课程数据');
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
   * 手机号密码登录
   * @param {*} u userName 账号 
   * @param {*} p password 密码
   * @param {*} r role 场景
   * @param {*} t userType
   */
  FunPhoneWorldLogin:function(u,p,r,t){
    wx.getStorage({
      key: 'userInfo',
      success:(res)=>{
        console.log(JSON.parse(decodeURIComponent(res.data)),'微信缓存用户数据');
        getApp().globalData.userInfo = JSON.parse(decodeURIComponent(res.data));
        switch(parseInt(t)){
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
            url = this.urlCon() + 'app/login1?userName=' + u + '&password=' + p + '&code=' + codes + '&role=' + r,
            data = '',
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
                switch(parseInt(t)){
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
    // wx.login({
    //   success:(res)=>{
    //     let codes = res.code;
    //     url = this.urlCon() + 'app/login3?role=' + r,
    //     data = {code:codes,encryptedData:e,iv:i},
    //     header = {"content-type":"application/x-www-form-urlencoded"};
    //     this.post(url,data,header,callback=>{
    //       console.log(callback,'用户数据');
    //       if(callback.statusCode === 200){
    //         let s = callback.data;
    //         getApp().globalData.userInfo = s;
    //         switch(parseInt(u)){
    //           case 0:
    //             wx.reLaunch({
    //               url: '/parentsVersion/parentshome/parentshome'
    //             });
    //             break;
    //           case 1:
    //             wx.reLaunch({
    //               url: '/teacherVersion/teacherhome/teacherhome'
    //             });
    //             break;
    //           case 2:
    //             wx.reLaunch({
    //               url: '/institutionVersion/institutionshome/institutionshome'
    //             });
    //             break;
    //         }
    //       }
    //     });
    //   }
    // })
  },


  /**
   * 设置手机号及密码
   * @param {*} s 手机号
   * @param {*} y 验证码
   * @param {*} m 密码
   */
  FunSetInfo:function(s,y,m){
    let url = this.urlCon() + 'app/resetPassword?tel=' + s + '&yzm=' + y + '&newPassword=' + m,
    data = '',
    header = {"content-type":"application/x-www-form-urlencoded"};
    this.put(url,data,header,res=>{
      console.log(res,'返回信息');
      if(res.statusCode === 200){
        this.funShowToast('设置成功');
        setTimeout(function(){
          wx.navigateBack({
            delta: 1
          })
        },1500);
      }
    });
  },

  /**
   * 微信登录
   * @param {*} e 
   * @param {*} u 
   * @param {*} i 
   * @param {*} r 
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
    
    // wx.login({
    //   success:(res)=>{
    //     let codes = res.code;
    //     url = this.urlCon() + 'app/login3?role=' + r,
    //     data = {code:codes,encryptedData:e,iv:i},
    //     header = {"content-type":"application/x-www-form-urlencoded"};
    //     this.post(url,data,header,callback=>{
    //       console.log(callback,'用户数据');
    //       if(callback.statusCode === 200){
    //         let s = callback.data;
    //         getApp().globalData.userInfo = s;
    //         switch(parseInt(u)){
    //           case 0:
    //             wx.reLaunch({
    //               url: '/parentsVersion/parentshome/parentshome'
    //             });
    //             break;
    //           case 1:
    //             wx.reLaunch({
    //               url: '/teacherVersion/teacherhome/teacherhome'
    //             });
    //             break;
    //           case 2:
    //             wx.reLaunch({
    //               url: '/institutionVersion/institutionshome/institutionshome'
    //             });
    //             break;
    //         }
    //       }
    //     });
    //   }
    // })
  },

  /**
   * 获取手机验证码
   */
  FunGetCode:function(p,i){
    let data = {},
    header = {"content-type":"application/json"},
    url = '';
    if(i === "log"){
      url = this.urlCon() + 'app/sendCode?tel=' + p;
    }else{
      url = this.urlCon() + 'app/sendCode?tel=' + p + '&scene=resetPassword';
    }
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
    // wx.login({
    //   success: (res) => {
    //     let code = res.code,
    //     url  = this.urlCon() + 'app/login2?tel=' + p + '&yzm=' + c + '&code=' + code + '&role=' + r,
    //     data = {},
    //     header = {"content-type":"application/x-www-form-urlencoded"};
    //     this.post(url,data,header,callback=>{
    //       console.log(callback,'返回用户数据');
    //       if(callback.statusCode === 200){
    //         let s = callback.data;
    //         getApp().globalData.userInfo = s;
    //         switch(parseInt(u)){
    //           case 0:
    //             wx.reLaunch({
    //               url: '/parentsVersion/parentshome/parentshome'
    //             });
    //             break;
    //           case 1:
    //             wx.reLaunch({
    //               url: '/teacherVersion/teacherhome/teacherhome'
    //             });
    //             break;
    //           case 2:
    //             wx.reLaunch({
    //               url: '/institutionVersion/institutionshome/institutionshome'
    //             });
    //             break;
    //         }
    //       }
    //     });
    //   },
    //   fail:function(res){
    //     console.log(res,'返回错误信息');
    //   },
    // })
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

            if(res[i].headImg.indexOf('https') !== -1){
              o.membersImg = res[i].headImg;
            }else if(res[i].headImg.indexOf('http') !== -1){
              o.membersImg = res[i].headImg;
            }else{
              o.membersImg = this.down(this.urlCon(),res[i].headImg);
            }
            if(res[i].sex === '男'){
              o.sexImg = '/image/sexnan.png';
            }else if(res[i].sex === '女'){
              o.sexImg = '/image/sexnv.png';
            }else{
              o.sexImg = '/image/sexbm.png';
            }
            o.releaseImg = Sarr;
            o.uid = res[i].uid;
            o.distanceDesc = res[i].distanceDesc === ''?'保密':res[i].distanceDesc;
            o.id = res[i].id;
            o.membersName = res[i].nickName;
            o.releaseText = res[i].content;
            o.createBtnData = [
              {icon:res[i].hasAdmire?'/image/yz.png':'/image/z.png',con:res[i].like},
              {icon:'/image/xx.png',con:res[i].commentCount},
              {icon:'/image/sj.png',con:res[i].publishDesc}
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
   * @param {*} j tempFilePathsArrs 放置图片的容器
   * @param {*} d 承载页面渲染的容器
   * @param {*} e 回调函数
   */
  FunchooseImage:function(f,a,z,s,c,j,d,e){
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
          if(j === undefined){
            for(let i in tempFilePaths){
              arr.push(tempFilePaths[i]);
            }
            f.setData({[d]:arr});
          }else{
            if(j.length === 0){
              for(let i in tempFilePaths){
                arr.push(tempFilePaths[i]);
              }
              f.setData({[d]:arr});
            }else{
              for(let i in tempFilePaths){
                j.push(tempFilePaths[i]);
              }
              f.setData({[d]:j});
            }
          }
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
   * 用户自定义上传图像封装
   * @param {*} u 图像路径
   */
  FunCustomImg:function(u,e){
    let use = getApp().globalData.userInfo,
    token = use.token;
    wx.uploadFile({
      url:this.urlCon() + 'api/users/updateAvatar',
      header:{"content-type":"application/x-www-form-urlencoded","Authorization":token},
      filePath: u,
      name: 'file',
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
   * 删除图片封装
   * @param {*} f this 指向
   * @param {*} d data 传入的路径
   * @param {*} p 需要返回的展示数据
   * @param {*} n 需要删除的图片路径下标
   */
  FunDealImg:function(f,d,p,b,n,j,a){
    let url = this.urlCon() + 'api/pictures/url',
    use = getApp().globalData.userInfo,
    token = use.token,
    header = {"content-type":"application/json","Authorization":token};
    if(b !== ''){
      this.delete(url,d,header,callback=>{
        if(callback.statusCode === 200){
          p.splice(n,1);
          b.splice(n,1);
          f.setData({[j]:p,[a]:b});
        }
      });
    }else{
      this.delete(url,d,header,callback=>{
        if(callback.statusCode === 200){
          p.splice(n,1);
          f.setData({[j]:p});
        }
      });
    }
  },

  /**
   * 删除视频函数封装
   * @param {*} f this 指向
   * @param {*} i id 需要删除视频的id
   * @param {*} t 需要删除视频的路径
   * @param {*} s 返回是否显示视频容器
   */
  FunDealVideo:function(f,i,t,s){
    let use = getApp().globalData.userInfo,
    token = use.token,
    url = this.urlCon() + 'api/qiNiuContent/' + i,
    data = '',
    header = {"content-type":"application/x-www-form-urlencoded","Authorization":token};
    this.delete(url,data,header,callback=>{
      if(callback.statusCode === 200){
        f.setData({[t]:'',[s]:false});
      }
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
  FunUploadVideo:function(f,t,d,m,p,n,e,v,u,a,i,z){
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
                f.setData({
                  [a]:JSON.parse(decodeURIComponent(res.data)).data[0],
                  [i]:false,
                  [z]:JSON.parse(decodeURIComponent(res.data)).id
                });
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
   * 删除日记/动态函数封装
   * @param {*} i id 需要删除内容的id
   */
  FunContent:function(i){
    this.alert('提示','请确定您是否要删除该日记',callback=>{
      if(callback.confirm){
        let url = this.urlCon() + 'app/plat/center/deleteMyDynamic?id=' + i,
        data = '',
        use = getApp().globalData.userInfo,
        token = use.token,
        header = {"content-type":"application/x-www-form-urlencoded","Authorization":token};
        this.delete(url,data,header,callback=>{
          if(callback.statusCode === 200){
            this.funShowToast('删除成功');
            setTimeout(function(){
              wx.navigateBack({
                delta: 1
              })
            },2000);
          }
        });
      }
    });
  },

  /**
   * 获取家长日记或动态数据的封装函数
   * @param {*} p page 第几页
   * @param {*} s size 每页的数量
   * @param {*} i isPrivate 数获取日记的数据还是动态的数据 0 动态数据 1 日记数据
   * @param {*} t type 获取数据的类型 dynamic 动态 diary 日记
   * @param {*} e callback 回调函数
   */
  FunDynamicOrDiaryList:function(f,p,s,i,t,e){
    let use = getApp().globalData.userInfo,
    token = use.token,
    header = {"content-type":"application/json","Authorization":token},
    data = {},
    url = this.urlCon() + 'app/par/center/myDiary?isPrivate=' + i + '&page=' + p + '&size=' + s;
    if(t === 'diary'){
      // 获取日记
      this.get(url,data,header,res=>{
        return typeof e == "function" && e(res);
      });
    }else{
      // 获取动态
      this.get(url,data,header,callback=>{
        let res = callback.data,Darr = [];
        console.log(callback,'自己的动态');
        if(res !== ""){
          for(let i in res){
            let o = {},Sarr = [];
            if(res[i].picture !== '' && res[i].picture !== null){
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
            if(res[i].headImg.indexOf('https') !== -1){
              o.membersImg = res[i].headImg;
            }else if(res[i].headImg.indexOf('http') !== -1){
              o.membersImg = res[i].headImg;
            }else{
              o.membersImg = this.down(this.urlCon(),res[i].headImg);
            }
            o.releaseImg = Sarr;
            o.uid = res[i].uid;
            o.id = res[i].id;
            o.membersName = res[i].nickName;
            o.releaseText = res[i].content;
            o.createBtnData = [
              {icon:res[i].hasAdmire?'/image/yz.png':'/image/z.png',con:res[i].like},
              {icon:'/image/xx.png',con:res[i].commentCount},
              {icon:'/image/sj.png',con:res[i].publishDesc},
              {icon:'/image/jl.png',con:res[i].distanceDesc === ''?'保密':res[i].distanceDesc}
            ];
            o.picture = res[i].picture;
            o.fbrole = res[i].role;
            o.followed = res[i].followed;
            o.hasAdmire = res[i].hasAdmire;
            o.video = res[i].video;
            Darr.push(o);
          }
          console.log(Darr,'组合数据');
          f.setData({[e]:Darr});
        }
      });
    }
  },

  /**
   * 我关注的人
   * @param {*} e 回调函数
   */
  FunMyFocus:function(f,d,n){
    let url = this.urlCon() + 'app/plat/center/myfollow',
    use = getApp().globalData.userInfo,
    token = use.token,
    data = '',
    header = {"content-type":"application/json","Authorization":token};
    this.get(url,data,header,res=>{
      let z = res.data;
      if(z.length === 0){
        f.setData({[n]:true});
      }else{
        for(let i in z){
          if(z[i].headImg.indexOf('https') !== -1){
            z[i].headImg = z[i].headImg;
          }else if(z[i].headImg.indexOf('http') !== -1){
            z[i].headImg = z[i].headImg;
          }else{
            z[i].headImg = this.down(this.urlCon(),z[i].headImg);
          }
          if(z[i].role === 'par'){
            z[i].role = '家长';
          }else if(z[i].role === 'tea'){
            z[i].role = '教师';
          }else{
            z[i].role = '机构';
          }
        }
        f.setData({[d]:z,[n]:false});
      }
    });
  },

  /**
   * 取消关注
   * @param {*} i followedId 被取消关注的id
   */
  FunUnFollow:function(f,i,n,a,e){
    let url = this.urlCon() + 'app/par/center/unFollowed?followedId=' + i,
    use = getApp().globalData.userInfo,
    token = use.token,
    data = '',
    header = {"content-type":"application/json","Authorization":token};
    this.post(url,data,header,callback=>{
      console.log(callback,'取消关注的返回数据');
      if(callback.statusCode === 200){
        this.funShowToast('您已取消关注');
        setTimeout(function(){
          a.splice(n,1);
          console.log(a,'数组的值');
          if(a.length === 0){
            f.setData({isShowTitle:true});
          }else{
            f.setData({isShowTitle:false});
          }
          f.setData({[e]:a});
        },1500);
      }
    });
  },

  /**
   * 谁关注了我
   * @param {*} e 
   */
  FunWhoFocus:function(f,d,n){
    let use = getApp().globalData.userInfo,
    token = use.token,
    url = this.urlCon() + 'app/plat/center/followedMe',
    data = '',
    header = {"content-type":"application/json","Authorization":token};
    this.get(url,data,header,res=>{
      let z = res.data;
      if(z.length === 0){
        f.setData({[n]:true});
      }else{
        for(let i in z){
          if(z[i].headImg.indexOf('https') !== -1){
            z[i].headImg = z[i].headImg;
          }else if(z[i].headImg.indexOf('http') !== -1){
            z[i].headImg = z[i].headImg;
          }else{
            z[i].headImg = this.down(this.urlCon(),z[i].headImg);
          }
          if(z[i].role === 'par'){
            z[i].role = '家长';
          }else if(z[i].role === 'tea'){
            z[i].role = '教师';
          }else{
            z[i].role = '机构';
          }
        }
        console.log(z,'111');
        f.setData({[d]:z,[n]:false});
      }
    });
  },
  
  /**
   * 返回用户信息数据
   */
  FunCallbackUseInfo:function(f,u,c){
    let use = getApp().globalData.userInfo,
    token = use.token,
    url = this.urlCon() + 'app/par/center/me',
    data = '',
    needArr = [],
    setA = [],
    header = {"content-type":"application/json","Authorization":token};
    this.get(url,data,header,callback=>{
      console.log(callback,'返回数据');
      if(callback.statusCode === 200){
        let d = callback.data;
        console.log(d.headImg,'图像');
        if(d.headImg.indexOf('https') !== -1){
          u.headImg = d.headImg;
        }else if(d.headImg.indexOf('http') !== -1){
          u.headImg = d.headImg;
        }else{
          u.headImg = this.down(this.urlCon(),d.headImg);
        }
        // 生活照片
        if(d.lifePicture !== '' && d.lifePicture !== null){
          if(d.lifePicture.indexOf(',') === -1){
            needArr.push(this.down(this.urlCon(),d.lifePicture));
            u.tempFilePathsArrs = needArr;
            setA.push(d.lifePicture);
            u.needUrl = setA;
          }else{
            let needImg = d.lifePicture.split(',');
            for(let i in needImg){
              needArr.push(this.down(this.urlCon(),needImg[i]));
              setA.push(needImg[i]);
            }
            u.tempFilePathsArrs = needArr;
            u.needUrl = setA;
          }
        }else{
          u.tempFilePathsArrs = [];
        }
        // 手机号
        if(d.callPhone !== '' && d.callPhone !== null){
          u.callPhone = d.callPhone;
        }else{
          u.callPhone = '';
        }
        // 姓名
        if(d.name !== '' && d.name !== null){
          u.name = d.name;
        }else{
          u.name = '';
        }
        // 性别
        if(d.sex !== '' && d.sex !== null){
          if(d.sex === '男'){
            u.checkedSexNan = true;
            u.checkedSexNv = false;
            u.checkedSexBm = false;
          }else if(d.sex === '女'){
            u.checkedSexNan = false;
            u.checkedSexNv = true;
            u.checkedSexBm = false;
          }else{
            u.checkedSexNan = false;
            u.checkedSexNv = false;
            u.checkedSexBm = true;
          }
        }
        // 详细地址
        if(d.locationDesc !== '' && d.locationDesc !== null){
          u.address = d.locationDesc;
        }else{
          u.address = '';
        }
        // 个性签名
        if(d.motto !== '' && d.motto !== null){
          u.tag = d.motto;
        }else{
          u.tag = '';
        }
        // 省市区code返回
        if(d.provinceCode !== '' && d.provinceCode !== null){ // 省
          if(d.cityCode !== '' && d.cityCode !== null){ // 市
            if(d.countyCode !== '' && d.countyCode !== null){ // 区
              this.FunConversion(d.provinceCode,d.cityCode,d.countyCode,res=>{
                if(res.statusCode === 200){
                  myLocation = res.data[0] + ' ' + res.data[1] + ' ' + res.data[2];
                  f.setData({myLocation:myLocation});
                }
              });
            }
          }
        }else{
          f.setData({myLocation:'广东省 东莞市 厚街镇'});
        }
        u.id = d.id;
        u.nickName = d.nickName;
        u.nImg = d.headImg;
        f.setData(u);
        return typeof c == "function" && c(callback);
      }
    });
  },

  /**
   * 完善信息提交
   */
  FunPerfectInfo:function(e){
    let use = getApp().globalData.userInfo,
    token = use.token,
    data = e,
    url = this.urlCon() + 'app/par/center/applyInfo',
    header = {"content-type":"application/json","Authorization":token};
    this.post(url,data,header,callback=>{
      console.log(callback,'返回数据');
      if(callback.statusCode === 200){
        this.funShowToast('已完成提交');
        setTimeout(function(){
          wx.navigateBack({
            delta: 1
          })
        },2000);
      }
    });
  },

  /**
   * 好友动态
   */
  FunFollowerDynamic:function(f,p,s,d){
    let use = getApp().globalData.userInfo,
    token = use.token,
    data = '',
    url = this.urlCon() + 'app/par/center/followerDynamic?page=' + p + '&size=' + s,
    header = {"content-type":"application/json","Authorization":token};
    this.get(url,data,header,callback=>{
      console.log(callback,'好友动态返回数据');
      if(callback.statusCode === 200){
        let res = callback.data,Darr = [];
        console.log(res.length,'好友动态');
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
            if(res[i].headImg.indexOf('https') !== -1){
              o.membersImg = res[i].headImg;
            }else if(res[i].headImg.indexOf('http') !== -1){
              o.membersImg = res[i].headImg;
            }else{
              o.membersImg = this.down(this.urlCon(),res[i].headImg);
            }
            o.releaseImg = Sarr;
            o.uid = res[i].uid;
            o.id = res[i].id;
            o.membersName = res[i].nickName;
            o.releaseText = res[i].content;
            o.createBtnData = [
              {icon:res[i].hasAdmire?'/image/yz.png':'/image/z.png',con:res[i].like},
              {icon:'/image/xx.png',con:res[i].commentCount},
              {icon:'/image/sj.png',con:res[i].publishDesc},
              {icon:'/image/jl.png',con:res[i].distanceDesc === ''?'保密':res[i].distanceDesc}
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
   * 用户未读消息数据
   * @param {*} f this 指向
   * @param {*} n 未读消息的数量
   */
  FunUnreadNoticeCount:function(f,n){
    let use = getApp().globalData.userInfo,
    token = use.token,
    data = '',
    url = this.urlCon() + 'app/plat/center/unreadNoticeCount',
    header = {"content-type":"application/json","Authorization":token};
    this.get(url,data,header,callback=>{
      let numData = callback.data;
      f.setData({[n]:numData});
    });
  },

  /**
   * 用户全部的消息列表
   * @param {*} f this 指向
   * @param {*} i 消息数据
   */
  FunNoticeList:function(f,i){
    let use = getApp().globalData.userInfo,
    token = use.token,
    data = '',
    url = this.urlCon() + 'app/plat/center/noticeList',
    header = {"content-type":"application/json","Authorization":token};
    this.get(url,data,header,callback=>{
      console.log(callback.data,'数量');
      let data = callback.data;
      f.setData({[i]:data});
    });
  },

  /**
   * 省市区将code转换成字符串
   */
  FunConversion:function(p,c,q,e){
    let url = this.urlCon() + 'app/com/resolveArea?provinceCode=' + p + '&cityCode=' + c + '&countyCode=' + q,
    data = '',
    header = {"content-type":"application/json"};
    this.get(url,data,header,callback=>{
      if(callback.statusCode === 200){
        return typeof e == "function" && e(callback);
      }
    });
  },

  /**
   * 点击收藏
   * @param {*} i collectId 收藏类型的组件id
   * @param {*} t type 收藏类型（1：教师课程 2：培训机构课程 3：教师主页 4：培训机构主页 5：家长主页 6：文章 7：职位）
   */
  FunCollect:function(f,i,t){
    let use = getApp().globalData.userInfo,
    token = use.token,
    data = {"collectId":i,"type":t},
    url = this.urlCon() + 'app/com/collect',
    header = {"content-type":"application/x-www-form-urlencoded","Authorization":token};
    this.post(url,data,header,res=>{
      if(res.statusCode === 200){
        this.funShowToast('收藏成功');
        f.setData({isShowIcon:false});
      }
    });
  },

  /**
   * 我的收藏列表
   * @param {*} f this 指向
   * @param {*} p page
   */
  FunMyCollect:function(f,p,d){
    let use = getApp().globalData.userInfo,
    token = use.token,
    url = this.urlCon() + 'app/com/myCollect?page=' + p,
    data = '',
    header = {"content-type":"application/x-www-form-urlencoded","Authorization":token};
    this.get(url,data,header,res=>{
      let needData = res.data;
      console.log(needData);
      for(let i in needData){
        if(needData[i].pic1 !== null){
          needData[i].pic1 = this.down(this.urlCon(),needData[i].pic1);
        }else{
          needData[i].pic1 = '/image/noimg.png';
        }
      }
      console.log(needData,'收藏数据');
      f.setData({[d]:needData});
    });
  },

  /**
   * 查看有无收藏过此内容
   * @param {*} f this 指向
   * @param {*} i id 对应收藏该数据的id
   * @param {*} t type 收藏数据的类型
   * @param {*} k token 用户的token
   * @param {*} d 需要使用的数据
   */
  FunCollectStatus:function(f,i,t,k,d){
    let url = this.urlCon() + 'app/com/collectStatus',
    data = {"collectId":i,"type":t},
    header = {"content-type":"application/x-www-form-urlencoded","Authorization":k};
    this.get(url,data,header,res=>{
      console.log(res,'数据');
      if(res.statusCode === 200){
        if(res.data === ""){
          f.setData({[d]:true});
        }else{
          f.setData({[d]:false});
        }
      }
    });
  },

  /**
   * 取消收藏接口
   * @param {*} f this 指向
   * @param {*} i id 组件id
   * @param {*} n index 需要取消的是数组中的哪个数据
   * @param {*} a arr 收藏的数组数据
   * @param {*} e 返回取消收藏后的数据
   */
  FunUnCollect:function(f,i,n,a,e){
    let use = getApp().globalData.userInfo,
    token = use.token,
    url = this.urlCon() + 'app/com/unCollect?id=' + i,
    data = '',
    header = {"content-type":"application/x-www-form-urlencoded","Authorization":token};
    this.post(url,data,header,res=>{
      this.funShowToast('您已经取消了对该课程收藏');
      if(res.statusCode === 200){
        setTimeout(function(){
          a.splice(n,1);
          f.setData({[e]:a});
        },1500);
      }
    });
  },

  /**
   * 进入我的私有程序
   */ 
  FunPrivateProgram:function(){
    let use = getApp().globalData.userInfo;
    if(Object.keys(use).length !== 0){
      let userType = use.user.role;
      switch(userType){
        case 'par':
          wx.reLaunch({
            url: '/parentsVersion/parentshome/parentshome'
          });
          break;
        case 'tea':
          wx.reLaunch({
            url: '/teacherVersion/teacherhome/teacherhome'
          });
          break;
        case 'org':
          wx.reLaunch({
            url: '/institutionVersion/institutionshome/institutionshome'
          });
          break;
      }
    }else{
      this.alert('提示','您尚未登录或登录已失效，请点击“确定”前往角色选取页面选择对应角色进行登录',res=>{
        if(res.confirm){
          wx.reLaunch({
            url:'/pages/chooseRole/chooseRole'
          });
        }
      });
    }
  },

  /**
   * 招聘信息列表
   * @param {*} f this 指向
   * @param {*} e educational 学历
   * @param {*} w workYear 教龄
   * @param {*} s salary 薪资范围
   * @param {*} c countyCode 区域
   * @param {*} p page 
   * @param {*} z size
   * @param {*} z 返回的数据进行页面渲染
   */
  FunRecruitList:function(f,e,w,s,c,p,z,d){
    let use = getApp().globalData.userInfo,
    token = use.token,
    url = this.urlCon() + 'app/tea/recruit/list?page=' + p + '&size=' + z,
    data = {"educational":e,"workYear":w,"salary":s,"countyCode":c},
    header = {"content-type":"application/json","Authorization":token};
    this.post(url,data,header,res=>{
      let needData = res.data.content;
      console.log(needData,'招聘列表数据');
      for(let i in needData){
        needData[i].createTime = this.FunGetTime(needData[i].createTime,'2');
        needData[i].address = needData[i].city + '-' + needData[i].county;
        needData[i].workYear === null?needData[i].workYear = '不限':needData[i].workYear = needData[i].workYear;
      }
      console.log(needData,'招聘列表信息');
      f.setData({[d]:needData});
    });
  },

  /**
   * 招聘信息详情页
   * @param {*} f THIS
   * i 组件id
   * a 需要渲染的数据
   */
  FunRecruitDetail:function(f,i){
    let use = getApp().globalData.userInfo,
    token = use.token,
    url = this.urlCon() + 'app/tea/recruit/detail?id=' + i,
    data = '',
    header = {"content-type":"application/x-www-form-urlencoded","Authorization":token};
    this.get(url,data,header,res=>{
      console.log(res,'信息详情');
      if(res.statusCode === 200){
        let o = {},d = res.data;
        o.title = d.title;
        o.createTime = this.FunGetTime(d.createTime,'2');
        o.salary = d.salary + '/月';
        o.wantCount = '招' + d.wantCount + '人';
        o.workYear = d.workYear;
        o.educational = d.educational;
        o.infoAbstract = [
          {
            "name":d.orgName,
            "address":[{"icon":'/image/jl.png',"name":d.province + '-' + d.city + '-' + d.county + '-' + d.location === null?'':d.location}],
            "contact":[
              {"icon":'/image/lxr.png',"name":d.linkPeople},
              {"icon":'/image/lxdh.png',"name":d.callPhone}
            ],
            desc:['规模：5-10人','机构性质：艺术类培训机构'],
            welfare:d.perk === null?['节日礼品','教学奖金','下午茶']:d.perk
          }
        ];

        o.jobDesc = d.jobDesc;
        console.log(o,'需要展示的数据');
        f.setData(o);
      }
    });
  },

  /**
   * 投递简历
   * @param {*} f this
   * @param {*} i id
   */
  FunCenterPostResume:function(f,i){
    let use = getApp().globalData.userInfo,
    token = use.token,
    url = this.urlCon() + 'app/tea/center/postResume?id=' + i,
    data = '',
    header = {"content-type":"application/x-www-form-urlencoded","Authorization":token};
    this.post(url,data,header,res=>{
      console.log(res,'申请职位');
    });
  },

  /**
   * 教师新增课程
   * @param {*} i id
   */
  FunSaveCourse:function(d){
    let use = getApp().globalData.userInfo,
    token = use.token,
    url = this.urlCon() + 'app/tea/center/saveCourse',
    data = d,
    header = {"content-type":"application/json","Authorization":token};
    this.post(url,data,header,res=>{
      console.log(res,'返回数据');
    });
  },

  /**
   * 教师版的产品（课程）列表
   * @param {*} f this 指向
   * @param {*} e 返回进行渲染的数据
   */
  FunCourseList:function(f,e){
    let use = getApp().globalData.userInfo,
    token = use.token,
    url = this.urlCon() + 'app/tea/center/courseList',
    data = '',
    header = {"content-type":"application/x-www-form-urlencoded","Authorization":token};
    this.get(url,data,header,res=>{
      if(res.statusCode === 200){
        let d = res.data;
        console.log(d,'课程列表数据');
        for(let i in d){
          if(d[i].banner !== null){
            d[i].banner = this.down(this.urlCon(),d[i].banner);
          }else{
            d[i].banner = '/image/noimg.png';
          }
          d[i].createTime = this.FunGetTime(d[i].createTime,2);
        }
        f.setData({[e]:res.data});
      }
    });
  },

  /**
   * 获取课程数据
   * @param {*} f this 指向
   * @param {*} d 需要传入接口的数据
   */
  FunSaveCourse:function(f,d){
    let use = getApp().globalData.userInfo,
    token = use.token,
    url = this.urlCon() + 'app/tea/center/saveCourse',
    data = d,
    header = {"content-type":"application/json","Authorization":token};
    this.post(url,data,header,res=>{
      console.log(res,'返回课程数据');
    });
  },

  /**
   * 获取简历信息
   * @param {*} f this 指向
   */
  FunResume:function(f){
    let use = getApp().globalData.userInfo,
    token = use.token,
    url = this.urlCon() + 'app/tea/center/resume',
    data = '',
    header = {"content-type":"application/x-www-form-urlencoded","Authorization":token};
    this.get(url,data,header,res=>{
      console.log(res,'简历信息');
      if(res.statusCode === 200){
        let d = res.data;
        if(d.id !== null){
          console.log('显示出简历信息，同时隐藏制作简历的表单');
        }else{
          let a = {};
          a.myLocation = '厚街镇';
          f.setData(a);
          console.log('显示出制作简历的表单');
        }
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