import axios from "axios";

//action type
const SET_CART = "SET_CART";
const CHECK_OUT = " CHECK_OUT "
//action creator- fetch all products
const setCart = (cart) => {
  return {
    type: SET_CART,
    cart,
  };
};

//action creator- checkout cart items
const checkOut = (cartItems) => {
  return {
    type: SET_CART,
    cartItems,
  };
};


//fetch individual cart thunk
export const fetchCart = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/cart/${id}`);
      console.log("axios data for cart>>>>", data);
      dispatch(setCart(data));
    } catch (err) {
      console.log(err);
    }
  };
};

//fetch individual cart thunk
export const checkoutCart = (cart, userId) => {
  return async (dispatch) => {
    try {
      const { data: updated } = await axios.put(`/api/cart/checkout/${userId}`, cart);
      //console.log("axios data for cart>>>>", data);
      dispatch(checkOut(updated));
    } catch (err) {
      console.log(err);
    }
  };
};
const initialState = [];

//reducer

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return action.cart;
        case CHECK_OUT:
          return action.cartItems;
    default:
      return state;
  }
}
