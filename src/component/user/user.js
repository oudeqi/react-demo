import React from 'react'
import { connect } from 'react-redux'
import { Result, List, WhiteSpace, Modal } from 'antd-mobile'
import { logoutSubmit } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
import browserCookies from 'browser-cookies'

@connect(
  state => state.user,
  { logoutSubmit }
)
class User extends React.Component {
  constructor () {
    super()
    this.logout = this.logout.bind(this)
  }
  logout () {
    Modal.alert('注销', '确认退出登录吗？', [
      {text: '取消', onPress: ()=>{console.log('取消')}},
      {text: '确认', onPress: ()=>{
        // http only 无法使用
        browserCookies.erase('koa:sess')
        browserCookies.erase('koa:sess.sig')
        this.props.logoutSubmit()
      }}
    ])
  }
  render () {
    const props = this.props
    const Item = List.Item
    const Brief = Item.Brief
    return props.user ? (
      <div>
        <Result
          img={
            <img alt="" style={{width: 50}} src={require(`../avatar-selector/${props.avatar}.png`)}/>
          }
          title={props.user}
          message={props.type==='boss'?props.company:null}
        />
        <List renderHeader={()=>'简介'}>
          <Item multipleLine>
            {props.title}
            {props.desc.split('\n').map((v, i)=><Brief key={i}>{v}</Brief>)}
            {props.money?<Brief>薪资：{props.money}</Brief>:null}
          </Item>
        </List>
        <WhiteSpace/>
        <List><Item onClick={this.logout}>退出登录</Item></List>
      </div>
    ) : <Redirect to={props.redirectTo} />
  }
}

export default User