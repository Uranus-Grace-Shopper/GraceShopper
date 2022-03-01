import axios from "axios";

//action type
const SET_PRODUCTS = "SET_PRODUCTS";

//action creator- fetch all products
const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products,
  };
};

//fetch all products thunk
export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const { data: products } = await axios.get("/api/products");
      //console.log("products>>>>>",products)
      dispatch(setProducts(products));
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = [];

//reducer

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}
