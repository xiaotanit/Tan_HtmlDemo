// import es6_export from './es6_export'
// console.log(es6_export.add(11, 22))
/*
报错  SyntaxError: Unexpected token import
因为NodeJS只支持部分ES6的语法，有些ES6语法还不支持，而import语法就是其中一个；
解决办法：
第一种方案：ES6语法修改为ES5语法
    比如import React, { Component } from 'react';  改成const assert = require("assert");
第二种方案：将ES6转换为ES5
    安装Babel-cli插件，将ES6转换为ES5;
    1 Babel-cli
    现在JS盛行ES6,但是NodeJS对ES6的特性支持不够完整，Babel-cli可以直接运行ES6的代码，也可以把ES6转换为ES5;
    Bable-cli官网：https://www.babeljs.cn/docs/usage/cli/#babel-node
    NodeJS特性：https://nodejs.org/en/docs/es6/

    2. 安装Bable-cli
    npm install -g babel-cli
    //也可以通过直接将Babel安装到项目中，在项目根目录下执行下面命令，同时它会自动在package.json文件中的devDependencies中加入babel-cli
    //在执行安装到项目中命令之前，要先在项目根目录下新建一个package.json文件。
    npm install -g babel-cli --save-dev

    3. ES6转ES5
    # ES2015转码规则
    npm install --save-dev babel-preset-es2015

    # react转码规则
    npm install --save-dev babel-preset-react

    # ES7不同阶段语法提案的转码规则（共有4个阶段），选装一个
    npm install --save-dev babel-preset-stage-0
    npm install --save-dev babel-preset-stage-1
    npm install --save-dev babel-preset-stage-2
    npm install --save-dev babel-preset-stage-3
* */