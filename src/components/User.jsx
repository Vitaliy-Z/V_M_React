import React, { useState } from "react";
import API from "../api";

export default function Users() {
  const [users, setUsers] = useState(API.users.fetchAll());

  const classesOfTitle =
    users.length === 0
      ? "d-none"
      : "table table-striped table-hover container-lg";
  const handleDeleteUserBtn = (event) => {
    const item = users.filter((user) => user._id !== event.target.value);
    setUsers(item);
  };
  const title = () => {
    if (users.length === 0) {
      return "Никто НЕ";
    }
    if (1 < users.length && users.length < 5) {
      return users.length + " человека";
    }
    if (users.length > 20 && 1 < users.length % 10 && users.length % 10 < 5) {
      return users.length + " человека";
    }
    return users.length + " человек";
  };

  return (
    <>
      <h1>
        <span
          className={
            users.length === 0 ? "badge bg-warning" : "badge bg-primary"
          }
        >
          {title()} тусанёт с тобой сегодня
        </span>
      </h1>
      <table className={classesOfTitle}>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Количество встреч</th>
            <th scope="col">Оценка</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, indx) => (
            <tr key={user._id}>
              <th scope="row">{indx + 1}</th>
              <td>{user.name}</td>
              <td>
                {user.qualities.map((qualiti) => (
                  <span
                    key={qualiti._id}
                    className={`badge bg-${qualiti.color} m-1`}
                  >
                    {qualiti.name}
                  </span>
                ))}
              </td>
              <td>{user.profession.name}</td>
              <td>{user.completedMeetings}</td>
              <td>{user.rate} / 5</td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDeleteUserBtn}
                  value={user._id}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
