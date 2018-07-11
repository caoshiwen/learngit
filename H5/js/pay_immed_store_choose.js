$(function() {
    var parent = window.parent;
    $(".store-btn").on("click", function() {
        chooseStore(this);
    });

    $(".store-chosen > div").on("click",function() {
        cancelChoose(this);
    });

    $(".sure").on("click", function() {
        if(parent.chooseStore) {
            parent.chooseStore();
        }
    });
});

function chooseStore(_this) {
    if(window.parent.max_store) {
        console.log(window.parent.max_store)
        if(window.parent.max_store <= $(".store-chosen div").length) {
            bottomTip("本功能商户最多选择"+ window.parent.max_store +"个");
            return;
        }
    }
    var t = $.trim($(_this).text());
    var h = '<div class="fz24 lh24 pt18 pb18 pl34 pr20 bgcf5f5f5 br30 mt26 ml30 fl" my-id="'+$(_this).index()+'"><span class="pr34 fl">'+ t +'</span><img class="w22 h22 fl" src="img/vip_goods_cancel_choose.png"></div>'
    $(h).appendTo(".store-chosen").on("click",function() {
        cancelChoose(this);
    });

    $(_this).addClass("gray");
    checkChosen();
}

function cancelChoose(_this) {
    var a = $(_this).attr("my-id");
    $(_this).remove();
    $(".store-btn").eq(a).removeClass("gray");
    checkChosen();
}

function checkChosen() {
    var c = $(".store-chosen");
    var a = $(".store-chosen div");
    window.chosen_store = [];
    a.each(function(i,_this) {
        window.chosen_store.push($.trim($(_this).text()));
    });
    // console.log(window.chosen_store);
}