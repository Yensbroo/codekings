import React from "react";
import { Link } from "react-router-dom";

const notFound = () => {
  return (
    <div className="ck-404">
      <h1>
        4<span>0</span>4
      </h1>
      <h3>
        Whoops! it looks like this page does not exist. Turn back to the{" "}
        <Link to="/">homepage</Link>
      </h3>
    </div>
  );
};

export default notFound;
