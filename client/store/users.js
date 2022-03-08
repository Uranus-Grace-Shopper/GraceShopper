import axios from "axios";

//action type
const SET_USERS = "SET_USERS";

//action creator- fetch all products
const getAllUsers = (users) => {
  return {
    type: SET_USERS,
    users,
  };
};

//fetch all products thunk
export const fetchAllUsersThunk = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      console.log("is there a tokem", token)
      if (token) {
        const { data: users } = await axios.get("/api/users", {
          headers: {
            authorization: token,
          },
        });
        dispatch(getAllUsers(users));
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
    default:
      return state;
  }
}
