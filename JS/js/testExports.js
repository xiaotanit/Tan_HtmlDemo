//多个数之和
const exportsSum = function(...nums){
    console.log("nums: ", nums);

    let sum = 0;
    for (let i = 0; i < nums.length; i++){
        sum += nums[i];
    }
    return sum;
}

const exportsAvg = function(...nums){
    let sum = exportsSum(...nums);
    return sum/nums.length;
}

exports.exportsStr = "节日快乐";
exports.exportsSum = exportsSum;
exports.exportsAvg = exportsAvg;




/**
 * 测试exports 和 module.exports 的区别
 * 虽然exports === module.exports 但是在使用方式上还是有一定的区别
 * */
function Person(name, age, sign){
    this.name = name;
    this.age = age;
    this.sign = sign;
}
Person.prototype.eat = function(){
    console.log(`${this.name}就是一个大吃货，他的个人标签就是：${this.sign}`)
}

//第一种方式，用exports
exports.Person = Person;  //测试ok
//第二种方式，用module.exports
// module.exports.Person = Person; //测试ok
//第三种方式, 如果用module.exports = 方式，需要把页面所有想对外公开的变量都写在这里
// module.exports = { Person,exportsStr: "端午快乐",exportsSum,exportsAvg }

//第四种尝试方式, 用exports = {//...} 结果出现对外暴露的属性和方法没有问题，但是构造函数为未定义
// exports = { Person,exportsStr: "端午快乐",exportsSum,exportsAvg };