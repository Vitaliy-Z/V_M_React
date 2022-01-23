import React from "react";
import PropTypes from "prop-types";

const RadioField = ({ label, name, value, onChange, options }) => {
  if (options) {
    return (
      <div className="mb-3">
        <label className="form-label">{label}</label>
        <div>
          {options.map(item => (
            <div
              className="form-check form-check-inline"
              key={item.value + item.label}
            >
              <label className="form-check-label">
                {item.label}
                <input
                  className="form-check-input"
                  type="radio"
                  checked={item.value === value}
                  name={name}
                  value={item.value}
                  onChange={({ target }) => onChange(target)}
                />
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

RadioField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired
};

export default RadioField;
