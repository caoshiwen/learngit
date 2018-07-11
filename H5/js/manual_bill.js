$(function() {
    dateSelectBuild(".art-order-date", "出账日", ".order-date");
    dateSelectBuild(".art-pay-date", "还款日", ".pay-date");


    $(".need-check-ipt").on({
        "change": checkChangeFn,
        "keyup": checkChangeFn
    });


});

function dateSelectBuild(trigger, title, show) {
    var mobileSelect = new MobileSelect({
        trigger: trigger,
        title: title,
        triggerDisplayData: false,
        wheels: [
                    {data:[
                        {id:'1',value:'1号'},
                        {id:'2',value:'2号'},
                        {id:'3',value:'3号'},
                        {id:'4',value:'4号'},
                        {id:'5',value:'5号'},
                        {id:'6',value:'6号'},
                        {id:'7',value:'7号'},
                        {id:'8',value:'8号'},
                        {id:'9',value:'9号'},
                        {id:'10',value:'10号'},
                        {id:'11',value:'11号'},
                        {id:'12',value:'12号'},
                        {id:'13',value:'13号'},
                        {id:'14',value:'14号'},
                        {id:'15',value:'15号'},
                        {id:'16',value:'16号'},
                        {id:'17',value:'17号'},
                        {id:'18',value:'18号'},
                        {id:'19',value:'19号'},
                        {id:'20',value:'20号'},
                        {id:'21',value:'21号'},
                        {id:'22',value:'22号'},
                        {id:'23',value:'23号'},
                        {id:'24',value:'24号'},
                        {id:'25',value:'25号'},
                        {id:'26',value:'26号'},
                        {id:'27',value:'27号'},
                        {id:'28',value:'28号'},
                        {id:'29',value:'29号'},
                        {id:'30',value:'30号'},
                        {id:'31',value:'31号'}
                    ]}
                ],
        callback:function(indexArr, data){
            $(show).html(data[0].value).attr("my-value", data[0].id);
        } 
    });
}




//输入验证
function checkChangeFn() {
    var re = (checkPrice($(".price").val())) ? true : false;
    if (re) {
        $(".btn-sure-save").removeClass("gray").off("click.stop");
    } else {
        $(".btn-sure-save").addClass("gray").add("click.stop",function() {return false;});
    }
}
//验证金额
function checkPrice(date_val) {
    return date_val?true:false;
}
