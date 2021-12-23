import React from "react";
import PropTypes from "prop-types";

function IconSort({ orders }) {
  return (
    <i
      className={`bi bi-caret-${orders}-fill`}
      style={{ fontSize: "0.75rem" }}
    ></i>
  );
}

IconSort.propTypes = {
  orders: PropTypes.oneOf(["up", "down"])
};

export default IconSort;
