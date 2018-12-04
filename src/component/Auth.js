import React from 'react'
import { connect } from 'react-redux'
import { login } from '../redux/auth'
import { Redirect } from 'react-router-dom'

const mapStateToProps = (state) => state.auth
const actionCreator = { login }
@connect(mapStateToProps, actionCreator)
class Auth extends React.Component {
  render () {
    return (
      <div>
        { this.props.isAuth ? <Redirect to="/dashboard" /> : null }
        你还没有权限，请 
        <button onClick={this.props.login}>登录</button>
      </div>
    )
  }
}

export default Auth