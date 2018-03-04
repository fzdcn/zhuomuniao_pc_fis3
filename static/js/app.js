//
//                            _ooOoo_
//                           o8888888o
//                           88" . "88
//                           (| -_- |)
//                            O\ = /O
//                        ____/`---'\____
//                      .   ' \\| |// `.
//                       / \\||| : |||// \
//                     / _||||| -:- |||||- \
//                       | | \\\ - /// | |
//                     | \_| ''\---/'' | |
//                      \ .-\__ `-` ___/-. /
//                   ___`. .' /--.--\ `. . __
//                ."" '< `.___\_<|>_/___.' >'"".
//               | | : `- `.;`\ _ /`;.`/ - ` : | |
//                 \ \ `-. \_ __\ /__ _/ .-` / /
//         ======`-.____`-.___\_____/___.-`____.-'======
//                            `=---='
//
//         .............................................
//                  佛祖保佑             永无BUG
//
//          佛曰:
//
//                  写字楼里写字间，写字间里程序员；
//
//                  程序人员写程序，又拿程序换酒钱。
//
//                  酒醒只在网上坐，酒醉还来网下眠；
//
//                  酒醉酒醒日复日，网上网下年复年。
//
//                  但愿老死电脑间，不愿鞠躬老板前；
//
//                  奔驰宝马贵者趣，公交自行程序员。
//
//                  别人笑我忒疯癫，我笑自己命太贱；
//
//                  不见满街漂亮妹，哪个归得程序员？
//

$(function () {
  adaptableHeight.showHeght();
  // 导航选中样式
  commonNav();
  // enrollmentTraining
  // 啄木鸟特色培训项目
  roll();
  // 首页合作轮播
  cooperationRoll();
  // 日期控件
  jeDate();
  foxClean();
})


// 门店服务，预约服务,右边浮动关闭
$(".fork_right").on("click", function () {
  $(".right_consultation").hide();
})

// 左边浮动点击隐藏
$(".suspension_detail").on("click", function () {
  if ($(".left_list").width() == 0) {
    $(".left_list").width("150");
    $(this).addClass("active");
  } else {
    $(".left_list").width("0");
    $(this).removeClass("active");
  }
})

// enrollmentTraining左右滚动
function roll() {
  $(".advantage .count2").dayuwscroll({
    parent_ele: '.advantage #wrapBox1',
    list_btn: '.advantage #tabT04',
    pre_btn: '.advantage #left2',
    next_btn: '.advantage #right2',
    path: 'left',
    auto: true,
    time: 3000,
    num: 3,
    gd_num: 3,
    waite_time: 1000

  })
}
// 首页合作轮播
function cooperationRoll() {
  $(".advantage .count").dayuwscroll({
    parent_ele: '.advantage #wrap-box',
    list_btn: '.advantage #tabT04',
    pre_btn: '.advantage #left',
    next_btn: '.advantage #right',
    path: 'left',
    auto: true,
    time: 3000,
    num: 6,
    gd_num: 6,
    waite_time: 1000

  })
}
// 预约服务
// 日期控件
function jeDate() {
  $('#date').jeDate({
    format: 'YYYY-MM-DD',
    minDate: "2014-06-16",
    // 最大日期
    maxDate: '2099-06-16'
  });
  var start = {
    format: 'YYYY-MM-DD',
    // 设定最小日期为当前日期
    minDate: '2014-06-16',
    // 最大日期
    maxDate: $.nowDate({DD: 256}),
    okfun: function (obj) {
      // 开始日选好后，重置结束日的最小日期
      end.minDate = obj.val;
      endDates();
    }
  };
  var end = {
    format: 'YYYY-MM-DD',
    // 设定最小日期为当前日期
    minDate: $.nowDate({DD: 0}),
    // 最大日期
    maxDate: '2099-06-16',
    okfun: function (obj) {
      // 将结束日的初始值设定为开始日的最大日期
      start.maxDate = obj.val;
    }
  };
// 这里是日期联动的关键
  function endDates() {
    // 将结束日期的事件改成 false 即可
    end.trigger = false;
    $("#inpend").jeDate(end);
  };
  $('#inpstart').jeDate(start);
  $('#inpend').jeDate(end);
}

// 清除按钮显示与隐藏
function foxClean() {
  $(".region_address i").on("click", function () {
    $(".region_address input").val("");
  })

  $(".region_address input").on("keyup", function () {
    var user_tel = $(".region_address input").val();
    if (user_tel != "") {
      $(".region_address i").show();
    } else {
      $(".region_address i").hide();
    }
  })

  $(".region_address input").focus(function () {
    var user_tel = $(".region_address input").val();
    if (user_tel != "") {
      $(".region_address i").show();
    } else {
      $(".region_address i").hide();
    }
  })
}


// 右边浮动点击隐藏
$(".right-consultation-btn").on("click", function () {
  $(".right_consultation").slideToggle(500);
})

// 左边浮动点击隐藏
$(".suspension_detail").on("click", function () {
  if ($(".left_list").width() == 0) {
    $(".left_list").width("150");
    $(this).addClass("active");
  } else {
    $(".left_list").width("0");
    $(this).removeClass("active");
  }
})

// 导航选中样式
function commonNav() {
  var url = location.href.toLowerCase();
  var urlOrigin = window.location.origin.toLowerCase() + '/';
  if (url.indexOf("about") >= 0) {
    $(".nav>li:eq(5)>a").addClass("on");
  } else if (url.indexOf("domestic-service") >= 0 || url.indexOf("reservation") >= 0) {
    $(".nav>li:eq(4)>a").addClass("on");
  } else if (url.indexOf("investment") >= 0) {
    $(".nav>li:eq(2)>a").addClass("on");
  } else if (url.indexOf("enrollment-training") >= 0) {
    $(".nav>li:eq(1)>a").addClass("on");
  }
  /*else if(url.indexOf("charitable")>=0){
   $(".nav>li:eq(1)>a").addClass("on");
   }*/
  else if (url.indexOf("contact") >= 0) {
    $(".nav>li:eq(0)>a").addClass("on");
  } else if (url.indexOf("mall") >= 0) {
    $(".nav>li:eq(3)>a").addClass("on");
  } else if (url.indexOf("index") >= 0 || url == urlOrigin) {
    $(".nav>li:eq(6)>a").addClass("on");
  } else {
    $(".nav>li>a").removeClass("on");
  }
}

var judgeHeight = {
  orderListHeight: function () {

    $(".order-list .order-content").each(function () {
      $(this).find(".order-position").height($(this).height() - 32);
    });

    $(".order-list .housekeeping-name dd:nth-child(2)").each(function () {
      var w1 = $(this).width() / 2;
      $(this).css("margin-left", -w1);
    });

    var w2 = $(".page-bar").width() / 2;
    $(".page-bar").css("margin-left", -w2);
    // $("body").css("width","auto");
  }
}

// 判断自适应高度
var adaptableHeight = {
  showHeght: function () {
    var h = $(window).height();
    $(".login_go").height(h - 117);
  },
}

// 高德地图
var gaoDeMap = {
  newMap: function () {
    // 地图初始化时，在地图上添加一个 marker 标记,鼠标点击 marker 可弹出自定义的信息窗体
    var map = new AMap.Map("allmap", {
      resizeEnable: true,
      center: [120.710881, 31.361224],
      zoom: 17
    });
    addMarker();
    // 添加 marker 标记
    function addMarker() {
      map.clearMap();
      var marker = new AMap.Marker({
        map: map,
        position: [120.710881, 31.361224]
      });
      // 鼠标点击 marker 弹出自定义的信息窗体
      AMap.event.addListener(marker, 'click', function () {
        infoWindow.open(map, marker.getPosition());
      });
    }

    // 实例化信息窗体
    var title = '苏州蚕食网络科技有限公司';
    content = [];
    content.push("<img src='http://tpc.googlesyndication.com/simgad/5843493769827749134'>地址：苏州市工业园区君风生活广场唯华路5号3栋1102（电梯12F）");
    content.push("电话：400-6868-580");
    content.push("<a href='http://ditu.amap.com/search?query=苏州蚕食网络科技有限公司&city=320500&geoobj=120.710881,31.361224&zoom=12' target='_blank' >详细信息</a>");
    var infoWindow = new AMap.InfoWindow({
      isCustom: true,  // 使用自定义窗体
      content: createInfoWindow(title, content.join("<br/>")),
      offset: new AMap.Pixel(16, -45)
    });

    // 构建自定义信息窗体
    function createInfoWindow(title, content) {
      var info = document.createElement("div");
      info.className = "info";

      // 可以通过下面的方式修改自定义窗体的宽高
      // info.style.width = "400px";
      // 定义顶部标题
      var top = document.createElement("div");
      var titleD = document.createElement("div");
      var closeX = document.createElement("img");
      top.className = "info-top";
      titleD.innerHTML = title;
      closeX.src = "http://webapi.amap.com/images/close2.gif";
      closeX.onclick = closeInfoWindow;

      top.appendChild(titleD);
      top.appendChild(closeX);
      info.appendChild(top);

      // 定义中部内容
      var middle = document.createElement("div");
      middle.className = "info-middle";
      middle.style.backgroundColor = 'white';
      middle.innerHTML = content;
      info.appendChild(middle);

      // 定义底部内容
      var bottom = document.createElement("div");
      bottom.className = "info-bottom";
      bottom.style.position = 'relative';
      bottom.style.top = '0px';
      bottom.style.margin = '0 auto';
      var sharp = document.createElement("img");
      sharp.src = "http://webapi.amap.com/images/sharp.png";
      bottom.appendChild(sharp);
      info.appendChild(bottom);
      return info;
    }

    // 关闭信息窗体
    function closeInfoWindow() {
      map.clearInfoWindow();
    }
  },
}
