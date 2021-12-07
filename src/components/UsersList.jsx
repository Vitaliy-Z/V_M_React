import React from "react";
import User from "./User";

export default function UsersList({ users, setUsers }) {
  const handleDeleteUserBtn = (event) => {
    const item = users.filter((user) => user._id !== event.target.id);
    setUsers(item);
  };
  const handleCheckBookmark = (id) => {
    const item = users.map((user) => {
      if (user._id === id) {
        user.bookmark = !user.bookmark;
      }
      return user;
    });
    setUsers(item);
  };

  if (users.length === 0) {
    return <></>;
  } else {
    return (
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
          {users.map((user, indx) => (
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
    );
  }
}
