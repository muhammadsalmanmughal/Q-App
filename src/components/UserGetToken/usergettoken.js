import React, { useState, useEffect } from "react";
import firebase from "../firebase/fb-config";
import { addCutomersToken } from "../firebase/fb-config";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import M from "materialize-css";

const UserGetToken = ({user}) => {
  toast.configure();
  let { slug } = useParams();
  const [company, setCompany] = useState([]);
  // const [userTokens, setUserToken] = useState();
  const [userName, setUserName] = useState();
  const [userImage, setUserImage] = useState(null);
  const [customersToken, setCustomersToken] = useState();
  const [companyName, setCompanyName] = useState();
  const [customer, setCustomer] = useState();
  const onUserImageUpload = (e) => {
    setUserImage(e.target.files[0]);
  };
  useEffect(() => {
    getSingleCompany();
  }, []);

  useEffect(() => {
    let elem = document.querySelector(".tabs");
    M.Tabs.init(elem, {});
  });
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
    if (userName == "") {
      toast.error("Data is not in correct format", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 4000,
        hideProgressBar: true,
      });
    } else {
      addCutomersToken(userName, user.uid, user.email, userImage, slug);
    }
  };
  console.log("User Object ---->", user.uid,user.email);
  useEffect(() => {
    getCustomer();
  }, [user]);
  const getCustomer = () => {
    if(user.uid){
    firebase
      .firestore()
      .collection("Customer")
      .where("usersId", "==", user.uid)
      .get()
      .then((res) => {
        const list = [];
        res.forEach((doc) => {
          const cust = doc.data();
          console.log("id of customer", doc.id);
          setCustomersToken(doc.data().tokenNum);
          list.push(cust);

          firebase
            .firestore()
            .collection("Companies")
            .doc(doc.data().id)
            .get()
            .then((res) => {
              console.log("aja bhai data", res.data());
              setCustomersToken(res.data().currentToken);
              setCompanyName(res.data().name);
            });
        });
        setCustomer(list);
      })
      .catch((err) => {
        console.log("no such data", err);
      });
    }
    else{
      console.log('user id nai mil rahi')
    }
  };
  console.log("customer ka data--->", customer);
  return (
    <div>
      <div className="row">
        <div className="col s12">
          <ul className="tabs">
            <li className="tab col s6">
              <a href="#comapnyDetails" className="active">
                Company Details
              </a>
            </li>
            <li className="tab col s6">
              <a href="#tokenDetails">Token Details</a>
            </li>
          </ul>
        </div>
        <div id="comapnyDetails" className="col s12">
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
              <div className="z-depth-2">
                {/* <div className="container search"> */}
                <div className="col s12">
                  {/* <h5>Token Available:</h5> */}
                  {company.token == undefined ? (
                    <h4>No tokens available</h4>
                  ) : (
                    <h5>Available Tokens:{company.token}</h5>
                  )}
                </div>
                {/* </div> */}
              </div>
              {company.token == undefined ? (
                <div></div>
              ) : (
                <div id="buyToken">
                  <div className="row">
                    <div className="input-field col s12 m6">
                      <input
                        type="text"
                        placeholder="Your Name"
                        onChange={(e) => setUserName(e.target.value)}
                      />
                    </div>
                    <div className="input-field col s12 m6">
                      <div className="input-field  col s12 ">
                        <input
                          type="file"
                          multiple
                          onChange={onUserImageUpload}
                        />
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
     <div id='tokenDetails' className="col s12">
<h5>token details</h5>
     </div>
      </div>
    </div>
  );
};

export default UserGetToken;
