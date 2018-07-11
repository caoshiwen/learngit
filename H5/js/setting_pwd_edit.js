$(function() {
    checkChangeFn();

    $(".ipt-need-check").on("keyup", checkChangeFn);
});

//输入验证
function checkChangeFn() {
    var old = $(".ipt-old-pwd").val(),
        new1 = $(".ipt-new-pwd").val(),
        new2 = $(".ipt-new-pwd-d").val();
    var re = (checkNewPwd(new1, new2) && checkOldPwd(old)) ? true : false;
    console.log(re);
    if (re) {
        $(".btn-sure-save").removeClass("gray").off("click.stop");
    } else {
        $(".btn-sure-save").addClass("gray").add("click.stop",function() {return false;});
    }
}
//验证密码
function checkNewPwd(val, val2) {
    return val.length > 5 && val.length < 18 && val === val2 ? true : false;
}
function checkOldPwd(val) {
    return true;
}
