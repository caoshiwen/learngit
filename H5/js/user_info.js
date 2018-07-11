$(function() {
    genderSelectBuild(".gender", "性别", ".gender-show");
    placeSelectBuild(".place", "地区", ".place-show");
});
//性别选项
function genderSelectBuild(trigger, title, show) {
    var mobileSelect = new MobileSelect({
        trigger: trigger,
        title: title,
        triggerDisplayData: false,
        wheels: [
                    {data:[
                        {id:'1',value:'男'},
                        {id:'2',value:'女'}
                    ]}
                ],
        callback:function(indexArr, data){
            $(show).html(data[0].value).attr("my-value", data[0].id);
        } 
    });
}

//地区选项
function placeSelectBuild(trigger, title, show) {
    var mobileSelect = new MobileSelect({
        trigger: trigger,
        title: title,
        triggerDisplayData: false,
        wheels: [
                    {data:[
                      {
                          id:'1',
                          value:'浙江',
                          childs:[
                              {id:'1',value:'杭州'},
                              {id:'2',value:'金华'},
                              {id:'3',value:'温州'},
                              {id:'4',value:'宁波'},
                              {id:'5',value:'衢州'}
                          ]
                      },
                      {
                          id:'2',
                          value:'江苏',
                          childs:[
                              {id:'1',value:'合肥'},
                              {id:'2',value:'苏州'},
                          ]
                      },
                      {id:'3',value:'黑龙江'},
                      {id:'4',value:'广东'},
                      {id:'5',value:'广西'},
                      {id:'6',value:'福建'}
                  ]}
                ],
        callback:function(indexArr, data){
            var v = "";
            var mv = "";
            for (var i = 0; i < data.length; i++) {
                v += " " + data[i].value;
                mv += "[" + data[i].id + "]"
            }
            $(show).html(v).attr("my-value", mv);
        } 
    });
}