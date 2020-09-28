import React from "react";
import { useHistory } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";

const Home = () => {
    const history = useHistory();
  return (
    <div className="main-div">
      {/* <h4>Hello from home component!</h4> */}
      <div className="home-buttons">
        <button onClick={()=>history.push('/company')}>Are you a Company</button>
        <button onClick={()=>history.push('/customer')}>Are you a Customer</button>
      </div>
    </div>
  );
};
export default Home;
