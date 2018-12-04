// 谷歌浏览器react开发工具插件
// react-developer-tools
// redux-devtools

import React from 'react'
import ReactDom from 'react-dom'

// redux默认只处理同步，异步任务需要redux-thunk中间件
// thunk插件的使用主要就是修改 action creator 写的方式
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
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
  // Redirect,
  Switch
} from 'react-router-dom'


import Login from './container/login/login'
import Register from './container/register/register'
import reducers from './reducer'
import './config'

const store = process.env.NODE_ENV === 'production' ? 
  (createStore(reducers, applyMiddleware(thunk))) : 
  (
    window.devToolsExtension ? 
      (createStore(reducers, compose(applyMiddleware(thunk), window.devToolsExtension()))) : 
      (createStore(reducers, applyMiddleware(thunk)))
  )

ReactDom.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={Login}></Route>
        <Route path="/register" component={Register}></Route>
      </Switch>
    </BrowserRouter>
  </Provider>, 
  document.getElementById('root')
)




