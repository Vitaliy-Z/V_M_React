import React, { useContext } from "react";
import SearchStatus from "../components/SearchStatus";
import { Loader } from "../components/Loaders";
import { AllUserContext } from "../context";

export default function MainPage() {
  const { allUsers } = useContext(AllUserContext);
  if (!allUsers) {
    return <Loader />;
  }
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
}
