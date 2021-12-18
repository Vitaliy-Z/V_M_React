import React from "react";

const Spiner = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border text-info mx-auto" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spiner;
