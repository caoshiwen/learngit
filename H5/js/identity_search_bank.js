$(function() {
    var parent = window.parent;
    initFn();


});

function initFn(){
    switch(window.parent.bank_flag) {
        case "bank_name": bankNameFn();break;
        case "bank_name_de": bankNameDeFn();break;
        default: break;
    }

    $(".bank-item").on("click", function() {
        console.log(window.parent);
        window.callbackFn($.trim($(this).html()));
        // $(window.parent.document).find("iframe").hide();
    });

    if(window.parent) {
        $(".cancel").on("click", function() {
            // $(window.parent.document).find("iframe").hide();
            window.parent.hideIframe();
        });
    }
} 

function bankNameFn() {

}

function bankNameDeFn() {

}


