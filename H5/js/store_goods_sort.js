$(function() {
    // 数据请求
    getDate();

});



// 数据请求
function getDate() {
    //页面填充以后 页面初始化
    htmlInit();
}

// 数据填充后 页面初始化
function htmlInit() {
    // 类型点击事件及滚动动画
    var $root = $("html, body");
    var otime;
    $(".type-btn").on("click",function() {
        var href = $.attr(this, 'href');
        var _this = this;
        $root.animate({
            scrollTop: $(href).offset().top
        }, 300, function () {
            // window.location.hash = href;
            var b =$root.scrollTop() >= $root.height() - $(window).height();
            if(b){
                $(".type-btn").removeClass("active");
                $(_this).addClass("active");
            }
        });
        
        return false;
    });
    // 收集各锚点的top -100
    var st = [];
    $(".type-item").each(function(i,n) {
        st.push($(n).offset().top - 100);
    });
    // window 滚动事件监听
    $(window).on("scroll.w", scrollWFn);

    function scrollWFn() {
        var n = findBetween(st, $root.scrollTop());
        $(".type-btn").removeClass("active").eq(n[0]).addClass("active");
    }
}

// 二分查找 a顺序增大 返回前后 
function findBetween(a, n) {
    var start = 0, end = a.length - 1;
    if (a[0] > n) {
        return [0,0];
    }else if(a[end] < n) {
        return [end,end];
    }
    return between(start, end);
    function between(b,c) {
        var m = Math.floor((b + c)/2);
        if(m == b || m == c) {
            return [b,c];
        } else {
            if(n > a[m]) {
                return between(m,c);
            } else if(n < a[m]) {
                return between(b,m);
            } else {
                return [m,m];
            }
        }
    }
}