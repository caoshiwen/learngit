$(function() {
    $(".words-num").html($(".leave-message").val().length);
    $(".leave-message").on("keyup", function() {
        $(".words-num").html($(".leave-message").val().length);
    });
});