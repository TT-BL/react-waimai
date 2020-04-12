import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'

import { adminRouter } from './routers'
import { Frame } from './components'
import { getRestaurantOrders } from './requests'

export default class App extends Component {
  componentWillMount(){
    getRestaurantOrders().then(response=>{
      console.log(response);
    })
  }
  render() {
    return(
      <div className="App">
        <Frame route={adminRouter}>
          {adminRouter.map(route => {
            return <Route key={route.pathname} path={route.pathname} component={route.component}></Route>
          })}
          <Redirect to='/admin/dashboard' from='/admin'></Redirect>
        </Frame>
      </div>
    )
  }
}
