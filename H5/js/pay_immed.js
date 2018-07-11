$(function() {
    window.chooseStore = chooseStore;
    window.max_store = 1;
    var single_or_multiple = getSessionData("card", "single_or_multiple");
    checkChangeFn(single_or_multiple);
    //单卡还款和多卡是同一个页面  如下判断多卡
    if (single_or_multiple == "multiple") {
        $(".sec-show-bank").show();
        $(".sec-go-next a").attr("href", "waiting_for_reimbursement.html");
    }
    //隐藏银行卡列表
    $(".sec-choose-card .art-bg").on("click", function() {
        $(".sec-choose-card").hide();
    });
    //显示银行卡列表
    $(".sec-show-bank .art-show-bank").on("click", function() {
        $(".sec-choose-card").show();
    })
    //选择银行卡
    $(".sec-choose-card .li-card").on("click", function() {
        $(".sec-choose-card .li-card").removeClass("active");
        $(this).addClass("active");
        $(".sec-choose-card").hide();
        $(".art-show-bank p").html($(this).find(".bank-name").html());
        checkChangeFn(single_or_multiple);
    })

    $(".ipt-pay-number").on("keyup", function() {
        onlyNumber(this);
        checkChangeFn(single_or_multiple);
    });


    placeSelectBuild(".place", "城市", ".place-show");
    // storeSelectBuild(".store", "商户", ".store-show");
    $(".store").on("click", function() {
        $("iframe").slideDown(600);
        $("body").addClass("body-no-scroll");
    });

    $(".sec-real-store-btn").on("click", function() {
        $(".sec-real-store").toggleClass("dn");
        $(".sec-real-store-btn").toggleClass("active");
    });
});


//输入验证
function checkChangeFn(single_or_multiple) {
    var re = (checkPrice($(".ipt-pay-number").val())) ? true : false;
    if (single_or_multiple == "multiple") {
        re = $(".sec-choose-card .li-card.active").length > 0 && re ? true : false;
    }
    if (re) {
        $(".sec-go-next a").removeClass("gray").off("click.stop");
    } else {
        $(".sec-go-next a").addClass("gray").on("click.stop", function() {
            return false;
        });
    }
}
//验证金额
function checkPrice(date_val) {
    return date_val ? true : false;
}
function chooseStore() {
    var $ifr = $("iframe");
    $ifr.slideUp(600);
    $("body").removeClass("body-no-scroll");
    var c = $ifr[0].contentWindow;
    var a = c.chosen_store;
    var s = a.join(" ");
    $(".store-show").html(s);
}



//地区选项
function placeSelectBuild(trigger, title, show) {
    var mobileSelect = new MobileSelect({
        trigger: trigger,
        title: title,
        triggerDisplayData: false,
        wheels: [{
            data: [{
                id: '1',
                value: '浙江',
                childs: [{
                    id: '1',
                    value: '杭州'
                }, {
                    id: '2',
                    value: '金华'
                }, {
                    id: '3',
                    value: '温州'
                }, {
                    id: '4',
                    value: '宁波'
                }, {
                    id: '5',
                    value: '衢州'
                }]
            }, {
                id: '2',
                value: '江苏',
                childs: [{
                    id: '1',
                    value: '合肥'
                }, {
                    id: '2',
                    value: '苏州'
                }, ]
            }, {
                id: '3',
                value: '黑龙江'
            }, {
                id: '4',
                value: '广东'
            }, {
                id: '5',
                value: '广西'
            }, {
                id: '6',
                value: '福建'
            }]
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

//商户选项
function storeSelectBuild(trigger, title, show) {
    var mobileSelect = new MobileSelect({
        trigger: trigger,
        title: title,
        triggerDisplayData: false,
        wheels: [{
            data: [{
                id: '1',
                value: '麦当劳'
            }, {
                id: '2',
                value: '肯德基'
            }, {
                id: '3',
                value: '德克士'
            }, {
                id: '4',
                value: '商户4'
            }]
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
