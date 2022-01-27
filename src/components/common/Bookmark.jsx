import React from "react";
import PropTypes from "prop-types";

export default function BookMark({ id, bookmark, handleCheckBookmark }) {
  const showImg = bookmark ? "bi-check2-circle" : "bi-circle";

  return (
    <i
      onClick={() => {
        handleCheckBookmark(id);
      }}
      className={"bi d-block w-50 mx-auto " + showImg}
      role="img"
      aria-label="bookmark"
      style={{ fontSize: "1.5rem", color: "cornflowerblue", cursor: "pointer" }}
    ></i>
  );
}

BookMark.propTypes = {
  id: PropTypes.string.isRequired,
  bookmark: PropTypes.bool,
  handleCheckBookmark: PropTypes.func
};
