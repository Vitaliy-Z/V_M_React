import React, { useContext, useEffect, useState } from "react";
import _ from "lodash";
import API from "../api";
import { Loader } from "../components/Loaders";
import { INITION_SORT_BY } from "../utils/constant";
import FiltrationList from "../components/common/FiltrationList";
import SearchStatus from "../components/SearchStatus";
import UsersList from "../components/UsersList";
import { AllUserContext, UserOfShowedContext } from "../context";
import TextFeild from "../components/common/TextFeild";

export default function UsersListPage() {
  const { allUsers } = useContext(AllUserContext);

  const [usersOfShowed, setUsersOfShowed] = useState();
  const [allProfessions, setAllProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState(INITION_SORT_BY);
  const [searchValue, setSearchValue] = useState();

  useEffect(() => {
    API.professions.fetchAll().then(data => setAllProfessions(data));
    setUsersOfShowed(allUsers);
  }, []);

  useEffect(() => {
    setUsersOfShowed(
      _.orderBy(allUsers, [INITION_SORT_BY.itr], [INITION_SORT_BY.order])
    );
  }, [allUsers]);

  useEffect(() => {
    if (usersOfShowed) {
      setUsersOfShowed(_.orderBy(usersOfShowed, [sortBy.itr], [sortBy.order]));
    }
  }, [sortBy]);

  const handleSearchUsers = ({ value }) => {
    setSelectedProf();
    setSearchValue(value.trim());
    const searchedUsers = allUsers.filter(user =>
      user.name.toLowerCase().includes(value.trim().toLowerCase())
    );
    setUsersOfShowed(_.orderBy(searchedUsers, [sortBy.itr], [sortBy.order]));
  };

  const handleSelectProf = item => {
    setSearchValue("");
    setSelectedProf(item);
    setUsersOfShowed(allUsers.filter(user => user.profession.name === item));
  };

  const handleReset = () => {
    setSortBy(INITION_SORT_BY);
    setSearchValue("");
    setSelectedProf();
    setUsersOfShowed(_.orderBy(allUsers, [sortBy.itr], [sortBy.order]));
  };

  if (!allProfessions) {
    return <Loader />;
  }
  if (!usersOfShowed) {
    return <Loader />;
  }
  return (
    <UserOfShowedContext.Provider value={{ usersOfShowed, setUsersOfShowed }}>
      <div className="m-2 px-0">
        <div className="row">
          <div className="col-2">
            <FiltrationList
              items={allProfessions}
              onItemSelect={handleSelectProf}
              onReset={handleReset}
              selectedItem={selectedProf}
            />
          </div>

          <div className="col-10">
            <div>
              <SearchStatus length={usersOfShowed?.length} />
              <TextFeild
                placeholder="Введите имя для поиска"
                value={searchValue}
                onChange={handleSearchUsers}
                isValidation={false}
              />

              {usersOfShowed.length !== 0 && (
                <UsersList setSortBy={setSortBy} sortBy={sortBy} />
              )}
            </div>
          </div>
        </div>
      </div>
    </UserOfShowedContext.Provider>
  );
}
