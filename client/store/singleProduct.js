import axios from "axios";

const GET_SINGLE_PRODUCT = "GET_SINGLE_PRODUCT";

const getSingleProduct = (product) => {
  return {
    type: GET_SINGLE_PRODUCT,
    product,
  };
};

export const fetchSingleProduct = (id) => {
    return async (dispatch) => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        //console.log("products>>>>>",products)
        dispatch(getSingleProduct(data));
      } catch (err) {
        console.log(err);
      }
    };
  };

  const initialState = {}

  const singleProductReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_SINGLE_PRODUCT:
        return {...state, product: action.product};
      default:
        return state;
    }
  };

  export default singleProductReducer;