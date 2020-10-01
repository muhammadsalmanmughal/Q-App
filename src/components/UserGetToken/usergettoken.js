import React, { useState, useEffect } from "react";
import firebase from "../firebase/fb-config";
import { addCutomersToken } from "../firebase/fb-config";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserGetToken = ({ user }) => {
  toast.configure();
  let { slug } = useParams();
  const [company, setCompany] = useState([]);
  const [userTokens, setUserToken] = useState();
  const [userImage, setUserImage] = useState(null);
  const onUserImageUpload = (e) => {
    setUserImage(e.target.files[0]);
  };
  useEffect(() => {
    getSingleCompany();
  }, []);
  const getSingleCompany = function () {
    firebase
      .firestore()
      .collection("Companies")
      .doc(slug)
      .get()
      .then(function (doc) {
        setCompany(doc.data());
      })
      .catch(function (error) {
        alert(error);
      });
  };
  const getToken = () => {
    if (userTokens.length > company.token.length) {
      toast.error("Requested Token are out of range", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 4000,
        hideProgressBar: true,
      });
    } else {
      addCutomersToken(userTokens, user.email, userImage, slug);
    }
  };
  return (
    <div>
      <div className="container">
        <div className="main z-depth-5">
          <div className="row ">
            <div className="check col s12 m5 ">
              <h5>Name:{company.companyName}</h5>
              <h5>Since:{company.since}</h5>
              <h5>Address: {company.address}</h5>
            </div>
            <div className="check2 col s12 m7 ">
              <img className="companyName z-depth-5" src={company.url} />
            </div>
          </div>
          <div className="b-income  z-depth-2">
            <div className="container search">
              <div className="col s12 m5">
                <h5>Number of Token Available:</h5>
                {company.token == undefined ? (
                  <h4>No tokens available</h4>
                ) : (
                  <h3>{company.token}</h3>
                )}
              </div>
            </div>
          </div>
          {company.token == undefined ? (
            <div></div>
          ) : (
            <div id="buyToken">
              <div className="row">
                <div className="input-field col s12 m6">
                  <input
                    type="number"
                    placeholder="Number of token you want"
                    onChange={(e) => setUserToken(e.target.value)}
                  />
                </div>
                <div className="input-field col s12 m6">
                  <div className="input-field  col s12 ">
                    <input type="file" multiple onChange={onUserImageUpload} />
                  </div>
                </div>
              </div>
              <button className="btn" onClick={getToken}>
                Get token
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default UserGetToken;
