$(function () {
  reservationJs.jeDate();
  reservationJs.foxClean();
})
var reservationJs = {
  // 清除按钮显示与隐藏
  foxClean: function () {
    $(".region_address i").on("click", function () {
      $(".region_address input").val("");
    });

    $(".region_address input").on("keyup", function () {
      var user_tel = $(".region_address input").val();
      if (user_tel != "") {
        $(".region_address i").show();
      } else {
        $(".region_address i").hide();
      }
    });

    $(".region_address input").focus(function () {
      var user_tel = $(".region_address input").val();
      if (user_tel != "") {
        $(".region_address i").show();
      } else {
        $(".region_address i").hide();
      }
    })
  },
  // 日期控件
  jeDate: function () {
    var start = {
      format: 'YYYY-MM-DD',
      minDate: '2014-06-16', // 设定最小日期为当前日期
      maxDate: $.nowDate({DD: 256}), // 最大日期
      okfun: function (obj) {
        end.minDate = obj.val; // 开始日选好后，重置结束日的最小日期
        endDates();
      }
    };
    var end = {
      format: 'YYYY-MM-DD',
      minDate: $.nowDate({DD: 0}), // 设定最小日期为当前日期
      maxDate: '2099-06-16', // 最大日期
      okfun: function (obj) {
        start.maxDate = obj.val; // 将结束日的初始值设定为开始日的最大日期
      }
    };
// 这里是日期联动的关键
    function endDates() {
      //将结束日期的事件改成 false 即可
      end.trigger = false;
      $("#inpend").jeDate(end);
    };
    $('#inpstart').jeDate(start);
    $('#inpend').jeDate(end);
  }
}
