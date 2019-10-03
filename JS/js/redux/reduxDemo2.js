/**
 * 对demo1进行封装，完善redux
 * */
 const createStore = function(initState){
     let state = initState;  //初始目标对象
    let listeners = []; //记录订阅者

    //获取state对象的对外公开接口
    function getState(){
        return state;
    }

    //记录订阅者
    function subscribe(listener){
        listeners.push(listener);
    }

    //修改state对象
    function changeState(newState){
        state = newState;

        //通知所有订阅者，state已修改
        for (let i = 0; i < listeners.length; i++){
            listeners[i]();
        }
    }

    //返回对外公开的方法
    return { getState, subscribe, changeState }
}


console.log("\n\n***********测试 start************")
let state = { count: 0 } //初始对象
let store = createStore(state);

 //1、添加若干订阅者
store.subscribe(()=>{
    console.log(`我是订阅者1号，想查看count最新值：${store.getState().count}`);
})
store.subscribe(()=>{
    console.log("我是订阅者2号，想查看count最新值：", store.getState().count);
});


//2、修改state值
store.changeState({ ...store.getState(),  count: 99 }); //第一次修改
console.log("\n")
//第二次修改
store.changeState({ ...store.getState(), count: 60 });
//第三次修改
store.changeState({ ...store.getState(), count: "hell world" });
