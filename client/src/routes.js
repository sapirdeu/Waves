import React from 'react';
import { Switch, Route } from "react-router-dom";
import Home from './components/Home/Home';
import Register from './components/Register_login/Register';
import RegisterLogin from './components/Register_login/RegisterLogin';
import Layout from './hoc/Layout';
import history from './history';

function Routes() {
  return (
    <Layout>
      <Switch>
        {/* <Route path="/register">
          <Register/>
        </Route> */}
        <Route path="/register_login">
          <RegisterLogin history={history}/>
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Layout>
      
  );
}

export default Routes;
