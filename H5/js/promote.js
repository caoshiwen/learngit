$(function() {

    tabBuild();

    $(".btn-share").on("click", function() {
        $(".alert").show();
    });
    $(".btn-cancel").on("click", function() {
        $(".alert").hide();
    });
});


//图片加载成功后  build tab
function tabBuild() {
    var $img =  $(".container img");
    var l = $img.length;
    $img.removeClass("active").removeClass("before-active").removeClass("after-active");
    $img.eq(0).addClass("active");
    $img.eq(l - 1).addClass("before-active");
    $img.eq(1).addClass("after-active");
    $(".stage").on({
        "touchstart": fnTouchStart,
        "touchmove": fnTouchMove,
        "touchend": fnTouchEnd,
        "touchcancel": fnTouchCancel
    });
    var start_point = -1.0;
    var end_point = 0;
    function fnTouchStart(e) {
        start_point =  e.changedTouches[0].clientX;
        e.preventDefault();
    }

    function fnTouchMove(e) {
        end_point = e.changedTouches[0].clientX;
        
    }

    function fnTouchEnd(e) {
        if(start_point < 0) return;
        if(start_point - end_point > 50) {
            //向前
            changeImg(true);
        } else if(start_point - end_point < -100){
            //向后
            changeImg(false);
        }
        start_point = -1.0;
    }

    function fnTouchCancel(e) {
        start_point = -1.0;
    }
}


function changeImg(go_forward) {
    var $img =  $(".container img");
    var l = $img.length,
        ai = $img.index($(".container img.active"));
    var ani = (ai + 1) % l,
        bni = ai,
        afni = (ani + 1) % l;
    if(go_forward) {
        ani = (ai + 1) % l;
        bni = ai;
        afni = (ani + 1) % l;
    } else {
        ani = (ai - 1 + l) % l;
        bni = (ani - 1 + l) % l;
        afni = (ani + 1) % l;
    }
    // console.log(ani)
    $img.removeClass("active").removeClass("before-active").removeClass("after-active");
    $img.eq(ani).addClass("active");
    $img.eq(bni).addClass("before-active");
    $img.eq(afni).addClass("after-active");

}
