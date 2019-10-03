/**
 * 在demo4的基础上，进行多个（2个）状态的管理
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
            return { ...initState, counter: {...initState.counter, count: ++initState.counter.count } }
            break;
        case "decrement":
            return { ...initState, counter: {...initState.counter, count: initState.counter.count-9 } }
            break;
        case "set_name":
            return {...initState, info: {...initState.info, name: action.name }}
            break;
        case "set_desc":
            return {...initState, info: {...initState.info, desc: action.desc }}
            break;
        default:
            return initState;
            break;
    }
}


console.log("\n\n***********测试 start************")
//初始化2个状态
let state = {
    counter: { count: 99 },
    info: {
        name: "张翼德",
        desc: "身长八尺,豹头环眼,燕颔虎须,声若巨雷,势如奔马"
    }
}
let store = createStore(reducer, state);
console.log(store.getState());

//1、添加若干订阅者
store.subscribe(()=>{
    console.log(`我是订阅者1号：${JSON.stringify(store.getState())}`);
})
store.subscribe(()=>{
    console.log(`我是订阅者2号：${JSON.stringify(store.getState())}`);
});


//2、修改state值
store.dispatch({ type: "increment" }); //第一次修改++
console.log("\n")
//第二次修改
store.dispatch({ type: "decrement" }); //第二次修改--
console.log("\n")
//第三次修改
store.dispatch({ type: "set_name", name: "岳飞" });
console.log("\n")
//第四次修改
store.dispatch({ type: "set_desc", desc: "南宋时期抗金名将、军事家、战略家、民族英雄、书法家、诗人，位列南宋“中兴四将”之首" });