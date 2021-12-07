import React, { useState } from "react";
import API from "./api";
import SearchStatus from "./components/SearchStatus";
import UsersList from "./components/UsersList";

export default function App() {
  const [users, setUsers] = useState(API.users.fetchAll());

  return (
    <>
      <SearchStatus length={users.length} />
      <UsersList users={users} setUsers={setUsers} />
    </>
  );
}
