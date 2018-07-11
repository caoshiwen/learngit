$(function() {
    buildStar();

    // 
    $(".leave-message").on("keyup", function() {
        $(".words-num").html($(".leave-message").val().length);
    });
    middleWaitingInit();
    // buildImg
    buildImg();
    // 发表按钮
    buildSend();
});
// 评分按钮
function buildStar() {
    var star_a = new Image(),
        star = new Image();
    star_a.src = "img/store_goods_evaluation_star_active.png";
    star.src = "img/store_goods_evaluation_star.png";
    $(".star").on("click", function() {
        var d = $(this).index(),
            src = "";
        for (var i = $("img.star").length - 1; i >= 0; i--) {
            if (i >= d) {
                src = star_a.src;
            } else {
                src = star.src;
            }
            $("img.star").eq(i).attr("src", src);
        }
        var word = "差评";
        $(".send-btn").attr("my-code", d);
        switch (d) {
            case 0:
            case 1:
                word = "好评"
                break;
            case 2:
                word = "中评"
                break;
            case 3:
            case 4:
                break;
            default:
                console.log(false);
                break;
        }
        $(".star-word").html(word);
        $(".send-btn").removeClass("gray");
    });
}
// 图片上传逻辑
function buildImg() {

    // 图片上传与身份证上传有参数修改  留意util.js （只是给第三个参数fnchange留了 img64base图片数据及f_type文件类型两个数据接口）
    var count = 1;
    var max_img_count = 3;
    var $ib = $(".img-block");
    imgDeal($("#ipt-img-1"), $("#ipt-img-1").parents("label").find("img"), function(img64base, f_type) {
        //img64base 已压缩处理
        finallyDone();
    }, showWait);

    function addIpt() {
        count++;
        if(count > max_img_count){
            return;
        }
        var _html = '<label for="ipt-img-'+ count +'"><div class="w140 h140 fl ml20"><img class="w140 h140 object-fit-cover" src="img/store_goods_img_upload.png"><input id="ipt-img-'+ count +'" class="ipt-img dn" type="file" capture="camera" accept="image/*"/></div></label>';
        $(_html).appendTo(".img-block");
        imgDeal($("#ipt-img-" + count), $("#ipt-img-" + count).parents("label").find("img"), function(img64base, f_type) {
            finallyDone();
        }, showWait);
    }

    function finallyDone() {
        var $ipt = $ib.find("input");
        var l = $ipt.length
        if($ipt[l-1].files[0]){
            addIpt();
        }
        hideWait();
    }
}
function showWait() {
    $(".waiting").show();
}
function hideWait() {
    $(".waiting").hide();
}
// 发表按钮
function buildSend() {
    $(".send-btn").on("click", function() {
        var c = $(".send-btn").attr("my-code");
        // c为评分 0-1为好评  2为中评 3-4为差评
    });
}