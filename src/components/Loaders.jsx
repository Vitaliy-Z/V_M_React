import React from "react";

export const Spiner = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border text-info mx-auto" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export const Loader = () => {
  return (
    <div
      className="container position-absolute top-50 start-50"
      style={{
        transform: "translate(-50%, -50%)",
        textAlign: "center"
      }}
    >
      <Spiner />
    </div>
  );
};
