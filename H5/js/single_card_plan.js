$(function() {
    window.chooseStore = chooseStore;
    // window.max_store = 1;
    $(".art-agree-with-us img").on("click", function() {
        $(this).toggleClass("gray").filter(".gray").attr("src", "img/agree_with_us_gray.png");
        $(this).not(".gray").attr("src", "img/agree_with_us.png");
        // $(".sec-go-next").toggleClass("active");
        changeListen();
    });
    $("#pay-number").add("#stay-number").on("keyup", changeListen);



    //下一步选择
    $(".btn-i-know").on("click", function() {
        $(".sec-warm-prompt").hide();
        $(".sec-go-next a").off("click.stop");
    });

    //商户及地区
    placeSelectBuild(".place", "城市", ".place-show");
    $(".store").on("click", function() {
        $("iframe").slideDown(600);
        $("body").addClass("body-no-scroll");
    });
    $(".title-real-store").on("click", function() {
      $(".art-real-store").toggleClass("active");
    });


    $.date("#start-time");
    $("#start-time").on("change", function() {
      $("#span-start-time").text($(this).val());
      changeListen();
    });
    $.date("#end-time");
    $("#end-time").on("change", function() {
      $("#span-end-time").text($(this).val());
      changeListen();
    });

});


function changeListen() {
    var $_pay = $("#pay-number"),
        $_stay = $("#stay-number"),
        $_img_gray = $(".art-agree-with-us .gray"),
        $_sec_go_next = $(".sec-go-next"),
        $_a_go_next = $(".sec-go-next a");
    if (checkDate() && parseFloat($_pay.val()) > 10 && parseFloat($_stay.val()) > 10 && $_img_gray.length < 1) {
        $(".sec-go-next").addClass("active");
        //
        $(".sec-go-next a").removeAttr("disabled");
    } else {
        $(".sec-go-next").removeClass("active");
        $(".sec-go-next a").attr("disabled", true);
    }

    $_a_go_next.on("click.stop", function(){
        showPrompt();
        return false;
    });
}

function checkDate() {
  var d1 = new Date($("#start-time").val());
  var d2 = new Date($("#end-time").val());
  var n = new Date();
  n = Math.floor(n.getTime() / (1000 * 3600 * 24)) *(1000 * 3600 * 24);

  if(d1 >= d2 || d2.getTime() <= n) {
    bottomTip("请重新选择最后还款日期！")
    return false;
  }else{
    return true;
  }
}

function showPrompt() {
    $(".sec-warm-prompt").show();
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
        wheels: [
                    {data:[
                      {
                          id:'1',
                          value:'浙江',
                          childs:[
                              {id:'1',value:'杭州'},
                              {id:'2',value:'金华'},
                              {id:'3',value:'温州'},
                              {id:'4',value:'宁波'},
                              {id:'5',value:'衢州'}
                          ]
                      },
                      {
                          id:'2',
                          value:'江苏',
                          childs:[
                              {id:'1',value:'合肥'},
                              {id:'2',value:'苏州'},
                          ]
                      },
                      {id:'3',value:'黑龙江'},
                      {id:'4',value:'广东'},
                      {id:'5',value:'广西'},
                      {id:'6',value:'福建'}
                  ]}
                ],
        callback:function(indexArr, data){
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
