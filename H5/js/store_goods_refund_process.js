$(function() {
    // process  
    // processBuild(1);
    // processBuild(2.1,"2018-10-04 15:32:22",3);
    // processBuild(2.2);
    // processBuild(2.3);
    processBuild(2.4, "该商品已发货。");
});


// 参数为进度
//1 w294
//2为商家审核 w452 如果状态为2.1  第2个参数为 退款申请提交时间  第3个参数为完成审核最长天数
//2.2 审核成功
//2.3 商家未处理 审核成功
//2.4 商家拒绝 第2个参数为未同意原因
//3为商品寄回 
//4为完成退款 w750
function processBuild(p, other1, other2, other3) {

    $(".process-show-img").ready(function() {
        var ac = ""
        switch(p) {
            case 1: 
            ac = "w294";
            $(".process-word-1").show();
            break;
            case 2.1: 
            finallyTimeLess(other1, other2);
            $(".process-word-2-1").show();
            ac = "w452";
            break;
            case 2.2: 
            $(".process-word-2-2").show();
            ac = "w452";
            break;
            case 2.3: 
            $(".process-word-2-3").show();
            ac = "w452";
            break;
            case 2.4: 
            $(".process-word-2-4").show();
            $(".refuse-cause").text(other1);
            ac = "w452";
            break;
            case 3: break;
            case 4: 
            $(".process-word-4").show();
            ac = "w750";
            break;
        }
        $(".process-show").addClass(ac);
    });
}


// 订单剩余时间
function finallyTimeLess(s ,max_day) {
    var d1 = new Date(s);
    // console.log(d1.getTime() / 1000 / 3600 / 24 / 365);
    var $h = $(".hour"),
        $m = $(".minute"),
        $d = $(".day");
    intFn();
    var o = setInterval(intFn, 5000);
    function intFn() {
        
            var nt = new Date();
            var t = nt - d1;
            var lt = max_day*24*3600*1000 - t;
            if(lt < 0) {
                $(".process-word-2").hide();
                $(".process-word-4").show();
                clearInterval(o);
                return;
            }
            $h.html(Math.floor((lt / 1000 / 3600) % 24));
            $m.html(Math.floor((lt / 1000 % 3600) / 60));
            $d.html(Math.floor((lt / 1000 / 3600) / 24));
        
    }
    
}
