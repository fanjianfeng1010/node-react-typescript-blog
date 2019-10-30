export interface UserState {
  login: boolean
}

export const USER_LOGIN_ACTION = 'USER_LOGIN_ACTION'
export type USER_LOGIN_ACTION = typeof USER_LOGIN_ACTION

export const USER_LOGOUT_ACTION = 'USER_LOGOUT_ACTION'
export type USER_LOGOUT_ACTION = typeof USER_LOGOUT_ACTION

export interface UserLoginAction {
  type: USER_LOGIN_ACTION
}

export interface UserLogOutAction {
  type: USER_LOGOUT_ACTION
}

export type UserAction = UserLoginAction | UserLogOutAction
