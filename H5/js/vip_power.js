$(function() {
    $('#full_feature').swipeslider({
        autoPlay: false,
        afterSlideFn: function(a) {
            var re = 1,
                l = $('.sw-slide').length;
            if(a == l - 1) {
                re = 1;
            }else if(a == 0){
                re = l - 2;
            }else{
                re = a;
            }
            $("#detials").removeClass().addClass("slide-index-"+re);
        }
    });
});