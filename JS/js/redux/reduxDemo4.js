/**
 * 代码和demo3的代码差不多的，但是我们这里现在变化一下名字：
 * 原plan方法改名为reducer, 原changeState改名为dispatch .
 * 不管你同不同意，反正我要改名字, 因为新名字比较酷（哈哈，其实是redux就是这么叫的）
 * */
const createStore = function(reducer, initState){
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
    function dispatch(action){
        //通过计划方法过滤不在计划内的行为操作
        state = reducer(state, action);

        //通知所有订阅者，state已修改
        for (let i = 0; i < listeners.length; i++){
            listeners[i]();
        }
    }

    //返回对外公开的方法
    return { getState, subscribe, dispatch }
}

//计划方法 （约束方法）
function reducer(initState, action){
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
let store = createStore(reducer, state);
console.log(store.getState());

//1、添加若干订阅者
store.subscribe(()=>{
    console.log(`我是订阅者1号，count：${store.getState().count}`);
})
store.subscribe(()=>{
    console.log("我是订阅者2号，想查看count最新值：", store.getState().count);
});


//2、修改state值
store.dispatch({ type: "increment" }); //第一次修改++
console.log("\n")
//第二次修改
store.dispatch({ type: "decrement" }); //第二次修改--
console.log("\n")
//第三次修改
store.dispatch({ type: "abc" }); //第二次修改 'abc'，不在计划内的修改，拒绝修改