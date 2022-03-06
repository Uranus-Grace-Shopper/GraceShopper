import axios from "axios";

//action type
const SET_CART = "SET_CART";
const ADD_NEW_PRODUCTS_TO_CART = "ADD_NEW_PRODUCTS_TO_CART"


//action creator- fetch all products
const setCart = (cart) => {
  return {
    type: SET_CART,
    cart,
  };
};

// action creator - get cart with new products
const addNewProductsToCart = (cart) => {
  return {
    type: ADD_NEW_PRODUCTS_TO_CART,
    cart,
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

export const addingProductsToCart = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/products/${id}`);
      dispatch(addNewProductsToCart(data));
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
    case ADD_NEW_PRODUCTS_TO_CART:
      return [...state, action.cart ]
    default:
      return state;
  }
}
