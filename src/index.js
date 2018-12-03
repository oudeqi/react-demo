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


ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
)




