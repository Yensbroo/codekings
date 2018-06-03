import React from "react";

import PropTypes from "prop-types";

const InputGroup = ({
  name,
  placeholder,
  value,
  error,
  icon,
  onChange,
  type
}) => {
  return (
    <div className="input-group">
      <div className="input-group__prefix">
        <span className="input-group__icon">
          <i className={icon} />
        </span>
      </div>
      <input
        className="socials"
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

InputGroup.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  icon: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  info: PropTypes.string
};

InputGroup.defaultProps = {
  type: "text"
};

export default InputGroup;
