import React from 'react'
import PropTypes from 'prop-types'
import { WingBlank, Card, WhiteSpace } from 'antd-mobile'

class UserCard extends React.Component {
  static propTypes = {
    userList: PropTypes.array.isRequired
  }
  render () {
    return (
      <WingBlank>
        {
          this.props.userList.map(v => (
            v.avatar ? (
              <div key={v._id}>
                <WhiteSpace/>
                <Card>
                  <Card.Header 
                  title={v.user} 
                  thumb={require(`../avatar-selector/${v.avatar}.png`)} 
                  extra={v.title}></Card.Header>
                  <Card.Body>
                    {v.type === 'boss'?(<div>公司：{v.company}</div>):null}
                    {
                      v.desc.split('\n').map((line, i) => (
                        <div key={i}>{line}</div>
                      ))
                    }
                    {v.type === 'boss'?(<div>薪资：{v.money}</div>):null}
                  </Card.Body>
                </Card>
              </div>
            ) : null
          ))
        }
      </WingBlank>
    )
  }
}
export default UserCard