$(function() {
    //隐藏银行卡列表
    $(".sec-choose-card .art-bg").on("click", function() {
        $(".sec-choose-card").hide();
    });
    //显示银行卡列表
    $(".div-out-id").on("click", function() {
        $(".sec-choose-card").show();
    });
    //选择银行卡
    $(".sec-choose-card .li-card").on("click", function() {
        $(".sec-choose-card .li-card").removeClass("active");
        $(this).addClass("active");
        $(".sec-choose-card").hide();

        $(".div-out-id .info-title").html($(this).find(".bank-name").html());
    });
});
