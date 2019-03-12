//事件对象兼容
export const EventUtil = (function () {
    return {
        //获得target对象
        getTarget: function(event){
            // DOM || IE
            return event.target || event.srcElement;
        },
        //获得事件对象
        getEvent: function(event){
            return event ? event : window.event;
        },
        // 添加事件句柄
        addHandler: function(element, type, handler){
            // DOM 2 级事件处理程序
            if (element.addEventListener){
                element.addEventListener(type, handler, false);
            }
            // IE事件处理程序
            else if (element.attachEvent){
                if(type == "contextmenu"){
                    type = "click";
                    document.write("1");
                }
                element.attachEvent("on" + type, handler);
                document.write("1");
            }
            // DOM 0 级事件处理程序
            else{
                element["on" + type] = handler;
            }
        },
        // 取消事件的默认行为
        preventDefault: function(event){
            // DOM
            if (event.preventDefault){
                event.preventDefault();
            }
            // IE
            else {
                event.returnValue = false;
            }
        },
        // 取消事件冒泡
        stopPropagation: function(event){
            // DOM
            if (event.stopPropagation){
                event.stopPropagation();
            }
            // IE
            else {
                event.cancelBubble = true;
            }
        },
        // 移除事件句柄
        removeHandler: function(element, type, handler){
            // DOM 2
            if (element.removeEventListener){
                element.removeEventListener(type, handler, false);
            }
            // IE
            else if (element.detachEvent){
                element.detachEvent("on" + type, handler);
            }
            // DOM 0
            else {
                element["on" + type] = null;
            }
        }
    }
}());

//防抖
export const _anti_shake = function (fn,wait,immediate) {
    let timer;
    let context;
    let arg;
    const later = ()=> setTimeout(() => {
        timer = null;
        if(!immediate){
            fn.apply(context,arg);
            context = arg = null;
        }
    },wait);
    return function (...parmas) {
        if(!timer){
            timer = later();
            if(immediate){
                fn.apply(this,parmas);
            }
            else {
                context = this;
                arg = parmas;
            }
        }
        else {
            clearTimeout(timer);
            timer = later();
        }
    }
};

//节流_按时间
export const _throttle = function (fn,wait) {
    let last_time = 0;
    return function () {
        let now = new Date().getTime();
        let context = this;
        let args;
        args = arguments;
        if(now - last_time >= wait){
            fn.apply(context,args);
            last_time = now;
        }
    }
};

//节流2_计时器
export const _throttle_timer = function (fn,wait) {
    let timer;
    return function () {
        let context = this;
        let args;
        args = arguments;
        if(!timer){
            timer = setTimeout(()=>{
                fn.apply(context,args);
                timer = null;
            },wait);
        }
    }
};

export const myReady = function (fn) {
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
};


