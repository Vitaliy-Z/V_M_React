import React, { useEffect, useState } from "react";
import API from "./api";
import FiltrationList from "./components/FiltrationList";
import SearchStatus from "./components/SearchStatus";
import UsersList from "./components/UsersList";
import Spiner from "./components/Spiner";

export default function App() {
  const [allUsers, setAllUsers] = useState();
  const [filteredUsers, setFilteredUsers] = useState();
  const [allProfessions, setAllProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();

  useEffect(() => {
    API.professions.fetchAll().then(res => setAllProfessions(res));
    API.users.fetchAll().then(res => {
      setAllUsers(res);
      setFilteredUsers(res);
    });
  }, []);

  const handleSelectProf = item => {
    setSelectedProf(item);

    setFilteredUsers();
    setTimeout(() => {
      setFilteredUsers(allUsers.filter(user => user.profession.name === item));
    }, 700);
  };

  const handleResetFilter = () => {
    setFilteredUsers(allUsers);
    setSelectedProf();
  };

  return (
    <div className="container m-5">
      <div className="row">
        <div className="col-2">
          {allProfessions ? (
            <FiltrationList
              items={allProfessions}
              onItemSelect={handleSelectProf}
              onReset={handleResetFilter}
              selectedItem={selectedProf}
            />
          ) : (
            <Spiner />
          )}
        </div>

        <div className="col">
          {filteredUsers ? (
            <div>
              <SearchStatus length={filteredUsers?.length} />
              <UsersList users={filteredUsers} setUsers={setFilteredUsers} />
            </div>
          ) : (
            <Spiner />
          )}
        </div>
      </div>
    </div>
  );
}
