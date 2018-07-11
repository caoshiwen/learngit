$(function() {

    //获取验证码
    // $(".btn-get-code").on("click", clickFnBtnGetCode);
    checkChangeFn();
    $(".need-check-ipt").on({
        "change": checkChangeFn,
        "keyup": checkChangeFn
    });

    $(".result-bg").on("click", function() {
        $(".result").hide();
    });

    $(".bank-name-btn").on("click", function(e) {
        showIframe()
        var f = $("iframe");
        f[0].contentWindow.bank_flag = "bank_name";
        f[0].contentWindow.callbackFn = bankNameCallback;
    });
    $(".bank-name-de-btn").on("click", function(e) {
        showIframe()
        var f = $("iframe");
        f[0].contentWindow.bank_flag = "bank_name_de";
        f[0].contentWindow.callbackFn = bankNameDeCallback;
    });
});


//输入验证
function checkChangeFn() {
    var re = (idCheck($(".id-ipt").val())
            && phoneCheck($(".phone-ipt").val())
            && cardCheck($(".card-ipt").val())
            && bankCheck($(".bank-name").val())
            && bankDeCheck($(".bank-name-de").val())
            )?true:false;
    if(re) {
        $(".btn-sure-add").removeClass("gray").off("click.stop").on("click.sure", sureFn);
    }else{
        $(".btn-sure-add").addClass("gray").on("click.stop",function() {return false;}).off("click.sure");
    }
}


//验证手机号
function phoneCheck(phone_val) {
    var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    return (myreg.test(phone_val))?true:false;
}

function idCheck(id_val) {
    var myreg = /^[0-9]{17}[0-9x]{1}$/;
    return (myreg.test(id_val))?true:false;
}
function cardCheck(card_var) {
    var myreg = /^[0-9]{19}$/;
    return (myreg.test(card_var))?true:false;
}
function bankCheck(bank_name_var) {
    return bank_name_var?true:false;
}
function bankDeCheck(bank_name_de_var) {
    return bank_name_de_var?true:false;
}


//确认
function sureFn() {
    $(".result").show();
    setTimeout(function() {
        window.location.href = "card.html";
    },1000);
}



function bankNameCallback(a) {
    $(".bank-name").val(a);
    hideIframe()
    
}
function bankNameDeCallback(a) {
    $(".bank-name-de").val(a);
    hideIframe()
    
}

var showIframe = function() {
    $(".bank-name-ifr-wrap").show();
    $(".father-body, .father-html").addClass("body-no-scroll");
}
var hideIframe = function() {
    $(".bank-name-ifr-wrap").hide();
    $(".father-body, .father-html").removeClass("body-no-scroll");
}
