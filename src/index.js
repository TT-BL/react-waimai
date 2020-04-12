import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'

import store from './store'
import { mainRouter } from './routers'
import zhCN from 'antd/es/locale/zh_CN';
import App from './App';
import './index.less'
ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <Router>
          <Switch>
            <Route path='/admin' render={
              (routerProps) => {
                return <App {...routerProps} />
              }
            }>
            </Route>
            {mainRouter.map((route) => {
              return <Route key={route.pathname} path={route.pathname} component={route.component}></Route>
            })}
            <Redirect from='/' to='/admin' exact></Redirect>
            <Redirect to='/404'></Redirect>
          </Switch>
      </Router>
    </ConfigProvider>

  </Provider>,
  document.getElementById('root')
);

