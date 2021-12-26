import React from "react";
import PropTypes from "prop-types";
import BookMark from "./Bookmark";
import Qualitie from "./Qualitie";
import { Link } from "react-router-dom";

export default function User({
  indx,
  handleDeleteUserBtn,
  _id,
  name,
  qualities,
  profession,
  completedMeetings,
  rate,
  bookmark,
  handleCheckBookmark
}) {
  return (
    <tr>
      <td scope="row" style={{ fontWeight: "bold" }}>
        {indx + 1}
      </td>
      <td>
        <Link to={`users/${_id}`}>{name}</Link>
      </td>
      <td>
        {qualities.map(qualiti => (
          <Qualitie key={qualiti._id} {...qualiti} />
        ))}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate} / 5</td>
      <td>
        <BookMark
          id={_id}
          bookmark={bookmark}
          handleCheckBookmark={handleCheckBookmark}
        />
      </td>
      <td>
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleDeleteUserBtn}
          id={_id}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

User.propTypes = {
  indx: PropTypes.number,
  handleDeleteUserBtn: PropTypes.func.isRequired,
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  qualities: PropTypes.arrayOf(PropTypes.object),
  profession: PropTypes.object,
  completedMeetings: PropTypes.number,
  rate: PropTypes.number,
  bookmark: PropTypes.bool,
  handleCheckBookmark: PropTypes.func.isRequired
};
