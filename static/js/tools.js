var stores = {
  getValue: function (key) {
    return store.get(key);
  },
  setValue: function (key, value) {
    store.set(key, value);
  },
  removeValue: function (key) {
    store.remove(key);
  },
  getCityObj: function () {
    // var cityCode = JSON.parse(store.getValue('city'));
    var cityCode = stores.getValue('city');
    // return cityCode
    return cityCode ? cityCode : {'ad_code': 320500, 'name': '苏州市'};
  },
  setCityObj: function (value) {
    // stores.setValue('city', JSON.stringify(value));
    stores.setValue('city', value);
  },
  getUserObj: function () {
    // return JSON.parse(store.getValue('user'));
    return stores.getValue('user');
  },
  setUserObj: function (value) {
    stores.setAccessToken(value.access_token);
    // stores.setValue('user', JSON.stringify(value));
    stores.setValue('user', value);
  },
  getAccessToken: function () {
    return stores.getValue('accessToken');
  },
  setAccessToken: function (value) {
    stores.setValue('accessToken', value);
  },
  // 编辑地址获取地址 Id
  getAddressId: function () {
    return stores.getValue('addressId');
  },
  setAddressId: function (value) {
    stores.setValue('addressId', value);
  },
  logout: function () {
    stores.removeValue('accessToken');
    stores.removeValue('user');
    stores.removeValue('redirectUrl');
    stores.removeValue('goBackLevel');
  },
  // 设置支付状态，用于支付返回后让用户确认是否支付
  setPayStatus: function (bool) {
    stores.setValue('isPay', bool);
  },
  getPayStatus: function () {
    return stores.getValue('isPay') ? stores.getValue('isPay') : false;
  },
  // 设置支付订单的编号，用于后续查询是否支付完成
  setPayOrderId: function (orderId) {
    stores.setValue('orderId', orderId);
  },
  getPayOrderId: function () {
    return stores.getValue('orderId') ? stores.getValue('orderId') : false;
  },
  removePayOrderId: function () {
    stores.removeValue('orderId');
  },
  //设置支付订单的金额
  setPayMoney: function (money) {
    stores.setValue('money', money);
  },
  getPayMoney: function () {
    return stores.getValue('money') ? stores.getValue('money') : false;
  },
  removePayMoney: function () {
    stores.removeValue('money');
  },
  // 返回上一级的数据
  addGoBackLevel: function () {
    var level = stores.getGoBackLevel();
    stores.setValue('goBackLevel', ++level);
  },
  resetGoBackLevel: function () {
    stores.setValue('goBackLevel', 1);
  },
  getGoBackLevel: function () {
    var level = stores.getValue('goBackLevel');
    if (!level) {
      level = 1;
    }
    return level;
  },
  // 加入购物车、下单时设置选择的该分类商品
  setGoodsType: function (typeId) {
    stores.setValue('typeId', typeId);
  },
  getGoodsType: function () {
    return stores.getValue('typeId') ? stores.getValue('typeId') : false;
  },
  removeGoodsType: function () {
    stores.removeValue('typeId')
  },
  // 加入购物车下单时，获取商品库存
  setGoodsNum: function (goodsNum) {
    stores.setValue('goodsNum', goodsNum);
  },
  getGoodsNum: function () {
    return stores.getValue('goodsNum') ? stores.getValue('goodsNum') : false;
  },
  removeGoodsNum: function () {
    stores.removeValue('goodsNum')
  },
  // 商城首页 banner 存取
  setShopBanner: function (shopBanner) {
    stores.setValue('shopBanner', shopBanner);
  },
  getShopBanner: function () {
    return (stores.getValue('shopBanner') && stores.getValue('shopBanner').length > 0)
      ? stores.getValue('shopBanner') : [{src: '/wx/static/images/shop_loading@2x.png', url: ''}];
  },
  // h5首页 banner 存取
  setIndexBanner: function (indexBanner) {
    stores.setValue('indexBanner', indexBanner);
  },
  getIndexBanner: function () {
    return (stores.getValue('indexBanner') && stores.getValue('indexBanner').length > 0)
      ? stores.getValue('indexBanner') : [{src: '/wx/static/images/shop_loading@2x.png', url: ''}];
  },
  // 商品详情 banner 存取
  setGoodsBanner: function (goodsBanner) {
    stores.setValue('goodsBanner', goodsBanner);
  },
  getGoodsBanner: function () {
    return (stores.getValue('goodsBanner') && stores.getValue('goodsBanner').length > 0)
      ? stores.getValue('goodsBanner')
      : ['/wx/static/images/commodity_shopping_loading@2x.png'];
  }
};

var baseUrl = window.location.protocol + '//' + window.location.host + '/api/v2/';
// var oathUrl = baseUrl + 'login.html';
var oathUrl = '/login.html';
var accessToken = stores.getAccessToken();
var oathWxUrl = 'login.html';
/*<debug>*/
baseUrl = 'http://192.168.0.164/zhuomuniao/frontend/web/api/v2/';
oathUrl = '/login.html';
// accessToken = 'bfbc9f24c0bee873b97847cead873d21';
oathWxUrl = 'login.html';
// accessToken = '';
/*</debug>*/
var http = {
  baseUrl: baseUrl,
  accessToken: accessToken,
  oathUrl: oathUrl,
  oathWxUrl: oathWxUrl,
  bindAccessToken: function (params) {
    if (http.accessToken) {
      params['token'] = http.accessToken;
    }
  },
  solveResponse: function (data, successCallBack, errorCallBack) {
    switch (data.status) {
      case 401:
        if (window.location.href.toLowerCase().indexOf("wx") > 0) {
          tools.confirm('请先登录', 'warning', false, function () {
            window.location.href = '/wx/' + http.oathWxUrl
          });
        } else {
          tools.confirm('请先登录', 'warning', false, function () {
            window.location.href = http.oathUrl
          });
        }
        break;
      case 422:
        errorCallBack
          ? errorCallBack(data)
          : tools.urlJudge(data.errors[0].message, 'warning');
        break;
      case 403:
        tools.urlJudge(data.message, 'warning');
        break;
      case 500:
        tools.urlJudge('系统错误', 'error');
        break;
      default:
        successCallBack(data.data);
    }
  },
  get: function httpGet(url, params, successCallBack, errorCallBack) {
    http.bindAccessToken(params);
    $.ajax({
      type: "get",
      url: http.baseUrl + url,
      data: params,
      dataType: "json",
      beforeSend: function (xhr) {
        xhr.withCredentials = true;
      },
      crossDomain: true,
      success: function (data) {
        http.solveResponse(data, successCallBack, errorCallBack);
      },
      error: function () {
        tools.urlJudge('系统错误', 'error');
      }
    });
  },
  post: function httpPost(url, params, successCallBack) {
    http.bindAccessToken(params);
    $.ajax({
      type: "post",
      url: http.baseUrl + url,
      data: params,
      dataType: "json",
      beforeSend: function (xhr) {
        xhr.withCredentials = true;
      },
      crossDomain: true,
      success: function (data) {
        http.solveResponse(data, successCallBack);
      },
      error: function () {
        tools.urlJudge('系统错误', 'error');
      }
    });
  },
  uploadFile: function httpPost(url, params, successCallBack) {
    http.bindAccessToken(params);
    var keyList = Object.keys(params)
      , formData = new FormData;
    for (var key in keyList) {
      formData.append(keyList[key], params[keyList[key]])
    }
    $.ajax({
      type: "post",
      url: http.baseUrl + url,
      data: formData,
      dataType: "json",
      processData: false,  // 不处理数据
      contentType: false,   // 不设置内容类型
      beforeSend: function (xhr) {
        xhr.withCredentials = true;
      },
      crossDomain: true,
      success: function (data) {
        http.solveResponse(data, successCallBack);
      },
      error: function () {
        tools.urlJudge('系统错误', 'error');
      }
    });
  },
  payFormSubmit: function (data) {
    document.body.innerHTML += data;
    var obj = document.createElement('div');
    obj.innerHTML = data;
    eval(obj.getElementsByTagName('script')[0].innerHTML);
  },
  createForm: function (action, method, params) {
    var form = document.createElement('form');
    document.body.appendChild(form);
    form.method = method;
    form.action = action;
    var input;
    for (var key in params) {
      input = document.createElement('input');
      input.setAttribute('name', key);
      input.setAttribute('type', 'hidden');
      input.setAttribute('value', params[key]);
      form.appendChild(input);
    }
    form.appendChild(input);
    return form;
  },
  getQuery: function getQueryStringByName(name) {
    var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
      return "";
    }
    return result[1];
  },
  setQuery: function (url, key, value) {
    var split = '?';
    if (url.indexOf('?') > 0) {
      split = '&';
    }
    return url + split + key + '=' + value;
  }
}

var redirect = {
  remember: function () {
    var url = window.location.href.toLowerCase();
    if (url.indexOf('stores-detail') > 0) {
      stores.setValue('redirectUrl', url.split('&')[0]);
    } else {
      stores.setValue('redirectUrl', url);
    }
  },
  previous: function (onlyGet) {
    var redirectUrl = stores.getValue('redirectUrl');
    if (angle.angleParam(redirectUrl).indexOf("wx") > 0 || window.location.href.toLowerCase().indexOf("wx") > 0) {
      redirectUrl = redirectUrl ? redirectUrl : '/wx';
    } else {
      redirectUrl = redirectUrl ? redirectUrl : '/';
    }
    if (onlyGet) {
      return redirectUrl;
    }
    window.location.href = redirectUrl;
    return false;
  }
}

var tools = {
  // 判断是否是在移动端
  urlJudge: function (msg, type) {
    var url = window.location.href.toLowerCase();
    if (url.indexOf('wx') >= 0) {
      tools.alert(msg, type);
    } else {
      tools.pcAlert(msg, type);
    }
  },
  getRandomNum: function (min, max) {
    var Range = max - min;
    var Rand = Math.random();
    return (min + Math.round(Rand * Range));
  },
  isWeChatBroswer: function () {
    return window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger';
  },
  goBack: function () {
    var level = stores.getGoBackLevel();
    stores.resetGoBackLevel();
    window.history.go(-level);
  },
  confirm: function (msg, type, isCancelShow, trueCallback, falseCallback) {
    type = type ? type : 'warning';
    isCancelShow = isCancelShow ? isCancelShow : false;
    var confirmAndCancelJson = {
      title: msg,
      text: "蚕食生活为您服务",
      type: type,
      showConfirmButton: true,
      confirmButtonText: "确定",
      showCancelButton: true,
      cancelButtonText: "取消"
    };
    var confirmJson = {
      title: msg,
      text: "蚕食生活为您服务",
      type: type,
      showConfirmButton: true,
      confirmButtonText: "确定"
    };
    swal(isCancelShow ? confirmAndCancelJson : confirmJson, function (isConfirm) {
      if (isConfirm) {
        if (trueCallback) {
          trueCallback();
        }
      } else {
        if (falseCallback) {
          falseCallback();
        }
      }
    });
  },
  pcAlert: function (msg, type, delay) {
    delay = delay ? delay : 0;
    type = type ? type : 'success';
    setTimeout(function () {
      swal({
        title: msg,
        text: "蚕食生活为您服务",
        type: type,
        confirmButtonText: '确定'
      });
    }, delay);
  },
  alert: function (msg, type, delay) {
    delay = delay ? delay : 0;
    type = type ? type : 'success';
    setTimeout(function () {
      swal({
        title: msg,
        showConfirmButton: false,
        timer: 2000,
        customClass: 'field',
        allowOutsideClick: true
      });
    }, delay);
  },
  setTitle: function (title) {
    // 正常网页设置title
    document.title = title;
    // 微信设置title
    var mobile = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(mobile)) {
      var iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      // 替换成站标favicon路径或者任意存在的较小的图片即可
      var iframeCallback = function () {
        setTimeout(function () {
          iframe.removeEventListener('load', iframeCallback);
          document.body.removeChild(iframe);
        }, 0);
      }
      iframe.addEventListener('load', iframeCallback);
      document.body.appendChild(iframe);
    }
  },
  // 把时间戳转化为字符串日期
  timestamp: function (timestamp) {
    var date = new Date(timestamp * 1000);
    Y = date.getFullYear() + '-';
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    D = date.getDate() + ' ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();
    return (Y + M + D + h + m + s);
  },
  // 把字符串日期转化为时间戳
  dateToTimestamp: function (timestamp) {
    return new Date(Date.parse(timestamp.replace(/-/g, "/"))).getTime() / 1000;
  },
  // 微信公众号支付
  weChatPublicNumberPay: function () {
    if (stores.getValue('payType').type == 'domestic') {
      // 如果是家政服务
      http.post('pay/clean-order', {
        order_id: stores.getValue('payType').orderId,
        pay_type: 13
      }, function (data) {
        http.payFormSubmit(data)
      });
    } else if (stores.getValue('payType').type == 'goods') {
      // 如果是商品服务
      http.post('pay/shop-order', {
        shop_order_id: stores.getValue('payType').orderId,
        pay_type: 13
      }, function (data) {
        http.payFormSubmit(data)
      });
    } else if (stores.getValue('payType').type == 'lifeService') {
      // 如果是生活服务
      http.post('pay/life-order', {
        life_order_id: stores.getValue('payType').orderId,
        pay_type: 13
      }, function (data) {
        http.payFormSubmit(data)
      });
    } else if (stores.getValue('payType').type == 'benefitLife') {
      // 如果是惠生活服务
      http.post('pay/today-recommend-order', {
        recommend_order_id: stores.getValue('payType').orderId,
        pay_type: 13
      }, function (data) {
        stores.setPayStatus(true);
        http.payFormSubmit(data)
      });
    } else {
      tools.urlJudge('未知的付款类型', 'error')
    }
  },
  // 星星等级
  starLever: {
    star: [
      {
        // 无星级
        options: [
          '/wx/static/images/lever-no.png',
          '/wx/static/images/lever-no.png',
          '/wx/static/images/lever-no.png',
          '/wx/static/images/lever-no.png',
          '/wx/static/images/lever-no.png'
        ]
      },
      {
        // 1星级
        options: [
          '/wx/static/images/lever-all.png',
          '/wx/static/images/lever-no.png',
          '/wx/static/images/lever-no.png',
          '/wx/static/images/lever-no.png',
          '/wx/static/images/lever-no.png'

        ]
      },
      {
        // 2星级
        options: [
          '/wx/static/images/lever-all.png',
          '/wx/static/images/lever-all.png',
          '/wx/static/images/lever-no.png',
          '/wx/static/images/lever-no.png',
          '/wx/static/images/lever-no.png'

        ]
      },
      {
        // 3星级
        options: [
          '/wx/static/images/lever-all.png',
          '/wx/static/images/lever-all.png',
          '/wx/static/images/lever-all.png',
          '/wx/static/images/lever-no.png',
          '/wx/static/images/lever-no.png'
        ]
      },
      {
        // 4星级
        options: [
          '/wx/static/images/lever-all.png',
          '/wx/static/images/lever-all.png',
          '/wx/static/images/lever-all.png',
          '/wx/static/images/lever-all.png',
          '/wx/static/images/lever-no.png'
        ]
      },
      {
        // 5星级
        options: [
          '/wx/static/images/lever-all.png',
          '/wx/static/images/lever-all.png',
          '/wx/static/images/lever-all.png',
          '/wx/static/images/lever-all.png',
          '/wx/static/images/lever-all.png'
        ]
      }
    ]
  },
  // 图片预览
  /*
   * params (outerIndex,index,bindClass)
   * outerIndex 为最外层的循环次数
   * index 为循环图片的起始位置
   * bindClass 类型为String 为被放大图片的绑定类
   * */
  openPhotoSwipe: function (outerIndex, index, bindClass) {
    var maskHtml = '<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">' +
      '<div class="pswp__bg"></div>' +
      '<div class="pswp__scroll-wrap">' +
      '<div class="pswp__container">' +
      '<div class="pswp__item"></div>' +
      '<div class="pswp__item"></div>' +
      '<div class="pswp__item"></div>' +
      '</div>' +
      '<div class="pswp__ui pswp__ui--hidden">' +
      '<div class="pswp__top-bar">' +
      '<div class="pswp__counter"></div>' +
      '<button class="pswp__button pswp__button--close" title="Close (Esc)"></button>' +
      '<div class="pswp__preloader">' +
      '<div class="pswp__preloader__icn">' +
      '<div class="pswp__preloader__cut">' +
      '<div class="pswp__preloader__donut"></div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">' +
      '<div class="pswp__share-tooltip"></div>' +
      '</div>' +
      '<button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>' +
      '<button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>' +
      '<div class="pswp__caption">' +
      '<div class="pswp__caption__center"></div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>';
    $('body').append(maskHtml);
    var pswpElement = document.querySelectorAll('.pswp')[0];
    var openImgList = $('.' + bindClass + '[preview="' + outerIndex + '"]')
      , openImgSrc = [];
    for (var i = 0; i < openImgList.length; i++) {
      openImgSrc[i] = {
        src: openImgList[i].src,
        w: openImgList[i].naturalWidth,
        h: openImgList[i].naturalHeight
      };
    }
    var items = openImgSrc;
    var options = {
      history: false,
      focus: false,
      index: index,
      showAnimationDuration: 0,
      hideAnimationDuration: 0
    };
    var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
    gallery.listen('close', function () {
      pswpElement.remove();
    });
  },

  // 上拉加载下拉刷新
  /*
   *params: _this:当前vue的实例对象
   *params: htmlContent:下拉刷新布局,默认false
   *params: pageSize:当前分页显示数量,默认false
   *params: upAuto:是否在初始化时以上拉加载的方式自动加载第一页数据; 默认 false
   *params: emptyIcon:配置列表无任何数据的图片,默认false
   *params: empty:配置列表无任何数据的参数json,默认false
   *params: htmlNoData:无数据的布局,默认false
   * */
  myScroll: function (_this, pageSize, htmlContent, upAuto, emptyIcon, empty, htmlNoData) {
    pageSize = pageSize ? pageSize : 10;
    htmlContent = htmlContent ? htmlContent : '<p class="downwarp-tip" style="color: #00a84c;">下拉刷新</p><span style="text-align: center;width: auto"><img style="height: 1rem;" src="/wx/static/images/loading.gif" alt="加载中..."</span>';
    emptyIcon = emptyIcon ? emptyIcon : '/wx/static/images/blank_no_service@2x.png';
    empty = empty ? empty : {
      warpId: "mescroll",
      icon: emptyIcon,
      tip: "",
      btntext: "去逛逛 >",
      btnClick: function () {
        window.location.href = window.location.origin + '/wx/index.html';
      }
    }
    htmlNoData = htmlNoData ? htmlNoData : '<p class="upwarp-nodata" style="color:#00a84c;">--我是有底线的--</p>';
    // 创建 MeScroll 对象
    _this.mescroll = new MeScroll("mescroll", {
      down: {
        auto: false, // 是否在初始化完毕之后自动执行下拉回调 callback; 默认 true
        callback: _this.downCallback,//下拉刷新的回调
        offset: 50, // 在列表顶部,下拉大于50px,松手即可触发下拉刷新的回调
        htmlContent: htmlContent
      },
      up: {
        auto: !upAuto, // 是否在初始化时以上拉加载的方式自动加载第一页数据; 默认 false
        isBounce: false, // 是否允许ios的bounce回弹;默认true,允许回弹 (v 1.3.0新增)
        page: {
          num: 0, // 当前页 默认0,回调之前会加1; 即 callback(page) 会从1开始
          size: pageSize, // 每页数据条数
          time: null // 加载第一页数据服务器返回的时间; 防止用户翻页时,后台新增了数据从而导致下一页数据重复;
        },
        loadFull: {
          use: false, // 列表数据过少,不足以滑动触发上拉加载,是否自动加载下一页,直到满屏或者无更多数据为止;默认 false ,因为可通过调高 page.size 避免这个情况
          delay: 500 // 延时执行的毫秒数; 延时是为了保证列表数据或占位的图片都已初始化完成,且下拉刷新上拉加载中区域动画已执行完毕;
        },
        toTop: { // 配置回到顶部按钮
          src: "/wx/static/images/mescroll-totop.png", // 默认滚动到1000px显示,可配置 offset 修改
          offset: 250
        },
        empty: empty, //配置列表无任何数据的提示,
        htmlNodata: htmlNoData,// 无数据的布局
        hardwareClass: "mescroll-hardware",
        htmlLoading: '<p style="width: 1rem;height: 1rem; text-align: center; " class="upwarp-tip"><img src="/wx/static/images/loading.gif" alt="加载中..."></p>',// 上拉加载中的布局
        resetClass: "mescroll-downwarp-reset",// 下拉刷新高度重置的动画
        callback: _this.upCallback // 上拉回调,此处可简写; 相当于 callback: function (page) { upCallback(page); }
      }
    });
  }
}

var angle = {
  angleParam: function (param) {
    var val = "";
    val = param == null || param == "null" || param == "" || param == " " ? "" : param;
    return val;
  }
}
