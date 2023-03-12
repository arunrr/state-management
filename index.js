function todos(state, action) {
    if (state === void 0) { state = []; }
    if (action.type === "ADD_TODO") {
        state = state.filter(function (item) { return action.payload.id !== item.id; });
        state = state.concat(action.payload);
    }
    return state;
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
var store = createStore(todos);
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
        id: 0,
        name: "My first todo",
        complete: true
    }
});
