import {LOGIN_USER} from '../actions/Types'

const fun = (state = {}, action) => {
    switch (action.type) {
      case LOGIN_USER:
        return {...state, loginSuccess: action.payload}
      default:
        return state
    }
  }
  
  export default fun