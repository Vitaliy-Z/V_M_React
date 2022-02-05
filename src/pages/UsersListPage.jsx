import React, { useState, useEffect } from "react";
import _ from "lodash";
import { INITION_SORT_BY } from "../utils/constant";
import { useUsers } from "../hooks/useUsers";
import { useProfessions } from "../hooks/useProfessions";
import { FiltrationList, Loader, TextFeild } from "../components/common";
import { SearchStatus, UsersList } from "../components/ui";

const UsersListPage = () => {
  const [usersOfShowed, setUsersOfShowed] = useState();
  const [sortBy, setSortBy] = useState(INITION_SORT_BY);
  const [selectedProf, setSelectedProf] = useState();
  const [searchValue, setSearchValue] = useState();

  const { allUsers } = useUsers();
  const { allProfessions } = useProfessions();

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
    setSearchValue();
    setSelectedProf(item);
    setUsersOfShowed(allUsers.filter(user => user.profession === item));
  };

  const handleReset = () => {
    setSearchValue();
    setSortBy(INITION_SORT_BY);
    setSelectedProf();
    setUsersOfShowed(_.orderBy(allUsers, [sortBy.itr], [sortBy.order]));
  };

  if (!usersOfShowed) {
    return <Loader />;
  }

  return (
    <div className="m-2 px-0">
      <div className="row">
        <div className="col-2">
          {allProfessions && (
            <FiltrationList
              items={allProfessions}
              selectedItem={selectedProf || ""}
              onItemSelect={handleSelectProf}
              onReset={handleReset}
            />
          )}
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

            {usersOfShowed && usersOfShowed.length !== 0 && (
              <UsersList
                users={usersOfShowed}
                setSortBy={setSortBy}
                sortBy={sortBy}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersListPage;
