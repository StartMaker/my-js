let store = window.sessionStorage || ( window.UserDataStorage && new UserDataStorage() )|| new cookieStorage();
function myReady(fn){
    //对于现代浏览器
    if(document.addEventListener){
        document.addEventListener("DOMContentLoaded",fn,false);
    }else{
        IEContentLoaded(fn);
    }
    //IE模拟
    function IEContentLoaded(fn){
        var done = false;
        var init = function(){
            if(!done){
                done = ture ;
                fn();
            }
        };
        (function(){
            try{
                //dom树为创建钱出错
                d.documentElement.doScroll('left');
            }catch(e){
                setTimeout(arguments.callee,50);
                return;
            }
            init();
        }());
        //监听document的加载状态
        d.onreadystatechange = function(){
            if(d.readyState == 'complete'){
                d.onreadystatechange = null;
                init();
            }
        }
    }
}
function $(node) {
    let nodeGet = document.querySelectorAll(node);
    if(nodeGet.length === 1){
        return nodeGet[0];
    }
    else {
        return nodeGet;
    }
}