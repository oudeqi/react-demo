import { combineReducers } from 'redux'

import { counter } from './redux/index'
import { auth } from './redux/auth'
import { user } from './redux/user.redux'

const reducers =  combineReducers({counter, auth, user})

export default reducers