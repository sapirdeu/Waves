import React from 'react';
import { /*Switch,*/ Route, Router } from "react-router-dom";
import Home from './components/Home/Home';
import Register from './components/Register_login/Register';
import RegisterLogin from './components/Register_login/RegisterLogin';
import Layout from './hoc/Layout';
import history from './history';
import UserDashboard from './components/User/UserDashboard';
import Auth from './hoc/Auth';

function Routes() {
  return (
    <Layout>
      <Router history={history}>
        <Route path="/user/dashboard" exact component={Auth(UserDashboard,true)}/>
        {/* <Route path="/user/dashboard">
          <UserDashboard/>
        </Route> */}
        <Route path="/register" exact component={Auth(Register,false)}/>
        {/* <Route path="/register">
          <Register history={history}/>
        </Route> */}
        <Route path="/register_login" exact component={Auth(RegisterLogin,false)}/>
        {/* <Route path="/register_login">
          <RegisterLogin history={history}/>
        </Route> */}
        <Route path="/" exact component={Auth(Home,null)}/>
        {/* <Route path="/">
          <Home />
        </Route> */}
      </Router>
    </Layout>
      
  );
}

export default Routes;
