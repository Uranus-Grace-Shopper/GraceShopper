import axios from 'axios'

const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const FETCH_USERS = 'FETCH_USERS '

/**
 * ACTION CREATORS
 */
const fetchUsers = users => ({type: FETCH_USERS, users})

/**
 * THUNK CREATORS
 */
export const users = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  console.log('token in store>>>>>',token)
  config.headers.Authorization = token
  if (token) {
    const res = await axios.get('/api/users', 
        config.headers.Authorization
    )
    return dispatch(fetchUsers(res.data))
  }
}

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case FETCH_USERS:
      return action.users
    default:
      return state
  }
}
