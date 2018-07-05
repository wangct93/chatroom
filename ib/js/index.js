


$(function(){
    page.init();
});



var page = {
    init:function(){
        this.addEvent();
    },
    addEvent:function(){
        $('#loginBtn').click(function(){
            var targetLeft = window.innerWidth;
            var bodyElem = $('#panelBox')[0];
            var time = 300;
            var dl = 1366 / (time / 30);
            var timer = setInterval(function(){
                var ol = bodyElem.scrollLeft;
                ol += dl;
                if(ol > targetLeft){
                    ol = targetLeft;
                    clearInterval(timer);
                }
                bodyElem.scrollLeft = ol;
            },30)
        });
        $('.control-icon').mouseenter(function(e){
            $(this).parent().addClass('xz');
        });
        $('.control-cir').mouseleave(function(){
            $(this).parent().removeClass('xz');
        });
    }
};


var animate = {
    rotete:function(){

    }
}