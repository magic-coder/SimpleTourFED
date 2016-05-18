(function($){
    $.fn.sidebar = function(){
        if($('.sidebar').length == 0){
            $('<div class="sidebar"><div class="sidebar-content"><div class="sidebar-title"><div class="left"></div><div class="right">13023451234</div></div>'
            +'<a href="#"><div class="sidebar-item"><div class="left sidebar-index"></div><div class="right">首页</div></div></a>'
            +'<a href="#"><div class="sidebar-item"><div class="left sidebar-order"></div><div class="right">我的订单</div></div></a>'
            +'<a href="#"><div class="sidebar-item"><div class="left sidebar-tourism"></div><div class="right">我的行程</div></div></a>'
            +'<a href="#"><div class="sidebar-item"><div class="left sidebar-admin"></div><div class="right">个人中心</div></div></a>'
            +'</div></div>').appendTo('body');
        }
        $(this).click(function(){
            $('<div class="sidebar-backdrop"></div>').appendTo('body');
            setTimeout(function(){
                $('.sidebar-backdrop').addClass('in');
                $('.sidebar').addClass('sidebar-in sidebar-transition');
            },10)
            $('.sidebar-backdrop').click(function(){
                $('.sidebar-backdrop').removeClass("in");
                $('.sidebar').removeClass('sidebar-in');
                setTimeout(function(){
                    $('.sidebar-backdrop').remove();
                },150)
            })
        })
    }
})(Zepto)
