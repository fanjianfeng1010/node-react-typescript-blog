import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { BlogActionTypes } from './types'
import { fetchError, fetchSuccess } from './action'
import { getArticles } from '../../api/blog'

function* getArticle(param: any) {
  try {
    // To call async functions, use redux-saga's `call()`.
    const res = yield call(getArticles, param.page, param.limit, param.category, param.tag)
    if (res.error) {
      yield put(fetchError(res.error))
    } else {
      yield put(fetchSuccess(res.data.items))
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack))
    } else {
      yield put(fetchError('An unknown error occured.'))
    }
  }
}

// This is our watcher function. We use `take*()` functions to watch Redux for a specific action
// type, and run our saga, for example the `handleFetch()` saga above.
function* watchFetchRequest() {
  yield takeEvery(BlogActionTypes.FETCH_REQUEST, getArticle)
}

// We can also use `fork()` here to split our saga into multiple watchers.
function* blogsSaga() {
  yield all([fork(watchFetchRequest)])
}

export default blogsSaga
