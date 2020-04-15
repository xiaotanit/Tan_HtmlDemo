var name = 'hello, I\'m calculator.js';
console.log('name: ', name)

//导出是一个模块向外暴露自身的唯一方式。在CommonJS中，通过module.exports可以导出模块中的内容
/*
    CommonJS模块内部会有一个module对象用于存放当前模块的信息，可以理解成每个模块的最开始定义了以下对象：
    var module = {...};
    //模块自身逻辑
    module.exports = {...};
 */
//

/* CommonJS页支持另一种简化的导出方式：直接使用exports
    一个页面中只能使用一种写法，或者module.exports 或者 exports, 两种同时用会出现覆盖

    在实际应用中，为了提高可读性，应该将module.exports及exports语句放在模块的末尾
* */
exports.sign = '天天向上，好好学习';
exports.add = function(a, b){
    return a + b;
}
exports.minus = function(a, b){
    return a - b;
}


