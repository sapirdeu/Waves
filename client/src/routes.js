import React from 'react';
import { Switch, Route } from "react-router-dom";
import Home from './components/Home/Home';
import Layout from './hoc/Layout';


function Routes() {
  return (
    <Layout>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
        
      </Switch>
    </Layout>
      
  );
}

export default Routes;
