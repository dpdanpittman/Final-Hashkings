import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import GameBoard from "./components/gameBoard";
import AuthenticationView from "./components/authentication";
import four_oh_four from "./components/_404";
import Rentals from "./components/rental";

import Raids from "./components/raids";
import Forge from "./components/forge";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getMessaging, onMessage } from "firebase/messaging";
import Swal from "sweetalert2";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKDf4pbwwkS3NBu0DQLpZgzqZas2lmN3I",
  authDomain: "hashkings-c7886.firebaseapp.com",
  projectId: "hashkings-c7886",
  storageBucket: "hashkings-c7886.appspot.com",
  messagingSenderId: "226906687091",
  appId: "1:226906687091:web:df46ea8c10c7c9761ecc06",
  measurementId: "G-43W1J3H9J3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const messaging = getMessaging();
onMessage(messaging, (payload) => {
  let notificacion = payload.notification;
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    showCloseButton: true,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
      
    },
  });

  Toast.fire({
    icon: "success",
    title: notificacion.body,
    position: "center-end",
  });
});

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/">
            <AuthenticationView mode="app" />
          </Route>
          <Route path="/login">
            <AuthenticationView mode="login" />
          </Route>
          <Route path="/signup">
            <AuthenticationView mode="signup" />
          </Route>
          <Route path="/callback">
            <AuthenticationView mode="callback" />
          </Route>
          <ShopGuardRoute path="/rentals" component={Rentals} />
          <ShopGuardRoute path="/raids" component={Raids} />
          <ShopGuardRoute path="/forge" component={Forge} />
          <Route exact path="/auth" component={AuthenticationView} />
          <ShopGuardRoute
            exact
            path="/play"
            component={GameBoard}
            firebaseConfig={app}
          />
          <Route exact component={four_oh_four} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

const ShopGuardRoute = ({ component: Component, ...props }) => (
  <Route
    {...props}
    render={(routeProps) => {
      const item = localStorage.getItem("username");
      // Do all your conditional tests here
      return item !== null ? (
        <Component {...routeProps} />
      ) : (
        <Redirect to="/login" />
      );
    }}
  />
);

export default App;
