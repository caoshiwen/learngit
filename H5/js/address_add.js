$(function() {
    checkChangeFn();
    $(".clear-address-detial").on("click", function() {
        $("#ipt-address-detial").val("");
        checkChangeFn();
    });

    $(".ipt-need-check").on({
        "change": checkChangeFn,
        "keyup": checkChangeFn
    });
    placeSelectBuild(".place", "地区", ".place-show");

    $(".default-check").on("click", function() {
        $(this).toggleClass("active");
    });
});


//输入验证
function checkChangeFn() {
    var re =  phoneCheck($("#ipt-phone-num").val())
            & personNameCheck($("#ipt-person-name").val())
            & placeCheck()
            & addressDetialCheck();
    if(re) {
        $(".btn-save").removeClass("gray").off("click.stop");
    }else{
        $(".btn-save").addClass("gray").on("click.stop", function(){return false;});
    }
}
//验证手机号
function phoneCheck(phone_val) {
    var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    if (!myreg.test(phone_val)) {
        return false;
    }
    return true;
}
function personNameCheck(val) {
    return val.length > 1 && val.length < 15;
}

function placeCheck() {
    return $(".place-show").attr("my-value") && true;
}

function addressDetialCheck() {
    var val = $("#ipt-address-detial").val();
    if(val.length > 2) {
        $(".clear-address-detial").show();
    }else {
        $(".clear-address-detial").hide();
    }
    return val.length > 2 && val.length < 50;
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