import React from 'react'
import { List, Badge } from 'antd-mobile'
import { connect } from 'react-redux'

@connect(state=>state)
class Msg extends React.Component {
  lastChat (arr) {
    return arr[arr.length-1]
  }
  render () {
    const Item = List.Item
    const Brief = Item.Brief
    const users = this.props.chat.users
    const myID = this.props.user._id
    const group = {}
    this.props.chat.msg.forEach(element => {
      group[element.chat_id] = group[element.chat_id] || []
      group[element.chat_id].push(element)
    })
    const chatList = Object.values(group).sort((a, b) => {
      const a_last = this.lastChat(a).create_time
      const b_last = this.lastChat(b).create_time
      return b_last - a_last
    })
    console.log(chatList)
    return (
      <div>
        {chatList.map(chatItem => {
          const last = this.lastChat(chatItem)
          const unreadNum = chatItem.filter(chat=>!chat.read && chat.to === myID).length
          const to = last.from === myID ? last.to : last.from
          return (
            <List key={last._id}>
              <Item
              extra={<Badge text={unreadNum}></Badge>}
              thumb={require(`../avatar-selector/${users[to].avatar}.png`)}
              arrow="horizontal"
              onClick={()=>{this.props.history.push(`/chat/${to}`)}}
              >
                {last.content}
                <Brief>{users[to].name}</Brief>
              </Item>
            </List>
          )
        })}
      </div>
    )
  }
}

export default Msg