import React from 'react';
import { Route, Router } from "react-router-dom";
import Home from './components/Home/Home';
import Register from './components/Register_login/Register';
import RegisterLogin from './components/Register_login/RegisterLogin';
import Layout from './hoc/Layout';
import history from './history';
import UserDashboard from './components/User/UserDashboard';
import Auth from './hoc/Auth';
import Shop from './components/Shop/Shop';
import AddProduct from './components/User/Admin/AddProduct';
import ManageCategories from './components/User/Admin/ManageCategories';
import ProductPage from './components/Product/ProductPage';
import UserCart from './components/User/UserCart';
import UpdateUserProfile from './components/User/UpdateUserProfile';
import ManageSite from './components/User/Admin/ManageSite';


function Routes() {
  return (

      <Router history={history}>
        <Layout>
          <Route path="/user/dashboard" exact component={Auth(UserDashboard,true)}/>
          <Route path="/user/cart" exact component={Auth(UserCart,true)}/>
          <Route path="/user/user_profile" exact component={Auth(UpdateUserProfile,true)}/>
          <Route path="/admin/add_product" exact component={Auth(AddProduct,true)}/>
          <Route path="/admin/manage_categories" exact component={Auth(ManageCategories,true)}/>
          <Route path="/admin/site_info" exact component={Auth(ManageSite,true)}/>

          <Route path="/product_detail/:id" exact component={Auth(ProductPage,null)}/>
          <Route path="/register" exact component={Auth(Register,false)}/>
          <Route path="/register_login" exact component={Auth(RegisterLogin,false)}/>
          <Route path="/shop" exact component={Auth(Shop,null)}/>
          <Route path="/" exact component={Auth(Home,null)}/>
        </Layout>
      </Router>  
  );
}

export default Routes;
