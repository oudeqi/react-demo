import axios from 'axios'
import socketIO from 'socket.io-client'

const socket = socketIO('ws://localhost:4000')

// 获取聊天列表
const MSG_LIST = 'MSG_LIST'
// 读取信息
const MSG_RECV = 'MSG_RECV'
// 标识已读 
const MSG_READ = 'MSG_READ'

const initState = {
  msg: [],
  users: {},
  unread: 0
}
export function chat (state=initState, action) {
  switch (action.type) {
    case MSG_LIST:
      return {
        ...state, 
        msg:action.payload.chat, 
        unread:action.payload.chat.filter(v=>!v.read && v.to === action.payload.myID).length,
        users: action.payload.users
      }
    case MSG_RECV:
    console.log(action)
      const n = action.payload.myID === action.payload.data.to ? 1 : 0
      return {
        ...state, 
        msg: [...state.msg, action.payload.data], 
        unread: state.unread + n
      }
    case MSG_READ:
      return {...state}
    default:
      return initState
  }
}

function msgList (chat, users, myID) {
  return {
    type: MSG_LIST,
    payload: {chat, users, myID}
  }
}

export function getMsgList () {
  return (dispatch, getState) => {
    axios.get('/user/msg/list').then(res => {
      if (res.status === 200 && res.data.success) {
        dispatch(msgList(res.data.chat, res.data.users, getState().user._id))
      }
    }).catch(err=>{})
  }
}

export function sendMsg ({from, to, msg}) {
  return dispatch => {
    socket.emit('send', {from, to, msg})
  }
}

export function recvMsg () {
  return (dispatch, getState) => {
    socket.on('receive', (data) => {
      dispatch({
        type: MSG_RECV,
        payload: {data, myID: getState().user._id}
      })
    })
  }
}
