import React from "react";
import firebase from "../firebase/fb-config";
import "materialize-css/dist/css/materialize.min.css";

const Navbar = (props) => {
  return (
    <div>
      <nav>
        <div className="nav-wrapper black">
          <a href="#!" className="brand-logo">
            Logo
          </a>
          <a href="#" data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">
            <li>
              <a href="sass.html">{props.isLoggedIn}</a>
            </li>
            <li>
              <a
                className="btn-floating btn-large waves-effect  deep-orange accent-4"
                onClick={() => firebase.auth().signOut()}
              >
                <i className="material-icons">power_settings_new</i>{" "}
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <ul className="sidenav" id="mobile-demo">
        <li>
          <a href="sass.html">{props.isLoggedIn}</a>
        </li>
      </ul>
    </div>
  );
};
export default Navbar;
