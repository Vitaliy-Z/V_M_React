import React, { useContext } from "react";
import PropTypes from "prop-types";
import BookMark from "./common/Bookmark";
import Qualitie from "./Qualitie";
import { Link } from "react-router-dom";
import API from "../api";
import { AllUserContext } from "../context";

export default function User({ indx, id }) {
  const { allUsers, setAllUsers } = useContext(AllUserContext);
  const user = allUsers.find(u => u._id === id);

  const handleCheckBookmark = id => {
    const updatedUser = allUsers.find(u => u._id === id);
    API.users.update(id, { ...updatedUser, bookmark: !updatedUser.bookmark });
    setAllUsers(prev =>
      prev.map(u => {
        if (u._id === updatedUser._id) {
          return { ...updatedUser, bookmark: !updatedUser.bookmark };
        }
        return u;
      })
    );
  };
  const handleDeleteUserBtn = () => {
    API.users
      .remove(user._id)
      .then(data => setAllUsers(prev => prev.filter(u => u._id !== data._id)));
  };

  if (!user) {
    return null;
  }

  return (
    <tr>
      <td scope="row" style={{ fontWeight: "bold" }}>
        {indx + 1}
      </td>
      <td>
        <Link to={`users/${user._id}`}>{user.name}</Link>
      </td>
      <td>
        {user.qualities.map(qualiti => (
          <Qualitie key={qualiti._id} {...qualiti} />
        ))}
      </td>
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate} / 5</td>
      <td>
        <BookMark
          id={user._id}
          bookmark={user.bookmark}
          handleCheckBookmark={handleCheckBookmark}
        />
      </td>
      <td>
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleDeleteUserBtn}
          id={user._id}
        >
          Удалить
        </button>
      </td>
    </tr>
  );
}

User.propTypes = {
  indx: PropTypes.number,
  id: PropTypes.string.isRequired
};
