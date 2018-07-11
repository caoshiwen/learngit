$(function() {
    //设置可确定
    $(".ipt-price").on("keyup", function(){
        console.log(1)
        onlyNumber(this);
        iptChangeListenFn($(this), $(".btn-sure"), true, "gray");
    });

});