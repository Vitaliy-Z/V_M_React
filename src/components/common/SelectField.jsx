import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

const SelectField = ({
  label,
  name,
  onChange,
  defaultValue = "...",
  options,
  error
}) => {
  return (
    <div className="mb-3 has-validation">
      <label className="form-label">{label}</label>
      <Select
        className={"basic-single is-" + (error ? "invalid" : "valid")}
        classNamePrefix="select"
        isClearable
        defaultValue={defaultValue}
        name={name}
        options={options}
        onChange={e => onChange({ name: name, value: e })}
      />
      {error && <p className="invalid-feedback d-block m-0">{error}</p>}
    </div>
  );
};

SelectField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  defaultValue: PropTypes.object,
  options: PropTypes.array.isRequired,
  error: PropTypes.string
};

export default SelectField;
