export const FIRST_NAME = 'EMAIL_DATA';
export const LAST_NAME = 'SECOND_NAME';
export const EMAIL = 'EMAIL';
export const TOKEN = 'TOKEN';

export const UserData = {
    FIRST_NAME: 'name',
    LAST_NAME: 'last name',
    EMAIL: 'email',
    TOKEN: 'token'
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
