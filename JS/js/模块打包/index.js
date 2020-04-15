var name = 'hai, I\'m from index.js';
var calModule = require('./calculator.js');
console.log(name); //hai, I'm from index.js  //说明calculator.js的变量声明不会影响index.js ,可见每个模块是拥有过各自的作用域

//测试 cong calculator.js中导出的模块
console.log('sign: ', calModule.sign);
console.log('12 + 9 = ', calModule.add(12, 9));
console.log('12 - 9 = ', calModule.minus(12, 9));

/*
不管require多少次calculator.js， 其内部只执行了一遍。
在module对象中有一个属性loaded用于记录该模块是否被加载过，它的默认值为false，当模块第一次被加载和执行过后会设置为true,
后面再次加载时检查到module.loaded为true, 则不会再次执行模块代码。
    有时我们加载一个模块，不需要获取其导出的内容，只是想通过执行它而产生某种作用。比如把它的接口挂在全局对象上，此时直接使用require即可。
    require('./calculator.js')

    require函数可以接收表达式，借助这个特性我们可以动态地指定模块加载路径
    const moduleNames = ['foo.js', 'bar.js'];
    moduleNames.forEach(name=>{
        require('./' + name);
    })
 */
var calModule2 = require('./calculator.js'); //第二次导入
console.log(calModule2.add(99, 1)) // 100


/*
    ES6 Module : 2015年6月，ES6中才有模块这一特性
 */
import es6_export from './es6_export' // './es6_export.js'
console.log('....es6 import test start....')
console.log('add(11, 22) = ', es6_export.add(11, 22))