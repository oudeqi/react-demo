import React from 'react'
import Logo from '../../component/logo/logo'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../redux/user.redux'

import {
  List,
  InputItem,
  WingBlank,
  WhiteSpace,
  Button
} from 'antd-mobile'

const mapStateToProps = (state) => state.user
const actionCreator = { login }
@connect(mapStateToProps, actionCreator)
class Login extends React.Component {
  constructor () {
    super()
    this.state = {
      user: '',
      pwd: ''
    }
    this.register = this.register.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }
  handleLogin () {
    this.props.login(this.state)
  }
  handleChange (key, value) {
    this.setState({
      [key]: value
    })
  }
  // 路由组件可以直接使用路由api
  register () {
    this.props.history.push('/register')
  }
  render () {
    return (
      <div>
        {
          this.props.redirectTo && this.props.redirectTo!=='/login' 
          ? <Redirect to={this.props.redirectTo} />
          : null 
        }
        <Logo></Logo>
        <WingBlank>
          {
            this.props.msg 
            ? <div style={{color:'#f50', padding:'0 0 10px 10px'}}>{this.props.msg}</div> 
            : null
          }
          <List>
            <InputItem onChange={(v)=>this.handleChange('user', v)}>用户</InputItem>
            <InputItem onChange={(v)=>this.handleChange('pwd', v)}>密码</InputItem>
          </List>
          <WhiteSpace />
          <WhiteSpace />
          <Button onClick={this.handleLogin} type="primary">登录</Button>
          <WhiteSpace />
          <Button onClick={this.register} type="primary">注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login