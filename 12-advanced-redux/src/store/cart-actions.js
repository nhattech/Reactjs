import { cartActions } from './cart-slice';
import { uiActions } from './ui-slice';

//Using an Action Creator Thunk.....//
//save cart data to database
export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: 'sending',
        title: 'Sending...',
        message: 'Sending cart data.',
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        'https://react-http-e6eb6-default-rtdb.firebaseio.com/cart.json',
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Sending cart data failed.');
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Susscess!',
          message: 'Sent cart data successfully.',
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error...',
          message: error.message,
        })
      );
    }
  };
};

//load cart data
export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchRequest = async () => {
      const response = await fetch(
        'https://react-http-e6eb6-default-rtdb.firebaseio.com/cart.json'
      );

      if (!response.ok) {
        throw new Error('Could not fetch cart data!');
      }

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchRequest();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error...',
          message: error.message,
        })
      );
    }
  };
};
