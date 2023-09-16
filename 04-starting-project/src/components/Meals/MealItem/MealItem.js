import { useContext } from 'react';
import MealInputForm from './MealItemForm';
import CartContext from '../../../store/cart-context';

import classes from './MealItem.module.css';

const MealItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  const cartCtx = useContext(CartContext);

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      price: props.price,
      amount: amount,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <div>{props.name}</div>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealInputForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
