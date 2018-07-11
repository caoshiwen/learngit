var STATIC_DATA = {};
STATIC_DATA.session_can_use = false;
$(function() {
    // var session_can_use = false;

    checkSession();
    checkBtnIsCanPoint(STATIC_DATA.session_can_use);
    changeIptCaptureForIOS();

    $(".bank img,.personal img").on("error", function() {
        console.log("error")
        $(".bank").attr("src", "img/identity_authentication_bank.png");
        $(".personal").attr("src", "img/identity_authentication_personal.png");
        $(".alert-btns input").val("");
        setSessionData("card", "id_au_bank", "");
        setSessionData("card", "id_au_personal", "");
        STATIC_DATA.session_can_use = false;
        checkBtnIsCanPoint();
        return false;
    });
    imgDeal($("#bank-camera"), $(".bank img"), function() {
        $(".alert-btns").hide();
        setSessionData("card", "id_au_bank", $(".bank img").attr("src"));
    });
    imgDeal($("#personal-camera"), $(".personal img"), function() {
        $(".alert-btns").hide();
        setSessionData("card", "id_au_personal", $(".personal img").attr("src"));
    });
    imgDeal($("#bank-folder"), $(".bank img"), function() {
        $(".alert-btns").hide();
        setSessionData("card", "id_au_bank", $(".bank img").attr("src"));    });
    imgDeal($("#personal-folder"), $(".personal img"), function() {
        $(".alert-btns").hide();
        setSessionData("card", "id_au_personal", $(".personal img").attr("src"));
    });
    //图像按钮
    $(".btn-id").on("click", function() {
        if($(this).is(".bank")) {
            bankFn();
        } else {
            personalFn();
        }

        $(".alert-btns").show();
    });

    $(".alert-btns-bg").on("click", function() {
        $(".alert-btns").hide();
    });


    $(".alert-btns input").on("change", function() {
        checkBtnIsCanPoint(STATIC_DATA.session_can_use);
    });
    // console.log(window.form.input.files["bank-camera"]);
});

function checkSession() {
    var s_bank = getSessionData("card", "id_au_bank");
    // console.log(s_bank.length)
    var s_personal = getSessionData("card", "id_au_personal");
    if(s_bank && s_personal) {
        $(".bank img").attr("src", s_bank);
        $(".personal img").attr("src", s_personal);
        STATIC_DATA.session_can_use = true;
        // $("#bank-camera").val(s_bank);
        // $("#personal-camera").val(s_bank);
    }
}




function bankFn() {
    // $(".alert-btns").hide();
    $(".btn-op-camera").attr("for", "bank-camera");
    $(".btn-op-folder").attr("for", "bank-folder");

}
function personalFn() {
    // $(".alert-btns").hide();
    $(".btn-op-camera").attr("for", "personal-camera");
    $(".btn-op-folder").attr("for", "personal-folder");
}


//按钮disable 判断
function checkBtnIsCanPoint() {
    var b = false;
    console.log(STATIC_DATA.session_can_use)
    if(STATIC_DATA.session_can_use) {
        b = true;
    }else if(
        ($("#bank-camera").get(0).files[0] ||
            $("#bank-folder").get(0).files[0]) &&
        ($("#personal-camera").get(0).files[0] ||
            $("#personal-folder").get(0).files[0]) 
        ) {
        b = true;
    }
    if(b){
        $(".btn-sure-add").removeClass("gray").off("click.stop");
    }else {
        $(".btn-sure-add").addClass("gray").on("click.stop",function() {return false;});
    }
}