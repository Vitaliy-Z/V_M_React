import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
  let title = `${length} человек тусaнет с тобой сегодня`;

  if (length === 0) {
    title = "Никто НЕ тусaнет с тобой сегодня";
  }
  if (length > 1 && length < 5) {
    title = `${length} человекa тусaнет с тобой сегодня`;
  }
  if (length > 20 && length % 10 > 1 && length % 10 < 5) {
    title = `${length} человекa тусaнет с тобой сегодня`;
  }

  return (
    <h1>
      <span className={length === 0 ? "badge bg-warning" : "badge bg-primary"}>
        {title}
      </span>
    </h1>
  );
};

SearchStatus.propTypes = {
  length: PropTypes.number.isRequired
};

export default SearchStatus;
