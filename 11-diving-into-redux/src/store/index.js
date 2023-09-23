import { createSlice, configureStore } from '@reduxjs/toolkit';
// import { createStore } from 'redux';
const initialState = {
  counter: 0,
  showCounter: true,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState: initialState,
  reducers: {
    increment(state) {
      state.counter++;
    },
    increase(state) {
      state.counter--;
    },
    descrement(state, action) {
      state.counter = state.counter + action.amount;
    },
    toggle(state) {
      state.showCounter = !state.showCounter;
    },
  },
});
//create store
const store = configureStore({
  reducer: counterSlice.reducer,
});

export default store;
