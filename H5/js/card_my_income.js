$(function() {
    // 切换
    buildTab();

    getDate();
});

// 内容切换
function buildTab() {
    $(".tab-btn").on("click", function() {
        $(".tab-btn").removeClass("active");
        $(this).addClass("active");
        $(".tab-content").removeClass("active").eq($(this).index()).addClass("active");

    });
}

// 获取数据
function getDate() {
    // 模拟数据
    var d = [{
        "day": "6-2",
        "value": 6424
    }, {
        "day": "6-3",
        "value": 7324
    }, {
        "day": "6-4",
        "value": 8484
    }, {
        "day": "6-5",
        "value": 6924
    }, {
        "day": "6-6",
        "value": 8494
    }, {
        "day": "6-7",
        "value": 7723
    }, {
        "day": "6-8",
        "value": 8564
    }];
    buildChart("#chart-1", d);
}

function buildChart($canvas, data) {
    var chart = new F2.Chart({
        id: 'chart-1',
        pixelRatio: window.devicePixelRatio
    });

    chart.source(data, {
        value: {
            tickCount: 5,
            min: 0
        },
        day: {
            range: [0, 1]
        }
    });
    chart.tooltip({
        triggerOn: "none"
    });
    chart.axis('day', {
        label: function label(text, index, total) {
            var textCfg = {};
            if (index === 0) {
                textCfg.textAlign = 'left';
            } else if (index === total - 1) {
                textCfg.textAlign = 'right';
            }
            return textCfg;
        }
    });
    chart.axis('value', {
        label: function label(text) {
            var number = parseInt(text);
            var cfg = {};
            if (number > 1000) {
                cfg.text = number / 1000 + "k";
                //cfg.fill = '#F5222D';
            }
            return cfg;
        },
        grid: {
            lineDash: null
        }
    });
    chart.line().position('day*value');
    data.map(function(obj, index) {
        var a = {
            position: [obj.day, obj.value],
            content: obj.value,
            style: {
                textBaseline: 'bottom',
                textAlign: 'center'
            },
            offsetY: -10,

        };
        if(index === 0 ) {
            a.offsetX = 10;
        }
        chart.guide().text(a);
    });
    chart.point().position('day*value').style({
        // stroke: '#fff',
        lineWidth: 1
    });
    chart.render();
}
