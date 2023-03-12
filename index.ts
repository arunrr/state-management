type Payload = {
  id: number;
  name?: string;
  complete?: boolean;
};

type Actions = "ADD" | "REMOVE" | "TOGGLE";

type TodoActionTypes = `${Actions}_TODO`;
type GoalActionTypes = `${Actions}_GOAL`;

type TotalActionTypes = `${TodoActionTypes}` | `${GoalActionTypes}`;

type State = {
  todos: Payload[];
  goals: Payload[];
};

type Action = {
  type: TotalActionTypes;
  payload: Payload;
};

type TodoState = State["todos"];
type GoalState = State["goals"];

// Reducer functions
function todos(state: TodoState = [], action: Action) {
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

function goals(state: GoalState = [], action: Action) {
  switch (action.type) {
    case "ADD_GOAL":
      return state.concat(action.payload);
    case "REMOVE_GOAL":
      return state.filter((item) => item.id !== action.payload.id);
    case "TOGGLE_GOAL":
      return state.map((item) =>
        item.id !== action.payload.id
          ? item
          : { ...item, complete: !item.complete }
      );
    default:
      return state;
  }
}

function app(
  state: State = {
    todos: [],
    goals: [],
  },
  action: Action
): State {
  return {
    todos: todos(state["todos"], action),
    goals: goals(state["goals"], action),
  };
}

// State management function
function createStore(reducer: Function) {
  // State of the application
  let state: State;
  // Keeps track of all the subscribed functions
  let listeners: Function[] = [];

  // Get the state info
  const getState = () => state;

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

const ADD_TODO = "ADD_TODO";
const REMOVE_TODO = "REMOVE_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const ADD_GOAL = "ADD_GOAL";
const REMOVE_GOAL = "REMOVE_GOAL";
const TOGGLE_GOAL = "TOGGLE_GOAL";

// Action creator functions
function addTodo(todo: Payload): Action {
  return {
    type: ADD_TODO,
    payload: todo,
  };
}

function removeTodo(id: number): Action {
  return {
    type: REMOVE_TODO,
    payload: {
      id,
    },
  };
}

function toggleTodo(id: number): Action {
  return {
    type: TOGGLE_TODO,
    payload: {
      id,
    },
  };
}

function addGoal(goal: Payload): Action {
  return {
    type: ADD_GOAL,
    payload: goal,
  };
}

function removeGoal(id: number): Action {
  return {
    type: REMOVE_GOAL,
    payload: {
      id,
    },
  };
}

function toggleGoal(id: number): Action {
  return {
    type: TOGGLE_GOAL,
    payload: {
      id,
    },
  };
}

const store = createStore(app);

const unsubscribe = store.subscribe(() =>
  console.log(`The state is: ${store.getState()}`)
);

store.dispatch(
  addTodo({
    id: 0,
    name: "My first todo",
    complete: false,
  })
);
store.dispatch(
  addTodo({
    id: 1,
    name: "My second todo",
    complete: false,
  })
);
store.dispatch(
  addTodo({
    id: 2,
    name: "My third todo",
    complete: false,
  })
);

store.dispatch(toggleTodo(0));

store.dispatch(removeTodo(1));

store.dispatch(
  addGoal({
    id: 0,
    name: "My first Goal",
    complete: false,
  })
);

store.dispatch(
  addGoal({
    id: 1,
    name: "My second Goal",
    complete: false,
  })
);

store.dispatch(
  addGoal({
    id: 2,
    name: "My third Goal",
    complete: false,
  })
);

store.dispatch(toggleGoal(0));

store.dispatch(removeGoal(1));
