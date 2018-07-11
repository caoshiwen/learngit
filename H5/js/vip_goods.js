$(function() {
    $('#full_feature').swipeslider({
        transitionDuration: 500,
        autoPlayTimeout: 6000
    });
    $(".find-help").on("click", function() {
        $(".help-btns").toggleClass("active");
    });
    //显示 隐藏
    $(".hide-choose").on("click", function() {
        animateChoose(-1);
        if(checkChoose()) {
            $(".show-choose-show").html("已选："+$(".all-type-show").html())
            animateChoose(-1);
        }
    });
    $(".show-choose-btn").on("click", function() {
        chooseTypeShow(false);
        animateChoose(0);
    });
    //商品页 立即购买
    $(".buy-now-out-btn").on("click", function() {
        if(checkChoose()){
            buyFn();
        }else{
           chooseTypeShow(true);
            animateChoose(0); 
        }
        
    })
    //类型选择页 立即购买
    $(".buy-now").on("click", function() {
        if(checkChoose()) {
            //购买请求
            buyFn();
        }else{
            bottomTip("请选择型号！");
        }
    })
    //数量
    $(".number-minus").on("click.minus", changeNumMinus);
    $(".number-add").on("click.add",changeNumAdd);

    // 各型号
    $(".type").each(typeChoose);

    //确认选择
    $(".choose-sure").on("click", function() {
        if(checkChoose()) {
            $(".show-choose-show").html("已选："+$(".all-type-show").html())
            animateChoose(-1);
        }else{
            bottomTip("请选择型号！");
        }
    });

    // $(".type-choose").on("touchmove",function(e) {
    //     e.preventDefault();
    // });



    //分享
    $(".share").on("click", function() {
        $(".share-tip").fadeIn(300);
    });
    $(".show-share-block-btn").on("click", function() {
        var t = $.trim($(".share-block-goods-name").text());
        if(t.length > 24) {
            $(".share-block-goods-name").html(t.slice(0,23)+"...")
        }
        $(".share-tip").fadeOut(300);
        $(".share-block").fadeIn(300);
        creatImgAndSave($(".sec-share-made-img"), $(".save-img"), $(".show-img"));
    });
    $(".share-block .bg").on("click", function() {
        $(".share-block").fadeOut(300);
    });
    $(".share-tip .bg").on("click", function() {
        $(".share-tip").fadeOut(300);
    });
    $(".save-img-btn").on("click", function() {
        bottomTip("请长按图片保存");
        // $(".save-img")[0].click();
        $(".show-img-block").show(); 
    });
    $(".show-img-block").on("click", function() {
        $(this).fadeOut(300);
    });




    // 分享图片
    $(".btn-share-url-to-friend").on("click", function() {
        if(checkPhoneEnvironment()=="wechat") {
            soshm.weixinSharetip();
        }else {

            shareFn($.trim($(".share-block-goods-name").text()), null, $(".save-img").attr("src"));
        }
    });


}); 



function chooseTypeShow(a) {
    if(a) {
        $(".buy-now").show();
        $(".choose-sure").hide();
    }else {
        $(".buy-now").hide();
        $(".choose-sure").show();
    }
}


function animateChoose(b) {
    if(b){
        $(".type-choose").fadeOut(300);
    }else{
        $(".type-choose").fadeIn(300);
    }
    $(".choose-content").animate({
        bottom: b*100 + '%',
        display: b?'none':'block'
    },300);
}


function changeNum(c, max) {
    var $s = $(".number-show");
    var a = parseInt($s.attr("my-value"));
    var b = a + c;
    if(b <= 1) {
        $(".number-minus").addClass("gray").off("click.minus");
    }else if(max && b >= max) {
        $(".number-add").addClass("gray").off("click.add");
    }else {
        $(".number-minus").removeClass("gray").off("click.minus").on("click.minus",changeNumMinus);
        $(".number-add").removeClass("gray").off("click.add").on("click.add", changeNumAdd);
    }
    $s.attr("my-value", b).html(b);
}
function changeNumMinus() {
    changeNum(-1);
}
function changeNumAdd() {
    var max = false;//如果有最大值 换成最大值
    changeNum(1,max);
}


//选择事件
function typeChoose(i,o) {
    var $s = $(o).find(".type-show"),
        $lis = $(o).find("li");
    $lis.on("click", function() {
        $lis.removeClass("active");
        $(this).addClass("active");
        $s.attr("my-value", $(this).html());
        changeAllTypeShow();
    });
}

//显示选项
function changeAllTypeShow() {
    var $s = $(".type-show");
    var types = {},a = "";
    $s.each(function() {
        types[$(this).attr("my-name")] = $(this).attr("my-value")?$(this).attr("my-value"):"";
    });
    $.each(types, function(i, n){
        if(n)
        a+=n+';';
    });
    $(".all-type-show").attr('my-value', JSON.stringify(types)).html(a);
    $(".type-choose .price").html("￥" + getPrice(types).toFixed(2));

}

//获取相应类型价格
function getPrice(types) {
    return 288.00;
}


function checkChoose() {
    var a = $(".all-type-show").attr("my-value");
    var types;
    var r = true;
    if(a) {
        types = JSON.parse(a);
        $.each(types, function(i,n){
            if(!n){
                
                r = false;
                return false;
            } 
        });
    }else {
        r = false;
    }
    return r;
}

function buyFn(){
    console.log(1)
    window.location.href = "vip_goods_buy_now.html";
}






