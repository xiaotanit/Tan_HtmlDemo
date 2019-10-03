/**
 * js的一些测试
 */

/**
 * 1、立即执行函数表达式：把函数用一个()括号括起来，因此就成了一个表达式，就会马上执行。
 * (function(){}())、 (function(){})()、 (function(global){}、
 */
(function(){
    console.log("111");  //打印：111
}());
//这两种写法效果一样
(function(){
    console.log("222");  //打印：222
})();

//这种写法会报错 Uncaught SyntaxError: Function statements require a function name
// function(){
//     console.log("3333")
// }()

//语义化，给匿名函数命名
(function testOne(){
   console.log("444");  //打印： 444
}());

//给立即执行函数传参
(function(global){
    console.log("555: ", global); //打印：555：Window...
}(window));

(function(global, name){
    console.log("666");  //打印：666
    console.log(global) //打印：Window...
    console.log(name); //打印：hello
})(window, "hello");

//这种写法可以立即执行
var test = function(){
   console.log("777"); //打印：777
}()
console.log("text: ", test); //打印：text: undefined

var testTwo = function(name, age){
    console.log("name: ", name, ", age: ", age); //打印：name:  王大锤 , age:  18
    return name + ", hello world !";
}("王大锤", 18)
console.log("testTwo: ", testTwo); //打印：testTwo:  王大锤, hello world !


/**
 * 2、隐式类型的转换
 */
console.log("\n\n....")
console.log("null == undefined : ", null == undefined); //null == undefined :  true
console.log("NaN == NaN : ", NaN == NaN); //NaN == NaN :  false
//false true true true false false false 即undefined、NaN、'abc'是非数字；null、true、false、'123'是数字
console.log(isNaN(null), isNaN(undefined), isNaN(NaN), isNaN('abc'), isNaN(true), isNaN(false), isNaN('123'));
//为什么isNaN(null) 为false, 而isNaN(undefined)为true, 因为Number(null) == 0, Number(undefined) == NaN

//true true false false false true 即null/undefined/NaN 不等于true，也不等于false
console.log(1==true, 0==false, null==false, undefined == false, NaN == false, '' == false)

//数据类型的隐式转换
//11 12abc 108 8 20 NaN 即数字字符串相加是字符串拼接(数字转成字符串)，而数字字符串相减、相乘、除、模都会隐式转成数字计算
console.log(1+'1', 1+'2abc', '10' + '8', '10' - '2',  '10' * '2', '10'-'2a')
var a = '123';
console.log(a++, ++a, a--, --a); //123 125 125 123 字符串数字隐式转成数字计算


//函数的参数arguments, caller, callee
function testThree(a, b, c){

    console.log(arguments.length, arguments.callee.length, testThree.length);
    //2 3 3 arguments.length是实参个数，arguments.callee.length是形参个数

    console.log(arguments)
    console.log(arguments.callee)
}
testThree("大锤", 18);


//变量提升，变量的声明和
console.log(tan_a);  //打印一个未定义的变量，报错：Uncaught ReferenceError: tan_a is not defined

/** 先引用一个未定义的变量，再给这个变量声明和赋值，则定义和赋值前打印不会报错，打印为：undefined
 *  这种情况相当于在编译时将变量声明提前了，变量声明提前到了引用前；如果变量在后面直接赋值不做声明，则在此之前不用使用该变量，否则也会报ReferenceError
 *  JS引擎在查找变量时有两种查询方式，给变量赋值用做查询，取变量的值用右查询。右查询时，如果变量没有声明，则抛出异常ReferenceError；
 *  如果把变量当作方法来调用，则抛出异常TypeError
 */
console.log(tan_b, ",", tan_c);   //undefined "," undefined
var tan_b = '罗小虎', tan_c;
console.log(tan_b, ", ", tan_c);   //罗小虎 ,  undefined

function tan_one(){
    // console.log(tan_h);   //同理，如果tan_h在后面的代码没有声明或者赋值，这里直接引用会报错：Uncaught ReferenceError: tan_h is not defined
    console.log(tan_e, tan_g);  //undefined undefined
    var tan_e = tan_f = '李慕白', tan_g = "俞秀莲";  //tan_f这样写会把tan_f变成了全局变量
    console.log(tan_e, tan_f, tan_g);  //李慕白 李慕白 俞秀莲
}
tan_one();
console.log("tan_f: ", tan_f)  //tan_f:  李慕白
console.log("tan_e: ", tan_e);  //Uncaught ReferenceError: tan_e is not defined



/**
 * 函数名提升，和同名的变量和函数优先级
 */
function tan_two(a){
    console.log('a1: ', a); //此a为函数a， 说明函数名会提升，优先于变量和参数 //如果没有函数a, 则这个a为形参传进来的值

    var a = "王大锤";
    console.log('a2: ', a);

    function a(){
        console.log("我是testTwo函数里面的a函数。。。");
    }

    return a;  //这个为变量a
}

var temp_two = tan_two("九华山");
if (typeof temp_two == 'function'){
    temp_two();
}
else{
    console.log("temp_two: ", temp_two); //执行这个，说明tan_two函数返回的a为变量a
}
/*
 打印日志：
 a1:  ƒ a(){
    console.log("我是testTwo函数里面的a函数。。。");
 }
 a2:  王大锤
 temp_two:  王大锤
 */

////第二种测试：函数a在返回之后，结果a1的a还是函数a 说明函数优先变量提升
// function tan_two(a){
//     console.log('a1: ', a);
//
//     var a = "王大锤";
//     console.log('a2: ', a);
//
//     return a;
//
//     function a(){
//         console.log("。。。。我是tan_two里面的a函数");
//     }
// }
//
// var temp_two = tan_two("九华山");
// if (typeof temp_two == 'function'){
//     temp_two();
// }
// else{
//     console.log("temp_two: ", temp_two);
// }
// // a1:  ƒ a(){
// //     console.log("。。。。我是tan_two里面的a函数");
// // }
// // a2:  王大锤
// // temp_two:  王大锤


//AO GO 分析
function tan_3(a, b){
    console.log(a); //1
    c = 0;
    var c;
    a = 5;
    b = 6;
    console.log(b); //6
    function b(){}
    function d(){}
    console.log(b); //6
}
tan_3(1);

function tan_4(){
    console.log(b); //undefined
    if (tan_4_a){
        var b = 2;
    }
    c = 3;
    console.log(c); //3
    console.log(b); //undefined
}
var tan_4_a;
tan_4();
tan_4_a = 1;
console.log(tan_4_a); //1

function tan_5(){
    a = 1;
    function a(){}
    var a = 2;
    return a; //2
}
console.log(tan_5());

tan_6_a = 1;
function tan_6(e){
    function e(){}
    arguments[0] = 2;
    console.log(e); //2
    if (tan_6_a){ //下面的变量tan_6_a声明会提升到顶部， 所以此时tan_6_a为undefined
        var b = 3; //虽然没有进入这个if, 但是预编译时会忽略if结构，把变量b的声明提升到函数顶部
    }
    var c;
    tan_6_a = 4;
    var tan_6_a;
    console.log(b);  //undefined
    f = 5;
    console.log(c); //undefined
    console.log(tan_6_a); //4
}
var tan_6_a;
console.log("tan_6_a: ", tan_6_a);  //1
tan_6(1);


//关于闭包
function tan_7(){
    for (var i = 0; i < 6; i++) {
        setTimeout(() => {
            console.log("i: ", i);  //都是6
        }, i*1000);
    }
}
tan_7();
function tan_8(){
    for (let i = 0; i < 6; i++){
        setTimeout(()=>{
            console.log("tan_8 i: ", i); //0 --> 6 let能够劫持i的作用域，每次迭代时都新创建一个变量，接受上一个变量的值
        }, i * 1000);
    }
}
tan_8();
