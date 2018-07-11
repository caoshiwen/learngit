var need_delete = $("");
$(function() {
    //删除
    $(".btn-delete").on("click", function() {
        need_delete = $(this).parents(".address-item");
        $(".are-you-sure").fadeIn(600);
    });
    // 确定删除
    $(".delete-sure").on("click", function() {
        deleteAddress(need_delete);
    });
    //取消删除
    $(".delete-cancel").on("click", function() {
        need_delete = $("");
        $(".are-you-sure").hide();
    });

    //管理
    $(".mag-btn").on("click", function() {
        $("body").addClass("mag");
    });
    //完成
    $(".mag-ok-btn").on("click", function() {
        $("body").removeClass("mag");
    });

    //点击选择地址
    $(".address-item").on("click", function() {
        $(".address-item").removeClass("chosen");
        $(this).addClass("chosen");
    });
});

//删除地址
function deleteAddress($obj) {
    $obj.remove();
    $(".are-you-sure").hide();
    bottomTip("删除成功");
}


