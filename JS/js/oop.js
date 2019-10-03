/**
 * JavaScript的多级继承和多态、原型和原型链的体现
 * */
//1.1 构造函数：人(Person)
function Person(name){
    this.name = name ? name : "人类";
    this.methodPerson = function(){
        console.log("Person构造函数里面的方法methodPerson-->我的标签：" + this.name);
    }

    console.log("********Person 构造函数 初始化********");
}
//给Person的原型上添加属性和方法
Person.prototype.age = 18;
Person.prototype.run = function(){
    console.log("Person原型方法run-->name: " + this.name + ", age: " + this.age + ", 欢快的run");
}
//问题：如果构造函数的原型里面的属性和方法，和构造函数的属性和方法同名，实例对象调用属性和方法时执行哪个？
//Person原型的name和Person构造函数的name，实例对象调用哪个？
Person.prototype.name = "炎黄子孙";
Person.prototype.methodPerson = function(){
    console.log("Person原型的methodPerson方法-->标签：" + this.name + ", age: " + this.age);
}


//1.2 构造函数：中国人(ChinaPerson)，继承于Person
function ChinaPerson(name, skin){
    Person.call(this, name); //调用父级Person构造函数

    this.skin = skin ? skin : "黄色";
    this.methodChinaPerson = function(){
        console.log("ChinaPerson构造函数里面的方法methodChinaPerson-->肤色：" + this.skin + ", 标签: " + this.name);
    }

    console.log("********ChinaPerson 构造函数 初始化********");
}
//设置ChinaPerson原型指向Person原型，相当于ChinaPerson继承Person
ChinaPerson.prototype = Object.create(Person.prototype);
//设置新原型的构造函数指向自己
ChinaPerson.prototype.constructor = ChinaPerson;

//给ChinaPerson的原型自定义添加属性和方法
ChinaPerson.prototype.hero = "谭嗣同";
ChinaPerson.prototype.write = function(){
    console.log("ChinaPerson原型里面的方法write-->我自横刀向天笑，去留肝胆两昆仑！is who? " + this.hero + ", 标签: " + this.name + ", skin: " + this.skin);
}


//1.3 构造函数：ProvincePerson, 继承于ChinaPerson
function ProvincePerson(name, skin, count){
    ChinaPerson.call(this, name, skin);  //调用父级ChinaPerson构造函数

    this.count = count ? count : 8000;  
    this.methodProvincePerson = function(){
        console.log("ProvincePerson构造函数里面的方法methodProvincePerson-->数量：" + this.count + "万, 肤色："+ this.skin + ", 标签：" + this.name);
    }
	//重写从父级继承下来的方法methodChinaPerson
	this.methodChinaPerson = function(){
		console.log("ProvincePerson构造函数里面重写父级方法methodChinaPerson....");
	}
    console.log("********ProvincePerson 构造函数 初始化********")
}
//设置ProvincePerson原型指向ChinaPerson原型，相当于构造函数ProvincePerson继承于ChinaPerson
ProvincePerson.prototype = Object.create(ChinaPerson.prototype);
//设置新原型的构造函数指向自己
ProvincePerson.prototype.constructor = ProvincePerson;
//给ProvincePerson的原型上自定义添加属性和方法
ProvincePerson.prototype.feature = "长沙臭豆腐";
ProvincePerson.prototype.eat = function(){
    console.log("ProvincePerson原型里面的方法eat-->标签：" + this.name + ", 地方小吃是：" + this.feature + ", hero: " + this.hero + ", skin: " + this.skin);
}
//重写从父级原型继承下来的方法
ProvincePerson.prototype.write = function(){
	console.log("ProvincePerson原型里面重写从父级原型继承的write方法-->。。。。^_^");
}





//测试一下
var pro1 = Person.prototype, pro2 = ChinaPerson.prototype, pro3 = ProvincePerson.prototype;
//ProvincePerson原型的原型 === ChinaPerson的原型
var pro3_china = Object.getPrototypeOf(pro3);

//ProvincePerson原型的原型的原型 === Person的原型
var pro3_person = Object.getPrototypeOf(pro3_china);

//ProvincePerson原型的原型的原型的原型 === Object的原型
var pro3_object = Object.getPrototypeOf(pro3_person);

//Function和Object作为普通函数时是构造函数Function的实例对象，获取这两个实例对象的原型
var pro_function = Object.getPrototypeOf(Function), pro_object = Object.getPrototypeOf(Object);

console.log("************* 原型链测试 start **********")
console.log("构造函数ProvincePerson继承自ChinaPerson， 构造函数ChinaPerson继承自Person, Person继承自Object")
console.log("Object --> Person --> ChinaPerson --> ProvincePerson")
console.log("Person.原型：", pro1);
console.log("ChinaPerson.原型：", pro2);
console.log("ProvincePerson.原型：", pro3);
console.log("ProvincePerson.原型.原型: ", pro3_china);
console.log("ProvincePerson.原型.原型.原型: ", pro3_person);
console.log("ProvincePerson.原型.原型.原型.原型：", pro3_object);
console.log("ProvincePerson.原型.原型 === ChinaPerson.原型 --> ", pro3_china === pro2);
console.log("ProvincePerson.原型.原型.原型 === Person.原型 --> ", pro3_person === pro1);
console.log("ProvincePerson.原型.原型.原型.原型 === Object.原型 --> ", pro3_object === Object.prototype);
console.log("Function.prototype === Function.__proto__ --> ", Function.prototype === pro_function);
console.log("Object.__proto__ === Function.prototype --> ", pro_object === Function.prototype);
console.log("************ 测试 end ************\n")


//第二波测试，测试构造函数的继承 和 多态（重写从父级继承下来的属性或方法）
console.log("\n************* 继承和重写 start ************");
console.log(">>>>>>准备创建一个Person实例对象>>>>>");
var per = new Person("王大锤");  
per.methodPerson();
per.run();
console.log("*****Person实例对象测试结论：构造函数和原型有同名属性或方法，实例对象优先调用构造函数的属性或方法*****\n");

console.log("\n>>>>>准备创建一个ChinaPerson实例对象，ChinaPerson继承了Person >>>>>");
var chObj = new ChinaPerson("中国人", "黄色");
chObj.methodChinaPerson();
chObj.write();
chObj.methodPerson();
chObj.run();
console.log("*****ChinaPerson实例对象测试结论：继承自父类Person， 拥有父类所有对外的构造函数里面和原型里面的属性和方法\n");

console.log("\n>>>>>准备创建一个ProvincePerson实例对象，ProvincePerson继承了ChinaPerson>>>>>");
var proObj = new ProvincePerson("湖南人", "黄色", 888);
proObj.methodProvincePerson();
proObj.eat();
proObj.methodChinaPerson();
proObj.write();
proObj.methodPerson();
proObj.run();
console.log("*****ProvincePerson实例对象测试结论：拥有父级和父级的父级的所有对外的，包括构造函数里面和原型里面的属性和方法；另外也可以对父级属性或方法进行重写");
console.log("************  测试 end ************\n");