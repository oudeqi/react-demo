import React from 'react'
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux'
import { getChatID } from '../../util'
import './chat.css'

@connect(state => state, {getMsgList, sendMsg, recvMsg})
class Chat extends React.Component {
  constructor () {
    super()
    this.state = {
      text: '',
      showEmoji: false
    }
    this.sendMsg = this.sendMsg.bind(this)
    this.handleEmojiClick = this.handleEmojiClick.bind(this)
  }
  componentDidMount () {
    if (!this.props.chat.msg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }
  sendMsg () {
    const from = this.props.user._id
    const to = this.props.match.params.id
    const msg = this.state.text
    this.props.sendMsg({from, to, msg})
    this.setState({
      text: '',
      showEmoji: false
    })
  }
  handleEmojiClick () {
    // 修复 antd-mobile Grid bug
    setTimeout(function(){
      window.dispatchEvent(new Event('resize'))
    }, 0)
    this.setState({
      showEmoji: !this.state.showEmoji
    })
  }
  render () {
    const userID = this.props.match.params.id
    const users = this.props.chat.users
    const Item = List.Item
    const chatID = getChatID(this.props.user._id, userID)
    const chatMsgs = this.props.chat.msg.filter(v=>v.chat_id === chatID)
    const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
										.split(' ')
										.filter(v=>v)
										.map(v=>({text:v}))
    if (!users[userID]) {
      return null
    }
    return (
      <div id="chat-page">
        <NavBar mode="dark" 
        icon={<Icon type="left"/>}
        onLeftClick={ ()=>{this.props.history.goBack()} }>
          {users[userID].name}
        </NavBar>
        {
          chatMsgs.map((v) => {
            const avatar = require(`../avatar-selector/${users[v.from].avatar}.png`)
            return v.from === userID ? (
              <List key={v._id}><Item thumb={avatar}>{v.content}</Item></List>
            ) : (
              <List key={v._id}>
                <Item className="chat-me" extra={<img src={avatar} alt="" />}>{v.content}</Item>
              </List>
            )
          })
        }
        <div className="fixed-bottom">
          <List>
            <InputItem
            placeholder="请输入..."
            value={this.state.text}
            onChange={(v)=>{this.setState({text: v})}}
            extra={
              <div>
                <span className="emoji-btn" role="img" aria-label=""
                onClick={this.handleEmojiClick}>😀</span>
                <span className="send-btn" onClick={ this.sendMsg }>发送</span>
              </div>
            }
            ></InputItem>
          </List>
          {
            this.state.showEmoji ? (
              <Grid 
              data={emoji} 
              columnNum={9} 
              carouselMaxRow={4} 
              isCarousel={true} 
              onClick={(el)=>{
                this.setState({
                  text: this.state.text + el.text
                })
              }} />
            ) : null
          }
          
        </div>
      </div>
    )
  }
}

export default Chat