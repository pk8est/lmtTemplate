/**
 
 laytpl demo

 */

;!function(){

var win = $(window), demo = {
    win: win,
    hosts: 'http://' + location.host + '/',
    stop: function(e){
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
    }
};

demo.post = function(){
    var downs = $('#downs'), liuyan = $('#liuyan');
    
    //记录下载数
    $('#layDowns').on('click',function(){
        $.get('http://fly.layui.com/api/handle?id=8');
    });
    
    //获取下载数
    if(downs[0]){
        $.get('http://fly.layui.com/api/handle?id=8&type=find', function(res){
            downs.html(res.number);
        }, 'jsonp');
    }
    
    //获取关注次数
    $.get('http://fly.layui.com/api/handle?id=9', function(res){
        $('#sees').html(res.number);
    }, 'jsonp');
};

//窗口scroll
demo.scroll = function(){
    var conf = {
        log: [0, $('.laynav')],
        gotop: $('#laygotop'),
        htbo: $('html, body'),
        fnDemo: $('#fnDemo')
    };
    demo.win.on('scroll', function(){
        var stop = demo.win.scrollTop();
        if(stop >= 300){
            if(!conf.log[0]){
                conf.log[0] = 1;
                conf.log[1].addClass('fixnav');
                conf.gotop.show();
            }
        } else {
            if(conf.log[0]){
                conf.log[0] = 0;
                conf.log[1].removeClass('fixnav');
                conf.gotop.hide();
            }
        }
        stop = null;
    });
    
    //返回顶部
    conf.gotop.on('click',function(){
        conf.htbo.animate({scrollTop : 0},$(this).offset().top/7);
    });
    
    //功能演示滚动
    $('#demoss').on('click',function(e){
        e.preventDefault();
        conf.htbo.animate({scrollTop : conf.fnDemo.offset().top - 50}, 300);
    });
};



demo.run = (function(){
    var log = {
        getdate: $('#getdate'),
        tpl: $('#tpl')
    }, thiskin = 'thiskin';
    demo.post();
    demo.scroll();

    //修饰代码
    $('.codes').each(function(i){
        var othis = $(this);
        othis.laycode({
            title: othis.attr('title') || '对应代码说明',
            height: othis.attr('heg') || 'auto',
            skin: othis.attr('skin') || 0
        });
    });

   
    //假设你得到了这么一段数据
    if(log.getdate[0]){
        var data = new Function(log.getdate.html() + '; return data')();
        
        var render = function(){
            var tpls = log.tpl.val(); //读取模版
            
            //方式一：异步渲染（推荐）
            laytpl(tpls).render(data, function(render){
                $('#view').html(render);
            });
        };
        
        render();
        
        log.tpl.on('blur', function(){
            render();
        });
    }
    
}());

}();