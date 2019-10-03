/**
 * 在demo2的测试结果，我们看到，第一二次传的count是数字，第三次传的count是一个字符串“Hello world!”
 * 而可能我们其实只是想
 * 增加约束条件，只对符合预期的可以修改，不符合预期的拒绝修改
 * */
const createStore = function(plan, initState){
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
    function changeState(action){
        //通过计划方法过滤不在计划内的行为操作
        state = plan(state, action);

        //通知所有订阅者，state已修改
        for (let i = 0; i < listeners.length; i++){
            listeners[i]();
        }
    }

    //返回对外公开的方法
    return { getState, subscribe, changeState }
}

//计划方法 （约束方法）
function plan(initState, action){
    switch(action.type){
        case "increment":
            return { ...initState, count: initState.count + 3 }
            break;
        case "decrement":
            return { ...initState, count: initState.count - 9 }
            break;
        default:
            return initState;
            break;
    }
}


console.log("\n\n***********测试 start************")
let state = { count: 90 }//初始对象
let store = createStore(plan, state);
console.log(store.getState());

//1、添加若干订阅者
store.subscribe(()=>{
    console.log(`我是订阅者1号，count：${store.getState().count}`);
})
store.subscribe(()=>{
    console.log("我是订阅者2号，想查看count最新值：", store.getState().count);
});


//2、修改state值
store.changeState({ type: "increment" }); //第一次修改++
console.log("\n")
//第二次修改
store.changeState({ type: "decrement" }); //第二次修改--
console.log("\n")
//第三次修改
store.changeState({ type: "abc" }); //第二次修改 'abc'，不在计划内的修改，拒绝修改