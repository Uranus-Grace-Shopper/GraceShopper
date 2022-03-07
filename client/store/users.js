import axios from "axios";

//action type
const SET_USERS = "SET_USERS";
const GET_TOKEN = "GET_TOKEN";

//action creator- fetch all products
const getAllUsers = (users) => {
  return {
    type: SET_USERS,
    users,
  };
};

const getToken = (token) => {
  return {
    type: GET_TOKEN,
    token,
  };
};

//fetch all products thunk
export const fetchAllUsersThunk = () => {
  return async (dispatch) => {
    try {
      const { data: users } = await axios.get("/api/users");
      //console.log("products>>>>>",products)
      dispatch(getAllUsers(users));
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchTokenThunk = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      if (token) {
        const res = await axios.get("/api/users", {
          headers: {
            authorization: token,
          },
        });
        dispatch(getToken(res.data));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = [];

//reducer

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USERS:
      return action.users;
    case GET_TOKEN:
      return action.token;
    default:
      return state;
  }
}
