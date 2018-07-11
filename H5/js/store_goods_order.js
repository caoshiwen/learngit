$(function() {
    // 获取订单数据
    getDate();
    // waiting init util.js
    middleWaitingInit();
});



// 获取订单数据
function getDate() {
    // 数据获取后 初始化列表
    htmlInit();
}

// 初始订单列表  即数据获取后的事件回调需要执行
function htmlInit() {
    // 切换订单类别
    changeOrderType();
    // 取消订单
    cancelOrderInit();
    // 付款
}
// 切换订单类别
function changeOrderType() {
    // 初始显示全部
    $(".order-type-wrap").css({
        "margin-left": 0,
        "height": $(".order-type-block").eq(0).height()
    })
    $(".order-type-btn").on("click", function() {
        $(".order-type-btn").removeClass("active");
        $(this).addClass("active");
        $(".order-type-wrap").css({
            "margin-left": "-" + $(this).index() * 100 + "%",
            "height": $(".order-type-block ").eq($(this).index()).height()
        })
    });
}
// 取消订单
function cancelOrderInit() {
    $(".cancel-order").on("click", function() {
        var id = $(this).parents("order-item").attr("my-id");
        $(".are-you-sure").fadeIn(300).find(".delete-sure").click(function() {
            // 取消
            cancelOrderFn(id);
            $(".are-you-sure").fadeOut(300);
        });
    });

    // 取消取消
    $(".delete-cancel").on("click", function() {
        $(".are-you-sure").fadeOut(300);
    });
}
// 确认取消  id
function cancelOrderFn(id) {
    //模拟请求
    var $w = $(".waiting").fadeIn(300);
    setTimeout(function() {
        $w.fadeOut(300);
        bottomTip("取消成功");
    }, 2000);
}
