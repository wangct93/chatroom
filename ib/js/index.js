


$(function(){
    page.init();
});



var page = {
    init:function(){
        this.isLogin();
        this.addEvent();
    },
    isLogin:function(){
        var login = wt.getQueryString('login');
        if(login){
            var panelElem = $('#panelBox')[0];
            this.showControl();
        }
    },
    addEvent:function(){
        var _this = this;
        $('#loginBtn').click(function(){
            var bodyElem = $('#panelBox')[0];
            var targetLeft = bodyElem.offsetWidth;
            var time = 300;
            var dl = targetLeft / (time / 30);
            var timer = setInterval(function(){
                var ol = bodyElem.scrollLeft;
                ol += dl;
                if(ol > targetLeft){
                    ol = targetLeft;
                    clearInterval(timer);
                    _this.showControl();
                }
                bodyElem.scrollLeft = ol;
            },30)
        });
        $('.control-icon').mouseenter(function(e){
            $(this).parent().addClass('xz');
        }).mouseleave(function(){
            $(this).parent().removeClass('xz');
        });
    },
    showControl:function(){
        $('#loginPanel').hide();
        $('#panelBox')[0].scrollLeft = 0;
    }
};


var animate = {
    rotete:function(){

    }
}