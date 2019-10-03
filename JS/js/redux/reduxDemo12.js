/**
 * 在demo10 的基础上, 对中间件进行优化，让使用更美好
 * */
const createStore = function(reducer, initState, rewriteCreateStoreFunc){

    if (typeof initState === 'function' && typeof rewriteCreateStoreFunc === 'undefined'){
        rewriteCreateStoreFunc = initState;
        initState = undefined;
    }
    //是否需要重写createStore
    if (rewriteCreateStoreFunc){
        var newCreateStore = rewriteCreateStoreFunc(createStore);
        return newCreateStore(reducer, initState);
    }

    let state = initState;  //初始目标对象
    let listeners = []; //记录订阅者

    //获取state对象的对外公开接口
    function getState(){
        return state;
    }

    //记录订阅者
    function subscribe(listener){
        listeners.push(listener);
        //删除订阅者
        return function unsubscribe(){
            const index = listener.indexOf(listener);
            listener.splice(index, 1);
        }
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

    function replaceReducer(nextReducer){
        reducer = nextReducer;
        dispatch({ type: Symbol() });
    }

    //初始化state, 因为Symbol()不匹配其他的type, 则传入每个reducer的state都是undefined, 则在每个reducer里面每个state会被初始化
    dispatch({ type: Symbol() });

    //返回对外公开的方法
    return { getState, subscribe, dispatch, replaceReducer }
}

function compose(...funcs) {
    if (funcs.length === 0) {
        return arg => arg
    }

    if (funcs.length === 1) {
        return funcs[0]
    }

    return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

//对中间件进行统一管理
function applyMiddleware(...middlewares){
    return function(oldCreateStore){
        return function(reducer, initState){
            const store = oldCreateStore(reducer, initState);
            //相当于给每个middleware传store, 比如const loggerDis = loggerMiddleware(store);
            const simpleStore = { getState: store.getState };
            const mids = middlewares.map(middleware => middleware(store));
            const dispatch = compose(...mids)(store.dispatch);
            return { ...store, dispatch }
        }
    }
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


//dispach的扩展：增加日志、捕获异常、输出当前时间戳
const loggerMiddleware = (store) => (next) => (action)=>{
    console.log("......日志打印....store.getState(): ", JSON.stringify(store.getState()))
    console.log("action--> ", JSON.stringify(action));
    next(action);
    console.log("nextState: ", JSON.stringify(store.getState()));
}
const exceptionMiddlware = (store)=>(next)=>(action)=>{
    try{
        next(action)
    }
    catch(e){
        console.log("异常现象：", e)
    }
}
const timeMiddleware = (store)=>(next)=>(action)=>{
    console.log("。。。当前时间戳： ", (new Date()).getTime());
    next(action);
}
// function timeMiddleware2(store){ //等同写法
//     return function(next){
//         return function(action){
//             console.log("。。。当前时间戳： ", (new Date()).getTime());
//             next(action);
//         }
//     }
// }


console.log("\n\n***********测试 start************")
var reducers = combineReducers({ counter: countReducer})
var rewriteCreateStoreFunc = applyMiddleware(loggerMiddleware, exceptionMiddlware, timeMiddleware);
var store = createStore(reducers, {}, rewriteCreateStoreFunc);
//添加订阅者
store.subscribe(()=>{
    console.log(`\n我是订阅者1号：${JSON.stringify(store.getState())}\n`);
})

//修改state值
store.dispatch({ type: "increment" }); //第一次修改++
console.log("\n\n")
store.dispatch({ type: "decrement" }); //第二次修改--
console.log("\n")
