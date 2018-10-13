// 1. Mantener un arbol de estados
// 2. Funcion obtener el estado
// 3. Funcion para escuchar un estado
// 4. Funcion actualizar estado

/**
 * Redux Library
 */

function createStore(reducer) {
  let state;
  let listeners = [];

  const getState = () => state;
  const subscribe = listener => {
    listeners.push(listener);
    return () => {
      console.log("unsubscribe");
      listeners = listeners.filter(l => l !== listener);
    };
  };
  const dispatch = action => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };
  return {
    getState,
    subscribe,
    dispatch
  };
}

/**
 * Reduce Functions
 */

/**
 *
 * @param {*} state: string
 * @param {*} action{type, todo}
 */

function reducerTodo(state = [], action) {
  console.log("Corriendo TODO");
  if (action.type === "ADD_TODO") {
    return state.concat([action.todo]);
  } else if (action.type === "REMOVE_TODO") {
    return state.filter(todo => todo.id !== action.id);
  } else if (action.type === "TOGGLE_TODO") {
    return state.map(
      todo =>
        todo.id !== action.id
          ? todo
          : Object.assign({}, todo, { complete: !todo.complete })
    );
  }
  return state;
}

function reducerGoal(state = [], action) {
  console.log("Corriendo GOAL");
  switch (action.type) {
    case "ADD_GOAL":
      return state.concat([action.goal]);
    case "REMOVE_GOAL":
      return state.filter(goal => goal.id !== action.id);
    default:
      return state;
  }
}

function app(state = {}, action) {
  return {
    todos: reducerTodo(state.todos, action),
    goals: reducerGoal(state.goals, action)
  };
}

/**
 * APP
 */

const store = createStore(reducerTodo);
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch({
  type: "ADD_TODO",
  todo: {
    id: 0,
    name: "Learn Redux",
    complete: false
  }
});

store.dispatch({
  type: "ADD_TODO",
  todo: {
    id: 1,
    name: "Learn React Native",
    complete: false
  }
});

// store.dispatch({
//   type: "ADD_TODO",
//   todo: {
//     id: 2,
//     name: "Learn Webpack 4",
//     complete: false
//   }
// });

// store.dispatch({
//   type: "ADD_TODO",
//   todo: {
//     id: 3,
//     name: "Regular Expressions",
//     complete: false
//   }
// });

// store.dispatch({
//   type: "REMOVE_TODO",
//   id: 2
// });

// store.dispatch({
//   type: "TOGGLE_TODO",
//   id: 0
// });

// store.dispatch({
//   type: "ADD_GOAL",
//   goal: {
//     id: 0,
//     name: "Sell my car"
//   }
// });

// store.dispatch({
//   type: "ADD_GOAL",
//   goal: {
//     id: 1,
//     name: "Buy a book"
//   }
// });

// unsubscribe();
