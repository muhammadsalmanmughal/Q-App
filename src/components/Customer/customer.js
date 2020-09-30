import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import { useHistory } from "react-router-dom";

const CustomerHome = () => {
  const [companyList, setCompanyList] = useState([]);
  const [initialCompanyList, setInitialCompany] = useState([]);
  const history = useHistory();
  const [searchCompany, setSearchCompany] = useState();
  useEffect(() => {
    if (searchCompany) {
      let temp = searchCompany.toLowerCase();
      setCompanyList(
        companyList.filter((company) => {
          return company.companyName.toLowerCase().includes(temp);
        })
      );
    } else {
      setCompanyList(initialCompanyList);
    }
  }, [searchCompany]);
  //use Effect for comapany search ends

  //get companies from database starts
  //#region
  useEffect(() => {
    getCompanyData();
  }, []);
  const getCompanyData = () => {
    firebase
      .firestore()
      .collection("Companies")
      .get()
      .then(function (querySnapshot) {
        const comlist = [];
        querySnapshot.forEach(function (doc) {
          if (doc.exists) {
            console.log("getComapny doc.data----->", doc.data());
            const comp = doc.data();
            comlist.push({ ...comp, compId: doc.id });
          } else {
            console.log("No such document!");
          }
        });
        setCompanyList(comlist);
        setInitialCompany(comlist);
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  };
  console.log("company list state====>", { companyList });
  //#endregion
  //get companies from database ends

  return (
    <div>
      <h4>New customer component</h4>
      <div className="container">
        <div className="total">
          <div className="b-income  z-depth-2">
            <div className="container search">
              <h5>Search Companies here...</h5>
              <div className="col s12 m5">
                <input
                  type="text"
                  placeholder="Search by comapany Name.."
                  onChange={(e) => setSearchCompany(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {companyList.map((lists) => {
        return (
          <div className="row ">
            <div className="col s12 m5 ">
              <div className="card z-depth-4">
                <div className="card-image waves-effect waves-block waves-light">
                  <img className="activator" src={lists.url} />
                </div>
                <div className="card-content">
                  <span className="card-title activator grey-text text-darken-4">
                    {lists.companyName}
                    <i className="material-icons right">more_vert</i>
                  </span>
                </div>
                <div className="card-reveal ">
                  <span className="card-title grey-text text-darken-4">
                    <i className="material-icons right">close</i>{" "}
                    <h4> {lists.companyName}</h4>
                  </span>
                  <p>Since: {lists.since}</p>
                  <p>Address: {lists.address}</p>
                  <p>Timming: {lists.companyTime}</p>
                  <h4>
                    Total Tokens:
                    {lists.token ? <h5>{lists.token}</h5> : <h5>No Token.</h5>}
                  </h4>
                  <button
                    className="btn"
                    onClick={() =>
                      history.push(`/usergettoken/${lists.compId}`)
                    }>
                    Get Token
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default CustomerHome;
