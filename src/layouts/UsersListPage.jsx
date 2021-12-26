import React, { useEffect, useState } from "react";
import FiltrationList from "../components/FiltrationList";
import SearchStatus from "../components/SearchStatus";
import UsersList from "../components/UsersList";
import { Loader } from "../components/Loaders";
import PropTypes from "prop-types";
import { INITION_SORT_BY } from "../utils/constant";
import _ from "lodash";

function UsersListPage({
  allUsers,
  usersOfShowed,
  setUsersOfShowed,
  selectedProf,
  setSelectedProf,
  allProfessions,
  onCheckBookmark,
  onDeleteUserBtn
}) {
  const [sortBy, setSortBy] = useState(INITION_SORT_BY);

  useEffect(() => {
    if (usersOfShowed) {
      setUsersOfShowed(_.orderBy(usersOfShowed, [sortBy.itr], [sortBy.order]));
    }
  }, [sortBy]);

  const handleSelectProf = item => {
    setSelectedProf(item);
    setUsersOfShowed(allUsers.filter(user => user.profession.name === item));
  };

  const handleReset = () => {
    setUsersOfShowed(allUsers);
    setSelectedProf();
    setSortBy(INITION_SORT_BY);
  };

  return allProfessions && usersOfShowed ? (
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

        <div className="col">
          <div>
            <SearchStatus length={usersOfShowed?.length} />
            <UsersList
              users={usersOfShowed}
              setUsers={setUsersOfShowed}
              onCheckBookmark={onCheckBookmark}
              onDeleteUserBtn={onDeleteUserBtn}
              setSortBy={setSortBy}
              sortBy={sortBy}
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
}

UsersListPage.propTypes = {
  allUsers: PropTypes.array,
  usersOfShowed: PropTypes.array,
  setUsersOfShowed: PropTypes.func,
  selectedProf: PropTypes.string,
  setSelectedProf: PropTypes.func,
  allProfessions: PropTypes.array,
  handleResetFilter: PropTypes.func,
  onCheckBookmark: PropTypes.func,
  onDeleteUserBtn: PropTypes.func
};

export default UsersListPage;
