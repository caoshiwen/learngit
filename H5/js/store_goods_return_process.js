$(function() {

    middleWaitingInit();
    // buildImg
    buildImg();
    //check input
    checkBuild();
    // 发表按钮
    buildSend();

    //保障金额选择
    placeSelectBuild(".show-return-courier", "快递公司", ".return-courier", []);

    //212 process 
    // processBuild(1);

    //2.1商家审核  第2个参数为 退款申请提交时间  第3个参数为完成审核最长天数
    // processBuild(2.1, "2018-07-05 15:07", 3);

    //2.4 商家拒绝 第2个参数为未同意原因
    // processBuild(2.4, "该商品不退不换");

    //3.1填写运单号（7天以内）第2个参数为 申请提交时间  第3个参数为完成提交最长天数
    // processBuild(3.1, "2018-07-05 15:07", 7);

    //3.2等待商家收获验货（10天以内）
    //第2个参数为 申请提交时间  第3个参数为等待最长天数 第四个参数为快递公司名称
    //第五个参数为快递填写时间
    // processBuild(3.2, "2018-07-05 15:07", 10, "韵达快递", "2018-07-05 15:07");

    //3.31超时未填写
    // processBuild(3.31);

    // 3.32 商家验货后拒绝退货 拒绝原因
    // processBuild(3.32, "寄回商品已损坏");

    //3.33商家未收到或未处理，请联系物流及商家
    // processBuild(3.33);

    //3.34验货成功，等待退款
    // processBuild(3.34);

    // 4退款成功
    processBuild(4);


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

//输入验证
function checkBuild() {
    $(".ipt-need-check").on("keyup", function() {
        if(check()) {
            $(".send-btn").removeClass("gray");
        }else{
            $(".send-btn").addClass("gray");
        }
    });
}
function check() {
    var r = /^[0-9]$/;
    var v = $(".ipt-need-check").val();
    return v && r.test(v);
}

// 发表按钮
function buildSend() {
    $(".send-btn").on("click", function() {

    });
}


//原因
function placeSelectBuild(trigger, title, show, d) {
    d = [{
        id: '1',
        value: '韵达快递',

    }, {
        id: '2',
        value: '顺风快递',

    }, {
        id: '3',
        value: '中通快递',

    }, {
        id: '4',
        value: '圆通快递',
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

// 参数为进度
//1 w294
//2为商家审核 w452 如果状态为2.1  第2个参数为 退款申请提交时间  第3个参数为完成审核最长天数
//2.2 审核成功
//2.3 商家未处理 审核成功
//2.4 商家拒绝 第2个参数为未同意原因
//3为商品寄回 
//3.1填写运单号（7天以内）
//3.2等待商家收获验货（10天以内）
//3.3寄回失败
//3.31超时未填写
//3.32商家验证拒绝退货（原地址寄回）
//3.33商家未收到或未处理，请联系物流及商家
//3.34验货成功，等待退款
//4为完成退款 w750
function processBuild(p) {
    console.log(arguments)
    var a = arguments;
    $(".process-show-img").ready(imgReady);
    function imgReady() {
        var ac = ""
        switch(p) {
            case 1: 
            ac = "w212";
            $(".process-word-1").show();
            break;
            case 2.1: 
            var $p2 = $(".process-word-2-1");
            finallyTimeLess($p2, a[1], a[2]);
            $p2.show();
            ac = "w370";
            break;
            case 2.4: 
            $(".process-word-2-4").show();
            $(".process-word-2-4 .refuse-cause").text(other1);
            ac = "w370";
            break;
            case 3.1: 
            var $p31 = $(".process-word-3-1");
            finallyTimeLess($p31, a[1], a[2]);
            $p31.show();
            ac = "w528";
            break;
            case 3.2: 
            var $p32 = $(".process-word-3-2");
            finallyTimeLess($p32, a[1], a[2]);
            $p32.find(".logistics-name").text(a[3]);
            $p32.find(".logistics-in-time").text(a[4]);
            $p32.show();
            ac = "w528";
            break;
            case 3.31: 
            var $p331 = $(".process-word-3-3-1");
            $p331.show();
            ac = "w528";
            break;
            case 3.32: 
            var $p332 = $(".process-word-3-3-2");
            $p332.find(".refuse-cause").text(a[1]);
            $p332.show();
            ac = "w528";
            break;
            case 3.33: 
            var $p333 = $(".process-word-3-3-3");
            $p333.show();
            ac = "w528";
            break;
            case 3.34: 
            var $p334 = $(".process-word-3-3-4");
            $p334.show();
            ac = "w528";
            break;
            case 4: 
            $(".process-word-4").show();
            ac = "w750";
            break;
        }
        $(".process-show").addClass(ac);
    }
}


// 订单剩余时间
function finallyTimeLess($p, s ,max_day) {
    var d1 = new Date(s);
    var $h = $p.find(".hour"),
        $m = $p.find(".minute"),
        $d = $p.find(".day");
    intFn();
    var o = setInterval(intFn, 5000);
    function intFn() {
        
            var nt = new Date();
            var t = nt - d1;
            var lt = max_day*24*3600*1000 - t;
            if(lt < 0) {
                
                clearInterval(o);
                window.location.reload();
                return;
            }
            $h.html(Math.floor((lt / 1000 / 3600) % 24));
            $m.html(Math.floor((lt / 1000 % 3600) / 60));
            $d.html(Math.floor((lt / 1000 / 3600) / 24));
        
    }
    
}
