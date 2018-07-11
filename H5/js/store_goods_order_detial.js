$(function() {
    //根据订单详情 显示样式以及按钮

    // 订单剩余时间
    finallyTimeLess("2018-12-27 12:24:00");
});
// 订单剩余时间
function finallyTimeLess(s) {
    var d1 = new Date(s);
    // console.log(d1.getTime() / 1000 / 3600 / 24 / 365);
    var $h = $(".need-pay-hour"),
        $m = $(".need-pay-min"),
        $s = $(".need-pay-sec"),
        $b = $(".need-pay-less-time");
    intFn();
    function intFn() {
        o = setInterval(function() {
            var nt = new Date();
            var t = nt - d1;
            var lt = 24*3600*1000 - t;
            if(lt < 0) {
                $b.html("订单已过期");
                clearInterval(o);
                return;
            }
            $h.html(Math.floor(lt / 1000 / 3600));
            $m.html(Math.floor((lt / 1000 % 3600) / 60));
            $s.html(Math.floor((lt / 1000 % 3600) % 60));
        }, 100);
    }
    
}
