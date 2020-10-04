import {LOGIN_USER, REGISTER_USER, AUTH_USER} from '../actions/Types'

const fun = (state = {}, action) => {
    switch (action.type) {
      case REGISTER_USER:
        return {...state, registerSuccess: action.payload}
      case LOGIN_USER:
        return {...state, loginSuccess: action.payload}
      case AUTH_USER:
        return {...state, userData: action.payload}
      default:
        return state
    }
  }
  
  export default fun