import React from "react";
import SearchStatus from "../components/ui/SearchStatus";
import { useUsers } from "../hooks/useUsers";
import useMockData from "../utils/useMockData";

const MainPage = () => {
  const { allUsers } = useUsers();

  const { status, initialize, progress, error } = useMockData();
  const handleClick = () => {
    initialize();
  };
  return (
    <div
      className="container mt-4"
      style={{
        textAlign: "center"
      }}
    >
      <SearchStatus length={allUsers.length} />
      <div className="containet mt-5">
        <h1 className="m-auto">Инициализация в FireBase</h1>
        <button className="btn btn-info mt-3" onClick={handleClick}>
          Инициализировать
        </button>

        <div className="progress mt-3">
          <div
            className="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            aria-valuenow="75"
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
        <p>{error || status}</p>
      </div>
    </div>
  );
};

export default MainPage;
