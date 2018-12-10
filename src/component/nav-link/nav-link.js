import React from 'react'
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import './nav-link.css'

@withRouter
class NavLinkBar extends React.Component {
  render () {
    const pathname = this.props.location.pathname
    const NavList = this.props.data.filter(v=>!v.hide)
    return (
      <div className="fixed-bottom">
        <TabBar>
          {NavList.map(v => (
            <TabBar.Item 
            key={v.path} 
            title={v.text} 
            icon={{uri: require(`./${v.icon}.png`)}} 
            selectedIcon={{uri: require(`./${v.icon}-active.png`)}} 
            selected={v.path === pathname}
            onPress={() => {this.props.history.push(v.path)}}
            ></TabBar.Item>
          ))}
        </TabBar>
      </div>
    )
  }
}
export default NavLinkBar