var need_delete = $("");
$(function() {
    $(".btn-delete").on("click", function() {
        need_delete = $(this).parents(".address-item");
        $(".are-you-sure").fadeIn(600);
    });

    $(".delete-sure").on("click", function() {
        deleteAddress(need_delete);
    });
    $(".delete-cancel").on("click", function() {
        need_delete = $("");
        $(".are-you-sure").hide();
    })
});

//删除地址
function deleteAddress($obj) {
    $obj.remove();
    $(".are-you-sure").hide();
    bottomTip("删除成功");
}


