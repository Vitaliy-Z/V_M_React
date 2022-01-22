import React from "react";
import PropTypes from "prop-types";

function SearchUsers({ searchValue, handleSearchUsers }) {
  return (
    <input
      type="text"
      placeholder="Search..."
      value={searchValue}
      onChange={handleSearchUsers}
      className="form-control"
    />
  );
}

SearchUsers.propTypes = {
  searchValue: PropTypes.string,
  handleSearchUsers: PropTypes.func
};

export default SearchUsers;
