/**
 * 在demo5 的基础上，对多个状态进行拆分管理
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

//计划方法 （约束方法）1，对count状态进行管理
function countReducer(initState, action){
    if (!initState) {
        initState = { count: 99 }
    }
    switch(action.type){
        case "increment":
            return { ...initState, count: ++initState.count }
            break;
        case "decrement":
            return { ...initState, count: initState.count-9 }
            break;
        default:
            return initState;
            break;
    }
}
//计划方法 （约束方法）2，对info状态进行管理
function infoReducer(initState, action){
    if (!initState){
        initState = { name: "张翼德", desc: "身长八尺,豹头环眼,燕颔虎须,声若巨雷,势如奔马" }
    }
    switch(action.type){
        case "set_name":
            return {...initState, name: action.name }
            break;
        case "set_desc":
            return {...initState, desc: action.desc }
            break;
        default:
            return initState;
            break;
    }
}
//合并计划方法，对多个状态约束方法进行合并
function combineReducers(reducers){
    var keys = Object.keys(reducers); //取出所有reducer的key

    //传入原state和action, 返回新的state
    return function(state = {}, action){
        var nextState = {}; //存储修改后的state
        for (var i = 0; i < keys.length; i++){
            var key = keys[i];
            var reducer = reducers[key]; //取出单个reducer
            var currentState =  state[key]; //取出单个状态
            var singleState = reducer(currentState, action); //如果reducer和action匹配，则修改返回最新的state
            nextState[key] = singleState;  //将修改后的state存入nextState
        }
        return nextState;
    }
}



console.log("\n\n***********测试 start************")
//初始化2个状态
let state = {
    counter: { count: 99 },
    info: { name: "张翼德", desc: "身长八尺,豹头环眼,燕颔虎须,声若巨雷,势如奔马" }
}
//合并reducer
var reducers = combineReducers({
    counter: countReducer,
    info: infoReducer
})

let store = createStore(reducers, state); //传入合并reducer和初始数据

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