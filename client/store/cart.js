import axios from "axios";

//action type
const SET_CART = "SET_CART";

//action creator- fetch all products
const setCart = (cart) => {
  return {
    type: SET_CART,
    cart,
  };
};

//fetch individual cart thunk
export const fetchCart = (id) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/cart/${id}`);
      dispatch(setCart(data));
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
    default:
      return state;
  }
}