$(function() {
    checkCanGo()
    $(".div-card").on("click", function() {
        $(this).toggleClass("active");
        checkCanGo()
    });

});


function checkCanGo() {
    var l = $(".div-card.active").length,
        $a = $(".sec-go-next a");
    if(l > 0) {
        $a.removeClass("gray").html("下一步(已选"+l+")").off("click.stop");
    }else {
        $a.addClass("gray").html("请选择信用卡").on("click.stop", function() {
            return false;
        });
    }

}