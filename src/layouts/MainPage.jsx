import React from "react";
import PropTypes from "prop-types";

import SearchStatus from "../components/SearchStatus";
import { Loader } from "../components/Loaders";

function MainPage({ usersOfShowed }) {
  return (
    <div
      className="container position-absolute top-50 start-50"
      style={{
        transform: "translate(-50%, -50%)",
        textAlign: "center"
      }}
    >
      {usersOfShowed ? (
        <SearchStatus length={usersOfShowed.length} />
      ) : (
        <Loader />
      )}
    </div>
  );
}

MainPage.propTypes = {
  usersOfShowed: PropTypes.array
};

export default MainPage;
