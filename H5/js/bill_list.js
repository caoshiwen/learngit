$(function() {
    $(".btn-bill-detial").on("click", function() {
        $(".bill-content").removeClass("active");
    });
    $(".btn-pay-order").on("click", function() {
        $(".bill-content").addClass("active");
    });
});