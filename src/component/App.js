import React from 'react'
import { connect } from 'react-redux'
import { addGun, addGunAsync, removeGun } from '../redux/index'

// 你要state的什么属性放到props里
const mapStateToProps = (state) => {
  return {
    num: state
  }
}

// 你要什么actionCreator放到props里，自动dispatch
// mapDispatchToProps
const actionCreator = { addGun, addGunAsync, removeGun }

// App = connect(mapStateToProps, actionCreator)(App)
@connect(mapStateToProps, actionCreator)
class App extends React.Component {
  render () {
    return (
      <div>
        <p>现在有机关枪{this.props.num}</p>
        <button onClick={this.props.addGun}>申请武器</button>
        <button onClick={this.props.removeGun}>上交武器</button>
        <button onClick={this.props.addGunAsync}>拖两天在给</button>
      </div>
    )
  }
}

export default App