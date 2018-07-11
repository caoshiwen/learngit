$(function(){
    //选择银行
    $(".bank-select").on("click", function() {
        $(".sec-choose-card").show();
    });

    $(".li-card").on("click", function() {
        $(".li-card").removeClass("active");
        $(this).addClass("active");
        $(".bank-select .bank-name").html($(this).find(".bank-name").html());
        $(".bank-select .bank-logo").attr("src",$(this).find(".bank-logo").attr("src"));
        $(".sec-choose-card").hide();
    });

    $(".art-bg").on("click", function() {
        $(".sec-choose-card").hide();
    });
});