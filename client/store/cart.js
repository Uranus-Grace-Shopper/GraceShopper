import axios from "axios";

//action type
const SET_CART = "SET_CART";
const ADD_NEW_PRODUCTS_TO_CART = "ADD_NEW_PRODUCTS_TO_CART";
const CHECK_OUT = "CHECKOUT";

const TOKEN = "token";

//action creator- fetch all products
const setCart = (cartItems) => {
  return {
    type: SET_CART,
    cartItems,
  };
};

// action creator - add a product to cart
const addNewProductsToCart = (cartItem) => {
  return {
    type: ADD_NEW_PRODUCTS_TO_CART,
    cartItem,
  };
};

// action creator - checkout for loggedin user
const checkOut = (cart) => {
  return {
    type: CHECK_OUT,
    cart,
  };
};

//fetchCart thunk
export const fetchCart = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data } = await axios.get(`/api/cart/`, {
        headers: {
          authorization: token,
        },
      });
      //this returns an array of products in the cart
      //console.log("data >>>>>>>>", data.products);
      dispatch(setCart(data.products));
    } catch (err) {
      console.log(err);
    }
  };
};

//add a product to cart thunk
export const addingProductsToCart = (id) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      console.log("+++++++++", token);
      const { data } = await axios.post(`/api/products/${id}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(addNewProductsToCart(data));
    } catch (err) {
      console.log(err);
    }
  };
};

//checkout thunk
export const checkoutAll = (cart) => {
  const token = window.localStorage.getItem("token");
  //console.log("token========",token)
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/cart/checkout`, cart, {
        headers: {
          authorization: token,
        },
      });
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
      return action.cartItems;
    case ADD_NEW_PRODUCTS_TO_CART:
      return [...state, action.cartItem];
    case CHECK_OUT:
      return action.cart;
    // return state.filter((product)=>product.id !==action.product.id)
    default:
      return state;
  }
}
