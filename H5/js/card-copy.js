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
    bulidBanner();
    bulidMoveBanner();
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

});

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

//轮播
function bulidBanner() {
    //banner
    var $_card_top = $(".sec-card-top");
    var $_banner = $_card_top.find(".banner");
    var $_imgs = $_banner.find(".imgs"),
        $_cirs = $_banner.find(".cirs");

    var imgs_html = '<li class="active"><img src="img/banner_1.png"></li><li><img src="img/banner_2.png"></li><li><img src="img/banner_3.png"></li><li><img src="img/banner_4.png"></li><li><img src="img/banner_1.png"></li>';
    $_imgs.css("width", "500%");
    $_imgs.html(imgs_html);
    // console.log($_imgs);
    $(".imgs img").css({
        "width": 690.0 / 75 + "rem",
        "margin-left": (30.0 / 75) + "rem"
    });

    var cirs_html = '<li class="active"><img class="ac-img" src="img/cir_active.png"></li><li><img class="ac-img" src="img/cir_active.png"></li><li><img class="ac-img" src="img/cir_active.png"></li><li><img class="ac-img" src="img/cir_active.png"></li>';
    $_cirs.html(cirs_html);
    var intFn = bannerIntFn($_imgs, $_cirs, $_card_top);
    CARD_DATA.otime = setInterval(function() {
        intFn();
    }, CARD_DATA.banner_time);
}

function bannerIntFn($_imgs, $_cirs, $_card_top) {
    return function() {
        CARD_DATA.flag++;
        CARD_DATA.flag = CARD_DATA.flag % 4;
        if (CARD_DATA.flag == 0) {
            $_imgs.css("margin-left", -4 * (720 / 75) + "rem");
            clearTimeout(CARD_DATA.o2time);
            CARD_DATA.o2time = setTimeout(function() {
                $_imgs.removeClass("has-transition");
                $_imgs.css("margin-left", 0);
            }, 600);
        } else {
            $_imgs.addClass("has-transition").css("margin-left", -CARD_DATA.flag * (720 / 75) + "rem");
        }
        var $_lis = $_cirs.children("li");
        $_lis.removeClass("active");
        $_lis.eq(CARD_DATA.flag).addClass("active");
        $_card_top.css("background-image", "url(" + CARD_DATA.banner_data.bg_img[CARD_DATA.flag] + ")");

    }
}
//轮播手势监控
function bulidMoveBanner() {
    var $_card_top = $(".sec-card-top");
    var $_banner = $_card_top.find(".banner");
    var $_imgs = $_banner.find(".imgs"),
        $_cirs = $_banner.find(".cirs");
    $_imgs.on({
        "touchstart": fnTouchStart,
        "touchmove": fnTouchMove,
        "touchend": fnTouchEnd,
        "touchcancel": fnTouchCancel
    });
    var m_left = 0,
        start_point = -1.0,
        move_dis = 0;
    function fnTouchStart(e) {
        m_left = parseInt($_imgs.css("margin-left"));
        clearInterval(CARD_DATA.otime);
        $_imgs.removeClass("has-transition");
        start_point = e.touches[0].clientX;
        console.log(start_point);

    }

    function fnTouchMove(e) {
        
        if(start_point<0) return;
        move_dis = e.touches[0].clientX - start_point;
        if(CARD_DATA.flag == 0 && move_dis > 0){
            $_imgs.css("margin-left", -4 * (720 / 75) + "rem");
            m_left = parseInt($_imgs.css("margin-left"));
        }else if(CARD_DATA.flag == 0 && move_dis < 0){
            $_imgs.css("margin-left", 0);
            m_left = parseInt($_imgs.css("margin-left"));
        }
        $_imgs.css("margin-left", m_left + move_dis + "px");
        e.preventDefault();
    }

    function fnTouchEnd() {
        $_imgs.addClass("has-transition");
        start_point = -1.0;
        if(move_dis > 0){
            if(CARD_DATA.flag == 0){
                CARD_DATA.flag = 2
            }else if(CARD_DATA.flag == 1){
                CARD_DATA.flag = 0;
                $_imgs.css("margin-left", 0);
                var $_lis = $_cirs.children("li");
                $_lis.removeClass("active");
                $_lis.eq(CARD_DATA.flag).addClass("active");
                $_card_top.css("background-image", "url(" + CARD_DATA.banner_data.bg_img[CARD_DATA.flag] + ")");
                backToInter();
                return;
            }
            else{
                CARD_DATA.flag--;
                CARD_DATA.flag--;
                if(CARD_DATA.flag < 0){
                    CARD_DATA.flag = 0;
                }
            }
        }
        bannerIntFn($_imgs, $_cirs, $_card_top)();
        backToInter();
    }

    function backToInter() {
        
        clearInterval(CARD_DATA.otime);
        clearTimeout(CARD_DATA.outTime);
        CARD_DATA.outTime = setTimeout(function(){
            startInter();
        },CARD_DATA.banner_time + 600);
    }

    function fnTouchCancel() {
        start_point = -1.0;
    }

    function startInter() {
        var intFn = bannerIntFn($_imgs, $_cirs, $_card_top);
        CARD_DATA.otime = setInterval(function() {
            intFn();
        }, CARD_DATA.banner_time);
    }
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
