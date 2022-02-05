import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ isInBookmark, onClick }) => {
  const showImg = isInBookmark ? "bi-check2-circle" : "bi-circle";

  return (
    <i
      className={"bi d-block w-50 mx-auto " + showImg}
      role="img"
      aria-label="bookmark"
      style={{ fontSize: "1.5rem", color: "cornflowerblue", cursor: "pointer" }}
      onClick={onClick}
    ></i>
  );
};

BookMark.propTypes = {
  isInBookmark: PropTypes.bool,
  onClick: PropTypes.func
};

export default BookMark;
