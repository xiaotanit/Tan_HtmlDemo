let fn = require("./testExports.js");
//测试
console.log("str: ", fn.exportsStr);
console.log("sum: ", fn.exportsSum(99, 18, 12));
console.log("avg: ", fn.exportsAvg(12, 18, 36));


//测试2：当前默认环境是否在闭包内？如果在，该闭包的函数是哪个？
console.log("\nargument是否存在，存在则说明当前运行环境在一个函数内：")
console.log(arguments)
console.log("arguments参数个数：", arguments.length)
console.log("\n当前函数定义：")
console.log(arguments.calle + ""); //如此调用就可以打印当期函数自身
//打印结果：function (exports, require, module, __filename, __dirname) {
//闭包函数，exports和require都是闭包函数传递过来的参数

console.log("\n\n......test3.....")
console.log(exports)
console.log(require);
console.log(module);
console.log("....__filename: ", __filename);
console.log("....__dirname: ", __dirname);
console.log("module.exports === exports: ", module.exports === exports);




//测试4，exports对外暴露构造函数，require引入
console.log("\n\n*******第四个测试start******");
console.log(fn.Person);
let per = new fn.Person("王大锤", 18, "我自横刀向天笑，去留肝胆两昆仑");
per.eat();



//测试5、Buffer： 二进制流。将其他类型数据转成二进制。全局通用，不需要用require引用
console.log("\n\n......Buffer测试......")
let sf1 = new Buffer(10);
console.log("sf1: ", sf1); //sf1:  <Buffer 00 00 00 00 00 00 00 00 00 00>
//第二种使用方法
let sf2 = Buffer.from("abcdefg");
let sf2_2 = Buffer.from("你好啊");
console.log("sf2: ", sf2);
console.log("sf2.length: ", sf2.length)
console.log("sf2.toString: ", sf2.toString());
console.log("sf2_2: ", sf2_2.length);
/*
 sf2:  <Buffer 61 62 63 64 65 66 67>
 sf2.length:  7
 sf2.toString:  abcdefg
 sf2_2:  9
 */

//第三种方式
let sf3 = Buffer.alloc(20); //创建20个长度Buffer对象，类似数组
sf3[0] = 7;
sf3[1] = 8;
sf3[2] = 9;
sf3[3] = 10;
sf3[4] = 11;
sf3[5] = 12;
sf3[6] = 0x9;
sf3[7] = 0xa;
sf3[8] = 0xb;
sf3[19] = 8;
sf3[20] = 1;  //溢出不作处理
console.log("sf3: ", sf3);
//sf3:  <Buffer 07 08 09 0a 0b 0c 09 0a 0b 00 00 00 00 00 00 00 00 00 00 08>
sf3.forEach((item, idx)=>{
    console.log(idx, ": ", item);
    /*
     0 ': ' 7
     1 ': ' 8
     2 ': ' 9
     3 ': ' 10
     4 ': ' 11
     5 ': ' 12
     6 ': ' 9
     7 ': ' 10
     8 ': ' 11
     9 ': ' 0
     10 ': ' 0
     11 ': ' 0
     12 ': ' 0
     13 ': ' 0
     14 ': ' 0
     15 ': ' 0
     16 ': ' 0
     17 ': ' 0
     18 ': ' 0
     19 ': ' 8
     */
})



//测试6，写入文件
console.log("\n\n......test6 start....")
let fs = require("fs");  //引入文件系统
//同步打开文件，如果文件不存在，则创建文件
let fd = fs.openSync("tandaxia.txt", "w");
fs.writeFileSync(fd, "Hello, world! I'm tandaxia"); //写入文件
fs.closeSync(fd); //关闭并保存文件

//读取文件
let fs2 = require("fs"); //引入文件系统
let fd2 = fs.openSync("tandaxia.txt", "r");
let content = fs2.readFileSync(fd2);
console.log("content: ", content.toString());
fs2.closeSync(fd2);


//异步写入文件
console.log("\n......test7 start....")
let fs3 = require("fs"); //
fs3.open("tandaxia.txt", "a", (err, fd)=>{ //a表示追加

    if (err){
        throw err; //抛出异常
    }

    //写入新内容
    fs3.writeFile(fd, "\n今天星期二，是个难忘的日子", (err)=>{
        if (err){
            throw err;
        }
        console.log("异步写入成功。。。")

        //关闭文件
        fs3.close(fd, (err)=>{
            if (err){
                throw err;
            }
            console.log("文件保存并关闭成功")
        })
    })
});


//异步读取文件信息
fs3.open("tandaxia.txt", "r", (err, fd)=>{
    if (err){
        throw err;
    }

    //读取文件
    fs3.readFile(fd, (err,data)=>{
        if (err){
            throw err;
        }
        console.log("读取成功: ", data.toString())

        //关闭
        fs3.close(fd, (err)=>{
            if (err){
                throw err;
            }
            console.log(">>>>关闭。文件22。。")
        });
    })
})