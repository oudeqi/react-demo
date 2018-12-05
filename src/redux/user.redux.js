import axios from 'axios'
import { getRedirectPath } from '../util'

// action
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'

const initState = {
  isAuth: false,
  redirectTo: '',
  msg: '',
  user: '',
  pwd: '',
  type: ''
}

// reducer
export function user (state=initState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS: 
      return {
        ...state, 
        msg:'', 
        isAuth:true, 
        redirectTo:getRedirectPath(action.payload), 
        ...action.payload
      }
    case LOGIN_SUCCESS: 
      return {
        ...state, 
        msg:'', 
        isAuth:true, 
        redirectTo:getRedirectPath(action.payload), 
        ...action.payload
      }
    case ERROR_MSG: 
      return {...state, isAuth:false, msg:action.msg}
    default: 
      return state
  }
}

// action creator
export function loginSueecss (data) {
  return {
    type: LOGIN_SUCCESS,
    payload: data
  }
}
export function registerSueecss (data) {
  return {
    type: REGISTER_SUCCESS,
    payload: data
  }
} 
export function errorMsg (data) {
  return {
    type: ERROR_MSG,
    msg: data
  }
} 
export function login ({user, pwd}) {
  if (!user || !pwd) {
    return errorMsg('用户名密码必须输入')
  }
  return dispatch => {
    axios.post('/user/login', {user, pwd}).then(res => {
      if (res.status === 200 && res.data.success === true) {
        dispatch(loginSueecss(res.data.data))
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
        dispatch(registerSueecss({user, pwd, type}))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    }).catch(err => {
      dispatch(errorMsg(String(err)))
    })
  }
} 