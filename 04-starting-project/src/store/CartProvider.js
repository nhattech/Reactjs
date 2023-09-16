import CartContext from './cart-context';

const CartProvider = (props) => {
  const addItemHandler = (item) => {
    console.log('Add Item');
  };
  const removeItemHandler = (id) => {
    console.log('Remove Item');
  };
  const cartContext = {
    item: [],
    totalAmount: 0,
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