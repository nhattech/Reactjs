import { createStore } from 'redux';

//create store
const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type === 'increment') {
    return {
      counter: state.counter + 1,
    };
  }
  if (action.type === 'descrement') {
    return {
      counter: state.counter - 1,
    };
  }

  if (action.type === 'increase') {
    return {
      counter: state.counter + action.value,
    };
  }

  return state;
};
const store = createStore(counterReducer);

export default store;
