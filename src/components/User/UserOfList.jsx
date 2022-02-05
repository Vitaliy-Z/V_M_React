import React from "react";
import { Link } from "react-router-dom";
import { Badge, Bookmark } from "../common";
import { useProfessions } from "../../hooks/useProfessions";
import { useQualities } from "../../hooks/useQualities";

const UserOfList = ({ ...user }) => {
  const { getProfessionById } = useProfessions();
  const { getQualityById } = useQualities();

  const handleCheckBookmark = id => event => {
    console.log(id);
  };
  // const handleDeleteUserBtn = id => event => {
  //   console.log(id);
  // };

  return (
    <tr>
      <td>
        <Link className="fs-6" to={`users/${user._id}`}>
          {user.name}
        </Link>
      </td>
      <td>
        {user.qualities.map(qualityId => (
          <Badge key={qualityId} {...getQualityById(qualityId)} />
        ))}
      </td>
      <td>{getProfessionById(user.profession)?.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate} / 5</td>
      <td>
        <Bookmark
          isInBookmark={user.bookmark}
          onClick={handleCheckBookmark(user._id)}
        />
      </td>
      {/* <td>
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleDeleteUserBtn(user._id)}
          id={user._id}
        >
          Удалить
        </button>
      </td> */}
    </tr>
  );
};

export default UserOfList;
