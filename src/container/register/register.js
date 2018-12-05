import React from 'react'
import Logo from '../../component/logo/logo'
import { connect } from 'react-redux'
import { register } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

import {
  List,
  InputItem,
  Radio,
  WingBlank,
  WhiteSpace,
  Button
} from 'antd-mobile'

const mapStateToProps = (state) => state.user
const actionCreator = { register }

@connect(mapStateToProps, actionCreator)
class Register extends React.Component {
  constructor () {
    super()
    this.state = {
      user: '',
      pwd: '',
      repeatpwd: '',
      type: 'genius' // boss
    }
    this.handleRegister = this.handleRegister.bind(this)
  }
  handleChange (key, value) {
    this.setState({
      [key]: value
    })
  }
  handleRegister () {
    this.props.register(this.state)
  }
  render () {
    return (
      <div>
        {
          this.props.redirectTo 
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
            <InputItem onChange={(v)=>this.handleChange('repeatpwd', v)}>确认密码</InputItem>
            <Radio.RadioItem 
            checked={this.state.type==='genius'} 
            onChange={()=>this.handleChange('type', 'genius')}>牛人</Radio.RadioItem>
            <Radio.RadioItem 
            checked={this.state.type==='boss'} 
            onChange={()=>this.handleChange('type', 'boss')}>Boss</Radio.RadioItem>
            <WhiteSpace />
            <WhiteSpace />
            <Button type="primary" onClick={this.handleRegister}>注册</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default Register