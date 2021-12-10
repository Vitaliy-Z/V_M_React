import React from "react";
import PropTypes from "prop-types";

export default function Qualitie({ color, name }) {
  return <span className={`badge bg-${color} m-1`}>{name}</span>;
}

Qualitie.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string.isRequired
};
