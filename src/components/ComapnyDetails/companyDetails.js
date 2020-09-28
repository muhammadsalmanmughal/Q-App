import React, { useState, useEffect } from "react";
import firebase from "../firebase/fb-config";
import { addTokenToCompany } from "../firebase/fb-config";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CompanyDetails = () => {
  toast.configure()
  const [token, setToken] = useState("");
  const [avgTokenTime, setAvgTokenTime] = useState("");
  let { slug } = useParams();
  const [company, setCompany] = useState();
  const [companyCustomer, setCompanyCustomer] = useState();

  const getSingleCompany = function () {
    var docRef = firebase.firestore().collection("Companies").doc(slug);

    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          setCompany(doc.data());
          if (doc.data().date) {
            const currentDate = new Date().getDate();
            console.log("if se reg time chala");
            if (doc.data().date !== currentDate) {
              docRef
                .update({
                  token: 0,
                  date: 0,
                })
                .then(() => {
                  console.log("Token Reset");
                });
            } else {
              return;
            }
          } else {
            return;
          }
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  };
  useEffect(() => {
    getSingleCompany();
    getCustomers();
  }, []);

  const getCustomers=()=>{
    firebase.firestore().collection('Customers')
    .where('slug','==',slug)
    .get()
    .then((res)=>{
      const allCustomers=[]
      res.forEach(doc => {
        const cus=doc.data();
        console.log('customers---->',doc.data())
        allCustomers.push({...cus,custId:doc.id})
        setCompanyCustomer(allCustomers)
      });
    })
    .catch((error)=>{
      console.log(error)
    })

  }
  console.log("allcustomer->",companyCustomer);
  console.log("Slug comapny ki id", slug);
  const date = new Date().getDate();
  console.log("Date===>", date);

  const onSetToken = () => {
    if(token == '' || avgTokenTime == '' ){
      toast.error("Data is not in correct format", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 4000,
        hideProgressBar: true,
      });
    }
    else{
    addTokenToCompany(slug, date, token, avgTokenTime);
  }
  };
  console.log(company);
  if (!company) {
    return <h1>loading...</h1>;
  }

  console.log("companioon k customers", companyCustomer);



  return (
    <div className='container '>
    <div className="main z-depth-5">
      {/* <button onClick={showCustomerToComapny}>show customers</button> */}
       <div className="row ">
        <div className="check col s12 m5 ">
          
            <h4>Name:{company.companyName}</h4>
            <h4>Since:{company.since}</h4>
            <h5>Address: {company.address}</h5>
          </div>

        <div className="check2 col s12 m7 ">
          <img className="companyName z-depth-5" src={company.url} />
        </div>
      </div>

      <h5>Add token for this company</h5>
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
          </div >
          <div >

          <button className='waves-effect waves-ligh btn' onClick={onSetToken}>Add token</button>
          </div>
        </div>
     
        </div>
        <h3>Your Customers</h3>
        <div>
           <table className='reponsive'>
      
         
              <th>Customer Email</th>
              <th>No. of Tokens</th>
              <th>Avatar</th>
          <tbody>
         {companyCustomer&&companyCustomer.map(items=>{
           return(
             <tr>
               <td>
                 {items.customerEmail}
               </td>
               <td>
                 {items.customerToken}
               </td>
               <td>
                 
                 <img src={items.url} 
                //  className='table-img'
                style={{width:'100px'}}
                 />
               </td>
               
             </tr>
           )
         })}
         
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default CompanyDetails;
