$(function() {
    //显示解绑界面
    $(".btn-unbundling-show").on("click", function() {
        $('.sec-unbundling').show();
    });
    //隐藏解绑界面
    $(".btn-unbundling-cancel").on("click", function() {
        $('.sec-unbundling').hide();
    });

    //解绑
    $(".btn-unbundling").on("click", function() {
        unbundlingAjax();
        successFn();
        $('.sec-unbundling').hide();


    });
});


function unbundlingAjax() {

}

function successFn() {
    $(".sec-unbundling-success").fadeIn().delay(1000).fadeOut(1000);
}