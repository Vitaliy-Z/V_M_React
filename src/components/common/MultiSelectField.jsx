import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import PropTypes from "prop-types";

const animatedComponents = makeAnimated();

const MultiSelectField = ({ label, name, options, onChange, error }) => {
  return (
    <div className="mb-3 has-validation">
      <label className="form-label">{label}</label>
      <Select
        isMulti
        closeMenuOnSelect={false}
        components={animatedComponents}
        name={name}
        options={options}
        onChange={e => onChange({ name: name, value: e })}
        className={"basic-multi-select is-" + (error ? "invalid" : "valid")}
        classNamePrefix="select"
      />
      {error && <p className="invalid-feedback d-block m-0">{error}</p>}
    </div>
  );
};

MultiSelectField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
  error: PropTypes.string
};

export default MultiSelectField;
