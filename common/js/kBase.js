/**
 * Created by ashbringer on 16/7/5.
 */
KISSY.add('sidebar',function(S){
    var $ = S.all;
    var defaultOption  = {
        className : false,
        tel : '用户'
    } ;
    var init = function (option) {
        var  o = S.mix(defaultOption,option);
        if($('.sidebar').length == 0){
            $('<div class="sidebar"><div class="sidebar-content"><div class="sidebar-title"><div class="left"></div><div class="right" style="font-size: 0.8rem">'+o.tel+'</div></div>'
                +'<div data-href="/mobile/gateway/wechat/home/home" class="sidebar-item"><div class="left sidebar-index"></div><div class="right">首页</div></div>'
                +'<div data-href="/mobile/gateway/wechat/order/order/list" class="sidebar-item"><div class="left sidebar-order"></div><div class="right">我的订单</div></div>'
                +'<div data-href="/mobile/gateway/wechat/tourism/list"  class="sidebar-item"><div class="left sidebar-tourism"></div><div class="right">我的行程</div></div>'
                +'<div data-href="/mobile/gateway/wechat/personal/profile" class="sidebar-item"><div class="left sidebar-admin"></div><div class="right">个人中心</div></div>'
                +'</div></div>').appendTo('body');
            $('.sidebar-content .sidebar-item').on('tap',function(e){
                e.preventDefault();
                location.href = $(this).attr('data-href');
            })
        }
        $(o.className).on('tap',function(){
            $('<div class="sidebar-backdrop"></div>').appendTo('body');
            $('.sidebar-backdrop')[0].clientLeft;
            $('.sidebar-backdrop').addClass('in');
            $('.sidebar').addClass('sidebar-in sidebar-transition');
            $('.sidebar-backdrop').on('tap',function(){
                $('.sidebar-backdrop').removeClass("in");
                $('.sidebar').removeClass('sidebar-in');
                setTimeout(function(){
                    $('.sidebar-backdrop').remove();
                },150)
            })
        });
    };
    return init
});

KISSY.add('test',function(S){

});