$(function() {
    //获取验证码
    $(".btn-get-code").on("click", clickFnBtnGetCode);

    $(".need-check-ipt").on({
        "change": checkChangeFn,
        "keyup": checkChangeFn
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

function getCode() {

}

function checkChangeFn() {
    var re = codeCheck($(".code-ipt").val());
    if(re) {
        $(".go-next").removeClass("gray");
    }else{
        $(".go-next").addClass("gray");
    }
}

//验证验证码
function codeCheck(code_val) {
    return code_val.length > 0;
}