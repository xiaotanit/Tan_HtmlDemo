//用户信息
Mock.mock(/userInfo/, {
  status: 200,
  data:{
    userName: "王大锤",
    userSign: "石破天锤，地动山摇;"
  }
})

//版本信息
Mock.mock(/storeInfo/, { "code": "000000", "data": { "orgXcxType": 3, "topOrgId": 89043, "orgName": "专业版小程序测试89043", "postType": 1, "orgLevel": 1, "orgFullName": "手边加盟店", "userName": "8904300001", "userId": 683, "orgId": 89043, "orgType": 3, "mobilePhone": null, "staffName": "简历", "userType": 2, "staffId": 683 }, "currentTimes": 1532436470527, "msg": "操作成功" })


/**
 模板
// 属性名   name
// 生成规则 rule
// 属性值   value
'name|rule': value

属性名 和 生成规则 之间用竖线 | 分隔。
生成规则 是可选的。
生成规则 有 7 种格式：
'name|min-max': value //通过重复value生成一个字符串，重复次数>=min, <max ;value用来确定类型，字符串表示生成字符串，数值只能表示这个是 数字类型
'name|count': value  //重复value生成一个字符串，重复次数count
'name|min-max.dmin-dmax': value  //生成一个浮点数，整数部分>=min，<max；小数部分保留dmin到dmax位
'name|min-max.dcount': value  //整数部分>=min,<max； 小数部分保留dcount位小数
'name|count.dmin-dmax': value  //多少个数，小数部分最少保留dmin位数，最多保留dmax位数
'name|count.dcount': value    //多少个数，保留dcount位小数
'name|+step': value   //属性值自动加step, 初始值为value

生成规则 的 含义 需要依赖 属性值的类型 才能确定。
属性值 中可以含有 @占位符。
属性值 还指定了最终值的初始值和类型。


1. 属性值是字符串 String
  1.1、'name|min-max': string
    通过重复 string 生成一个字符串，重复次数大于等于 min，小于等于 max。
  1.2、'name|count': string
    通过重复 string 生成一个字符串，重复次数等于 count。

2. 属性值是数字 Number
  2.1、'name|+1': number
    属性值自动加 1，初始值为 number。
  2.2、'name|min-max': number
    生成一个大于等于 min、小于等于 max 的整数，属性值 number 只是用来确定类型。
  2.3、'name|min-max.dmin-dmax': number
    生成一个浮点数，整数部分大于等于 min、小于等于 max，小数部分保留 dmin 到 dmax 位。

3. 属性值是布尔型 Boolean
  3.1、'name|1': boolean
    随机生成一个布尔值，值为 true 的概率是 1/2，值为 false 的概率同样是 1/2。
  3.2、'name|min-max': value
    随机生成一个布尔值，值为 value 的概率是 min / (min + max)，值为 !value 的概率是max / (min + max)。

4. 属性值是对象 Object
  4.1、'name|count': object
    从属性值 object 中随机选取 count 个属性。
  4.2、'name|min-max': object
    从属性值 object 中随机选取 min 到 max 个属性。

5. 属性值是数组 Array
  5.1、'name|1': array
    从属性值 array 中随机选取 1 个元素，作为最终值。
  5.2、'name|+1': array
    从属性值 array 中顺序选取 1 个元素，作为最终值。
  5.3、'name|min-max': array
    通过重复属性值 array 生成一个新数组，重复次数大于等于 min，小于等于 max。
  5.4、'name|count': array
    通过重复属性值 array 生成一个新数组，重复次数为 count。

6. 属性值是函数 Function
  6.1、'name': function
    执行函数 function，取其返回值作为最终的属性值，函数的上下文为属性 'name' 所在的对象。

7. 属性值是正则表达式 RegExp
  7.1、'name': regexp
    根据正则表达式 regexp 反向生成可以匹配它的字符串。用于生成自定义格式的字符串。

 */

Mock.mock(/testOne/, {
  'list|10':[{     //10表示list数组长度为10，即这个数组有10个元素
    'id|+1': 3,   //初始值为3，每次加1 
    'score|1-99.0-2': 0, //产生浮点数，整数部分在1-99之间；小数位数最多保留2位，最少不保留位数
    'exp|0-10.1': 0, //产生一个浮点数，浮点数小数保留1位
    'age|18-60': 0,   //产生一个整数，数的值在18-60之间
    'info|0-5': '大锤,',   //重复"大锤“，重复的次数为0-5次之间
    'isOK|1': false  //随机生成一个布尔值，值为true和false的概率都是1/2
  }]
});
//测试属性值是对象 Object
Mock.mock(/testTwo/, {
  'list|10': [{ 
    'id|+1': 3,
    'obj|3':{ height: 180, weight: 75, age: 18, sex: '男', grade: 3 }
  }]
});
//测试属性值为数组 Array
Mock.mock(/testThree/, { 
  'list|3': [{ 
    'team|1': [{name:'小明', age:22}, { name: '小红', age: 18}, {name: '小龙', age: 21}],
    'org|+1': [{ name: '小明', age: 22 }, { name: '小红', age: 18 }, { name: '小龙', age: 21 }],
    'fac|0-5': [{ name: '小明', age: 22 }, { name: '小红', age: 18 }],
    'state|2': [{ name: '小明', age: 22 }, { name: '小红', age: 18 }],
  }]
});
//测试属性值为function和正则RegExp
Mock.mock(/testFour/, {
  'list|1': [{
    'name': function(){
      return parseInt(Math.random()*100)%2 == 0 ? '王大锤' : '罗小虎'
    },
    'regOne': /[a-z][A-Z]\d\s\w\W\d{1,5}/,
    'regTwo': /\d{3}\w{3}\d{2}\?{1,3}/
  }]
});
