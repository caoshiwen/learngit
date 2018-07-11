$(function() {
    initHtml();
});

function initHtml() {
        //同意协议
    $("#agree-with-us").on("click", function() {
        $(this).toggleClass("not-agree").filter(".not-agree").attr("src", "img/agree_with_us_gray.png");
        $(this).not(".not-agree").attr("src", "img/agree_with_us.png");
        checkChangeFn();
    });

    //保障金额选择
    placeSelectBuild(".show-choose-number", "保障金额", ".number-show", []);

    //初始化生效日期
    initStartDate();

    // 
    $(".cancel-btn").on("click", function() {
        $(".yes-block").fadeOut(300);
    })

    $(".show-yes-btn").on("click", function() {
        $(".yes-block").fadeIn(300);
    });
}

function checkChangeFn() {
    if ($(".not-agree").length) {
        $(".show-yes-btn").addClass("gray");
    } else {
        $(".show-yes-btn").removeClass("gray");
    }
}

//保障金额选择
function placeSelectBuild(trigger, title, show, d) {
    d = [{
        id: '1',
        value: '1万元',
        price: '1.00'

    }, {
        id: '2',
        value: '2万元',
        price: '2.00'
    }, {
        id: '3',
        value: '3万元',
        price: '3.00'
    }, {
        id: '4',
        value: '4万元',
        price: '4.00'
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
            console.log(d[indexArr].price);
            $(".price-show").text("￥"+d[indexArr].price);
        }
    });
}

//初始化生效日期
function initStartDate() {
    var now = new Date();
    var y = (now.getYear()+1900),
        m = (now.getMonth()+1),
        d = (now.getDay()+1);
    var s = y+"-"+(m<10? "0"+ m:m)+"-"+(d<10? "0"+ d:d);
    $(".start-day").text(s);
}

