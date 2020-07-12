import {
    FIRST_NAME,
    LAST_NAME,
    EMAIL,
    TOKEN,
    USER_ID,
    AUTH_STATUS,
    UserData,
} from '../actions/authAction'

const initialState = {
    firstName: UserData.FIRST_NAME,
    lastName: UserData.LAST_NAME,
    email: UserData.EMAIL,
    token: UserData.TOKEN,
    userId: UserData.USER_ID,
    authStatus: UserData.AUTH_STATUS
}

function authReducer(state = initialState, action) {
    switch (action.type) {
      case AUTH_STATUS:
        return {
          ...state,
          authStatus: action.authStatus
        };
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
      case USER_ID:
      return {
        ...state,
        userId: action.id,
      };
      default:
        return state
    }

  }

  export default authReducer
