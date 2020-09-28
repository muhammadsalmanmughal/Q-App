import React from "react";
import {
  BrowserRouter as Router, //alias (nickname)
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Login from "../Login/login";
import Signup from "../Signup/signup";
import Home from "../Home/home";
import Company from "../Company/company";
import CompanyDetails from '../ComapnyDetails/companyDetails'
import CustomerHome from '../Customer/customer'
import UserGetToken from '../UserGetToken/usergettoken'

const MainRouter = ({ isLoggedIn, uid }) => {
  console.log("window.location.pathname***", window.location.pathname);

  const currentPath = window.location.pathname.length === 1 ? "/home" : window.location.pathname;
  console.log("Current Path=========>", currentPath);
  console.log("is loged in=========>", isLoggedIn);
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact>
            {isLoggedIn ? <Redirect to={currentPath} /> : <Login />}
          </Route>

          <Route path="/home">
            {AuthChecker(isLoggedIn, <Home />)}</Route>

          <Route path="/signup">
            {isLoggedIn ? <Redirect to={currentPath} /> : <Signup />}
          </Route>

          <Route path="/company">
            {AuthChecker(
              isLoggedIn,
              <Company userId={isLoggedIn.uid} />
            )}
          </Route>
          <Route path="/customer">
            {AuthChecker(
              isLoggedIn,
              <CustomerHome userId={isLoggedIn.uid} />
            )}
          </Route>
          <Route path="/companyDetail/:slug">
            {AuthChecker(isLoggedIn, <CompanyDetails />)}
          </Route>
          <Route path="/usergettoken/:slug">
            {AuthChecker(isLoggedIn, <UserGetToken user={isLoggedIn} />)}
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
export default MainRouter;

const AuthChecker = (isLoggedIn, component) => {
  return isLoggedIn ? component : <Redirect to="/" />;
};
