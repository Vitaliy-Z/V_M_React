import React, { useState } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import Pagination from "./Pagination";
import User from "./User";

export default function UsersList({ users, setUsers }) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;
  const cropUsers = _.slice(
    users,
    pageSize * currentPage - pageSize,
    pageSize * currentPage
  );

  if (users.length === 0) {
    return null;
  }

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

  return (
    <>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встречи</th>
            <th scope="col">Оценка</th>
            <th scope="col">Избранное</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {cropUsers.map((user, indx) => (
            <User
              key={user._id}
              indx={indx}
              setUsers={setUsers}
              handleDeleteUserBtn={handleDeleteUserBtn}
              handleCheckBookmark={handleCheckBookmark}
              {...user}
            />
          ))}
        </tbody>
      </table>
      <Pagination
        countItems={users.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onChangePage={setCurrentPage}
      />
    </>
  );
}

UsersList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  setUsers: PropTypes.func.isRequired
};
