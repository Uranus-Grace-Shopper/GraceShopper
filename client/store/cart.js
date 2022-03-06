import axios from "axios";

//action type
const SET_CART = "SET_CART";
const CHECK_OUT = "CHECK_OUT"
//action creator- fetch all products
const setCart = (cart) => {
  return {
    type: SET_CART,
    cart,
  };
};
//action creator checkout
const checkOut = (cartItems) => {
  return {
    type: CHECK_OUT ,
    cartItems,
  };
};
//fetch individual cart thunk
export const fetchCart = (userInfo) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/cart/`, userInfo);
      // console.log("data >>>>>>>>", data);
      dispatch(setCart(data));
    } catch (err) {
      console.log(err);
    }
  };
};
//checkout all items in cart
export const checkoutAll = (cartItems) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/cart/checkout/`, cartItems);
      // console.log("data >>>>>>>>", data);
      dispatch(checkOut(data));
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
