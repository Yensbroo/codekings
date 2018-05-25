import React from "react";
import PropTypes from "prop-types";

const TextFieldGroup = ({
  label,
  name,
  placeholder,
  value,
  error,
  type,
  onChange,
  disabled,
  info
}) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {info && <small>{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextFieldGroup.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
  info: PropTypes.string
};

TextFieldGroup.defaultProps = {
  type: "text"
};
export default TextFieldGroup;
