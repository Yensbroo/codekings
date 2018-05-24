import React from "react";
import Loader from "react-loader-spinner";

export default () => {
  return (
    <div className="spinner">
      <Loader
        type="Grid"
        color="#ff9f1c"
        height={80}
        width={80}
        className="loader"
      />
    </div>
  );
};
