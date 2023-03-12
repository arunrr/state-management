var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function todos(state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        case "ADD_TODO":
            return state.concat(action.payload);
        case "REMOVE_TODO":
            return state.filter(function (item) { return item.id !== action.payload.id; });
        case "TOGGLE_TODO":
            return state.map(function (item) {
                return item.id !== action.payload.id
                    ? item
                    : __assign(__assign({}, item), { complete: !item.complete });
            });
        default:
            return state;
    }
}
function goals(state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        case "ADD_GOAL":
            return state.concat(action.payload);
        case "REMOVE_GOAL":
            return state.filter(function (item) { return item.id !== action.payload.id; });
        case "TOGGLE_GOAL":
            return state.map(function (item) {
                return item.id !== action.payload.id
                    ? item
                    : __assign(__assign({}, item), { complete: !item.complete });
            });
        default:
            return state;
    }
}
function app(state, action) {
    if (state === void 0) { state = {
        todos: [],
        goals: []
    }; }
    return {
        todos: todos(state["todos"], action),
        goals: goals(state["goals"], action)
    };
}
// State management function
function createStore(reducer) {
    // State of the application
    var state;
    // Keeps track of all the subscribed functions
    var listeners = [];
    // Get the state info
    var getState = function () { return state; };
    // Subscribe to the state and returns a method to unsubscribe from state
    var subscribe = function (listener) {
        listeners.push(listener);
        return function () {
            listeners = listeners.filter(function (l) { return l !== listener; });
        };
    };
    // Dispatch will call reducer and change state based on action
    var dispatch = function (action) {
        state = reducer(state, action);
        listeners.forEach(function (listener) { return listener(); });
    };
    return {
        getState: getState,
        subscribe: subscribe,
        dispatch: dispatch
    };
}
// Implementation of state management function
var store = createStore(app);
var unsubscribe = store.subscribe(function () {
    return console.log("The state is: ".concat(store.getState()));
});
store.dispatch({
    type: "ADD_TODO",
    payload: {
        id: 0,
        name: "My first todo",
        complete: false
    }
});
store.dispatch({
    type: "ADD_TODO",
    payload: {
        id: 1,
        name: "My second todo",
        complete: false
    }
});
store.dispatch({
    type: "ADD_TODO",
    payload: {
        id: 2,
        name: "My third todo",
        complete: false
    }
});
store.dispatch({
    type: "TOGGLE_TODO",
    payload: {
        id: 0,
        name: "My first todo",
        complete: true
    }
});
store.dispatch({
    type: "REMOVE_TODO",
    payload: {
        id: 1
    }
});
store.dispatch({
    type: "ADD_GOAL",
    payload: {
        id: 0,
        name: "My first Goal",
        complete: false
    }
});
store.dispatch({
    type: "ADD_GOAL",
    payload: {
        id: 1,
        name: "My second Goal",
        complete: false
    }
});
store.dispatch({
    type: "ADD_GOAL",
    payload: {
        id: 2,
        name: "My third Goal",
        complete: false
    }
});
store.dispatch({
    type: "REMOVE_GOAL",
    payload: {
        id: 1
    }
});
store.dispatch({
    type: "TOGGLE_GOAL",
    payload: {
        id: 0
    }
});
