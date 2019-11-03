import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import configureStore from './configStore'
import { createBrowserHistory } from 'history'

import 'antd/dist/antd.css'

const initialState = window.INITIAL_REDUX_STATE
const history = createBrowserHistory({
  basename: '/'
})
const store = configureStore(history, initialState)

ReactDOM.render(<App store={store} history={history} />, document.getElementById('root'))

serviceWorker.unregister()
