$(function() {
    $(".vip-level-tab li").on("click", function() {
        $vip = $(".vip-content");
        for (var i = 1; i < 11; i++) {
            $vip.removeClass("active-"+i);
        }
        $vip.addClass("active-" + ($(this).index() + 1));
    });

    bulidWidth(5);
})


//调整tab的width
//n为等级数
function bulidWidth(n) {
    // console.log(CARD_DATA.font_size);
    $(".vip-level-tab").css("width",(180 * n + 30) / 75 + "rem");
}