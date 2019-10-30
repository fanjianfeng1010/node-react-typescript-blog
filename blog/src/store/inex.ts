import { combineReducers } from 'redux'
import { all, fork } from 'redux-saga/effects'
import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'

import blogsSaga from './articles/sagas'
import { blogReducer } from './articles/reducer'
import { BlogState } from './articles/types'
import categorySaga from './category/sagas'
import { categoryReducer } from './category/reducer'
import { CategoryState } from './category/types'
import { userReducer } from './user/reducer'
import { UserState } from './user/types'

export interface ApplicationState {
  blogs: BlogState
  router: RouterState
  user: UserState
  category: CategoryState
}

export const createRootReducer = (history: History) =>
  combineReducers({
    user: userReducer,
    blogs: blogReducer,
    category: categoryReducer,
    router: connectRouter(history)
  })

export function* rootSaga() {
  yield all([fork(blogsSaga), fork(categorySaga)])
}
