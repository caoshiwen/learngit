$(function() {
    htmlInit();
});

function htmlInit() {
    var w = $(".waiting");
    $('#edit-img').cropper({
        aspectRatio: 1,
        viewMode: 2,
        preview: ".show-new-img",
        ready: function(e) {
            // 每次重选图片 会执行一次
            w.fadeOut(300);
        }
    });

    $(".sure-btn").on("click", sureChange);

    $("#ipt-img").on("change", function() {
        w.fadeIn(300);
        var f = $(this)[0].files[0];
        var maxsize = 200 * 1024;
        var reader = new FileReader();
        reader.onload = function(e) {
            var imgf = "";
            var img = new Image();
            img.src = e.target.result;
            if (e.target.result <= maxsize) {
                imgf = e.target.result;
                $("#edit-img").cropper('replace', imgf);
                return;
            }
            if (img.complete) {
                callback();
            } else {
                img.onload = callback;
            }

            function callback() {
                imgf = imgCompress(img);
                $("#edit-img").cropper('replace', imgf);
            }
        }
        reader.readAsDataURL(f);
    });
}


// 确认按钮
function sureChange() {
    //裁剪完成的图片数据 
    var base64url = $("#image").cropper("getCroppedCanvas", {
        width: 160,
        height: 160,
        minWidth: 256,
        minHeight: 256,
        maxWidth: 4096,
        maxHeight: 4096,
        fillColor: "#fff",
        imageSmoothingEnabled: false,
        imageSmoothingQuality: "high",
    });

    // 跳转
    window.location.href = "user_info.html";
}
