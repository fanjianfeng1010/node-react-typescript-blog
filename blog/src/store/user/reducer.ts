import { Reducer } from 'redux'
import { UserState, USER_LOGIN_ACTION, UserAction, USER_LOGOUT_ACTION } from './types'

const initialState: UserState = {
  login: false
}

const reducer: Reducer<UserState, UserAction> = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_ACTION: {
      return { ...state, login: true }
    }
    case USER_LOGOUT_ACTION: {
      return { ...state, login: false }
    }
    default:
      return state
  }
}

export { reducer as userReducer }
