$(function() {
    $(".btn-sure").on("click", function(){
        $(".loading").toggleClass("dn");
        setTimeout(function(){
            window.location.href = "plan_list.html";
        },2000);
    });
});