import axios from "axios";

//action type
const ADD_NEW_PRODUCTS_TO_CART = "ADD_NEW_PRODUCTS_TO_CART"

// action creator - get cart with new products
const addNewProductsToCart = (product) => {
  return {
    type: ADD_NEW_PRODUCTS_TO_CART,
    product,
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

export default function carItemReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_NEW_PRODUCTS_TO_CART:
      return [...state, action.product ]
    default:
      return state;
  }
}