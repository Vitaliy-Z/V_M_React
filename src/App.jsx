import React, { useEffect, useState } from "react";
import _ from "lodash";
import API from "./api";
import { INITION_SORT_BY } from "./utils/constant";
import FiltrationList from "./components/FiltrationList";
import SearchStatus from "./components/SearchStatus";
import UsersList from "./components/UsersList";
import Spiner from "./components/Spiner";

export default function App() {
  const [allUsers, setAllUsers] = useState();
  const [usersOfShowed, setUsersOfShowed] = useState();
  const [allProfessions, setAllProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState(INITION_SORT_BY);

  useEffect(() => {
    API.professions.fetchAll().then(res => setAllProfessions(res));
    API.users.fetchAll().then(res => {
      setAllUsers(res);
      setUsersOfShowed(_.orderBy(res, [sortBy.itr], [sortBy.order]));
    });
  }, []);

  useEffect(() => {
    if (usersOfShowed) {
      setUsersOfShowed(_.orderBy(usersOfShowed, [sortBy.itr], [sortBy.order]));
    }
  }, [sortBy]);

  const handleSelectProf = item => {
    setUsersOfShowed();
    setSelectedProf(item);
    setTimeout(() => {
      setUsersOfShowed(allUsers.filter(user => user.profession.name === item));
    }, 250);
  };

  const handleResetFilter = () => {
    setUsersOfShowed(allUsers);
    setSelectedProf();
    setSortBy(INITION_SORT_BY);
  };

  return (
    <div className="m-3 px-0">
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
          {usersOfShowed ? (
            <div>
              <SearchStatus length={usersOfShowed?.length} />
              <UsersList
                users={usersOfShowed}
                setUsers={setUsersOfShowed}
                setSortBy={setSortBy}
                sortBy={sortBy}
              />
            </div>
          ) : (
            <Spiner />
          )}
        </div>
      </div>
    </div>
  );
}
