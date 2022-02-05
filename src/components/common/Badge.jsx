import React from "react";
import PropTypes from "prop-types";

const Badge = ({ color, name }) => {
  return <span className={`badge bg-${color} m-1`}>{name}</span>;
};

Badge.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string
};

export default Badge;
