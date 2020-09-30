import React from "react";
import { useHistory } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";

const Home = () => {
  const history = useHistory();
  return (
    <div classNameName="main-div">
      <div className="container">
        <div className="row">
          <div className="col s12 m5">
            <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
                <img
                  class="activator"
                  src="https://static.vecteezy.com/system/resources/previews/000/539/772/original/company-word-lettering-illustration-vector.jpg"
                />
              </div>
              <div class="card-content">
                <span class="card-title activator grey-text text-darken-4">
                  As Comapny<i class="material-icons right">more_vert</i>
                </span>
                <p>
                  <a
                    onClick={() => history.push("/company")}
                    style={{ cursor: "pointer" }}
                  >
                    As Company
                  </a>
                </p>
              </div>
              <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">
                  You can do<i class="material-icons right">close</i>
                </span>
                <p>Add new company</p>
                <p>Search existing comapnies</p>
                <p>Add Token</p>
                <p>See your customers</p>
              </div>
            </div>
          </div>
          <div className="col s12 m5">
            <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
                <img
                  class="activator"
                  src="https://img.freepik.com/free-vector/customer-service-center-isometric-vector-illustration_151150-38.jpg?size=626&ext=jpg"
                />
              </div>
              <div class="card-content">
                <span class="card-title activator grey-text text-darken-4">
                  As Customer<i class="material-icons right">more_vert</i>
                </span>
                <p>
                  <a
                    onClick={() => history.push("/customer")}
                    style={{ cursor: "pointer" }}
                  >
                    As Customer
                  </a>
                </p>
              </div>
              <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">
                  You can do<i class="material-icons right">close</i>
                </span>
                <p>Search for comapany</p>
                <p>Buy tokens</p>
                <p>See company profile</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
