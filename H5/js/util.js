//金额控制
function onlyNumber(obj) {
    //先把非数字的都替换掉，除了数字和. 
    obj.value = obj.value.replace(/[^\d\.]/g, '');
    //必须保证第一个为数字而不是. 
    obj.value = obj.value.replace(/^\./g, '0.');
    //保证只有出现一个.而没有多个. 
    // obj.value = obj.value.replace(/\.{2,}/g, '.');
    //保证.只出现一次，而不能出现两次以上 
    obj.value = obj.value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
    //只能输入两个小数
    obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
    //12位
    obj.value = obj.value.replace(/(^[\d\.]{9})[\d\.]*$/, '$1');
}





//sessionStorage  - set
function setSessionData(data_name, item_name, item_data) {
    var data_varchar = sessionStorage.getItem(data_name);
    var data_obj = {};
    try {
        data_obj = JSON.parse(data_varchar);
    } catch (e) {
        data_obj = {};
    }
    if (!data_obj) {
        data_obj = {};
    }
    data_obj[item_name] = item_data;

    sessionStorage.setItem(data_name, JSON.stringify(data_obj));
}
//sessionStorage - get
function getSessionData(data_name, item_name) {
    var data_varchar;
    if (data_name in sessionStorage) {
        data_varchar = sessionStorage.getItem(data_name);
    } else {
        data_varchar = "{}";
    }
    var data_obj;
    try {
        data_obj = JSON.parse(data_varchar);
    } catch (e) {
        data_obj = {};
        return "";
    }
    return data_obj[item_name];
}







//返回上一页
function goBack() {
    window.history.back();
}







//设计最小时间
function setDateMinNow($obj, dis_day) {
    var now_date = new Date();
    if (!dis_day) {
        now_date.setDate(now_date.getDate() + dis_day);
    }

    var curr = now_date.getFullYear();
    var currM = now_date.getMonth() + 1;
    currM = currM < 10 ? "0" + currM : currM;
    var currD = now_date.getDate();
    currD = currD < 10 ? "0" + currD : currD;
    var maxdate = curr + "-" + currM + "-" + currD; //maxdate的值为当前系统时间；
    $obj.attr("min", maxdate);
}

//ipt change listen
function iptChangeListen($ipt, fnListen) {
    $ipt.on("change", fnListen);
}
//单个ipt 输入控制btn
function iptChangeListenFn($ipt, $obj, is_remove, class_name) {
    var a = 0;
    try {
        a = parseFloat($ipt.val());
    } catch (e) {
        $ipt.val("");
        if (!is_remove) {
            $obj.removeClass(class_name);
        } else {
            $obj.addClass(class_name);
        }
    }
    if (is_remove && a > 0) {
        $obj.removeClass(class_name);
    } else {
        $obj.addClass(class_name);
    }

}









//ios控制
function changeIptCaptureForIOS() {
    var file = document.querySelector('input');
    if (checkIOS()) {
        file.removeAttribute("capture");
    }
}

function checkIOS() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/iPhone\sOS/i) == "iphone os") {
        return true;
    } else {
        return false;
    }
}





//图片处理
function imgDeal($ipt, $img, fnChange, fnStart) {
    $ipt.on("change", function() {
        if(fnStart) fnStart();
        imgRead(this, $img, fnChange);
    });
}

function imgRead(ipt, $img, fnChange, $progress) {
    var maxsize = 200 * 1024;
    if (!ipt.files.length) {
        alert("请选择上传照片。");
        return;
    }
    var file = ipt.files[0];
    if (!/\/(?:jpg|jpeg|png|gif)/i.test(file.type)) {
        alert("请选择照片。");
        return;
    }

    var reader = new FileReader();

    reader.onload = function() {
        var result = this.result;
        var img = new Image();
        //?
        img.src = result;
        // console.log(result); //不是简单的地址
        if (result.length <= maxsize) {
            imgShow(result);
            return;
        }

        if (img.complete) {
            callback();
        } else {
            img.onload = callback;
        }

        function callback() {
            var img_data = imgCompress(img);
            imgShow(img_data);
        }

        function imgShow(img_data) {
            $img.attr("src", img_data);
            img = null;
            //可加载
            fnChange(img_data, file.type, $progress);
        }
    };

    reader.readAsDataURL(file);
}

function imgCompress(img) {
    var initSize = img.src.length;
    var width = img.width;
    var height = img.height;

    var ratio;
    if (ratio = width * height / 4000000 > 1) {
        ratio = Math.sqrt(ratio);
        width /= ratio;
        height /= ratio;
    } else {
        ratio = 1;
    }

    var canvas = $("<canvas></canvas>").get(0),
        t_canvas = $("<canvas></canvas>").get(0);
    canvas.width = width;
    canvas.height = height;

    //铺底色
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    t_ctx = t_canvas.getContext("2d");
    //如果图片像素大于100万则使用瓦片绘制
    var count;
    if (count = width * height / 1000000 > 1) {
        count = ~~(Math.sqrt(count) + 1); //计算要分成多少瓦片

        //计算每块瓦片的宽和高
        var nw = ~~(width / count),
            nh = ~~(height / count);
        t_canvas.width = nw;
        t_canvas.height = nh;
        for (var i = 0; i < count; i++) {
            for (var j = 0; j < count; j++) {
                t_ctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);

                ctx.drawImage(t_canvas, i * nw, j * nh, nw, nh);
            }
        }


    } else {
        ctx.drawImage(img, 0, 0, width, height);
    }

    //进行最小压缩
    var ndata = canvas.toDataURL("image/jpeg", 0.1);

    console.log("压缩前：" + initSize);
    console.log("压缩后：" + ndata.length);
    console.log("压缩率：" + ~~(100 * (initSize - ndata.length) / initSize) + "%");

    t_canvas.width = t_canvas.height = canvas.width = canvas.height = 0;

    return ndata;

}









// <div class="pf b120 w100p tac">
//     <span class="h90 lh90 pl60 pr60 fz26 cffffff pr dib">
//         <div class="w100p h100p bgc000000 op60 pa t0 l0 zi-1 br45"></div>
//         <span>密码修改成功</span>
//     </span>
// </div>

function bottomTip(word) {
    var _html = '<div class="pf b120 w100p tac dn zi20"><span class="h90 lh90 pl60 pr60 fz26 cffffff pr dib"><div class="w100p h100p bgc000000 op60 pa t0 l0 zi-1 br45"></div><span>' + word + '</span></span></div>';
    $(_html).appendTo("body").fadeIn(1000).delay(1000).fadeOut(1000);
}


// <div class="w350 h200 center-by-fixed bgc4d4d4d70 br10 cffffff pt30 zi20">
//     <div class="w100p h80 pr ">
//         <img class="w80 h80 center-by-absolute" src="img/middle_correct_tip.png">
//     </div>
//     <p class="fz26 lh26 mt36 tac">加入购物车成功</p>
// </div>
function middleCorrectTip(word) {
    var _html = '<div class="dn w350 h200 center-by-fixed bgc4d4d4d70 br10 cffffff pt30 zi20"><div class="w100p h80 pr "><img class="w80 h80 center-by-absolute" src="img/middle_correct_tip.png"></div><p class="fz26 lh26 mt36 tac">' + word + '</p></div>';
     $(_html).appendTo("body").fadeIn(1000).delay(1000).fadeOut(1000);
}





// <div class="open-btn fr mt30 active">
//     <div class="open-btn-cir"></div>
//     <div class="open-btn-bg"></div>
// </div>
function buildOpenBtn() {
    $(".open-btn").on("click", function() {

        $(this).toggleClass("active").filter(".active").attr("my-open", true).end().not(".active").attr("my-open", false);
    })
}








//生成图片 及 保存
function creatImgAndSave($dom, $a, $img, in_scale, cbFn) {
    let $canvas = document.createElement("canvas");
    let w = $dom.width(),
        h = $dom.height();
    let scaleBy = in_scale ? in_scale : 2;
    $canvas.width = w * scaleBy;
    $canvas.height = h * scaleBy;
    $canvas.style.width = w + "px";
    $canvas.style.height = h + "px";
    var context = $canvas.getContext("2d");
    context.scale(scaleBy, scaleBy);
    // $(".need-show img").each(function() {
    //     this.crossOrigin = "anonymous";
    // });
    html2canvas($dom.get(0), {
        canvas: $canvas,
        width: w,
        height: h,
        useCORS: true,
        backgroundColor: null
    }).then(function(_canvas) {
        var dataURL = _canvas.toDataURL("image/png");
        // $("body").append(_canvas);
        // console.log(dataURL);
        var time = new Date().getTime() + "";
        $a.attr({
            "href": dataURL,
            "download": time + ".png"
        });
        if($img && $img.length>0){
            $img.attr("src", dataURL);
        }
        // var img = Canvas2Image.convertToImage(_canvas, _canvas.width, _canvas.height);
        // console.log(img.src)
        if(cbFn) {
            cbFn(dataURL);
        }
    });

}







//判断环境
function checkPhoneEnvironment() {
    var userAgent = navigator.userAgent.toLowerCase();
    if(userAgent.match(/MicroMessenger/i)=="micromessenger") {
        return "wechat";
    }else if(userAgent.match(/Alipay/i)=="alipay") {
        return "alipay";
    }else if(userAgent.match(/UCBrowser/i)=="ucbrowser") {
        return "ucbrowser";
    }else if(userAgent.match(/QQ/i)=="qq") {
        return "qq";
    }else {
        return "other";
    }
}


//分享
function shareFn(t, u, p) {
    var a = {};
    var as = ['weixin', 'weibo', 'qzone', 'qq'];
    switch(checkPhoneEnvironment()) {
        case "ucbrowser":
        case "qq":
        case "wechat":
        as = ['weixin', 'weibo', 'qzone', 'qq'];
        break;
        default: as = ['weibo', 'qzone', 'qq'];
        bottomTip("当前浏览器不支持微信分享，请使用uc或qq");
        break;
    }
    a.sites = as;
    a.title = t;
    if(u) {
        a.url = u;
    }
    if(p) {
        a.pic = p;
    }
    soshm.popIn(a);
}



// waiting
    // <div class="waiting pf h100p w100p t0 l0 zi11">
    //     <div class="center-by-absolute w150 h180 br20" style="background-color: rgba(0,0,0,.6);">
    //         <section class="sec-loading header-img-common-loading pr ml34 mt20">
    //             <div class="common-loading">
    //                 <!-- <img src="img/loading.png"> -->
    //                <ul class="">
    //                    <li class="one" style="background-color: #fff"></li>
    //                    <li class="two" style="background-color: #fff"></li>
    //                    <li class="three" style="background-color: #fff"></li>
    //                    <li class="four" style="background-color: #fff"></li>
    //                    <li class="five" style="background-color: #fff"></li>
    //                    <li class="six" style="background-color: #fff"></li>
    //                    <li class="seven" style="background-color: #fff"></li>
    //                    <li class="eight" style="background-color: #fff"></li>
    //                </ul>
    //             </div>
                
    //         </section>
    //         <p class="loading-word fz22 cffffff tac mt30">请稍等</p>
    //     </div>
    // </div>
function middleWaitingInit() {
    var h = '<div class="dn waiting pf h100p w100p t0 l0 zi20"><div class="center-by-absolute w150 h180 br20" style="background-color: rgba(0,0,0,.6);"><section class="sec-loading header-img-common-loading pr ml34 mt20"><div class="common-loading"><ul class=""><li class="one" style="background-color: #fff"></li><li class="two" style="background-color: #fff"></li><li class="three" style="background-color: #fff"></li><li class="four" style="background-color: #fff"></li><li class="five" style="background-color: #fff"></li><li class="six" style="background-color: #fff"></li><li class="seven" style="background-color: #fff"></li><li class="eight" style="background-color: #fff"></li></ul></div></section><p class="loading-word fz22 cffffff tac mt30">请稍等</p></div></div>';
    $(h).appendTo("body");
}






















// 验证
//邮箱验证
function commonEmailCheck(s) {
    var r = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    if (r.test(s)) {
        return true;
    }
    return false;
}