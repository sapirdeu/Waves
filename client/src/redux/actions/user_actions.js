import axios from 'axios'
import {LOGIN_USER} from './Types'
import {USER_SERVER} from '../../components/utils/Misc'

function loginUser(dataToSubmit){
    const request = 
        axios.post(`${USER_SERVER}/login`, dataToSubmit)
        .then(response => response.data);
    
    return {
        type: LOGIN_USER, 
        payload: request
    }
}

export {loginUser}
