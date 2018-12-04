import { combineReducers } from 'redux'

import { counter } from './redux/index'
import { auth } from './redux/auth'


const reducers =  combineReducers({counter, auth})

export default reducers