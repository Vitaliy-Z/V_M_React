import React from "react";
import SearchStatus from "../components/ui/SearchStatus";
import { useUsers } from "../hooks/useUsers";

const MainPage = () => {
  const { allUsers } = useUsers();
  return (
    <div
      className="container position-absolute top-50 start-50"
      style={{
        transform: "translate(-50%, -50%)",
        textAlign: "center"
      }}
    >
      <SearchStatus length={allUsers.length} />
    </div>
  );
};

export default MainPage;
