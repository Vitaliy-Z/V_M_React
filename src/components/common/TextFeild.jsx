import React, { useState } from "react";
import PropTypes from "prop-types";

const TextFeild = ({
  label,
  type = "text",
  name,
  placeholder = "Заполните поле",
  value,
  error,
  onChange
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="d-flex flex-column mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <div className="input-group has-validation">
        <input
          type={showPassword ? "text" : type}
          name={name}
          placeholder={placeholder}
          value={value}
          error={error}
          onChange={({ target }) => {
            onChange(target);
          }}
          className={"form-control is-" + (error ? "invalid" : "valid")}
        />
        {type === "password" && (
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
          >
            <i className={"bi bi-eye" + (showPassword ? "-slash" : "")}></i>
          </button>
        )}
      </div>
      {error && <p className="invalid-feedback d-block m-0">{error}</p>}
    </div>
  );
};

TextFeild.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default TextFeild;
