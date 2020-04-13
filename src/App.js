import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'

import { adminRouter } from './routers'
import { Frame } from './components'
import { getRestaurant } from './requests'

const mapState=(state)=>({
  isLogin:state.users.isLogin
})
@connect(mapState)
class App extends Component {
  componentDidMount(){
    getRestaurant().then(response=>{
      console.log(response);
    })
  }
  render() {
    return(
      this.props.isLogin?
      <div className="App">
        <Frame route={adminRouter}>
          {adminRouter.map(route => {
            return <Route key={route.pathname} path={route.pathname} component={route.component}></Route>
          })}
          <Redirect to='/admin/dashboard' from='/admin'></Redirect>
        </Frame>
      </div>:
      <Redirect to='/login'></Redirect>
    )
  }
}
export default App
