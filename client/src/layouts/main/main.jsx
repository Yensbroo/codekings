import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

/**
 * Components
 */
import PrivateRoute from "../../components/common/PrivateRoute";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import SignUp from "../../components/Register/register";
import Login from "../../components/Login/login";
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
import notFound from "../../components/Not-found/Not-found";

class Main extends Component {
  render() {
    const currentPath = window.location.pathname;
    return (
      <div className="App">
        {!currentPath.includes("signup") &&
        !currentPath.includes("login") &&
        !currentPath.includes("not-found") ? (
          <Navbar />
        ) : null}
        <Switch>
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Posts} />
          <Route exact path="/post/:id" component={Post} />
          <Route exact path="/profile/:id" component={Profile} />
          <PrivateRoute exact path="/favorites" component={UserFavorites} />
          <PrivateRoute exact path="/post/update/:id" component={UpdatePost} />
          <PrivateRoute exact path="/user/settings" component={UserSettings} />
          <PrivateRoute exact path="/user/avatar" component={SetAvatar} />
          <PrivateRoute
            exact
            path="/user/profile"
            component={ProfileSettings}
          />
          <PrivateRoute exact path="/user/posts" component={UserPosts} />
          <PrivateRoute exact path="/feed" component={Posts} />
          <PrivateRoute exact path="/create-tutorial" component={PostForm} />
          <Route exact path="/not-found" component={notFound} />
          <Redirect to="/not-found" />
        </Switch>

        {!currentPath.includes("signup") &&
        !currentPath.includes("login") &&
        !currentPath.includes("not-found") ? (
          <Footer />
        ) : null}
      </div>
    );
  }
}

export default Main;
