import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "../Login/login";
import Signup from "../Signup/signup";
import Home from "../Home/home";
import Company from "../Company/company";
import CompanyDetails from "../ComapnyDetails/companyDetails";
import CustomerHome from "../Customer/customer";
import UserGetToken from "../UserGetToken/usergettoken";

const MainRouter = ({ isLoggedIn, isLoading }) => {
  const currentPath =
    window.location.pathname.length === 1 ? "/home" : window.location.pathname;
  if (isLoading) {
    return (
      <div className="loading center">
        <h5>Please wait for a second ...</h5>
        <div className="progress container" style={{ width: "40%" }}>
          <div className="indeterminate"></div>
        </div>
      </div>
    );
  }
  console.log("user uid from router",isLoggedIn)
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact>
            {isLoggedIn ? <Redirect to={currentPath} /> : <Login />}
          </Route>
          <Route path="/home">{AuthChecker(isLoggedIn, <Home />)}</Route>
          <Route path="/signup">
            {isLoggedIn ? <Redirect to={currentPath} /> : <Signup />}
          </Route>
          <Route path="/company">
            {AuthChecker(isLoggedIn, <Company userId={isLoggedIn.uid} />)}
          </Route>
          <Route path="/customer">
            {AuthChecker(isLoggedIn, <CustomerHome userId={isLoggedIn.uid} />)}
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
