import { 
    FIRST_NAME,
    LAST_NAME,
    EMAIL,
    TOKEN,
    UserData 
} from '../actions/authAction'

const initialState = {
    firstName: UserData.FIRST_NAME,
    lastName: UserData.LAST_NAME,
    email: UserData.EMAIL,
    token: UserData.TOKEN
}

function authReducer(state = initialState, action) {
    switch (action.type) {
      case FIRST_NAME:
        return {
          ...state,  
          firstName: action.firstName
        };         
      case LAST_NAME:
        return {
          ...state,  
          lastName: action.lastName
        };
      case EMAIL:
        return {
          ...state,  
          email: action.email,
         };
      case TOKEN:
        return {
          ...state,  
          token: action.token,
        };
      default:
        return state
    }
  
  }
 
  export default authReducer
  