$(function() {
    //获取验证码
    $(".btn-get-code").on("click", clickFnBtnGetCode);
});



//验证码点击事件
function clickFnBtnGetCode() {
    getCode();
    $(".btn-get-code").addClass("gray").on("click.stop", function() {
        return false;
    });
    var start_time = 60,
        $this = $(".btn-get-code");
    var otime = setInterval(function() {
        start_time -= 0.1;
        if (Math.floor(start_time) == 0) {
            $this.removeClass("gray").off("click.stop");
            $this.html("获取验证码");
            clearInterval(otime);
        } else {
            $this.html(Math.floor(start_time) + "S" + "后重新获取");
        }
    }, 100);

    // return false;
}


function getCode() {

}