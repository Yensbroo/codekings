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
import Profile from "../../components/Profile/Profile";
import Posts from "../../components/Posts/Posts";
import PostForm from "../../components/Posts/PostForm";
import Post from "../../components/Posts/Post";
import ProfileSettings from "../../components/Dashboard/ProfileSettings";
import UserSettings from "../../components/Dashboard/UserSettings";
import UserPosts from "../../components/Dashboard/UserPosts";
import UserFavorites from "../../components/Favorites/Favorites";
import SetAvatar from "../../components/Dashboard/SetAvatar";
import UpdatePost from "../../components/Posts/UpdatePost";

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
          <PrivateRoute exact path="/favorites" component={UserFavorites} />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/post/update/:id" component={UpdatePost} />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/user/settings" component={UserSettings} />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/user/avatar" component={SetAvatar} />
        </Switch>
        <Switch>
          <PrivateRoute
            exact
            path="/user/profile"
            component={ProfileSettings}
          />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/user/posts" component={UserPosts} />
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
