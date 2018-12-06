import React from 'react'
import { 
  NavBar, InputItem, TextareaItem, Button, WingBlank, WhiteSpace 
} from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import { connect } from 'react-redux'
import { update } from '../../redux/user.redux' 
import { Redirect } from 'react-router-dom'

const mapStateToProps = (state) => state.user
const actionCreator = { update }

@connect(mapStateToProps, actionCreator)
class BossInfo extends React.Component {
  constructor () {
    super()
    this.state = {
      avatar: '',
      title: '',
      company: '',
      money: '',
      desc: '',
    }
  }
  onChange (key, value) {
    this.setState({
      [key]: value
    })
  }
  render () {
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo
    return (
      <div>
        {
          redirect && redirect !== path 
          ? <Redirect to={this.props.redirectTo} />
          : null 
        }
        <NavBar mode="dark">Boss完善信息页面</NavBar>
        <AvatarSelector selectAvatar={ 
          picName=>{ 
            this.setState({
              avatar: picName
            })
          } 
        }></AvatarSelector>
        <InputItem onChange={ v=>this.onChange('title', v) }>招聘职位</InputItem>
        <InputItem onChange={ v=>this.onChange('company', v) }>公司名称</InputItem>
        <InputItem onChange={ v=>this.onChange('money', v) }>职位薪资</InputItem>
        <TextareaItem onChange={ v=>this.onChange('desc', v) } 
        autoHeight rows={3} title="职位要求"></TextareaItem>
        <WingBlank>
          <WhiteSpace />
          <WhiteSpace />
          <Button onClick={()=>this.props.update(this.state)} type="primary">保存</Button>
        </WingBlank>
      </div>
    )
  }
}

export default BossInfo