import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { categoryActionTypes } from './types'
import { fetchError, fetchSuccess } from './action'
import { getCategories } from '../../api/blog'

function* getCategory() {
  try {
    // To call async functions, use redux-saga's `call()`.
    const res = yield call(getCategories)
    if (res.error) {
      yield put(fetchError(res.error))
    } else {
      yield put(fetchSuccess(res.data))
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
  yield takeEvery(categoryActionTypes.FETCH_REQUEST, getCategory)
}

// We can also use `fork()` here to split our saga into multiple watchers.
function* categorySaga() {
  yield all([fork(watchFetchRequest)])
}

export default categorySaga
