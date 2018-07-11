$(function() {
    changeWordLength();
    $(".nickname").on("keyup", changeWordLength);
});


function changeWordLength() {
    var v = $(".nickname").val(),
        s = $(".name-length");
    if(v.lenght > 12) return false;
    if(v) {
        s.html(v.length);
    } else {
        s.html("0");
    }
}