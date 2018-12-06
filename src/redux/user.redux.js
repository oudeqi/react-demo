import axios from 'axios'
import { getRedirectPath } from '../util'

// action
const AUth_SUCCESS = 'AUth_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const USER_INFO = 'USER_INFO'

const initState = {
  isAuth: false,
  redirectTo: '',
  msg: '',
  user: '',
  type: ''
}

// reducer
export function user (state=initState, action) {
  switch (action.type) {
    case AUth_SUCCESS: 
      return {
        ...state, 
        msg:'', 
        redirectTo:getRedirectPath(action.payload), 
        ...action.payload
      }
    case USER_INFO: 
      return {...state, ...action.payload}
    case ERROR_MSG: 
      return {...state, isAuth:false, msg:action.msg}
    default: 
      return state
  }
}

// action creator
export function authSueecss (data) {
  return {
    type: AUth_SUCCESS,
    payload: data
  }
}
export function userInfo (data) {
  return {
    type: USER_INFO,
    payload: data
  }
}
export function errorMsg (data) {
  return {
    type: ERROR_MSG,
    msg: data
  }
} 
export function update (data) {
  return dispatch => {
    axios.post('/user/update', data).then(res => {
      if (res.status === 200 && res.data.success === true) {
        dispatch(authSueecss(res.data.data))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    }).catch(err => {
      dispatch(errorMsg(String(err)))
    })
  }
}
export function login ({user, pwd}) {
  if (!user || !pwd) {
    return errorMsg('用户名密码必须输入')
  }
  return dispatch => {
    axios.post('/user/login', {user, pwd}).then(res => {
      if (res.status === 200 && res.data.success === true) {
        dispatch(authSueecss(res.data.data))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    }).catch(err => {
      dispatch(errorMsg(String(err)))
    })
  }
}
export function register ({user, pwd, repeatpwd, type}) {
  if (!user || !pwd || !repeatpwd || !type) {
    return errorMsg('用户名密码必须输入')
  }
  if (pwd !== repeatpwd) {
    return errorMsg('密码和重复密码不一致')
  }
  return dispatch => {
    axios.post('/user/register', {user, pwd, type}).then(res => {
      if (res.status === 200 && res.data.success === true) {
        dispatch(authSueecss({user, pwd, type}))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    }).catch(err => {
      dispatch(errorMsg(String(err)))
    })
  }
} 