import { USER_LOGIN_ACTION, USER_LOGOUT_ACTION } from './types'

export const userLoginAction = () => {
  return {
    type: USER_LOGIN_ACTION
  }
}

export const userLogoutAction = () => {
  return {
    type: USER_LOGOUT_ACTION
  }
}
