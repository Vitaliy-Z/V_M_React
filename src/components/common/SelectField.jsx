import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
  label,
  name,
  value,
  onChange,
  defaultValue = "...",
  options,
  error
}) => {
  return (
    <div className="d-flex flex-column mb-3">
      <label className="form-label">
        {label}
        <select
          className={"form-select is-" + (error ? "invalid" : "valid")}
          name={name}
          value={value}
          onChange={({ target }) => onChange(target)}
        >
          <option disabled value="">
            {defaultValue}
          </option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      {error && <div className="invalid-feedback d-block m-0">{error}</div>}
    </div>
  );
};

SelectField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
  options: PropTypes.array.isRequired,
  error: PropTypes.string
};

export default SelectField;
