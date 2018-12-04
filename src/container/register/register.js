import React from 'react'
import Logo from '../../component/logo/logo'
import {
  List,
  InputItem,
  Radio,
  WingBlank,
  WhiteSpace,
  Button
} from 'antd-mobile'

class Register extends React.Component {
  constructor () {
    super()
    this.state = {
      type: 'genius' // boss
    }
  }
  render () {
    return (
      <div>
        <Logo></Logo>
        <WingBlank>
          <List>
            <InputItem>用户</InputItem>
            <InputItem>密码</InputItem>
            <InputItem>确认密码</InputItem>
            <Radio.RadioItem checked={this.state.type==='genius'}>牛人</Radio.RadioItem>
            <Radio.RadioItem checked={this.state.type==='boss'}>Boss</Radio.RadioItem>
            <WhiteSpace />
            <WhiteSpace />
            <Button type="primary">注册</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default Register