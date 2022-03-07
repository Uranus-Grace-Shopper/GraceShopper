import axios from "axios";

//action type
const SET_CART = "SET_CART";
const CHECK_OUT = "CHECKOUT"


//action creator- fetch all products
const setCart = (cart) => {
  return {
    type: SET_CART,
    cart,
  };
};

// action creator - checkout for loggedin user
const checkOut = (cartItmes) => {
  return {
    type: CHECK_OUT,
    cart,
  };
};


//fetch individual cart thunk
// export const fetchCart = (userInfo) => {
//   return async (dispatch) => {
//     try {
//       const { data } = await axios.get(`/api/cart/`, userInfo);
//       // console.log("data >>>>>>>>", data);
//       dispatch(setCart(data));
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };

export const fetchCart = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/cart/`);
      // console.log("data >>>>>>>>", data);
      dispatch(setCart(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const checkoutAll = (cart) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/cart/checkout`,cart);
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
        return action.cartItmes;
    default:
      return state;
  }
}
