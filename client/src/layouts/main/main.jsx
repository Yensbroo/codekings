import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

/**
 * Components
 */
import PrivateRoute from "../../components/common/PrivateRoute";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import SignUp from "../../components/Register/register";
import Login from "../../components/Login/login";
import Home from "../../components/Home/Home";
import Dashboard from "../../components/Dashboard/Dashboard";
import EditProfile from "../../components/Dashboard/EditProfile";
import CreateProfile from "../../components/Dashboard/CreateProfile";
import Profile from "../../components/Profile/Profile";
import Posts from "../../components/Posts/Posts";
import PostForm from "../../components/Posts/PostForm";
import Post from "../../components/Posts/Post";

class Main extends Component {
  render() {
    const currentPath = window.location.pathname;
    return (
      <div className="App">
        {!currentPath.includes("signup") && !currentPath.includes("login") ? (
          <Navbar />
        ) : null}
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Posts} />
        <Route exact path="/post/:id" component={Post} />
        <Route exact path="/profile/:id" component={Profile} />
        <Switch>
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
        <Switch>
          <PrivateRoute
            exact
            path="/dashboard/create-profile"
            component={CreateProfile}
          />
        </Switch>
        <Switch>
          <PrivateRoute
            exact
            path="/dashboard/edit-profile"
            component={EditProfile}
          />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/feed" component={Posts} />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/create-tutorial" component={PostForm} />
        </Switch>
        {!currentPath.includes("signup") && !currentPath.includes("login") ? (
          <Footer />
        ) : null}
      </div>
    );
  }
}

export default Main;
