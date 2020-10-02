import React, { useState, useEffect } from "react";
import firebase from "../firebase/fb-config";
import { addTokenToCompany } from "../firebase/fb-config";
import { useParams } from "react-router-dom";
import M from "materialize-css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CompanyDetails = () => {
  toast.configure();
  let { slug } = useParams();
  let docRef = firebase.firestore().collection("Companies").doc(slug);
  const [token, setToken] = useState("");
  const [avgTokenTime, setAvgTokenTime] = useState("");
  const [company, setCompany] = useState();
  const [companyCustomer, setCompanyCustomer] = useState();
  const [currentToken, setCurrentToken] = useState(0);
  const [allowToken, setAllowToken] = useState(false);

  const checkDate = function () {
    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          setCompany(doc.data());
          if (doc.data().date) {
            const currentDate = new Date().getDate();
            if (doc.data().date !== currentDate) {
              docRef
                .update({
                  token: 0,
                  date: 0,
                })
                .then(() => {
                  alert("Token Reset");
                });
            } else {
              return;
            }
          } else {
            return;
          }
        } else {
          alert("No such document!");
        }
      })
      .catch(function (error) {
        alert("Error getting document:", error);
      });
  };
  useEffect(() => {
    checkDate();
    getCustomers();
  }, []);
  useEffect(() => {
    let elem = document.querySelector(".collapsible");
    M.Collapsible.init(elem, {});
  });
  const getCustomers = () => {
    firebase
      .firestore()
      .collection("Customers")
      .where("slug", "==", slug)
      .onSnapshot((res) => {
        const allCustomers = [];
        res.forEach((doc) => {
          const cus = doc.data();
          allCustomers.push({ ...cus, custId: doc.id });
          setCompanyCustomer(allCustomers);
        });
      });
  };
  const openTokens = () => {
    docRef.get().then(function (doc) {
      if (doc.data().setTokenTo === false) {
        docRef.update({
          setTokenTo: true,
        });
        setAllowToken(true);
      } else {
        setAllowToken(false);
        docRef.update({
          setTokenTo: false,
        });
      }
    });
  };
  const date = new Date().getDate();
  const onSetToken = () => {
    if (token == "" || avgTokenTime == "") {
      toast.error("Data is not in correct format", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 4000,
        hideProgressBar: true,
      });
    } else {
      addTokenToCompany(
        slug,
        date,
        token,
        avgTokenTime,
        currentToken,
        allowToken
      );
    }
  };
  const getCurrentToken = () => {
    docRef.get().then(function (doc) {
      let cT = doc.data().currentToken + 1;
      docRef.update({
        currentToken: cT,
      });
    });
  };
  if (!company) {
    return <div className="loading center">
    <h5>Please wait for a second ...</h5>
    <div className="progress container" style={{ width: "40%" }}>
      <div className="indeterminate"></div>
    </div>
  </div>;
  }
  return (
    <div className="container ">
      <div className="main z-depth-5">
        <div className="row ">
          <div className="check col s12 m5 ">
            <h4>Name:{company.companyName}</h4>
            <h4>Since:{company.since}</h4>
            <h5>Address: {company.address}</h5>
            <div className="showCurrentToken">
              <h4>Current Token: {company.currentToken}</h4>
            </div>
          </div>
          <div className="check2 col s12 m7 ">
            <img className="companyName z-depth-5" src={company.url} />
          </div>
        </div>
        <ul className="collapsible">
          <li>
            <div className="collapsible-header">
              <i className="material-icons">add_circle_outline</i>Add Tokens
            </div>
            <div className="collapsible-body ">
              <div className="allowToken">
                <label>Token</label>
                <div className="switch">
                  <label>
                    Off
                    <input
                      type="checkbox"
                      // onChange={(e)=>setAllowToken(e.target.value)}
                      onClick={openTokens}
                    />
                    <span className="lever"></span>
                    On
                  </label>
                </div>
              </div>
              {allowToken ? (
                <div className="addToken">
                  <div className="row ">
                    <div className="input-field col s12 m6">
                      <input
                        type="number"
                        placeholder=" add number of tokens"
                        onChange={(e) => setToken(e.target.value)}
                      />
                    </div>
                    <div className="input-field col s12 m6">
                      <input
                        type="text"
                        placeholder=" each time "
                        onChange={(e) => setAvgTokenTime(e.target.value)}
                      />
                    </div>
                    <div>
                      <button
                        className="waves-effect waves-ligh btn"
                        onClick={onSetToken}
                      >
                        Add token
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <p>Set Token to on to add tokens</p>
              )}
            </div>
          </li>
          <li>
            <div className="collapsible-header">
              <i className="material-icons">queue_play_next</i>Next Patient
            </div>
            <div className="collapsible-body">
              {!allowToken ? (
                // <h5>Add token first</h5>
                <p><i className="material-icons left">warning</i>Add Token first</p>
              ) : (
                <div>
                  <button
                    className="waves-effect waves-ligh btn"
                    onClick={getCurrentToken}
                  >
                    Update token
                  </button>
                </div>
              )}
            </div>
          </li>
        </ul>
      </div>
      <div>
        <table className="reponsive">
          <th>Customer Email</th>
          <th>No. of Tokens</th>
          <th>Avatar</th>
          <tbody>
            {companyCustomer &&
              companyCustomer.map((items) => {
                return (
                  <tr>
                    <td>{items.customerEmail}</td>
                    <td>{items.customerToken}</td>
                    <td>
                      <img src={items.url} style={{ width: "100px" }} />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanyDetails;
