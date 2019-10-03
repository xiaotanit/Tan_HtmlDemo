import { ScrollMargin, $, StyleValue, BufferMoveAnimate } from "./MyFunc.js";

var tabIndex = 0; //默认tab索引为0（0/1/2）
var fallHeightArr = [], fallIndex = 0, fallItemW = 236, fallItemM=20;
// window.onload = function(){

    //1、登录注册时间
    $("#btn_reg").onclick = showLoginLayer;
    $("#btn_login").addEventListener('click', showLoginLayer);
    $("#login_close").addEventListener('click', closeLoginLayer);

    //2、页面滚动监听
    window.onscroll = pageScrollHanler;
    pageScrollHanler();

    bannerChange();  //3、轮播图初始化动作
    changeTab();  //4、tab切换

    //5、瀑布流数据初始化
    waterfallLoad(); //初始化瀑布流数据
    setTimeout(function(){
        updateItemsPosition(); //更新坐标
    }, 1000)

    //6、返回到顶部按钮
    $(".to_top .arrow").addEventListener('click', returnTop);

// }

//页面滚动监听函数
function pageScrollHanler(){
    var scrollTop = ScrollMargin().top;

    //吸顶效果
    if (scrollTop > 180){
        $(".top_nav").style.display = 'block';
    }
    else{
        $(".top_nav").style.display = 'none';
    }
    // console.log("scrollTop: ", scrollTop);

    //返回到顶部按钮隐藏和显示
    if (scrollTop > 100){
        $(".to_top .arrow").style.display = 'block';
    }
    else{
        $(".to_top .arrow").style.display = 'none';
    }

    //瀑布流加载新图片的条件
    if(checkWillLoadImage()){

        if (tabIndex % 2 == 0){
            waterfallLoad(); //瀑布流添加子标签
            setTimeout(function(){
                updateItemsPosition(); //更新坐标
            }, 1000)
        }
        else{
            domPullLoad();            //第二个瀑布流创建子元素
            setTimeout(function(){
                domPullMovePosition();    //第二个瀑布流更新元素坐标位置
            });
        }

    }
}

/**
 * 判断是否具备加载图片的条件
 */
function checkWillLoadImage() {
    // 1. 获取最后一个盒子
    var boxs = [];

    if (tabIndex % 2 == 0){
        boxs = $("#fall_main").getElementsByClassName("fall_item");
    }
    else{
        boxs = $("#dom_pull").getElementsByClassName('box');
    }

    if (boxs.length){
        var lastBox = boxs[boxs.length - 1];

        // 2. 求出最后一个盒子自身高度的一半 + offsetTop
        var lastBoxDis = lastBox.offsetHeight * 0.5 + lastBox.offsetTop;
        // 3. 求出浏览器的高度
        var screenH = document.body.clientHeight || document.documentElement.clientHeight;
        // 4. 求出页面偏离浏览器的高度（页面滚动条的距离）
        var scrollTop = ScrollMargin().top;

        // console.log("<scrollTop: ", scrollTop, ", screenH: ", screenH, ", lastboxdis: ", lastBoxDis)

        return lastBoxDis <= screenH + scrollTop;
    }

    return false;
}


//瀑布流加载数据: 存储最后一行的高度，子元素开始索引，字标签宽度，标签间边距
function waterfallLoad(){
    //1、获取加载数据
    var subArr = getWaterfallData();

    //2、创建子元素追加
    var supereEle = $(".fall_main"), html = '';
    for (var i = 0; i < subArr.length; i++){
        var ele = document.createElement('div');
        ele.setAttribute('class', 'fall_item');
        ele.setAttribute('style', 'position: absolute; left: -1000px;');
        ele.innerHTML =
            '        <div class="item_img"><img src="../img/star/'+subArr[i].imgName+'.jpg"/><div class="cover"></div></div>' +
            '        <div class="item_text">'+subArr[i].text+'</div>' +
            '        <div class="item_suspend">' +
            '             <div class="item_collect">采集</div>' +
            '             <div class="item_star"><span></span></div>' +
            '        </div>';
        supereEle.appendChild(ele);

        ele.onmouseover = waterfallShowSubEle;
        ele.onmouseout = waterefallHideSubEle;

        // html += '<div class="fall_item" onmouseover="waterfallShowSubEle(this)" onmouseout="waterefallHideSubEle(this)">' +
        //     '        <div class="item_img"><img src="../img/star/'+subArr[i].imgName+'.jpg"/></div>' +
        //     '        <div class="item_text">'+subArr[i].text+'</div>' +
        //     '        <div class="item_suspend">' +
        //     '             <div class="item_collect">采花</div>' +
        //     '             <div class="item_star"><span></span></div>' +
        //     '        </div>' +
        //     '    </div>';
    }

    // supereEle.innerHTML = supereEle.innerHTML + html;
}
//更新标签位置
function updateItemsPosition(){

    var cols = $(".waterfall").offsetWidth / (fallItemW + fallItemM); //多少列
    var items = $(".fall_main").getElementsByClassName('fall_item');

    for (var i = fallIndex; i < items.length; i++){

        //第一行，高度存储都为0
        if (i < cols){
            fallHeightArr[i] = 0;
        }

        var boxH = items[i].offsetHeight; //当前盒子的高度
        // var boxH = parseInt(StyleValue(items[i], 'height'));
        var minIndex = getMinIndexByArr(fallHeightArr); //获取当前数组中最小值的索引，当前盒子放在这个索引下面
        var top = fallHeightArr[minIndex], left = minIndex*(fallItemW + fallItemM);

        items[i].style.position = 'absolute';
        items[i].style.top = top + 'px';
        items[i].style.left = left + 'px';
        fallHeightArr[minIndex] = top + (boxH + fallItemM);

        console.log(">>>i: ", i, ", height: ", boxH);
    }

    // 更新父盒子的高度
    // var parentHeight = items[items.length - 1].offsetTop + items[items.length - 1].offsetHeight;
    // $(".fall_main").style.height = parentHeight;

    fallIndex = items.length; //记录最后一个位置变化的元素索引
    console.log("items.length: ", items.length);
}
//找出数组中最小数字的索引
function getMinIndexByArr(arr){
    var index = 0, num = arr[0];
    for (var i = 0; i < arr.length; i++){
        if (num > arr[i]){
            num = arr[i];
            index = i;
        }

    }
    return index;
}

//每次创建随机数据
function getWaterfallData(){
    var arr = [];
    var strs = [
        '你样样都好，样样比她强，你只有一个缺点，你不是她… --- 《天龙八部》',
        '阿朱就是阿朱。 四海列国，千秋万代，就只有一个阿朱 --- 《天龙八部》',
        '焚我残躯，熊熊圣火，生亦何欢，死亦何苦？为善除恶，唯光明故。喜乐悲愁，皆归尘土。怜我世人，忧患实多 --- 《倚天屠龙记》',
        '他强由他强，清风拂山岗；他横任他横，明月照大江 --- 《倚天屠龙记》',
        '你这一生一世，可别去求人家什么。人家心中想给你，你不用求，人家自然会给你；人家不肯的，你便苦苦哀求也是无用，反而惹得人家讨厌 --- 《侠客行》',
        '问世间情为何物 直教人生死相许 --- 《神雕侠侣》',
        '红颜弹指老，刹那芳华，与其天涯思君，恋恋不舍，莫若相忘于江湖 --- 《天龙八部》',
        '只要有人的地方就有恩怨,有恩怨就会有江湖,人就是江湖 --- 《笑傲江湖》',
        '书到用时方恨少，肉到肥时方恨多 --- 《鹿鼎记》',
        '世间少年男子，大都有过如此胡里胡涂的一段初恋，当时为了一个姑娘废寝忘食，生死以之，可是这段热情来的快，去的也快，日后头脑清醒，对自己旧日的沉迷，往往不禁为之哑然失笑！ --- 《倚天屠龙记》',
        '毛主席说世界上任何事物都有它的两面性，好事可以变坏事，坏事也可以变好事，这就是辩证法 --- 《鬼吹灯》',
        '这俩人是现今世上，手段最高明的摸金校尉，都有万夫不挡之勇，神鬼莫测之机，兼有云长之忠，翼德之猛，子龙之勇，孔明之智，那面古镜一定就是他们从云南掏出来的 --- 《鬼吹灯》',
        '那人推了推鼻梁上架的大蛤蟆镜开口对我说道：“天王盖地虎。”我心说这词怎么这么熟啊，于是顺口答道：“宝塔镇河妖。”对方又问：“脸怎么红了？”我一竖大拇指答道：“找不着媳妇给急的。”“那怎么又白了？”“娶了只母老虎给吓的。”我们俩同时抱住了对方，我对他说：“小胖，你没想到中央红军又回来了吧？”胖子激动得快哭了：“老胡啊，咱们各方面红军终于又在陕北会师了。” --- 《鬼吹灯》',
        '君子的承诺用嘴，小人的承诺才用纸，君子不做承诺也不会违约，小人做了承诺照样违约，能不能遵守约定在人，而不在于纸 --- 《鬼吹灯》',
        '胡司令,看在党国的份上,拉兄弟一把~ --- 《鬼吹灯》',
        '看来我要去见马克思了，对不住了战友们，我先走一步，给你们到那边占座位去了，你们有没有什么话要对革命导师说的，我一定替你们转达 --- 《鬼吹灯》',
        '老胡同志，你放心去吧，革命事业有你不多，没你不少，你到了老马那边好好学习革命理论啊，听说他们总吃土豆炖牛肉，你吃得习惯吗？ --- 《鬼吹灯》',
        '咱干革命的什么时候挑过食？小胖同志，革命的小车不倒你只管往前推啊！红旗卷起农奴戟，黑手高悬霸主鞭，天下剩余的那三分之二受苦大众，都要靠你们去解放了，我就天天吃土豆烧牛肉去了。 --- 《鬼吹灯》',
        '官场有种潜规则，不求有功，但求无过，不犯错就是立大功，升官发财是迟早的事 --- 《鬼吹灯》',
        '你看我和老胡，谁能和你把纯洁的革命友谊进一步升华升华？ --- 《鬼吹灯》',
        '很多时候，之所以会功败垂成，不是智谋不足，也不是胆略不够，其实只不过是利益使人头脑发昏，虽然都明白这个道理，但设身处地，真正轮到自己的时候，谁也想不起来这个道理了 --- 《鬼吹灯》',
        '世界上没有平白无故的爱，也没有平白无故的恨 --- 《鬼吹灯》',
        '这一去山高路远，这一去枪如林弹如雨，这一去革命重担挑肩头，也不知几时才能回来。不过，男子汉大丈夫，理应志在四方，骑马挎枪走天下。高尔基说，愚蠢的海鸭是不配享受战斗的乐趣；毛主席说一万年太久，只争朝夕。此刻良辰美景当前，咱们现在能欢聚在一起，就应该珍惜这每一分每一秒。等我们凯旋归来之时，咱们再重摆宴席，举杯赞英雄 --- 《鬼吹灯》',
        '爱你恨你，一生一世 -- 《大唐双龙传》',
        '这世上还有什么比生命本身更为动人的事。而生命之所以有意义，就是动人的历程与经验，成功失败并不重要，但其中奋斗的过程才是最迷人之处 --- 《大唐双龙传》',
        '立志必须远大，做不成时，打个折扣还是有些儿斤两 --- 《大唐双龙传》',
        '我不需要向任何人交代，我只在乎你的感受 --- 《大唐双龙传》',
        '对我来说，生命虽是没有人能解开的迷，却非是无迹可寻；线索隐藏于每一个人的自身，却因生死间无法逾越的鸿沟而终断。此为佛道两门中人努力追寻的方向和目标，只有悟透自身存在的秘密生命之迷才有机会被解开 --- 《大唐双龙传》',
        '身为一个男人，面对自己的敌人，唯一的办法就是面对他 --- 《弹痕》',
        '没有一个强大的国家机器在背后支持，一个民族又怎么可能在世界舞台上，扬起自己的腰肢，挺起自己的胸膛？ --- 《弹痕》',
        '千锤万凿出深山，烈火焚烧若等闲 --- 《石灰吟》',
        '惜秦皇汉武，略输文采；唐宗宋祖，稍逊风骚。一代天骄，成吉思汗，只识弯弓射大雕。俱往矣，数风流人物，还看今朝 --- 《沁园春.雪》',
        '风萧萧兮易水寒，壮士一去兮不复还 --- 《易水歌》',
        '久旱逢甘雨，他乡遇故知。洞房花烛夜，金榜挂名时 --- 《神童诗》',
        '朝为田舍郎，暮登天子堂。将相本无种，男儿当自强 --- 《神童诗》',
        '葡萄美酒夜光杯，欲饮琵琶马上催。醉卧沙场君莫笑，古来征战几人回 --- 《凉州词》'
    ];
    var imgNum = 53, length = 30; //图片个数53个图片 , 创建数据长度为20

    for (var i = 0; i < length; i++){
        var ran = parseInt(Math.random() * 937) + parseInt(Math.random() * 379); //随机数
        var textIndex = ran % strs.length, text = strs[textIndex];
        var imgName = ran % imgNum;
        arr.push({ text: text, imgName: imgName });

        strs.splice(textIndex, 1); //已经用过的文字从数组中删除
    }
    return arr;
}

//瀑布流每个盒子的鼠标悬浮和离开事件
function waterfallShowSubEle(){
    (this.getElementsByClassName('cover')[0]).style.display = 'block';
    (this.getElementsByClassName('item_suspend')[0]).style.display = 'block';
}
function waterefallHideSubEle(){
    (this.getElementsByClassName('cover')[0]).style.display = 'none';
    (this.getElementsByClassName('item_suspend')[0]).style.display = 'none';
}

//返回到顶部事件
function returnTop(){
    BufferMoveAnimate(document.documentElement, { scrollTop: 0 });
}


//第二个瀑布流js
function domPullLoad(){
    var dataArr = getWaterfallData(), html, text, imgUrl;  //数据数组
    var superEle = $("#dom_pull");  //父级容器标签

    //遍历添加子元素
    for (var i = 0; i < dataArr.length; i++){
        text = dataArr[i].text;
        imgUrl = '../img/star/' + dataArr[i].imgName + ".jpg";

        var ele = document.createElement('div');
        ele.setAttribute('class', 'box');
        ele.setAttribute('style', 'position: absolute; right: -1000px;');

        html = "<div class='pic'><img src='"+imgUrl+"'/><div class='cover'></div></div>" +
               "<p>"+ text +"</p>"+
               "<div class='item_suspend'>" +
                  "<div class='item_collect'>采集</div>" +
                  "<div class='item_star'><span></span></div>" +
               "</div>";
        ele.innerHTML = html;
        ele.onmouseover = waterfallShowSubEle;
        ele.onmouseout = waterefallHideSubEle;

        superEle.appendChild(ele);
    }
}
//第二个瀑布流 调整标签位置
var pullHeightArr = [], pullIndex = 0;
function domPullMovePosition(){
   var superEle = $("#dom_pull");
   var boxs = superEle.getElementsByClassName('box');
   var cols = $(".waterfall").offsetWidth / (fallItemW+fallItemM);

   console.log(">>>>cols2: ", cols, ", sueerrEle: ", superEle);

   var boxHeight = 0, minIndex = 0, minHeiht = 0;

   //这次添加的子元素 位置变化
   for (var i = pullIndex; i < boxs.length; i++){
       if (i < cols){
           pullHeightArr[i] = 0;
       }

       minIndex = getMinIndexByArr(pullHeightArr);  //数组中最小高度的索引
       minHeiht = pullHeightArr[minIndex];          //数组中最小高度

       boxHeight = boxs[i].offsetHeight;
       boxs[i].style.position = 'absolute';
       boxs[i].style.top = minHeiht + "px";
       boxs[i].style.left = minIndex * (fallItemM + fallItemW) + "px";

       pullHeightArr[minIndex] += boxHeight + fallItemM;

       console.log("瀑布流二：", i, ", index: ", minIndex, ", top: ", minHeiht);
   }
   pullIndex = boxs.length;   //更新初始索引
}

//tab事件
function changeTab(){
    var tabs = $(".main_tab").getElementsByTagName('div');

    for (var i = 0; i < tabs.length; i++){
        tabs[i].setAttribute('index', i);
        //设置每个tab的点击事件
        tabs[i].onclick = function(){
            for (var j = 0; j < tabs.length; j++){
                tabs[j].className = '';
            }
            this.className = 'tab_active';
            tabIndex = parseInt(this.getAttribute('index'));

            if (tabIndex % 2 == 0){
                $("#fall_main").style.display = 'block';
                $("#dom_pull").style.display = 'none';
            }
            else{
                $("#fall_main").style.display = 'none';
                $("#dom_pull").style.display = 'block';

                if (!$("#dom_pull").getElementsByClassName('box').length){
                    domPullLoad();            //第二个瀑布流创建子元素
                    setTimeout(function(){
                        domPullMovePosition();    //第二个瀑布流更新元素坐标位置
                    }, 1000)
                }
            }
        }
    }
}

//展示登录弹窗
function showLoginLayer(){
    (document.getElementsByClassName("login_layer")[0]).style.display="block";
}
//关闭登录弹窗
function closeLoginLayer(){
    (document.getElementsByClassName("login_layer")[0]).style.display="none";
}

//轮播banner图变化
function bannerChange(){
    let index = 0;
    let lis = $(".slider_banner").getElementsByTagName('li');

    setInterval(function(){
        for (var i = 0; i < lis.length; i++){
            BufferMoveAnimate(lis[i], { opacity: 0 }); //其余banner图设置透明
        }
        BufferMoveAnimate(lis[index], { opacity: 1}); //当前banner图显示

        index++;
        if (index == lis.length){
            index = 0;
        }
    }, 2000)
}
