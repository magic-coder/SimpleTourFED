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

KISSY.add('alert',function(S){
    var $ = S.all;
    function Modal(option,type){
        var _ = this;
        _.type = type;
        var defaultOption = {
            msg : '这里是错误提示',
            title:'这里是标题',
            detail : ['这里是描述'],
            yes : '确定',
            cancel: false,
            yesFun:function(){},
            cancelFun:function(){}
        }
        var o = KISSY.mix(defaultOption,option);
        if(type == 'alert'){
            _.modalContent = '<div class="alert-msg"><div>'+o.msg+'</div></div>'
        }else if(type == 'confirm'){
            _.detail = '';
            _.buttons='';
            _.bg = '<div class="confirm-bg"></div>';
            $.each(o.detail,function(i,item){
                _.detail += '<div class="confirm-detail">'+item+'</div>'
            })
            _.buttons += o.cancel?'<span>'+o.yes+'</span><span>'+o.cancel+'</span>':'<span>'+o.yes+'</span>';
            _.modalContent = '<div class="confirm-content"><div class="confirm-inner"><div class="confirm-title">'+o.title+'</div>'+_.detail+'</div><div class="confirm-buttons">'+_.buttons+'</div></div>';
        }
        _.alert = function(){
            if($('.alert-msg').length == 0){
                _.$modalContent = $(_.modalContent).appendTo('body');
            }else{
                $('.alert-msg').remove();
                _.$modalContent = $(_.modalContent).appendTo('body');
            }
        }
        _.confirm = function(){
            if($('.confirm-content').length == 0){
                _.$modalContent = $(_.modalContent).appendTo('body');
            }else{
                $('.confirm-content').remove();
                _.$modalContent = $(_.modalContent).appendTo('body');
            }
            _.$modalContent.css('marginTop',-_.$modalContent.height()/2);
            $('.confirm-bg').length == 0?$(_.bg).appendTo('body'):false;
        }
        _.open = function(){
            _.type=='alert'?_.alert():_.confirm();
            var clientLeft = _.$modalContent[0].clientLeft;
            _.$modalContent.addClass('in');
            _.type == 'confirm'?$('.confirm-bg').addClass('confirm-bg-visible'):false;
            if(_.type == 'alert'){
                setTimeout(function(){
                    _.close();
                },2000)
            }else{
                _.$modalContent.find('.confirm-buttons span').eq(0).click(function(){
                    o.yesFun();
                    _.close();
                })
                _.$modalContent.find('.confirm-buttons span').eq(1).click(function(){
                    o.cancelFun();
                    _.close();
                })
            }
        }
        _.close = function(){
            _.$modalContent.removeClass('in').addClass('out');
            _.type=='confirm'?$('.confirm-bg').removeClass('confirm-bg-visible'):false;
            var timer = _.type == 'alert'?150:400;
            setTimeout(function(){
                _.$modalContent.remove();
            },timer)
        }
    }
    var alert = {
        alert : function(option){
            var alert = new Modal(option,'alert');
            alert.open();
        },
        confirm : function(option){
            var confirm = new Modal(option,'confirm');
            confirm.open();
        }
    };
    return alert
});
KISSY.add('page',function(S){
    var $ = S.all;
    var page = function (ele,option) {
        new Page(ele,option);
    }
    function Page(ele,option){
        var defaultOption = {
            initIndex : 1 ,//初始化哪一页
            dots : false ,
            router : false ,//router的className
            routerFun : function(){}
        };
        var _ = this;
        _.option = KISSY.mix(defaultOption,option);
        _.ele = $(ele);
        //pages的zepto对象
        _.pages = _.ele.children('.page-wrap').length != 0 ?_.ele.children('.page-wrap') :_.ele.children('.page');
        //当前在哪一页
        _.currentIndex = parseInt(_.option.initIndex-1);
        //最后一页
        _.last = _.ele.children('.page-wrap').length - 1;
        //初始化dots,如果需要使用dot的class请使用page-dot
        if(_.option.dots){
            $('.page-dot').removeClass('active');
            $('.page-dot').item(_.currentIndex).addClass('active');
        }
        $(_.ele.children('.page-wrap').item(_.currentIndex)).addClass('page-current');
        //如果开启路由,则创建history数组
        if(_.option.router){
            var historyArray = [];
            $(_.option.router).on('tap',function(e){
                e.preventDefault();
                e.stopPropagation();
                _.to($(this).attr('href'));
            });
            $('.page-back').on('click',function(){
                _.option.routerFun();
            });
            window.addEventListener('popstate',function(){
                _.back(historyArray[historyArray.length-1].start,historyArray[historyArray.length-1].end)
            })
        }else{
            var startX,endX;
            document.addEventListener('touchstart',function(event){
                startX = event.touches[0].pageX;
                endX = event.touches[0].pageX;
            });
            document.addEventListener('touchmove',function(event){
                event.preventDefault();
                endX = event.touches[0].pageX;
            });
            document.addEventListener('touchend',function(event){
                if(Math.abs(startX-endX)>30 && (startX-endX)>0){
                    _.swipe('left');
                }else if(Math.abs(startX-endX)>30 && (startX-endX)<0){
                    _.swipe('right');
                }
            });
        }
        _.to = function(id){
            var $page = _.pages.filter('.page-current').removeClass('page-current').addClass('center-to-left');
            _.pages.filter(id).addClass('page-current');
            _.pages.filter(id)[0].clientLeft;
            _.pages.filter(id).addClass('right-to-center');
            setTimeout(function(){
                $page.removeClass('center-to-left');
                _.pages.filter(id).removeClass('right-to-center');
            },400);
            history.pushState(id,'','');
            historyArray.push({start:$page,end:_.pages.filter(id)});
        };
        _.back = function(start,end){
            end.removeClass('page-current').addClass('center-to-right');
            start.addClass('page-current');
            start[0].clientLeft;
            start.addClass('left-to-center');
            setTimeout(function(){
                start.removeClass('left-to-center');
                end.removeClass('center-to-right');
            },400);
            historyArray.pop();
        };
        _.swipe = function(dir){
            switch (dir) {
                //左滑事件
                case 'left':
                    if(_.last != _.currentIndex){
                        _.pages.item(_.currentIndex).removeClass('page-current').addClass('center-to-left');
                        _.pages.item(_.currentIndex+1).addClass('page-current');
                        var s = _.currentIndex;
                        if(_.option.dots){
                            $('.page-dot').removeClass('active');
                            $('.page-dot').item(_.currentIndex+1).addClass('active');
                        }
                        _.pages.item(s+1)[0].clientLeft;
                        _.pages.item(s+1).addClass('right-to-center');
                        _.currentIndex += 1;
                        setTimeout(function(){
                            _.pages.item(s).removeClass('center-to-left');
                            _.pages.item(s+1).removeClass('right-to-center');
                        },400)
                    }
                    break;
                //右滑事件
                case 'right':
                    if(_.currentIndex != 0){
                        _.pages.item(_.currentIndex).removeClass('page-current').addClass('center-to-right');
                        _.pages.item(_.currentIndex-1).addClass('page-current');
                        // _.pages.item(_.currentIndex-1).addClass('page-current left-to-center');
                        var s = _.currentIndex;
                        if(_.option.dots){
                            $('.page-dot').removeClass('active');
                            $('.page-dot').item(_.currentIndex-1).addClass('active');
                        }
                        _.pages.item(s-1)[0].clientLeft;
                        _.pages.item(s-1).addClass('left-to-center');
                        _.currentIndex -= 1;
                        setTimeout(function(){
                            _.pages.item(s).removeClass('center-to-right');
                            _.pages.item(s-1).removeClass('left-to-center');
                        },400)
                    }
                    break;
            }
        }
    }
    return  page;
});
KISSY.add('preloader',function(S){
    var $ = S.all;
    function Preloader() {
        this.show = function() {
            var preloaderHtml = '<div class="preloader-overlay"></div>' +
                '<div class="preloader-modal">' +
                '<span class="preloader"></span>' +
                '</div>';
            if ($('.preloader-modal')[0]) return;
            var $preloader = $(preloaderHtml).appendTo('body');
            $preloader.one('.preloader').addClass('preloader-animation');
        };
        this.hide = function() {
            $('.preloader-overlay, .preloader-modal').remove();
        }
    }
    var preloader = {
        show : new Preloader().show,
        hide : new Preloader().hide
    };
    return preloader;
});
