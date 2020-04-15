/*
ES6 Module : 2015年6月，ES6中才有模块这一特性
1、es6的export有两种方式：1、命名导出；   2、默认导出
1.1、命名导出，一个模块可以有多个命名导出。它有两种不同的写法
   //写法1, 将变量的声明和导出写在一行
   export const name =  'calculator';
   export const add = function(a, b){ return a + b; }

   //写法2， 先进行变量声明，然后再用同一个export语句导出。两种写法的效果一样
   //在使用命名导出时，可以通过as关键字对变量重命名，如export { name, add as getSum }
   const name = 'calculator';
   const add = function(a, b){ return a + b; }
   export { name, add };

 1.2、默认导出: 与命名导出不同，模块的默认导出只能有一个。如下面的代码
 我们可以将export default理解为对外输出了一个名为default的变量，因此不需要像命名导出一样进行变量声明，直接导出只即可。
 //导出字符串
 export default 'this is es6_export.js file '
 //导出class
 export default class {...}
 //导出匿名函数
 export default function(){ ... }

 - - - - - - - - - - - - - - - - - - - - - - - - - -
 2、导入，加载带有命名导出的模块时，import后面要跟一对大括号来将导入的变量名包裹起来，并且这些变量名需要与导出的变量名完成一致。
 导入变量的效果相当于在当前作用域下声明了这些变量，并且布可对其进行更改，也就是所有导入的变量都是只读的。

 2.1 与命名导出类相似，我们可以通过as关键字对导入的变量重命名。如：
 import {name, add as calculatorSum} from './calculator.js';

 2.2 在导入多个变量时，我们还可以采用整体导入的方式。如：
 import * as calculator from './calculator.js';
 console.log(calculator.add(2, 3));
 console.log(calculator.name);
 使用import * as <myModule>可以把所有导入的变量作为属性添加到<myModule>对象中，从而减少了对当前作用域的影响。


 2.3 接下来处理默认导出，请看下面这个列子
 //calculator.js
 export default {
    name: 'calculator',
    add: function(a, b) { return a + b; }
 }

 //index.js
 import myCalculator from './calculator.js';
 myCalculator.add(2, 3);
    对于默认导出来说，import后面直接跟变量名，并且这个名字可以自由指定（比如这里时myCalculator）,它指代了calculator.js中默认导出的值。
    从原理上可以这样去理解：
    import { default as myCalculator } from './calculator.js';

 2.4 两种导入方式混合起来的例子：
  //index.js
  import React, { Component } from 'rect';
  这里的React对应的时该模块的默认导出，而Component则是其命名导出中的一个变量
  注意，这里的React必须写在大括号前面，而不能顺序颠倒，否则会提示语法错误。

2.5 复合写法， 在工程中，有时需要把某一个模块导入后立即导出，比如专门用来集合所有页面或组件的入口文件。此时可以采用复合形式的写法：
export { name, add } from './calculator.js';
复合写法目前只支持当被导入模块（这里的calculator.js）通过命名导出的方式暴露出来的变量，默认导出则没有对应的复合形式，只能将导入和导出拆开写。
import calculator from './calculator.js'; //导出默认命名
export default calculator;  //马上导出

3、CommonJS与ES6 Module的区别
   上面我们分别介绍了CommonJS和ES6 Module两种形式的模块定义，在实际开发过程中我们经常会将二者混用，因此这里有必要对比一下它们各自的特性。
   3.1  动态和静态
    CommonJS和ES6 Module最本质的区别在于前者对模块依赖的解决是“动态的”，而后者是“静态的”。这里“动态”的含义是, 模块依赖关系的建立发生在代码运行阶段；
    而“静态”则是模块依赖关系的建立发生在代码编译阶段。
    让我们先看一个CommonJS的例子：
    //calculator.js
    module.exports = {name: 'calculator' };
    //index.js
    const name = require('./calculator.js').name;
    在上面介绍CommonJS的部分时我们提到过，当模块A加载模块B时（在上面的例子中时index.js加载calculator.js）,会执行B中的代码，
    并将其module.exports对象作为require函数的返回值返回。并且require的模块路径可以动态指定，支持传入一个表达式，
    我们甚至可以通过if语句判断是否加载某个模块。因此，在CommonJS模块被执行前，并没有办法确定明确的依赖关系，模块的导入、导出发生在代码的运行阶段。

    同样的例子，我们再对比看下ES6 Module的写法
    //calculator.js
    export const name = 'calculator';
    //index.js
    import { name } from './calculator.js';
    ES6 Module的导入、导出语句都是声明式，它不支持导入的路径是一个表达式，并且导入、导出语句必须位于模块的顶层作用域（比如不能放在if语句中）。
    因此我们说，ES6 Module是一种静态的模块结构，在ES6代码的编译阶段就可以分析出模块的依赖关系。它相比于CommonJS来说具备以下几点优势：
    3.1.1 冗余代码检测和排除。我们可以用静态分析工具分析工具检测出哪些模块没有被调用过。比如，在引入工具类库时，工程中往往只用到了其中一部分组件或接口，
    但有可能会将其代码完整地加载进来。未被调用到的模块代码永远不会被执行，也就成为了冗余代码。通过静态分析可以在打包时去掉这些未曾使用过的模块，以减少打包资源体积。
    3.1.2 模块变量类型检查。JavaScript属于动态类型语言，不会在代码执行前检查类型错误（比如对一个字符串类型的值进行函数调用）。
    ES6 Module的静态模块结构有助于确保模块之间传递的值或接口类型时正确的。
    3.1.3 编译器优化。在CommonJS等动态模块系统中，无论采用哪种方式，本质上导入的哦都是一个对象，而ES6 Module支持直接导入变量，减少了引用层级，程序效率更高。

    3.2 值拷贝和动态映射
    在导入一个模块时，对于CommonJS来说获取的是一份导出值的拷贝；而在ES6 Module中则是值的动态映射，并且这个映射是只读的。例子：
    //calculator.js
    var count = 0;
    module.exports = {
        count: count,
        add: function(a, b){
            count+=1;
            return a + b;
        }
    }

    //index.js
    var count = require('./calculator.js').count;
    var add = require('./calculator.js').add;

    console.log(count); //0 这里的count是对calculator.js中count值的拷贝
    add(2, 3);
    console.log(count); //0 calculator.js中变量值的改变不会对这里的拷贝值造成影响

    count += 1;
    console.log(count); //1 拷贝的值可以更改
    index.js中的count是对calculator.js中count的一份值拷贝，因此在调用函数时，虽然更改了原本calculator.js中count的值，
    但是并不会对index.js中导入时创建的副本造成影响。
    另一方面，在CommonJS中允许对导入的值进行更改。我们可以在index.js更改count和add, 将其赋予新值。同样，由于是值的拷贝，这些操作不会影响calculator.js本身。

    下面我们使用ES6 Module将上面的例子进行改写：
    //calculator.js
    let count = 0;
    const add = function(a, b){
        count += 1;
        return a + b;
    }
    export { count, add }

    //index.js
    import { count, add } from './calculator.js';
    console.log(count); //0, 对calculator.js中的count值的映射
    add(2, 3);
    console.log(count); //1 实时反映calculator.js中count值的变化
    //count += 1; //不可更改，会抛出SyntaxError: "count" is read-only

    上面的例子展示了ES6 Module中导入的变量其实是对原有值的动态映射。index.js中的count是对calculator.js中的count值的实时反映，
    当我们通过调用add函数更改了calculator.js中的count值时，index.js中count的值也随之变化。
        我们不可以对ES6 Module导入的变量进行更改，可以将这种映射关系理解为一面镜子，从镜子里我们可以实时观察到原有的事物，但是并不可以操作镜子中的影像。

    3.3 循环依赖
    循环依赖是指模块A依赖于B, 同时模块B依赖于模块A。比如下面的这个例子
    //a.js
    import { foo } from './b.js';
    foo();

    //b.js
    import { bar } from './a.js';
    bar();

    一般来说工程中应该尽量避免循环依赖的产生，因为从软件设计的角度来说，单向的依赖关系更加清晰，而循环依赖则会带来一定的复杂度。
    而在实际开发中，循环依赖有时会在我们不经意间产生，因为当工程的复杂度上升到足够规模时，就容易出现隐藏的循环依赖关系。
        简单来说，A和B两个模块之间是否存在直接的循环依赖关系是很容易被发现的。但实际情况往往是A依赖于B，B依赖于C，C依赖于D，最后绕了一圈，D又依赖于A。
     当中间模块太多时就很难发现A和B之间存在着隐式的循环依赖。
     因此，如何处理循环依赖是开发者必须要面对的问题。我们首先看下在CommonJS中循环依赖的例子：
     //foo.js
     const bar = require('./bar.js');
     console.log('value of bar: ', bar);
     module.exports = 'This is foo.js';

     //bar.js
     const foo = require('./foo.js');
     console.log('value of foo: ', foo);
     module.exports = 'This is bar.js';

     //index.js
     require('./foo.js');
     在这里，index.js是执行入口，它加载了foo.js, foojs和bar.js之间存在循环依赖。让我们观察foo.js和bar.js中的代码，理想状态下我们希望二者都能导入正确的值，并在控制台上输出。
     value of foo: This is foo.js
     value of bar: This is bar.js
     而当我们运行上面的代码时，实际输出却是：
     value of foo: {}
     value of bar: This is bar.js
     为什么foo的值会是一个空对象呢？让我们从头梳理一下代码的实际执行顺序。
     1)、index.js导入了foo.js， 此时开始执行foo.js中的代码
     2)、foo.js的第1句导入了bar.js， 这时foo.js不会继续向下执行，而是进入了bar.js内部。
     3)、在bar.js中又对foo.js进行了require, 这里产生了循环依赖。需要注意的是，执行权并不会在交回foo.js，而是直接俄取其导出值，也即是module.exports。
     但由于foo.js未执行完毕，导出值在这时为默认的空对象，因此当bar.js执行到打印语句时，我们看到控制台中的value of foo就是一个空对象。
     4)、bar.js执行完毕，将执行权交回foo.js
     5)、foo.js从require语句继续向下执行，在控制台打印出value of bar(这个值时正确的)，整个流程结束。

     从上面可以看出，尽管循环依赖的模块均被执行了，但模块导入的值并不是我们想要的。因此在CommonJS中，若遇到循环依赖我们没有办法得到预想中的结果。

     我们再从webpack的实现角度来看，将上面的例子打包后，bundle中有这样一段代码非常重要：
     //The require function
     function __webpack_require__(moduleId){
        if(installedModules[moduleId]){
            return installedModules[moduleId].exports;
        }
        //Create a new module (and put it into the cache)
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            export: {}
        }
        //...
     }
     当index.js引用了foo.js之后，相当于执行了这个__webpack_require__函数，初始化了一个module对象并放入installModules中。
     当bar.js再次引用foo.js时， 又执行了该函数，但这次时直接从installedModules里面取值，此时它的module.exports是一个空对象。
     这就解释了上面在第三步看到的现象。
     接下来让我们使用ES6 Module的方式重写上面的例子。
     //foo.js
     import bar from './bar.js';
     console.log('value of bar: ', bar);
     export default 'This is foo.js';

     //bar.js
     import foo from './foo.js';
     console.log('value of foo: ', foo);
     export default 'This is bar.js';

     //index.js
     import foo from './foo.js';

     //执行结果如下：
     value of foo: undefined
     foo is:3 value of bar: This is bar.js

     很遗憾，在bar.js中同样无法得到foo.js正确的导出值，只不过和CommonJS默认导出一个空对象不同，这里获取到的是undefined。
     上面我们谈到，在导入一个模块时，CommonJS获取到的是值的拷贝，ES6 Module则是动态映射，
     那么我们能否利用ES6 Module的特性支持循环依赖呢？请看下面这个例子：
     //index.js
     import foo from './foo.js';
     foo('index.js');

     //foo.js
     import bar from './bar.js';
     function foo(invoker){
        console.log(invoker + 'invokers foo.js');
        bar('foo.js');
     }
     export default foo;

     //bar.js
     import foo from './foo.js'
     let invoked = false;
     function bar(invoker){
        if (!invoked){
            invoked = true;
            console.log(invoker + ' invokes bar.js');
            foo('bar.js');
        }
     }
     export default bar;

     上面代码的执行结果如下：
     index.js invokes foo.js
     foo.js invokes bar.js
     bar.js invokes foo.js

     可以看到，foo.js和bar.js这一对循环依赖的模块均获取到了正确的导出值。下面让我们分析一下代码的执行过程。
     1)、index.js作为入口导入了foo.js，此时开始执行foo.js中的代码
     2)、从foo.js导入了bar.js, 执行权交给了bar.js。
     3)、在bar.js中一直执行到其结束，完成bar函数的定义。注意，此时由于foo.js还没执行完，foo的值现在仍然是undefined。
     4)、执行权回到foo.js继续执行直到其结束，完成foo函数的定义。由于ES6 Module动态映射的特性，
     此时在bar.js中的foo的值已经从undefined成为了我们定义的函数，这是与CommonJS在解决循环依赖时的本质区别，CommonJS中导入的是值的拷贝，
     不会随着被夹在模块中原有值的变化而变化。
     5)、执行权回到index.js并调用foo函数，此时会依次执行foo->bar->foo，并在控制台打印出正确的值。

     由上面的例子可以看出，ES6 Module的特性使其可以更好的支持循环依赖，只是需要由开发者来保证当导入的值被使用时已经设置好正确的导出值。
 */
export default{
    name: 'es6_export_test',
    add: function(a, b){
        return a + b;
    }
}