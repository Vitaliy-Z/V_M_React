import React from "react";
import PropTypes from "prop-types";

const CheckField = ({ name, value, onChange, error, children }) => {
  return (
    <div className="form-check mb-3 text-center">
      <label className="form-check-label">
        <input
          className={"form-check-input is-" + (error ? "invalid" : "valid")}
          type="checkbox"
          value=""
          checked={value}
          onChange={() => onChange({ name: name, value: !value })}
        />
        {children}
      </label>
      {error && <p className="invalid-feedback d-block m-0">{error}</p>}
    </div>
  );
};

CheckField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
  error: PropTypes.string,
  children: PropTypes.node
};

export default CheckField;
