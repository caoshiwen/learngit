$(function() {
    $(".channel-radio").on("click", function() {
        $(".channel-radio").removeClass("active");
        $(this).addClass("active");
    });

    var $ipt = $(".ipt-pay-number"),
        $obj = $(".btn-next");
    $ipt.on("keyup", function(){
        iptChangeListenFn($ipt, $obj, true, "gray");
    });

    //我知道了
    $(".btn-i-know").on("click", function() {
        $(".sec-tip").hide();
    });

    $(".img-att").on("click", function() {
        $(".sec-tip").show();
        return false;
    });
});