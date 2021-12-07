import React from "react";

export default function BookMark({ id, bookmark, handleCheckBookmark }) {
  const style = bookmark ? "bi-check2-circle" : "bi-circle";

  return (
    <i
      className={"bi d-block w-50 mx-auto " + style}
      style={{ fontSize: "1.5rem", color: "cornflowerblue" }}
      onClick={() => {
        handleCheckBookmark(id);
      }}
    ></i>
  );
}
