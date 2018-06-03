import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class componentName extends Component {
  render() {
    return (
      <footer>
        <img src="/logo/codekings_logo_wit.svg" alt="" />
        <Link to="https://github.com/Yensbroo">© Yens Broothaers</Link>
      </footer>
    );
  }
}
