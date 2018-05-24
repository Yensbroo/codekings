import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";

import store from "./store";

import "./App.css";
import Main from "./layouts/main/main";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);

  const decoded = jwt_decode(localStorage.jwtToken);

  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());

    store.dispatch(clearCurrentProfile());

    window.location.href = "/";
  }
}

/**
 * Components
 */

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Main />
        </Router>
      </Provider>
    );
  }
}

export default App;
