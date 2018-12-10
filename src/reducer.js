import { combineReducers } from 'redux'

import { user } from './redux/user.redux'
import { chatuser } from './redux/chatuser.redux'

const reducers =  combineReducers({user, chatuser})

export default reducers