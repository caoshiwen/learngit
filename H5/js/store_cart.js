$(function() {
    //单个商品选择
    $(".check-choose-goods").on("click", function() {
        $(this).toggleClass("active");
        checkChange("child", this);
    });
    //商铺选择
    $(".check-choose-store").on("click", function() {
        $(this).toggleClass("active");
        checkChange("parent", this);
    });
    //全选
    $(".check-choose-all").on("click", function() {
        $(this).toggleClass("active");
        if($(this).filter(".active").length) {
            $(".check-choose").addClass("active");
        }else{
            $(".check-choose").removeClass("active");
        }
        checkChange("");
    });

    //编辑按钮
    $(".edit-btn").on("click", function() {
        $(this).hide();
        $(".edit-sure-btn").show();
        $(".edit-show").show();
        $(".edit-hide").hide();
    });

    //完成按钮
    $(".edit-sure-btn").on("click", function() {
        $(this).hide();
        $(".edit-btn").show();
        $(".edit-show").hide();
        $(".edit-hide").show();

        saveDataChange();
        checkChange("");
    });

    //删除按钮
    $(".del-btn").on("click", function() {
        $(".are-you-sure").show();
    });

    $(".delete-sure").on("click", function() {
        if($(".check-choose-all.active").length > 0) {
            $(".store").remove();
        }else {
            $(".check-choose-store.active").each(function(i,n) {
                $(n).parents(".store").remove();
            });
            $(".check-choose-goods.active").parents(".goods-item").remove();
        }
        $(".check-choose-goods.active");

        $(".are-you-sure").hide();
    });

    //数量
    $(".number-minus").on("click.minus", function() {
        changeNumMinus(this);
    });
    $(".number-add").on("click.add", function() {
        changeNumAdd(this);
    });


    // 各型号
    $(".type").each(typeChoose);
    //显示 隐藏
    $(".hide-choose").on("click", function() {
        animateChoose(-1);
    });
    $(".show-choose-btn").on("click", function() {
        animateChoose(0);
        $(".type-choose")[0].my_goods = $(this).parents(".goods-item");
        //需显示响应商品及已有选择
        showGoodsAndOldChosen();
    });
    //确认选择
    $(".choose-sure").on("click", function() {
        var t = $(".type-choose");
        t[0].my_goods.find(".edit-type").html(t.find(".all-type-show").html());
        animateChoose(-1);
        
    });
});

//选择响应
function checkChange(w, _this) {
    switch(w) {
        case "child": checkParent(_this);break;
        case "parent": checkChildren(_this);break;
        default: break;
    }
    checkAll();
    checkNum();
    checkPrice();
    settleCheck();
    delCheck();
}
//店铺选择响应
function checkParent(_this) {
    var $s = $(_this).parents(".store");
    var $p = $s.find(".check-choose-store");
    if($s.find(".check-choose-goods").length ==$s.find(".check-choose-goods.active").length) {
        $p.addClass("active");
    }else{
        $p.removeClass("active");
    }
}
//商品选择响应
function checkChildren(_this) {
    var $c = $(_this).parents(".store").find(".check-choose-goods");
    if($(_this).is(".active")) {
        $c.addClass("active");
    }else {
        $c.removeClass("active");
    }
}
//全选响应
function checkAll() {
    var $ac = $(".check-choose:not(.check-choose-all)");
    var $a = $(".check-choose-all");
    if($ac.filter(".active").length == $ac.length) {
        $a.addClass("active");
    }else {
        $a.removeClass("active");
    }
}
//选择数量响应
function checkNum() {
    var $n = $(".choose-num");
    var n = $(".check-choose-goods.active").length;
    $n.html(n);

}

//总金额响应
function checkPrice() {
    var a = $(".check-choose-goods.active");
    var b = 0;
    a.each(function(i,n) {
        var $item = $(n).parents(".goods-item");
        var p =  parseFloat($.trim($item.find(".price").text()).substr(1)) 
                * parseInt($.trim($item.find(".number").text()).substr(1));
        b += p;
    });
    $(".total-price").html("￥" + b.toFixed(2));
}

//结算是否可用
function settleCheck() {
    if(parseInt($.trim($(".choose-num").html())) > 0) {
        $(".settle-btn").removeClass("gray");
    }else {
        $(".settle-btn").addClass("gray");
    }
}
//删除是否可用
function delCheck() {
    if(parseInt($.trim($(".choose-num").html())) > 0) {
        $(".del-btn").removeClass("gray");
    }else {
        $(".del-btn").addClass("gray");
    }
}


//数量
function changeNum(c, _this, max) {
    var $s = $(_this).parents(".goods-item").find(".number-show");
    var $m = $(_this).parents(".goods-item").find(".number-minus");
    var $a = $(_this).parents(".goods-item").find(".number-add");
    var a = parseInt($s.attr("my-value"));
    var b = a + c;
    if(b <= 1) {
        $m.addClass("num-gray").off("click.minus");
    }else if(max && b >= max) {
        $a.addClass("num-gray").off("click.add");
    }else {
        $m.removeClass("num-gray").off("click.minus").on("click.minus",function(){
            changeNumMinus(this);
        });
        $a.removeClass("num-gray").off("click.add").on("click.add", function() {
            changeNumAdd(this);
        });
    }
    $s.attr("my-value", b).html(b);
}
function changeNumMinus(_this) {
    changeNum(-1, _this);
}
function changeNumAdd(_this) {
    var max = false;//如果有最大值 换成最大值
    changeNum(1, _this, max);
}



// 完成编辑数据修改
function saveDataChange() {
    // 样式
    // 价格
    // 数量
    $(".goods-item").each(function(i,n) {
        $(n).find(".number").html("x"+$(n).find(".number-show").attr("my-value"));
        $(n).find(".goods-type").html($(n).find(".edit-type").html());
    });

}


// 类型选择动画
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

function showGoodsAndOldChosen() {

}