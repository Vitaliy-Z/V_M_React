import React from "react";
import PropTypes from "prop-types";

const TextAreaFeild = ({ label, name, value, onChange, rows = "3", error }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  return (
    <div className="mb-4">
      <label htmlFor={name}>{label}</label>
      <div className="input-group has-validation">
        <textarea
          id={name}
          rows={rows}
          name={name}
          value={value}
          onChange={handleChange}
          className={"form-control" + (error ? " is-invalid" : "")}
        />

        {error && <div className="invalid-feedback ">{error}</div>}
      </div>
    </div>
  );
};

TextAreaFeild.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  rows: PropTypes.string,
  error: PropTypes.string
};

export default TextAreaFeild;
