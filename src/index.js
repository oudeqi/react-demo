import React from 'react'
import ReactDom from 'react-dom'
import App from './component/App'

// 谷歌浏览器react开发工具插件
// react-developer-tools
// redux-devtools

// redux默认只处理同步，异步任务需要redux-thunk中间件
// thunk插件的使用主要就是修改 action creator 写的方式
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import { counter } from './redux/index'

// 使用 react-redux 忘记 subscribe，记住reducer，action，dispatch
// react-redux 提供Provider，connect 两个接口来连接
// Provider组件放在应用最外层，传入store即可，只用一次
// connect可以从外部获取组件需要的数据，可以用装饰器的方式来写
import { Provider } from 'react-redux'

// react-router-dom
// BrowserRouter 包裹整个应用
// Router 对应渲染的组件
// Link 用于跳转
// Redirect 组件跳转
// Switch 只渲染一个字Route组件
import { 
  BrowserRouter, 
  Route, 
  Link,
  Redirect,
  Switch
} from 'react-router-dom'

// const reduxDevTools = window.devToolsExtension && process.env.NODE_ENV === 'development' ? window.devToolsExtension() : f => f
// const store = createStore(counter, compose(
//   applyMiddleware(thunk), 
//   reduxDevTools
// ))
const store = process.env.NODE_ENV === 'production' ? 
  (createStore(counter, applyMiddleware(thunk))) : 
  (
    window.devToolsExtension ? 
      (createStore(counter, compose(applyMiddleware(thunk), window.devToolsExtension()))) : 
      (createStore(counter, applyMiddleware(thunk)))
  )

class Yiying extends React.Component {
  render () {
    return (
      <div>一营</div>
    )
  }
}

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

// class Test extends React.Component {
//   render () {
//     console.log(this.props.match.params.name)
//     return (
//       <div>测试组件 : {this.props.match.params.name}</div>
//     )
//   }
// }

ReactDom.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <ul>
          <li>
            <Link to="/">一营</Link>
          </li>
          <li>
            <Link to="/erying">二营</Link>
          </li>
          <li>
            <Link to="/qibinglian">骑兵连</Link>
          </li>
          {/* <li>
            <Link to="/test">测试组件</Link>
          </li> */}
        </ul>
        <Switch>
          <Route path="/" exact component={Yiying}></Route>
          <Route path="/erying" component={Erying}></Route>
          <Route path="/qibinglian" component={Qibinglian}></Route>
          {/* <Route path="/:name" component={Test}></Route> */}
          <Redirect to="/qibinglian"></Redirect>
        </Switch>
        <App></App>
      </div>
    </BrowserRouter>
  </Provider>, 
  document.getElementById('root')
)




