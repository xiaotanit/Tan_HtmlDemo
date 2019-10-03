/**
 * 函数封装 tan add 2019-01-24
 */

/**
 * 获取页面滚动条距离顶部和左边的间距
 * 用法：ScrollMargin().top   ScrollMargin().left
 * @return { top: 0, left: 0 }
 */
function ScrollMargin(){

    if (window.pageYOffset){ //IE9+ 和最新的浏览器
        return { top: window.pageYOffset, left: window.pageXOffset };
    }
    else if(document.compatMode === 'CSS1Compat'){ //开启标准兼容模式（严格模式）
        return { top: document.documentElement.scrollTop, left: document.documentElement.scrollLeft };
    }

    return { top: document.body.scrollTop, left: document.body.scrollLeft };
}


/**
 * 获取标签元素：根据id或类名、标签名
 * 参数name只能包含id名、类名、标签名，父子级关系用空格拼接，可以多重拼接
 * 比如：name = "#box .box1 .subBox .lastSub"
 */
function $(name){

    let arr = name.trim().split(/ {1,}/);
    let tmpEle = document;

    for (var i = 0; i < arr.length; i++){
        let str = arr[i], eleName = str.substring(1, str.length);

        if (str[0] == '#'){ //id选择器
            tmpEle = document.getElementById(eleName);
        }
        else if (str[0] == '.'){ //类选择器
            tmpEle = tmpEle.getElementsByClassName(eleName)[0];
        }
        else{
            tmpEle = tmpEle.getElementsByTagName(str);
        }
    }
    return tmpEle;
}


/**
 * 根据css属性名，返回属性值
 * @param ele=标签元素，key=样式名字
 */
function StyleValue(ele, key){

    if (ele.currentStyle){  // IE和opera
        return ele.currentStyle[key];
    }
    else{ //其他浏览器
        return window.getComputedStyle(ele, null)[key];
    }
}


/**
 * 获取可视区域的宽、高、顶部间距和左边间距
 */
function ClientInfo(){
    var obj = document.body;

    if (window.innerWidth){
        obj = window;
        return { width: obj.innerWidth, height: obj.innerHeight, left: obj.pageXOffset, top: obj.pageYOffset }
    }
    else if (document.compatMode == 'CSS1Compat'){ //兼容w3c
        obj = document.documentElement;
        return { width: obj.clientWidth, height: obj.clientHeight, left: obj.scrollTop, top: obj.scrollLeft }
    }

    return { width: obj.clientWidth, height: obj.clientHeight, left: obj.scrollLeft, top: obj.scrollTop }
}


/**
 * 匀速动画函数
 * @param obj = 标签对象
 * @param target = 目标值
 * @param step = 每次移动的数字
 */
function ConstantSpeedAnimate(obj, target, step){
    //1、清除定时器
    clearInterval(obj.timer);

    //2、设置定时器
    obj.timer = setInterval(function(){
        //2.1、判断方向
        var dir = obj.offsetLeft <= target ? step : -step;

        //2.2、开始动画
        obj.style.left = obj.offsetLeft + dir + 'px';
        if (Math.abs(obj.offsetLeft - target) < step){
            //变化不足step时,说明目标完成，清除定时器
            clearInterval(obj.timer);
            //纠正偏差
            obj.style.left = target + 'px';
        }
    }, 10);
}


/**
 * 缓动动画函数
 * @param obj = 要变化的元素
 * @param json = 需要变化的样式和样式目标值
 * @param fn = 样式完成后的回调函数
 */
function BufferMoveAnimate(obj, json, fn){
    //1、清除定时器
    clearInterval(obj.timer);

    var begin = 0, end = 0; //当前值，目标值

    //2、设置定时器
    obj.timer = setInterval(function(){
        var isOK = false;  //目标是否完成
        //2.1 遍历要变化的样式
        for (var k in json){
            //2.2 获取起始值 和 结束值
            if (k == 'opacity'){ //透明度
                begin = parseInt(parseFloat(StyleValue(obj, k)) * 100);
                end = parseInt(parseFloat(json[k]) *100);
            }
            else if(k == 'scrollTop'){ //滚动到头部
                begin = obj.scrollTop;
                end = parseInt(json[k]);
            }
            else{ //其他情况
                begin = parseInt(StyleValue(obj, k));
                end = parseInt(json[k]);
            }

            //2.3 计算步长 取整
            var step = (end - begin) * 0.2;
            step = step >=0 ? Math.ceil(step) : Math.floor(step);

            //2.4 计算起始位置
            if (k == 'opacity'){
                obj.style.opacity = (begin+step)/100;
                obj.style.filter = 'alpha(opacity=' + (begin+end) +')';//ie
            }
            else if(k == 'scrollTop'){
                obj.scrollTop = begin + step;
            }
            else if(k == 'zIndex'){
                obj.style[k] = json[k];
            }
            else {
                obj.style[k] = begin + step + 'px';
            }

            //2.5 判断是否完成
            if (begin == end){
                isOK = true;
            }
        }

        //3、结束动画
        if (isOK){
            clearInterval(obj.timer);
            //回调
            if (fn){
                fn();
            }
        }

    }, 60)
}


//判断浏览器
function BrowserName(){
    if (navigator.userAgent.indexOf("MSIE") != -1) {
        return "MSIE";
    }
    if (navigator.userAgent.indexOf("Firefox") != -1) {
        return "Firefox";
    }
    if (navigator.userAgent.indexOf("Chrome") != -1) {
        return "Chrome";
    }
    if (navigator.userAgent.indexOf("Safari") != -1) {
        return "Safari";
    }
    if (navigator.userAgent.indexOf("Opera") != -1) {
        return "Opera";
    }
}

export { ScrollMargin, $, StyleValue, ClientInfo, ConstantSpeedAnimate, BufferMoveAnimate }