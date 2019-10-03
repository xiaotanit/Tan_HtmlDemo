 /**
  * 从0实现一个redux。
  * 应用场景描述：针对某一个数据，有好几个对象（订阅者）对这个数据感兴趣，提前进行订阅。
  * 当这个数据进行变化的时候，通知所有订阅者告诉他们数据发生改变了
  * */
 let state = { count: 0 } //目标对象
 let listeners = []; //用来记录订阅者

 //订阅成为state数据变化的监听者
 function subscibe(listener){
     listeners.push(listener);
 }

 //改变state对象的值，通知通知订阅者
 function changeState(newState){
     state = newState;
     //通知所有订阅者state对象有变化
     for (let i = 0; i < listeners.length; i++){
         listeners[i]();
     }
 }


console.log("\n\n*************测试 start***************")
 //1、添加若干订阅者
 subscibe(()=>{
     console.log(`我是订阅者1号，想看count最新值：${state.count}`);
 })
 subscibe(()=>{
     console.log("我是订阅者2号，想看count最新值: ", state.count);
 })

 //2、修改state值，查看效果
 changeState({ ...state, count: 99 }); //第一次修改
 console.log("\n")
 //第二次修改
 changeState({ ...state, count: 60 })
