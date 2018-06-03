import React from "react";
import PropTypes from "prop-types";

const TextAreaGroup = ({
  label,
  name,
  placeholder,
  value,
  error,
  onChange,
  info
}) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {info && <small>{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextAreaGroup.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  info: PropTypes.string
};

export default TextAreaGroup;
