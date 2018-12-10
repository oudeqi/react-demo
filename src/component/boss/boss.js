import React from 'react'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chatuser.redux'
import UserCard from '../user-card/user-card'

@connect(
  state => state.chatuser,
  { getUserList }
)
class Genius extends React.Component {
  componentDidMount () {
    this.props.getUserList('genius')
  }
  render () {
    return (<UserCard userList={this.props.userList}></UserCard>)
  }
}

export default Genius