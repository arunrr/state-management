type Action = {
  type: string;
  payload: {
    id: number;
    name?: string;
    complete?: boolean;
  };
};

type State = Action["payload"][];

function todos(state: State = [], action: Action) {
  switch (action.type) {
    case "ADD_TODO":
      return state.concat(action.payload);
    case "REMOVE_TODO":
      return state.filter((item) => item.id !== action.payload.id);
    case "TOGGLE_TODO":
      return state.map((item) =>
        item.id !== action.payload.id
          ? item
          : { ...item, complete: !item.complete }
      );
    default:
      return state;
  }
}

// State management function
function createStore(reducer: Function) {
  // State of the application
  let state: State;
  // Keeps track of all the subscribed functions
  let listeners: Function[] = [];

  // Get the state info
  const getState: () => State = () => state;

  // Subscribe to the state and returns a method to unsubscribe from state
  const subscribe = (listener: Function) => {
    listeners.push(listener);

    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  // Dispatch will call reducer and change state based on action
  const dispatch = (action: Action) => {
    state = reducer(state, action);

    listeners.forEach((listener) => listener());
  };

  return {
    getState,
    subscribe,
    dispatch,
  };
}

// Implementation of state management function
const store = createStore(todos);

const unsubscribe = store.subscribe(() =>
  console.log(`The state is: ${store.getState()}`)
);

store.dispatch({
  type: "ADD_TODO",
  payload: {
    id: 0,
    name: "My first todo",
    complete: false,
  },
});

store.dispatch({
  type: "ADD_TODO",
  payload: {
    id: 1,
    name: "My second todo",
    complete: false,
  },
});

store.dispatch({
  type: "ADD_TODO",
  payload: {
    id: 2,
    name: "My third todo",
    complete: false,
  },
});

store.dispatch({
  type: "TOGGLE_TODO",
  payload: {
    id: 0,
    name: "My first todo",
    complete: true,
  },
});

store.dispatch({
  type: "REMOVE_TODO",
  payload: {
    id: 1,
  },
});
