import React, { useState, useEffect } from "react";
import "./App.css";
import  firebase  from "./components/firebase/fb-config";
import Router from "./components/Router/router";
import Navbar from "./components/Navbar/navbar";
function App() {
  const [isLoggedIn, setLoggedIn] = useState(true);
  useEffect(() => {
    listenAuthentication();
  }, []);

  const listenAuthentication = () => {
    firebase.auth().onAuthStateChanged(function (user) {
      // setLoading(false)
      setLoggedIn(user ? { email: user.email, uid: user.uid } : false);
    });
  };
  return (
    <div className="App">
      <div className="btn-3">
     
{isLoggedIn &&  <Navbar isLoggedIn={isLoggedIn.email} />}
       
      </div>
      <Router isLoggedIn={isLoggedIn} uid={isLoggedIn.uid} />
    </div>
  );
}

export default App;
