var CARD_DATA = {};
$(function() {
    CARD_DATA.font_size = changeFontSize();
    CARD_DATA.banner_time = 3000;
    CARD_DATA.flag = 0;
    $(window).resize(function() {
        CARD_DATA.font_size = changeFontSize();
    });

    CARD_DATA.banner_data = {
        banner_img: ["img/banner_1.png", "img/banner_1.png", "img/banner_1.png", "img/banner_1.png"],
        bg_img: ["img/top_bg.png", "img/top_bg_2.png", "img/top_bg_3.png", "img/top_bg_4.png"]
    }; 
    // bulidBanner();
    // bulidMoveBanner();
    bulidTag();
    var showPos = $(".sec-goods").position().top;
    $(window).on("scroll", function() {
        var winPos = $(this).scrollTop();

        if(winPos > showPos) {
            $(".go-top").addClass("active");
        }else{
            $(".go-top").removeClass("active");
        }
    });



    //轮播思路
    //均匀分散两边 滑动/滚动结束时  重新均匀分布两边
    //动作时 左/右 百分比放大/缩小
    // scaleBanner();

    //账单轮播请求结束需执行
    $(".order-num").html($(".sw-slide").length);
    $('#full_feature').swipeslider();

    //横拉按钮请求成功需执行 控制ul长度
    btnsBulid();

    //横拉商品请求成功需执行 控制ul长度
    goodsBulid();

    //身份认证
    $(".btn-true-prove").on("click", function() {
        setSessionData("card", "id_au_reserve", "");
        setSessionData("card", "id_au_positive", "");
        setSessionData("card", "id_au_bank", "");
        setSessionData("card", "id_au_personal", "");
    });
    // $("a").on("click", function(e) {
    //     e.preventDefault();
    // });


    //点击头像
    $(".btn-me").on("click", function() {
        if(checkLogin()) {
            window.location.href = "user_info.html";
        }else {
            window.location.href = "login.html";
        }
    });
});

//登录检测 已登录回复true
function checkLogin() {
    return false;
}

//等宽修改字体大小
function changeFontSize() {
    var window_width = $(window).width();
    var font_size = window_width / 10;
    if (font_size < 32.5) {
        font_size = 32.5;
    }
    $("html").css("font-size", font_size);
    return font_size;
}



//我要还款 tag
function bulidTag() {
    var $_pay = $(".sec-i-need .pay");
    var $_collection = $(".sec-i-need .collection");
    // $(".sec-i-need .title-button a")
    $_pay.on("click", function() {
        $_pay.addClass("active");
        $_collection.removeClass("active");
        $(".sec-i-need .content-1").addClass("active");
        $(".sec-i-need .content-2").removeClass("active");
    });

    $_collection.on("click", function() {
        $_pay.removeClass("active");
        $_collection.addClass("active");
        $(".sec-i-need .content-1").removeClass("active");
        $(".sec-i-need .content-2").addClass("active");
    })
}

//横拉按钮
function btnsBulid() {
    var $li = $(".sec-buttons li");
    var n = $li.length;
    var fz = CARD_DATA.font_size;
    var w = (60 + 20 * n - 20) / 75 * fz + n *  parseFloat($li.css("width"));
    $(".sec-buttons ul").css("width", w + "px");
}


//商品按钮
function goodsBulid() {
    var $li = $(".goods-contents li");
    var n = $li.length;
    var fz = CARD_DATA.font_size;
    var w = (60 + 20 * n - 20) / 75 * fz + n *  parseFloat($li.css("width"));
    $(".goods-contents").css("width", w + "px");
}

//放缩型轮播
function scaleBanner() {
    scaleBannerBulid($(".art-banner"));
    scaleBannerAutoMove();
    // scaleBannerHandMove();
}

function scaleBannerBulid($outer) {
    // var html_data = '<li class="li-banner">4</li>';
    var html_demo = $(".li-banner.demo").html();
    var html_data = '';
    var data = [html_demo,html_demo,html_demo,html_demo];

    if(data.length < 3) {
        return;
    }

    var a = Math.ceil(data.length / 2),
        b = Math.floor(data.length / 2);
    var i = 0,c = '';
    for(i = a; i < data.length; i++) {
        html_data += '<li class="li-banner pr pl30 pr30 pb40 '+ c +'">' +data[i]+ '</li>';
    }
    for(i = 0; i < a; i++) {
        if(i == 0) {
            c = 'active'
        } else {
            c = ''
        }
        html_data += '<li class="li-banner pr pl30 pr30 pb40 '+ c +'">' +data[i]+ '</li>';
    }

    $outer.find(".ul-banner").html(html_data).css("left", -b*(20+650)/75+"rem");

    //(a-1)*(30+650)rem

}

function scaleBannerAutoMove() {
    scaleIntFn();
}
function scaleIntFn() {
    var dis = 670/75.0;
    var $ul = $(".ul-banner");
    var l = parseFloat($ul.css("left"));
    $ul.delay(4000).show(function(){
        $ul.find(".active").removeClass("active");
        $ul.find("li").eq(Math.ceil($ul.find("li").length/2)+1).addClass("active"); 
    }).animate({ 
        left: l - 670/75*CARD_DATA.font_size + "px"
        }, 1000, finallyFn);

}
function finallyFn(){
    var dis = 670/75.0;
    var $ul = $(".ul-banner");
    //??????
    $ul.find("li:nth-of-type(1)")
        .appendTo(".ul-banner");
    var l = parseFloat($ul.css("left")) + 670/75*CARD_DATA.font_size;
    $ul.css("left", l);
    $ul.delay(4000).show(function(){
        $ul.find(".active").removeClass("active");
        $ul.find("li").eq(Math.ceil($ul.find("li").length/2)+1).addClass("active");
    }).animate({ 
        left: l - 670/75*CARD_DATA.font_size + "px"
    }, 1000, finallyFn);
}

function scaleBannerHandMove() {
    var $ul = $(".ul-banner");
    $ul.on({
        "touchstart": fnTouchStart,
        "touchmove": fnTouchMove,
        "touchend": fnTouchEnd,
        "touchcancel": fnTouchCancel
    });
    var start_point = -1;
    function fnTouchStart(e) {
        $ul.stop(true);
        start_point = e.touches[0].clientX;
        e.preventDefault();
    }
    function fnTouchMove(e) {
        if(start_point){

        }
    }
    var out_time;
    function fnTouchEnd(e) {
        clearTimeout(out_time);
        out_time = setTimeout(scaleIntFn,1000);
    }
    function fnTouchCancel(e) {
        clearTimeout(out_time);
        out_time = setTimeout(scaleIntFn,1000);
    }
}