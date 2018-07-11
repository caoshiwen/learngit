$(function() {

    middleWaitingInit();
    // buildImg
    buildImg();
    // 发表按钮
    buildSend();

    //保障金额选择
    placeSelectBuild(".show-refund-cause", "退货原因", ".refund-cause", []);

    //212 process 
    processBuild();
});
// 图片上传逻辑
function buildImg() {
    // 图片上传与身份证上传有参数修改  留意util.js （只是给第三个参数fnchange留了 img64base图片数据及f_type文件类型两个数据接口）
    var count = 1;
    var max_img_count = 3;
    imgDeal($("#ipt-img-1"), $("#ipt-img-1").parents("label").find("img"), function(img64base, f_type) {
        //img64base 已压缩处理
        addIpt();
        hideWait();
    }, showWait);

    function addIpt() {
        count++;
        if(count > max_img_count){
            return;
        }
        var _html = '<label for="ipt-img-'+ count +'"><div class="w140 h140 fl ml20"><img class="w140 h140 object-fit-cover" src="img/store_goods_img_upload.png"><input id="ipt-img-'+ count +'" class="ipt-img dn" type="file" capture="camera" accept="image/*"/></div></label>';
        $(_html).appendTo(".img-block");
        imgDeal($("#ipt-img-" + count), $("#ipt-img-" + count).parents("label").find("img"), function(img64base, f_type) {
            addIpt();
            hideWait();
        }, showWait);
    }
}
function showWait() {
    $(".waiting").show();
}
function hideWait() {
    $(".waiting").hide();
}
// 提交按钮
function buildSend() {
    $(".send-btn").on("click", function() {
        //默认原因是其他
    });
}


//原因
function placeSelectBuild(trigger, title, show, d) {
    // 退货原因后台获取
    d = [{
        id: '1',
        value: '不喜欢/效果不好',

    }, {
        id: '2',
        value: '质量问题',

    }, {
        id: '3',
        value: '商品描述不符合',

    }, {
        id: '4',
        value: '尺寸问题',
    },{
        id: '5',
        value: '其他'
    }];
    var mobileSelect = new MobileSelect({
        trigger: trigger,
        title: title,
        triggerDisplayData: false,
        wheels: [{
            data: d
        }],
        callback: function(indexArr, data) {
            var v = "";
            var mv = "";
            for (var i = 0; i < data.length; i++) {
                v += " " + data[i].value;
                mv += "[" + data[i].id + "]"
            }
            $(show).html(v).attr("my-value", mv);
        }
    });
}


function processBuild() {
    $(".process-show-img").ready(function() {
        $(".process-show").addClass("w212");
    })
}
