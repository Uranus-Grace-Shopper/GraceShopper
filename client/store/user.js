import axios from "axios";

const SET_USERS = "SET_USERS";
const GET_USER_TOKEN = "GET_USER_TOKEN";

const setUsers = (users) => {
  return {
    type: SET_USERS,
    users,
  };
};

// const getToken = (token) => {
//     return {
//         type: GET_USER_TOKEN,
//         token
//     }
// }

// export const fetchToken = () => {
//     return async (dispatch) => {
//         try {
//             const { data: token } = await axios.get("/auth/me");
//             dispatch(getToken(token))
//         } catch (err){
//             console.log(err)
//         }
//     }
// }

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const { data: users } = await axios.get("/api/users");
      console.log("what is userrrssssss", users)
      dispatch(setUsers(users));
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = []

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USERS:

      return action.users;

    // case GET_USER_TOKEN:
    //     return {...state, token: action.token}
    default:
      return state;
  }
}
