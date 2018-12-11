import React from 'react'
import { NavBar } from 'antd-mobile'
import { connect } from 'react-redux'
import NavLinkBar from '../nav-link/nav-link'
import { Switch, Route } from 'react-router-dom'
import Boss from '../boss/boss'
import Genius from '../genius/genius'
import User from '../user/user'

function Msg () {
  return <div>Msg</div>
}

const mapStateToProps = state => state
@connect(mapStateToProps)
class Dashboard extends React.Component {

  render () {
    const pathname = this.props.location.pathname
		const user = this.props.user
		console.log(this.props)
    const navList = [
			{
				path: '/boss',
				text: '牛人',
				icon: 'boss',
				title: '牛人列表',
				component: Boss,
				hide: user.type === 'genius'
			},
			{
				path: '/genius',
				text: 'boss',
				icon: 'job',
				title: 'BOSS列表',
				component: Genius,
				hide: user.type === 'boss'
			},
			{
				path: '/msg',
				text: '消息',
				icon: 'msg',
				title: '消息列表',
				component: Msg
			},
			{
				path: '/me',
				text: '我',
				icon: 'user',
				title: '个人中心',
				component: User
			}
		]
    return (
      <div>
        <NavBar className="fixed-top" mode="dark">
          { pathname !== '/' && navList.find(v=>v.path===pathname).title }
        </NavBar>
        <div className="content-top-padd">
          <Switch>
            {
              navList.map(v=>(
                <Route key={v.path} path={v.path} component={v.component}></Route>
              ))
            }
          </Switch>
        </div>
        <NavLinkBar data={navList}></NavLinkBar>
      </div>
    )
  }
}
export default Dashboard 