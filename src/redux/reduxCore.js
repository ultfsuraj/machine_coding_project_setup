import { createStore, applyMiddleware, bindActionCreators, combineReducers, compose } from 'redux';

const monitorEnhancer = (createStore) => (reducer, initialState, enhancer) => {
  console.log('entering monitor enhancer');
  const newReducer = (state = initialState, action) => {
    const start = performance.now();
    const newState = reducer(state, action);
    const end = performance.now();
    console.log(action.type + ' executed in ', end - start);
    return newState;
  };
  console.log('exiting monitor enhancer');

  return createStore(newReducer, initialState, enhancer);
};

const middleware1 = (store) => (next) => (action) => {
  console.log('entering middleware 1');
  next(action);
  console.log('exting middleware 1');
};

const middleware2 = (store) => (next) => (action) => {
  console.log('entering middleware 2');
  next(action);
  console.log('exting middleware 2');
};

const enhancer = compose(applyMiddleware(middleware1, middleware2), monitorEnhancer);

const initialState = {
  counter: { value: 0 },
  users: [],
};

// ................................. counter ...............................
const ADD = 'ADD';
const INCREMENT = 'INCREMENT';

const increment = () => ({ type: INCREMENT });
const add = (val) => ({ type: ADD, payload: val });

const counterReducer = (state = initialState.counter, action) => {
  switch (action.type) {
    case ADD:
      return { ...state, value: state.value + action.payload };
    case INCREMENT:
      return { ...state, value: state.value + 1 };
    default:
      return state;
  }
};

// ................................. users ...............................
const ADD_USER = 'ADD_USER';
const REMOVE_USER = 'REMOVE_USER';

const addUser = (name) => ({ type: ADD_USER, payload: name });
const removeUser = (name) => ({ type: REMOVE_USER, payload: name });

const userReducer = (state = initialState.users, action) => {
  switch (action.type) {
    case ADD_USER:
      return [...state, action.payload];
    case REMOVE_USER:
      return state.filter((user) => user != action.payload);
    default:
      return state;
  }
};

const store = createStore(combineReducers(userReducer, counterReducer), initialState, enhancer);
store.subscribe(() => console.log(store.getState()));

export const counterActions = bindActionCreators(
  {
    increment,
    add,
  },
  store.dispatch
);

export const userActions = bindActionCreators(
  {
    addUser,
    removeUser,
  },
  store.dispatch
);

export function storeValues() {
  return store.getState();
}
