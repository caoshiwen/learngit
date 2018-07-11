$(function() {
    //获取验证码
    $(".btn-get-code").on("click", clickFnBtnGetCode);

    $(".need-check-ipt").on({
        "change": checkChangeFn,
        "keyup": checkChangeFn
    });


    //信用卡和借记卡切换
    //通过body是否有credit-card 类别判断是否为信用卡
    $(".btn-credit-card").on("click", function() {
        $("body").addClass("credit-card");
        checkChangeFn();
    })
    $(".btn-debit-card").on("click", function() {
        $("body").removeClass("credit-card");
        checkChangeFn();
    })

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
    var re =  phoneCheck($(".phone-ipt").val())
            && codeCheck($(".code-ipt").val());
    if($("body.credit-card").length > 0) {
        re = re && vccCheck($(".vcc-ipt").val()) &&checkValidity($(".validity-ipt").val());
    }
    if(re) {
        $(".btn-sure-add").removeClass("gray");
    }else{
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
    return code_val.length > 0;
}