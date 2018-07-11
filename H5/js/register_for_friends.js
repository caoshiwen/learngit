$(function() {
    $(".need-check-ipt").on({
        "change": checkChangeFn,
        "keyup": checkChangeFn
    });

});



//输入验证
function checkChangeFn() {
    var re = (phoneCheck($(".ipt-phone").val()) &&
        codeCheck($(".ipt-pwd").val())
    ) ? true : false;
    if (re) {
        $(".btn-register").removeClass("gray").off("click.stop");
    } else {
        $(".btn-register").addClass("gray").on("click.stop",function(){return false;});
    }
}

//验证手机号
function phoneCheck(phone_val) {
    var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    if (!myreg.test(phone_val)) {
        return false;
    }
    return true;
}
//验证验证码
function codeCheck(code_val) {
    return code_val.length > 5 && code_val.length <19 ? true : false;
}
