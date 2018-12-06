import React from 'react'
import { Grid, List } from 'antd-mobile'
class AvatarSelector extends React.Component {
  constructor () {
    super()
    this.state = {}
  }
  render () {
    const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
      .split(',')
      .map(v=>({
        icon:require(`./${v}.png`),
        text:v
      }))
    const gridHeader = this.state.icon 
    ? (<div>
        <span>已选择头像</span>
        <img src={this.state.icon} style={{width: 20}} alt="" />
      </div>) 
    : <div>请选择头像</div>

    return (
      <List renderHeader={ ()=>gridHeader }>
        <Grid data={avatarList} columnNum={5} onClick={
          (elm) => {
            this.setState(elm)
            this.props.selectAvatar(elm.text)
          }
        }></Grid>
      </List>
    )
  }
}
export default AvatarSelector