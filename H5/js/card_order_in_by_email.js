$(function() {


    $(".need-check-ipt").on({
        "change": checkChangeFn,
        "keyup": checkChangeFn
    });

    $("#agree-with-us").on("click", function(){
        $(this).toggleClass("not-agree").filter(".not-agree").attr("src", "img/agree_with_us_gray.png");
        $(this).not(".not-agree").attr("src", "img/agree_with_us.png");
        checkChangeFn();
    });

});


//输入验证
function checkChangeFn() {
    var re = (commonEmailCheck($(".email-ipt").val()) && checkAgreeFn() && checkPasswordFn())?true:false;
    if(re) {
        $(".btn-sure").removeClass("gray");
    }else{
        $(".btn-sure").addClass("gray");
    }
}

function checkAgreeFn() {
    return !$(".not-agree").length;
}
function checkPasswordFn() {
    var p = $(".email-pwd-ipt").val();
    console.log(p.length);
    return p.length >= 6 && p.length <= 20;
}