import React, { Component } from 'react';
import { Route, Redirect,Switch } from 'react-router-dom'
import {connect} from 'react-redux'

import { adminRouter } from './routers'
import { Frame } from './components'
import { getRestaurant } from './requests'
import {getRetaurant} from './actions/retaurant'

const route=adminRouter.filter(value=>value.isNav)
const mapState=(state)=>({
  isLogin:state.users.isLogin
})
@connect(mapState,{getRetaurant})
class App extends Component {
  componentDidMount(){
   this.props.getRetaurant()
  }
  render() {
    return(
      this.props.isLogin?
      <div className="App">
        <Frame route={route}>
          <Switch>
            {adminRouter.map(route => {
              return <Route key={route.pathname} path={route.pathname} component={route.component} exact={route.exact}></Route>
            })}
            <Redirect to='/admin/dashboard' from='/admin'></Redirect>
          </Switch>
        </Frame>
      </div>:
      <Redirect to='/login'></Redirect>
    )
  }
}
export default App
