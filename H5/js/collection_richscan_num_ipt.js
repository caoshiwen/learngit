$(function() {
    $(".art-set-num-bg").on("click", function() {
        $(".sec-set-num").hide();
    });
    //设置金额
    $(".right-word").on("click", function(){
        $(".sec-set-num").show();
    });
    //清除金额
    $(".right-word-clear-num").on("click", function(){
        $(".p-num-show").html("");
        $(this).hide();
        $(".right-word").show();
    });
    //设置可确定
    $("#ipt-num").on("keyup", function(){
        iptChangeListenFn($(this), $(".btn-sure"), true, "gray");
    });
    //确定按钮
    $(".btn-sure").on("click", function(){
        $(".p-num-show").html( "￥"+ $("#ipt-num").val());
        $(".sec-set-num").hide();
        $(".right-word").hide();
        $(".right-word-clear-num").show();
    });
});