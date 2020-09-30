import * as firebase from "firebase";
import "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
var firebaseConfig = {
  apiKey: "AIzaSyBijnuyKTs5tw4HRD94kqfjIqZVoqip9S8",
  authDomain: "q-app-7c72e.firebaseapp.com",
  databaseURL: "https://q-app-7c72e.firebaseio.com",
  projectId: "q-app-7c72e",
  storageBucket: "q-app-7c72e.appspot.com",
  messagingSenderId: "168318020159",
  appId: "1:168318020159:web:53b1ec68424a4b6ecde68a",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

//login via facebook
const facbookLogin = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {})
    .catch(function (error) {
      // Handle Errors here.
      console.log(error.message);
    });
};

//Create user via email and password
const registerUser = async (email, password, user) => {
  if (email == "" || password == "" || user == "") {
    toast.error("Data is not in correct format", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 4000,
      hideProgressBar: true,
    });
  } else {
    return await auth
      .createUserWithEmailAndPassword(email, password)
      .then(function (u) {
        console.log("user========>", u);
        const userId = u.user.uid;
        console.log("UserName from register new user----->");
        localStorage.setItem("userID", userId);
        firebase.firestore().collection("Users").doc(userId).set({
          user,
          email,
        });

        // showLoginForm();
      })
      .catch(function (error) {
        console.log("user data error----->", error);
      });
  }
};
//Login user via email and password
const loginUser = async (email, password) => {
  return await auth
    .signInWithEmailAndPassword(email, password)
    .then((userResponese) => {
      const userId = userResponese.user.uid;
      localStorage.setItem("userID", userId);
    })
    .catch(function (error) {
      console.log(error);
    });
};
// --------------------------------------
const addCompany = (
  companyName,
  since,
  address,
  companyTime,
  usersId,
  mapLatitude,
  mapLangitude,
  img
) => {
  console.log(
    "all Data====>",
    companyName,
    since,
    address,
    companyTime,
    usersId,
    mapLatitude,
    mapLangitude,
    img
  );
  if (
    companyName == "" ||
    companyName.length > 30 ||
    since == "" ||
    since.length > 4 ||
    address == "" ||
    address.length > 50 ||
    companyTime == "" ||
    img == null
  ) {
    toast.error("Data is not in correct format", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 4000,
      hideProgressBar: true,
    });
  } else {
    const storageRef = firebase.storage().ref(`images/${img.name}.jpg`);
    storageRef
      .put(img) //
      .then((response) => {
        response.ref.getDownloadURL().then((url) => {
          firebase
            .firestore()
            .collection("Companies")
            .add({
              companyName,
              since,
              companyTime,
              address,
              mapLatitude,
              mapLangitude,
              usersId,
              url,
            })
            .then(() => {
              console.log("data saved");
              toast.success("Company is registered", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 4000,
                hideProgressBar: true,
              });
            })
            .catch((error) => {
              toast.error("Data is not in correct format", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 4000,
                hideProgressBar: true,
              });
              console.log(error);
            });
        });
      });
  }
};
//Add token
const addTokenToCompany = (slug, date, token, avgTokenTime, currentToken) => {
  db.collection("Companies")
    .doc(slug)
    .update({
      date,
      token,
      currentToken,
      avgTokenTime,
    })
    .then(() => {
      toast.success("Token successfully updated", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 4000,
        hideProgressBar: true,
      });
    })
    .catch((error) => {
      console.log("Error updating document ==>", error);
    });
};
//Update Token

// Search Company
const renderSearchCompany = (companyName) => {
  if (companyName) {
    firebase
      .firestore()
      .collection("Companies")
      .where("companyName", "==", companyName)
      .get()
      .then(function (querySnapshot) {
        const company = [];
        querySnapshot.forEach(function (doc) {
          if (doc.exists) {
            console.log("getComapny name----->", doc.data());
            const comp = doc.data();
            company.push({ ...comp, compId: doc.id });
          } else {
            console.log("No such company!");
          }
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  } else {
    console.log("undefined user id");
  }
};
//Create customer collection in database
const addCutomersToken = (customerToken, customerEmail, img, slug) => {
  if (
    customerToken == "" ||
    customerEmail == "" ||
    img == null
  ) {
    toast.error("Data is not in correct format", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 4000,
      hideProgressBar: true,
    });
  } else {
    const storageRef = firebase.storage().ref(`customerImages/${img.name}.jpg`);
    storageRef
      .put(img) //
      .then((response) => {
        response.ref.getDownloadURL().then((url) => {
          firebase
            .firestore()
            .collection("Customers")
            .add({
              customerToken,
              customerEmail,
              slug,
              url,
            })
            .then(() => {
              console.log("data saved");
              toast.success("Customer is saved", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 4000,
                hideProgressBar: true,
              });
              firebase
                .firestore()
                .collection("Companies")
                .doc(slug)
                .get()
                .then((res) => {
                  console.log("ressss====>", res.data().token);
                  let updateToken = res.data().token - customerToken;
                  firebase
                    .firestore()
                    .collection("Companies")
                    .doc(slug)
                    .update({
                      token: updateToken,
                    });
                })
                .catch((e) => {
                  alert(e);
                });
            })
            .catch((error) => {
              toast.error("Data is not in correct format", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 4000,
                hideProgressBar: true,
              });
              console.log(error);
            });
        });
      });
  }
};
export default firebase;
export {
  facbookLogin,
  registerUser,
  loginUser,
  addCompany,
  addTokenToCompany,
  renderSearchCompany,
  addCutomersToken,
};
