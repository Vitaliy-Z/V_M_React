import React, { useEffect, useState } from "react";
import _ from "lodash";
import { PAGE_SIZE, VALUES_OF_TH } from "../utils/constant";
import PropTypes from "prop-types";
import User from "./User";
import Pagination from "./Pagination";
import IconSort from "./IconSort";

export default function UsersList({ users, setUsers, setSortBy, sortBy }) {
  const [currentPage, setCurrentPage] = useState(1);

  const cropUsers = _.slice(
    users,
    PAGE_SIZE * currentPage - PAGE_SIZE,
    PAGE_SIZE * currentPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [users]);

  const handleDeleteUserBtn = event => {
    const updatedUsers = users.filter(user => user._id !== event.target.id);
    setUsers(updatedUsers);
  };
  const handleCheckBookmark = id => {
    const updatedUsers = users.map(user => {
      if (user._id === id) {
        user.bookmark = !user.bookmark;
      }
      return user;
    });
    setUsers(updatedUsers);
  };
  const handleSortUsers = event => {
    const dataSortBy = event.currentTarget.dataset.sort;

    if (dataSortBy === sortBy.itr) {
      setSortBy(prevState => ({
        ...prevState,
        order: prevState.order === "asc" ? "desc" : "asc"
      }));
    } else {
      setSortBy({ itr: dataSortBy, order: "asc" });
    }
  };

  if (users.length === 0) {
    return null;
  }

  return (
    <div className="container p-0">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            {VALUES_OF_TH.map((value, ind) =>
              value.data ? (
                <th
                  onClick={handleSortUsers}
                  data-sort={value.data}
                  scope="col"
                  key={ind}
                >
                  {value.name}
                  {value.data === sortBy.itr && (
                    <IconSort orders={sortBy.order === "asc" ? "down" : "up"} />
                  )}
                </th>
              ) : (
                <th className={ind === 2 ? "w-25" : " "} scope="col" key={ind}>
                  {value.name}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {cropUsers.map((user, indx) => (
            <User
              key={user._id}
              indx={indx}
              handleDeleteUserBtn={handleDeleteUserBtn}
              handleCheckBookmark={handleCheckBookmark}
              {...user}
            />
          ))}
        </tbody>
      </table>
      <Pagination
        countItems={users.length}
        currentPage={currentPage}
        onChangePage={setCurrentPage}
      />
    </div>
  );
}

UsersList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  setUsers: PropTypes.func.isRequired,
  setSortBy: PropTypes.func,
  sortBy: PropTypes.object
};
