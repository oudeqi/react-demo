import React from 'react'
import io from 'socket.io-client'
import { List, InputItem } from 'antd-mobile'

class Chat extends React.Component {
  constructor () {
    super()
    this.state = {
      text: '',
      msg: []
    }
    this.socket = io('ws://localhost:4000')
    this.sendMsg = this.sendMsg.bind(this)
  }
  componentDidMount () {
    console.log(this.socket)
    this.socket.on('receive', (data) => {
      this.setState({
        msg: [...this.state.msg, data.msg]
      })
    })
  }
  sendMsg () {
    this.socket.emit('send', {msg: this.state.text})
    this.setState({text: ''})
  }
  render () {
    return (
      <div>
        <div>Chat with: {this.props.match.params.user}</div>
        {
          this.state.msg.map((v, i) => (
            <p key={i}>{v}</p>
          ))
        }
        <div className="fixed-bottom">
          <List>
            <InputItem
            placeholder="请输入..."
            value={this.state.text}
            onChange={(v)=>{this.setState({text: v})}}
            extra={
              <span onClick={ this.sendMsg }>发送</span>
            }
            ></InputItem>
          </List>
        </div>
      </div>
    )
  }
}

export default Chat