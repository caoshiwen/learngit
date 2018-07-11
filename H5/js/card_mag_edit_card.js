$(function() {
    //获取验证码
    $(".btn-get-code").on("click", clickFnBtnGetCode);

    $(".need-check-ipt").on({
        "change": checkChangeFn,
        "keyup": checkChangeFn
    });

    $("#agree-with-us").on("click", function() {
        // console.log(1)
        $(this).toggleClass("not-agree").filter(".not-agree").attr("src", "img/agree_with_us_gray.png");
        $(this).not(".not-agree").attr("src", "img/agree_with_us.png");
        checkChangeFn();
    });

});



//验证码点击事件
function clickFnBtnGetCode() {
    getCode();
    $(".btn-get-code").addClass("gray");
    var start_time = 60,
        $this = $(".btn-get-code");
    var otime = setInterval(function() {
        start_time -= 0.1;
        if (Math.floor(start_time) == 0) {
            $this.removeClass("gray");
            $this.html("获取验证码");
            clearInterval(otime);
        } else {
            $this.html(Math.floor(start_time) + "S");
        }
    }, 100);
}

//验证码请求
function getCode() {
    // console.log(1);
}
//输入验证
function checkChangeFn() {
    var re = (checkValidity($(".validity-ipt").val()) &&
        vccCheck($(".vcc-ipt").val()) &&
        phoneCheck($(".phone-ipt").val()) &&
        codeCheck($(".code-ipt").val()) && 
        $(".not-agree").length == 0
    ) ? true : false;
    if (re) {
        $(".btn-sure-add").removeClass("gray");
    } else {
        $(".btn-sure-add").addClass("gray");
    }
}
//验证有效期
function checkValidity(date_val) {
    var myreg = /^[0-9]{4}$/;
    if (!myreg.test(date_val)) {
        return false;
    }
    return true;
}
//验证vcc2
function vccCheck(vcc_val) {
    var myreg = /^[0-9]{3}$/;
    if (!myreg.test(vcc_val)) {
        return false;
    }
    return true;
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
    return true;
}
