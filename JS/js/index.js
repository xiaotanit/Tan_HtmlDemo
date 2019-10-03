window.onload = function(){
    //6、限制输入字符为数字，且限制最多两位小数
    //检查输入文本，限制只能为数字并且数字最多带2位小数
    function checkInputText(text){

        var reg = /^(\.*)(\d+)(\.?)(\d{0,2}).*$/g;

        if (reg.test(text)) { //正则匹配通过，提取有效文本
            text = text.replace(reg, '$2$3$4');
        }
        else { //正则匹配不通过，直接清空
            text = '';
        }

        return text;
    }


    //18、顶部菜单吸顶效果
    var webMenu = document.getElementById('webMenu');
    var webMenuTop = webMenu?webMenu.offsetTop:0;

    //楼层特效标签
    var layerMain = $('#layerMain');
    var layerIndex = $('#layerIndex');

    window.onscroll = function(){

        var scrollY = boxClient().top;

        //18、顶部菜单吸顶效果
        if (webMenu){
            // console.log(scrollY + ", " + webMenuTop);

            if (scrollY >= webMenuTop){
                webMenu.style.position = 'fixed';
                webMenu.style.top = '0';
            }
            else{
                webMenu.style.position = 'static';
            }
        }


        //楼层特效监听滚动
        if (layerMain){
            var bodyH = boxClient().height;
            var index = parseInt(scrollY/bodyH);
            for (var i = 0; i < layerIndex.children.length;i++){
                layerIndex.children[i].className = '';
            }

            console.log("楼层特效。index:。", index + ", bodyH: "+bodyH +", scrollY:" + scrollY)
            layerIndex.children[index].className = 'current';

            if (scrollY <= 0){
                clearInterval(layerMain.timer);
            }
        }
    }


    //19、选中文字分享到新浪微博
    if ($(".wordShare").length){
        var wordShare = document.getElementsByClassName('wordShare')[0];
        var selectWord = document.getElementsByClassName('selectWord')[0];
        var shareBtn = document.getElementsByClassName('shareBtn')[0];
        var selectText = '';

        //监听鼠标抬起的动作，说明文字选中停止
        wordShare.onmouseup = function(e){
            var e = e || window.event;

            if (window.getSelection){ //说明支持这个函数
                selectText = window.getSelection().toString(); //当前选中的文字
            }
            else{ //IE系列
                selectText = document.selection.createRange().text;
            }

            if (selectText.length){
                selectWord.innerHTML = selectText;
                selectWord.style.display = 'block';

                var left = wordShare.offsetWidth + wordShare.offsetLeft;
                selectWord.style.left = left + "px";
                selectWord.style.top = e.offsetY + 'px';
                shareBtn.style.display = 'block';
                shareBtn.style.left = (left + wordShare.offsetWidth +20) + "px";
                shareBtn.style.top = e.offsetY + "px";
                shareBtn.style.display = 'block';
            }
            else{
                selectWord.style.display = 'none';
            }

            // console.log("....来了。。。", selectText)
        }
    }


    //监听点击了新浪微博按钮
    document.onmousedown = function(e){

        var e = e || window.event;

        // 2.1 获取点击区域的ID
        var targetId = e.target ? e.target.className : e.srcElement.className;

        if (targetId == 'shareBtn'){ //表示点击了新浪微博按钮
            window.location.href = 'http://v.t.sina.com.cn/share/share.php?searchPic=false&title=' + selectText + '&url=https://github.com/xuanzhihua';
        }

        if ($(".shareBtn").length){
            $(".shareBtn")[0].style.display = 'none';
            $(".selectWord")[0].style.display = 'none';

            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        }

    }


    //20、移动动画
    var moveContainer = $("#moveContainer");
    if (moveContainer){
        document.getElementById('moveBtnRight').onmousedown = function(e){
            //向右移动
            changeOffsetLeft(moveContainer, 1000, 500, true);
        }
        document.getElementById('moveBtnLeft').onmousedown = function(e){
            //向左移动
            changeOffsetLeft(moveContainer, 1000, 500, false);
        }
        //移动动画函数  ele=移动的标签，maxValue=最大值，speed=速度（每秒的移动的距离）,dir=方向（true=右，false=左）
        function changeOffsetLeft(ele, maxValue, speed, dir){
            clearInterval(ele.timer); //清除计时器

            var unit = 20, unitSpeed = speed * unit / 1000; //多少毫秒变化一次
            ele.timer = setInterval(function(){

                var left = ele.offsetLeft + unitSpeed * (dir?1:-1);
                ele.style.left = left + "px";

                if (Math.abs(left) >= Math.abs(maxValue)){
                    clearInterval(ele.timer);

                    //临界值的处理
                    ele.style.left = (dir?Math.abs(maxValue):Math.abs(maxValue)*-1) + "px";
                }

            }, unit);
        }
    }


    /* 21、无限轮播 （实现原理：复制原图片列表的第一张图片，追加到最后一个元素，起个过渡作用。）
                    假如有4张图片，复制第一张追加到最后，则一共有5张图片。当轮播到第四张图片时，图片索引由3变成0, 最后一张图片起过渡作用，这样循环轮播看起来很和谐
    */
    if ($("#lunBo")){
        initLunBoInfo();

        function initLunBoInfo(){
            var lunBo = document.getElementById('lunBo');
            var lunBoList = document.getElementById('lunBoList');
            var lunBoIcon = document.getElementById('lunBoIcon');
            var lunBoW = lunBo.offsetWidth, lbList = lunBoList.children, iconIndex = 0;

            console.log('lunboW: ', lunBoW);

            //1、添加icon
            for (var i = 0; i < lbList.length; i++){
                var li = document.createElement('li');
                li.setAttribute('index', i);
                if (i== 0){
                    li.setAttribute('class', 'current');
                }
                lunBoIcon.appendChild(li);

                li.onmouseover = function(){
                    clearInterval(lunBoList.timer); //停止轮播
                    var list = lunBoIcon.children;
                    for (var j = 0; j < list.length; j++){
                        list[j].setAttribute('class', '');
                    }
                    this.setAttribute('class', 'current');

                    iconIndex = parseInt(this.getAttribute('index'));
                    lunBoList.style.left = -lunBoW*iconIndex + "px";
                }
                //开始轮播
                li.onmouseout = function(){
                    setLunBoInterval();
                }
            }

            //2、添加最后一个li
            var lastLi = lbList[0].cloneNode(true);
            lunBoList.appendChild(lastLi);
            var iconList = lunBoIcon.children, imgList = lunBoList.children;

            //3、设置时钟器
            setLunBoInterval();

            //4、设置图片悬浮停止和离开继续轮播效果
            for (var i = 0; i < imgList.length;i++){
                imgList[i].onmouseover = function(){
                    clearInterval(lunBoList.timer);
                }

                imgList[i].onmouseout = function(){
                    setLunBoInterval();
                }
            }

            function setLunBoInterval(){

                clearInterval(lunBoList.timer);

                lunBoList.timer = setInterval(function(){

                    lunBoList.style.left = -lunBoW*iconIndex + "px";
                    setIcon();

                    iconIndex++;
                    if (iconIndex > imgList.length-2){
                        iconIndex = 0;
                    }

                }, 1000);
            }

            //设置icon
            function setIcon(){
                var list = lunBoIcon.children;
                for (var j = 0; j < list.length; j++){
                    list[j].setAttribute('class', '');
                }

                if (iconIndex < list.length){
                    list[iconIndex].setAttribute('class', 'current');
                }
            }
        }
    }


    //22、获取css属性
    if($("#box22")){
        $("#box22").onclick = function(){
            var obj = this;
            var str = 'width: '+ getStyleVal(obj, 'width') + ", height: "
                + getStyleVal(obj, 'height') +", color: " + getStyleVal(obj, 'color') +
                ", fontSize: " + getStyleVal(obj, 'fontSize') + ", backgroundColor: "
                +getStyleVal(obj, 'backgroundColor') +", textAlign: " +
                getStyleVal(obj, 'textAlign')+ ", border: " + getStyleVal(obj, 'border')
                +", padding: " +getStyleVal(obj, 'padding') +", margin: "
                +getStyleVal(obj, 'margin');

            document.getElementById('showCssInfo').innerHTML = str;

            console.log(str);
            console.log(obj.style.width + ", " + obj.style.height +"," +obj.style.color +","  +obj.style.fontSize +", " + obj.style.backgroundColor+", " +
                obj.style.textAlign +", " + obj.style.border+", "+obj.style.padding +","+obj.style.margin);
        }
    }


    //23、封装动画效果
    var box23btn1 = $('#box23btn1'), box23btn2 = $("#box23btn2");
    if (box23btn1){
        box23btn1.onclick = box23Change, box23btn2.onclick = box23Reset;
        function box23Change(){
            var box = document.getElementsByClassName('box23')[0];
            changeStyle(box, {  width: 500, height: 500, top: -500, left: 1200, opacity: 0.2  }, function(){
                changeStyle(box, {width: 200, height: 200, top: 100, left: 300, opacity: 1})
            })
        }
        function box23Reset(){
            var box = document.getElementsByClassName('box23')[0];
            changeStyle(box, {  width: 100, height: 100, top: 0, left: 0  })
        }
    }


    //24、联动效果
    var box24 = $("#box24"), box24close = $("#box24close");
    if (box24){
        box24close.addEventListener('click', function(){
            changeStyle(box24, {top: 100}, function(){
                changeStyle(box24, {left: -500})
            })
        })
    }


    //25、网易云音乐
    var box25ul = $("#box25ul");
    if (box25ul){
        var subList = box25ul.children;

        for (var i = 0; i<subList.length; i++){
            subList[i].style.backgroundPosition = '0 -' + (i*40) + "px";
            //鼠标悬浮事件
            subList[i].onmouseover = function(){
                var mask = this.getElementsByClassName('mask')[0];
                changeStyle(mask, { top: 0})
                var audio = this.getElementsByTagName('audio')[0];
                audio.play();
                audio.currentTime = 0;
            }
            //鼠标移开事件
            subList[i].onmouseout = function(){
                var mask = this.getElementsByClassName('mask')[0];
                changeStyle(mask, { top: 40 })
            }
        }
    }


    //26、网易轮播图
    if ($("#box26")){
        var box26 = $("#box26"), box26main = $("#box26main"),box26arrow = $("#box26arrow"), box26pointer = $("#box26pointer");
        var imgs = box26main.children, boxW = box26.clientWidth, currentIndex = 0, box26timer = null;

        //1、创建指示器
        for (let i = 0; i < imgs.length; i++){
            var span = document.createElement('span');
            span.setAttribute('index', i);
            if (i == 0){
                span.className = 'current';
            }
            box26pointer.appendChild(span);

            //设置点击事件
            span.onmousedown = clickIcon;
        }

        //设置左右箭头点击事件
        for (let i = 0; i < box26arrow.children.length; i++){
            box26arrow.children[i].onmousedown = clickIcon;
        }

        //2、让图片自动轮播起来
        changeStyle(imgs[currentIndex], { left: 0 }); //第一张图片展示
        //展示逻辑：当前图片展示，下一张图片马上放到当前图片的右侧
        clearInterval(box26timer);
        box26timer = setInterval(box26Lunbo, 1000);

        function box26Lunbo(){
            changeStyle(imgs[currentIndex], { left: -boxW })
            currentIndex++;
            if (currentIndex >  imgs.length-1){
                currentIndex = 0;
            }
            imgs[currentIndex].style.left = boxW + "px";
            changeStyle(imgs[currentIndex], { left: 0 });
            changeIndex();
        }

        //改变指示器
        function changeIndex(){
            var list = box26pointer.children;

            for (let i = 0; i< list.length;i++){
                list[i].className = '';
            }
            list[currentIndex].className = 'current';
        }

        //点击事件：指示器和左右箭头
        function clickIcon(){
            console.log(this);

            if (this.className == 'box26leftArrow'){ //点击左边箭头

                changeStyle(imgs[currentIndex], { left: boxW});
                currentIndex--;

                if (currentIndex < 0){
                    currentIndex = imgs.length - 1;
                }
                imgs[currentIndex].style.left = -boxW + "px";
                changeStyle(imgs[currentIndex], { left: 0});
            }
            else if (this.className == 'box26rightArrow'){ //点击右边箭头
                box26Lunbo();
            }
            else{
                var index = parseInt(this.getAttribute('index'));

                if (index > currentIndex){
                    changeStyle(imgs[currentIndex], { left: -boxW});
                    imgs[index].style.left = boxW + 'px';
                }
                else if (index < currentIndex){
                    changeStyle(imgs[currentIndex], { left: boxW});
                    imgs[index].style.left = -boxW + "px";
                }
                currentIndex = index;
                changeStyle(imgs[currentIndex], { left: 0});
            }
            changeIndex();
        }

        //设置鼠标悬浮和离开事件
        box26.onmouseover = function(){
            clearInterval(box26timer);
        }
        box26.onmouseout = function(){
            box26timer = setInterval(box26Lunbo, 1000);
        }
    }

    //监听键盘点击: 25网易云音乐
    document.onkeydown = function(e){
        var e = e || window.event;

        if (box25ul){
            /**
             * 49 - 57 ==> 1-9  49,50,51,52,53,54,55,56,57,
             * 65 - 73 ==> a-i  65,66,67,68,69,70,71,72,73
             */
            var keyCode = e.keyCode, index = 0, isPlay = false;

            if (keyCode >= 49 && keyCode <= 57){
                index = keyCode - 49;
                isPlay = true;
            }
            else if (keyCode >= 65 && keyCode <= 73){
                index = keyCode - 65;
                isPlay = true;
            }

            if (isPlay){
                var obj = box25ul.children[index];
                var audio = obj.getElementsByTagName('audio')[0];
                audio.play();
                audio.currentTime = 0; 
                audio.currentTime = 0;
            }
            
        }
    }


    //27、旋转木马
    var box27 = $("#box27");
    if (box27){
        var styleArr = [
            {width: 800, height: 300, top: 80, left: 200, zIndex: 10, opacity: 1},
            {width: 600, height: 200, top: 40, left: 0, zIndex: 9, opacity: 0.8},
            {width: 400, height: 150, top: 10, left: 50, zIndex: 8, opacity: 0.2},
            {width: 400, height: 150, top: 10, left: 750, zIndex: 8, opacity: 0.2},
            {width: 600, height: 200, top: 40, left: 600, zIndex: 9, opacity: 0.8},
        ];
        var box27main = $("#box27main");
        var liArr = box27main.children;

        //初始化
        function initStyle(){
            for (var i = 0; i< liArr.length; i++){
                changeStyle(liArr[i], styleArr[i]);
            }
        }
        initStyle();


        box27main.onmouseover = function(){
            changeStyle($("#box27arrow"), { opacity: 1 })
        }
        box27main.onmouseout = function(){
            changeStyle($("#box27arrow"), { opacity: 0 })
        }
        $("#box27arrow").onmouseover = function(){
            changeStyle($("#box27arrow"), { opacity: 1 })
        }

        //设置左右箭头的点击事件
        var leftArrow = $(".box27left"), rightArrow = $(".box27right");

        leftArrow.onmousedown = function(){
            var firstStyle = styleArr.shift(); //移除第一个
            styleArr.push(firstStyle); //第一个放到最后
            initStyle();
        }
        rightArrow.onmousedown = function(){
            var lastStyle = styleArr.pop(); //找到最后一个
            styleArr.unshift(lastStyle); //最后一个插入到第一个
            initStyle();
        }
    }

}

//函数封装
/*
 * 1、根据id或类名获取标签对象
 * 参数name中只能包含类名、id名、标签名， 父子级关系用空格拼接，可以多重拼接
 * 比如：name = "#box .box1 .subBox .lastSub"
 */
function $(name){

    var arr = name.trim().split(/ {1,}/);
    var tmpObj = document;

    for (var i = 0; i < arr.length; i++){
        var str = arr[i], eleName = str.substring(1, str.length);

        if (str[0] == '#'){ //id选择器
            tmpObj = document.getElementById(eleName);
        }
        else if (str[0] == '.'){ //类名
            tmpObj = tmpObj.getElementsByClassName(eleName)[0];
        }
        else{
            tmpObj = tmpObj.getElementsByTagName(str)[0];
        }
    }

    return tmpObj;
}

//2、根据css属性名获取属性值
function getStyleVal(obj, atrr){
    if (obj.currentStyle){ //IE和opera
        console.log(11)
        return obj.currentStyle[atrr];
    }
    else {//其他浏览器
        return window.getComputedStyle(obj, null)[atrr];
    }
}

/**
 * 3、样式变化函数封装
 * @param obj 标签对象
 * @param attrJson  需要变化的样式，键值对格式
 * @param fn        回调函数
 */
function changeStyle(obj, attrJson, fn){

    if (!obj) return;

    //1、调用前清理计时器
    clearInterval(obj.timer);

    //2、设置计时器
    obj.timer = setInterval(function () {

        let isFinish = true;  //是否完成所有样式的设置
        let begin = 0, end = 0, speed = 0, target = 0; //开始值, 结束值，步长，目标值
        //2.1 遍历需要设置的样式
        for (var key in attrJson) {

            //2.1.1 计算变化值
            //特别处理
            if (key == 'opacity') {
                begin = parseFloat(getStyleVal(obj, key)) * 100;
                target = attrJson[key] * 100;
            }
            else if (key == 'scrollTop') {
                begin = box.scrollTop;
                target = parseInt(attrJson[key]);
            }
            else {
                begin = parseInt(getStyleVal(obj, key));
                target = attrJson[key];
            }

            speed = (target - begin) * 0.1;
            speed = target > begin ? Math.ceil(speed) : Math.floor(speed); //取整
            end = begin + speed;

            if (key == 'opacity') {
                // w3c的浏览器
                obj.style.opacity = end / 100;
                // ie 浏览器
                obj.style.filter = 'alpha(opacity:' + (begin + speed) + ')';
            }
            else if (key == 'scrollTop') {
                obj.scrollTop = end + "px";
            }
            else if (key == 'zIndex'){
                end = target;
                obj.style.zIndex = target;
            }
            else {
                obj.style[key] = end + "px";
            }

            //2.1.2 是否完成目标
            if (end !== target) {
                isFinish = false;
            }

            // console.log("key:" + key + ", begin:" + begin  +", targeet: " + target);
        }

        if (isFinish) {
            //2.2 完成所有属性设置，停止计时器
            clearInterval(obj.timer);

            //3、如果有回调，调用回调
            if (fn) {
                fn();
            }
        }
        // console.log("...............")
    }, 20)

}

//4、获取页面的宽、高、顶部间距、左边间距
function boxClient(){

    if (window.innerWidth){ //ie9 + 最新的浏览器
        return {
            width: window.innerWidth,
            height: window.innerHeight,
            top: window.pageYOffset,
            left: window.pageXOffset
        }
    }
    else if (document.compatMode == 'CSS1Compat'){ //兼容w3c
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            top: document.documentElement.scrollTop,
            left: document.documentElement.scrollLeft
        }
    }

    return {
        width: document.body.clientWidth,
        height: document.body.clientHeight,
        top: document.body.scrollTop,
        left: document.body.scrollLeft
    }
}
