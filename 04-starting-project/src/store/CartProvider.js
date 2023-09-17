import { useReducer } from 'react';
import CartContext from './cart-context';

//.......
const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (prevState, action) => {
  if (action.type === 'ADD') {
    const updateTotalAmount =
      prevState.totalAmount + action.item.amount * action.item.price;

    const existingCartItemIndex = prevState.items.findIndex((item) => {
      return item.id === action.item.id;
    });

    const existingCartItem = prevState.items[existingCartItemIndex];
    let updateItems;
    if (existingCartItem) {
      const updateItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updateItems = [...prevState.items];
      updateItems[existingCartItemIndex] = updateItem;
    } else {
      updateItems = prevState.items.concat(action.item);
    }

    return {
      items: updateItems,
      totalAmount: updateTotalAmount,
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemHandler = (item) => {
    dispatchCartAction({ type: 'ADD', item: item });
  };
  const removeItemHandler = (id) => {};

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
