import { useDispatch, useSelector } from 'react-redux';
import classes from './Counter.module.css';

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);
  const show = useSelector((state) => state.showCounter);

  const toggleCounterHandler = () => {
    dispatch({ type: 'toggle' });
  };

  const incrementHandler = () => {
    dispatch({ type: 'increment' });
  };
  const descrementHandler = () => {
    dispatch({ type: 'descrement' });
  };

  const increaseHandler = () => {
    dispatch({ type: 'increase', value: 5 });
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={descrementHandler}>Descrement</button>
        <button onClick={increaseHandler}>Increase 5</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
