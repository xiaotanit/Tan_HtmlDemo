/**
 * 在demo8 的基础上, 再进行改造
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

    //初始化state, 因为Symbol()不匹配其他的type, 则传入每个reducer的state都是undefined, 则在每个reducer里面每个state会被初始化
    dispatch({ type: Symbol() });

    //返回对外公开的方法
    return { getState, subscribe, dispatch }
}


//扩展方法处理
function bindActionCreator(actionCreator, dispatch){
    return function(){
        dispatch(actionCreator.apply(this, arguments));
    }
}
/* actionCreators 必须是 function 或 object */
function bindActionCreators(actionCreators, dispatch){
    if (typeof actionCreators === 'function'){
        return bindActionCreator(actionCreators, dispatch);
    }

    if (typeof actionCreators !== 'object' || actionCreators === null){
        throw new Error();
    }

    const keys = Object.keys(actionCreators);
    const actions = {};
    for (let i = 0; i < keys.length; i++){
        const key = keys[i];
        const actionCreator = actionCreators[key];
        if (typeof actionCreator === 'function'){
            actions[key] = bindActionCreator(actionCreator, dispatch);
        }
    }
    return actions;
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
    let keys = Object.keys(reducers); //取出所有reducer的key

    //传入原state和action, 返回新的state
    return function(state = {}, action){
        let nextState = {}; //存储修改后的state
        for (let i = 0; i < keys.length; i++){
            let key = keys[i];
            let reducer = reducers[key]; //取出单个reducer
            let currentState =  state[key]; //取出单个状态
            let singleState = reducer(currentState, action); //如果reducer和action匹配，则修改返回最新的state
            nextState[key] = singleState;  //将修改后的state存入nextState
        }
        return nextState;
    }
}


console.log("\n\n***********测试 start************")
const reducer = combineReducers({
    counter: countReducer,
    info: infoReducer
})
const store = createStore(reducer);
//添加订阅者
store.subscribe(()=>{
    console.log(`\n我是订阅者1号：${JSON.stringify(store.getState())}\n`);
})

/* 返回 action 的函数就叫actionCreator */
function increment(){
    return { type: "increment"}
}
function setName(name){
    return { type: "set_name", name: name }
}

const actions = bindActionCreators({ increment, setName }, store.dispatch);
// const actions = {
//     increment: function(){
//         return store.dispatch(increment.apply(this, arguments));
//     },
//     setName: function(){
//         return store.dispatch(setName.apply(this, arguments));
//     }
// }
/////这样可以把actions传到任何地方去，任何地方在实现自增的时候，根本不知道dispatch、actionCreator等细节

// //解析写法
// function bindActionCreators(actionCreators, dispatch){
//     const keys = Object.keys(actionCreators);
//     const actions = {};
//     for (let i = 0; i < keys.length; i++){
//         const key = keys[i];
//         const actionCreator = actionCreators[key];
//         if (typeof actionCreator === 'function'){
//             //actions[key] = bindActionCreator(actionCreator, dispatch);
//             //等价于
//             actions[key] = function(){
//                 dispatch(actionCreator.apply(this, arguments));
//                 /**
//                  * 等价于
//                  * dispatch({ type: "increment" })
//                  * dippatch({ type: "set_name", name: name})
//                  */
//             }
//         }
//     }
//     return actions;
// }

actions.increment();
actions.setName("岳云鹏")