import React from "react";
import ReactDOM from "react-dom";
import Users from "./components/User";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.render(
  <React.StrictMode>
    <Users />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
