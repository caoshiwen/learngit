$(function() {
    $(".need-check-ipt").on({
        "change": checkChangeFn,
        "keyup": checkChangeFn
    });

    $(".bank-select").on("click", function() {
        $(".sec-choose-card").show();
    });
    //银行选择
    $(".li-card").on("click", function() {
        $(".li-card").removeClass("active");
        $(this).addClass("active");
        $(".bank-select .bank-name").html($(this).find(".bank-name").html());
        $(".bank-select .bank-logo").attr("src",$(this).find(".bank-logo").attr("src"));
        $(".sec-choose-card").hide();
    });

    $(".art-bg").on("click", function() {
        $(".sec-choose-card").hide();
    });

});

//输入验证
function checkChangeFn() {
    var re = (checkPrice($(".price").val())) ? true : false;
    if (re) {
        $(".btn-sure-save").removeClass("gray").off("click.stop");
    } else {
        $(".btn-sure-save").addClass("gray").add("click.stop",function() {return false;});
    }
}
//验证金额
function checkPrice(date_val) {
    return date_val?true:false;
}
