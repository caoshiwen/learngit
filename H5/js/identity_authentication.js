var STATIC_DATA = {};
STATIC_DATA.session_can_use = false;
$(function() {
    buildLogic();
});
// 图片逻辑
function buildLogic() {
    checkSession();
    checkBtnIsCanPoint(STATIC_DATA.session_can_use);
    changeIptCaptureForIOS();

    $(".reverse,.positive").on("error", function() {
        console.log("error");
        $(".reverse").attr("src", "img/identity_authentication_reverse.png");
        $(".positive").attr("src", "img/identity_authentication_positive.png");
        $(".alert-btns input").val("");
        setSessionData("card", "id_au_reserve", "");
        setSessionData("card", "id_au_positive", "");
        STATIC_DATA.session_can_use = false;
        checkBtnIsCanPoint(STATIC_DATA.session_can_use);
        return false;
    });
    imgDeal($("#reverse-camera"), $(".reverse img"), function(img64base, f_type) {
        $(".alert-btns").hide();
        // setSessionData("card", "id_au_reserve", $(".reverse img").attr("src"));
        setSessionData("card", "id_au_reserve", img64base);
    });
    imgDeal($("#positive-camera"), $(".positive img"), function(img64base, f_type) {
        $(".alert-btns").hide();
        // setSessionData("card", "id_au_positive", $(".positive img").attr("src"));
        setSessionData("card", "id_au_positive", img64base);
    });
    imgDeal($("#reverse-folder"), $(".reverse img"), function(img64base, f_type) {
        $(".alert-btns").hide();
        // setSessionData("card", "id_au_reserve", $(".reverse img").attr("src"));    
        setSessionData("card", "id_au_reserve", img64base);    
    });
    imgDeal($("#positive-folder"), $(".positive img"), function(img64base, f_type) {
        $(".alert-btns").hide();
        // setSessionData("card", "id_au_positive", $(".positive img").attr("src"));
        setSessionData("card", "id_au_positive", img64base);
    });
    //图像按钮
    $(".btn-id").on("click", function() {
        if($(this).is(".reverse")) {
            reverseFn();
        } else {
            positiveFn();
        }

        $(".alert-btns").show();
    });
    $(".alert-btns-bg").on("click", function() {
        $(".alert-btns").hide();
    });
    $(".alert-btns input").on("change", function() {
        checkBtnIsCanPoint(STATIC_DATA.session_can_use);
    });
}

// 
function checkSession() {
    var s_reserve = getSessionData("card", "id_au_reserve");
    // console.log(s_reserve.length)
    var s_positive = getSessionData("card", "id_au_positive");
    if(s_reserve && s_positive) {
        $(".reverse img").attr("src", s_reserve);
        $(".positive img").attr("src", s_positive);
        STATIC_DATA.session_can_use = true;
        // $("#reverse-camera").val(s_reserve);
        // $("#positive-camera").val(s_reserve);
    }
}

function reverseFn() {
    // $(".alert-btns").hide();
    $(".btn-op-camera").attr("for", "reverse-camera");
    $(".btn-op-folder").attr("for", "reverse-folder");

}
function positiveFn() {
    // $(".alert-btns").hide();
    $(".btn-op-camera").attr("for", "positive-camera");
    $(".btn-op-folder").attr("for", "positive-folder");
}


//按钮disable 判断
function checkBtnIsCanPoint(session_can_use) {
    var b = false;
    if(STATIC_DATA.session_can_use) {
        b = true;
    }else if(
        ($("#reverse-camera").get(0).files[0] ||
            $("#reverse-folder").get(0).files[0]) &&
        ($("#positive-camera").get(0).files[0] ||
            $("#positive-folder").get(0).files[0]) 
        ) {
        b = true;
    }
    if(b){
        $(".btn-sure-add").removeClass("gray").off("click.stop");
    }else {
        $(".btn-sure-add").addClass("gray").on("click.stop",function() {return false;});
    }
}