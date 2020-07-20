export const FIRST_NAME = 'EMAIL_DATA';
export const LAST_NAME = 'SECOND_NAME';
export const EMAIL = 'EMAIL';
export const TOKEN = 'TOKEN';
export const USER_ID = 'USER_ID';
export const AUTH_STATUS = false;

export const UserData = {
    FIRST_NAME: 'name',
    LAST_NAME: 'last name',
    EMAIL: 'email',
    TOKEN: 'token',
    USER_ID: 'user id',
    AUTH_STATUS: false
}

export function authStatus(authStatus) {
  return { type: AUTH_STATUS, authStatus }
}


export function addFirstName(firstName) {
    return { type: FIRST_NAME, firstName }
  }

export function addLastName(lastName) {
    return { type: LAST_NAME, lastName }
  }

export function addEmail(email) {
    return { type: EMAIL, email }
  }

export function addToken(token) {
    return { type: TOKEN, token }
  }

export function addUserId(id) {
  return { type: USER_ID, id }
}
