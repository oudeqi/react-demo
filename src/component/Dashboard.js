import React from 'react'
import App from './App'

import { connect } from 'react-redux'
import { Route, Link, Switch, Redirect } from 'react-router-dom'
import { logout } from '../redux/auth'


class Erying extends React.Component {
  render () {
    return (
      <div>二营</div>
    )
  }
}

class Qibinglian extends React.Component {
  render () {
    return (
      <div>骑兵连</div>
    )
  }
}

const mapStateToProps = (state) => state.auth
const actionCreator = { logout }

@connect(mapStateToProps, actionCreator)
class Dashboard extends React.Component {
  render () {
    const redirectToLogin = <Redirect to="/login" />
    const app = (
      <div>
        { this.props.isAuth ? <button onClick={this.props.logout}>注销</button> : null }
        <ul>
          <li>
            <Link to="/dashboard">一营</Link>
          </li>
          <li>
            <Link to="/dashboard/erying">二营</Link>
          </li>
          <li>
            <Link to="/dashboard/qibinglian">骑兵连</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/dashboard" exact component={App}></Route>
          <Route path="/dashboard/erying" component={Erying}></Route>
          <Route path="/dashboard/qibinglian" component={Qibinglian}></Route>
        </Switch>
      </div>
    )
    return this.props.isAuth ? app : redirectToLogin
  }
}

export default Dashboard