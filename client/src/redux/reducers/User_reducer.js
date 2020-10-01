import {LOGIN_USER, REGISTER_USER} from '../actions/Types'

const fun = (state = {}, action) => {
    switch (action.type) {
      case REGISTER_USER:
        return {...state, registerSuccess: action.payload}
      case LOGIN_USER:
        return {...state, loginSuccess: action.payload}
      default:
        return state
    }
  }
  
  export default fun