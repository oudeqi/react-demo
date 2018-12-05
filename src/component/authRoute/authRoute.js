import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

// 让非路由组件访问路由相关api
@withRouter
class AuthRoute extends React.Component {
  componentDidMount () {
    console.log(this.props)
    const publicList = ['/login', '/register']
    const pathname = this.props.location.pathname
    if (publicList.includes(pathname)) {
      return false
    }
    axios.get('/user/info').then((res) => {
      if (res.status === 200 && res.data.success) {
        // 没有登录信息
      } else {
        // 路由相关的api
        this.props.history.push('/login')
      }
    }).catch((err) => {
      console.log(err)
    })
  }
  render () {
    return <div>AuthRoute</div>
  }
}

export default AuthRoute