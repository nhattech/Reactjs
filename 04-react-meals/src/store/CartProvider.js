import { useReducer } from 'react';
import CartContext from './cart-context';

//.......
const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (prevState, action) => {
  if (action.type === 'ADD') {
    const existingCartItemIndex = prevState.items.findIndex((item) => {
      return item.id === action.item.id;
    });
    const existingCartItem = prevState.items[existingCartItemIndex];
    const updateTotalAmount =
      prevState.totalAmount + action.item.amount * action.item.price;

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
  if (action.type === 'REMOVE') {
    const existingCartItemIndex = prevState.items.findIndex((item) => {
      return item.id === action.id;
    });
    const existingCartItem = prevState.items[existingCartItemIndex];
    const updateTotalAmount = prevState.totalAmount - existingCartItem.price;
    let updateItems;
    if (existingCartItem.amount === 1) {
      updateItems = prevState.items.filter((item) => {
        return item.id !== action.id;
      });
    } else {
      const updateItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updateItems = [...prevState.items];
      updateItems[existingCartItemIndex] = updateItem;
    }

    return {
      items: updateItems,
      totalAmount: updateTotalAmount,
    };
  }

  if (action.type === 'CLEAR') {
    return defaultCartState;
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
  const removeItemHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE', id: id });
  };
  const clearCartHandler = () => {
    dispatchCartAction({ type: 'CLEAR' });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
