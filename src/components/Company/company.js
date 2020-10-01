import React, { useState, useEffect } from "react";
import "materialize-css/dist/css/materialize.min.css";
import * as firebase from "firebase";
import M from "materialize-css";
import { addCompany } from "../firebase/fb-config";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import MyMapComponent from "../Map/map";
import "react-toastify/dist/ReactToastify.css";

const CompanyDetails = ({ userId }) => {
  const [companyName, setCompanyName] = useState("");
  const [since, setSince] = useState("");
  const [address, setAddress] = useState("");
  const [companyTime, setcompanyTime] = useState();
  const [companyList, setCompanyList] = useState([]);
  const [initialCompanyList, setInitialCompany] = useState([]);
  const [searchCompany, setSearchCompany] = useState();
  const [mapLatitude, setMapLatitude] = useState();
  const [mapLangitude, setMapLangitude] = useState();
  const [limit, setLimit] = useState(2);
  const [map, setMap] = useState([]);
  let isLoading = false;
  const [img, setImg] = useState(null);
  toast.configure();
  const history = useHistory();
  const setTokenTo = false;
  //Show Map starts
  //#region
  const getMapData = (data, lat, lng) => {
    setMap(data.response.venues);
    setMapLatitude(lat);
    setMapLangitude(lng);
  };
  //#endregion
  //Show Map ends

  //get companies from database starts
  //#region
  useEffect(() => {
    getCompanyData();
    document.addEventListener("scroll", trackScrolling);
    return () => {
      document.removeEventListener("scroll", trackScrolling);
    };
  }, [userId, limit]);
  useEffect(() => {
    document.addEventListener("scroll", trackScrolling);
    return () => {
      document.removeEventListener("scroll", trackScrolling);
    };
  }, []);

  const getCompanyData = () => {
    if (userId) {
      isLoading = true;
      firebase
        .firestore()
        .collection("Companies")
        .limit(limit)
        .where("usersId", "==", userId)
        .onSnapshot(function (querySnapshot) {
          const comlist = [];
          querySnapshot.forEach(function (doc) {
            if (doc.exists) {
              const comp = doc.data();
              comlist.push({ ...comp, compId: doc.id });
            } else {
              alert("No such document!");
            }
          });
          setCompanyList(comlist);
          setInitialCompany(comlist);
        });
      isLoading = false;
    } else {
      alert("undefined user id");
    }
  };
  const isBottom = (el) => {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  };
  const trackScrolling = () => {
    const wrappedElement = document.getElementById("header");
    if (isBottom(wrappedElement) && !isLoading) {
      setLimit(limit + 1);
      document.removeEventListener("scroll", trackScrolling);
    }
  };
  //#endregion
  //get companies from database ends

  //upload image to database starts
  //#region
  const onImageUpload = (e) => {
    setImg(e.target.files[0]);
  };
  //#endregion
  //upload image to database ends

  //Add company to database start
  //#region
  const onAddCompany = () => {
    addCompany(
      companyName.toUpperCase(),
      since,
      address,
      companyTime,
      userId,
      mapLatitude,
      mapLangitude,
      setTokenTo,
      img
    );
  };
  //#endregion
  //Add company to database ends

  //use Effect for comapany search starts
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

  useEffect(() => {
    let elem = document.querySelector(".collapsible");
    M.Collapsible.init(elem, {});
  });

  return (
    <div id="header">
      <ul className="collapsible popout">
        <li>
          <div className="collapsible-header">
            <i className="material-icons">add</i>Add your company
          </div>
          <div className="collapsible-body">
            <div className="row">
              <div className="col s12">
                <div>
                  <MyMapComponent
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={
                      <div style={{ height: `500px`, width: `100%` }} />
                    }
                    mapElement={<div style={{ height: `100%` }} />}
                    getMapData={getMapData}
                  />
                </div>
                <div className="input-field col s12"></div>
                <div className="row">
                  <div className="input-field col s6">
                    <input
                      id="company_name"
                      type="text"
                      className="validate"
                      maxLength="30"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                    <label htmlFor="company_name">Company Name</label>
                  </div>
                  <div className="input-field col s6">
                    <input
                      id="since"
                      type="number"
                      className="validate"
                      maxLength={4}
                      value={since}
                      onChange={(e) => setSince(e.target.value)}
                    />
                    <label htmlFor="since">Since</label>
                  </div>
                  <div className="input-field col s6">
                    <select
                      className="browser-default"
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                    >
                      <option value="" selected>
                        Choose your options
                      </option>
                      {map &&
                        map.map((items) => (
                          <option value={items.name}>{items.name}</option>
                        ))}
                    </select>
                  </div>
                  <div className="input-field col s6"></div>
                  <div className="input-field  col s6">
                    <input
                      id="companytime"
                      type="text"
                      placeholder="Start Time - Close Time in 12hours format 00am-00pm"
                      onChange={(e) => setcompanyTime(e.target.value)}
                    />
                    <label htmlFor="companytime">Company Timing</label>
                  </div>
                  <div className="input-field  col s12">
                    <input type="file" multiple onChange={onImageUpload} />
                  </div>
                  <div className="input-field col s6">
                    <button
                      className="waves-effect waves-light btn z-depth-4"
                      onClick={onAddCompany}
                    >
                      Add Company
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>

      <div className="container ">
        <div>
          <div className="searchbar z-depth-2">
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

        {!companyList.length ? (
          <h5>Add your company</h5>
        ) : (
          <h5>Your Added Companies</h5>
        )}
        {companyList.map((lists) => {
          return (
            <div className="row ">
              <div className="col s12 m6">
                <div className="card z-depth-4 row">
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
                      {lists.token ? (
                        <h5>{lists.token}</h5>
                      ) : (
                        <h5>No Token.</h5>
                      )}
                    </h4>
                    <button
                      className="btn"
                      onClick={() =>
                        history.push(`/companyDetail/${lists.compId}`)
                      }
                    >
                      Show Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default CompanyDetails;
