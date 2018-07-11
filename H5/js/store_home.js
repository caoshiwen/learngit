$(function() {
    

    initHtml();
});


function initHtml() {
    changeBlockInnerWrapHeight();
    // 轮播
    $('#full_feature').swipeslider({
        transitionDuration: 500,
        autoPlayTimeout: 6000
    });
    // 优惠券 ul总长度初始化
    var $li = $(".coupons li");
    var n = $li.length;
    var fz = CARD_DATA.font_size;
    var w = (56 + n * 10) / 75 * fz + n *  parseFloat($li.css("width"));
    $(".coupons ul").css("width", w + "px");

    // 商品块
    changeBlockInnerWrapHeight();
    $(".goods-show-block-btn").on("click", function() {
        $(".goods-show-block-btn").removeClass("active");
        $(this).addClass("active");
        changeBlockInnerWrapHeight();
    });
}


function changeBlockInnerWrapHeight() {
    var b = $(".goods-show-block-btn.active");
    if(b.is(".lastest-btn")) {
            $(".good-block-inner-wrap")
            .css({
                "margin-left":"0",
                "height": $(".lastest").css("height")
            });
        }else{
            $(".good-block-inner-wrap")
            .css({
                "margin-left":"-100%",
                "height": $(".hottest").css("height")
            });
        }
}