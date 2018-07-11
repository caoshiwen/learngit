$(function() {

    $(".detial-message").on("input prototypechange", function() {
        $(".words-num").html($(".detial-message").val().length);
    });
    middleWaitingInit();
    // buildImg
    buildImg("show",6);
    buildImg("detial",10);
    // 发表按钮
    buildSend();
});

// 图片上传逻辑
function buildImg(def,max) {
    var count = 1;
    var max_img_count = max;
    var $ib = $(".img-block-"+def)
    var $ipi_1 = $("#ipt-img-"+def+"-1");
    var $label_1 = $ipi_1.parents("label");
    imgDeal($ipi_1, $label_1.find("img"), function(img64base, f_type) {
        //img64base 已压缩处理

        //隐藏img-block-bg
        $(".img-block-bg-"+def).hide();
        // 首次显示图片上传列表
        $ib.show();
        // 加载完图片以后 隐藏loading以及添加删除使劲啊
        finallyDone($label_1);
        
    }, showWait);
    // 添加新的
    function addIpt() {
        count++;
        if(count > max_img_count){
            return;
        }
        var _html = '<div class="w140 h140 fl ml20 pr"><label for="ipt-img-'+def+'-'+ count +'"><img class="w140 h140 object-fit-cover" src="img/store_goods_img_upload.png"><input id="ipt-img-'+def+'-'+ count +'" class="ipt-img dn" type="file" capture="camera" accept="image/*"/></label><img src="img/vip_power_release_goods_cancel_img.png" class="w30 pa t0 r0 cancel_img dn"></div>';
        $(_html).appendTo(".img-block-"+def);
        var $ipi_c = $("#ipt-img-"+def+"-"+ count);
        var $label = $ipi_c.parents("label");

        imgDeal($ipi_c, $label.find("img"), function(img64base, f_type) {
            finallyDone($label);
        }, showWait);
    }
    // 加载完图片以后 隐藏loading以及添加删除使劲啊
    function finallyDone($label) {
        var $p = $label.parent("div");
        // 删除按钮点击事件
        $p.find(".cancel_img").show().on("click", function() {
            $p.remove();
            count = $ib.find("input").length;
            // 如果只剩最后一个input 则隐藏图片列表
            if(count == 1){
                $(".img-block-bg-"+def).show();
                $ib.hide();
            }
            // 删除以后还要进行class 修改
            $(".img-block-"+def+">div").each(function(i,dom){
                var $dl = $(dom).find("label");
                var $dipt = $dl.find("input");
                var _id = "ipt-img-"+def+"-"+(i+1);
                $dl.attr("for", _id);
                $dipt.attr("id",_id);
            });
        });
        var $ipt = $ib.find("input");
        var l = $ipt.length
        if($ipt[l-1].files[0]){
            addIpt();
        }
        hideWait();
        // 适应图片列表长度
        changeImgBlockWidth();
    }
    // 适应图片列表长度
    function changeImgBlockWidth() {
        $ib.css("width",function(){
            var l = $ib.find("label").length;
            return (l * (140 + 20) + 30) / 75 * CARD_DATA.font_size;
        });
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

    });
}